// FR9 password gate middleware.
//
// Per docs/council/tech-architect-proposal.md §5 (the canonical design):
//   - cookie name: es_event_<eventId>            (per-event isolation)
//   - cookie value: HMAC-signed token            (payload below)
//   - attributes:   HttpOnly, Secure (prod),     SameSite=Lax, Path=/, Max-Age=604800 (7d)
//   - signing key:  process.env.EVENT_GATE_SECRET
//   - missing/bad cookie -> 302 to /d/:slug/login (never client-side JS gate)
//   - on success      -> attaches req.eventContext = { eventId, subject }
//
// PRD FR9 product contract: login page renders zero lead data. Acceptance
// test is `curl /d/:slug/login | grep -c <anyAttendeeEmail>` returns 0.

import type { Request, Response, NextFunction, RequestHandler } from "express";
import crypto from "crypto";
import { storage } from "../storage";
import type { Event } from "../../shared/schema";

declare module "express-serve-static-core" {
  interface Request {
    eventContext?: {
      eventId: string;
      slug: string;
      subject: string;
      event: Event;
    };
  }
}

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
const COOKIE_MAX_AGE_MS = COOKIE_MAX_AGE_SECONDS * 1000;

export type GatePayload = {
  eventId: string;
  issuedAt: number;
  subject: string;
};

export function cookieNameFor(eventId: string): string {
  return `es_event_${eventId}`;
}

function getSecret(): string | null {
  const secret = process.env.EVENT_GATE_SECRET;
  if (!secret || secret.length < 32) {
    console.warn(
      JSON.stringify({
        level: "warn",
        event: "event_gate_secret_missing_or_short",
        message:
          "EVENT_GATE_SECRET unset or <32 chars. Set to a 64-hex value (`openssl rand -hex 32`).",
      }),
    );
    return null;
  }
  return secret;
}

// Base64url helpers — Node's Buffer.toString("base64url") exists on >=16.
function b64urlEncode(buf: Buffer): string {
  return buf.toString("base64url");
}
function b64urlDecode(s: string): Buffer {
  return Buffer.from(s, "base64url");
}

export function signGateCookie(payload: GatePayload): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const body = b64urlEncode(Buffer.from(JSON.stringify(payload), "utf8"));
  const mac = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest();
  return `${body}.${b64urlEncode(mac)}`;
}

export function verifyGateCookie(
  token: string | undefined,
  expectedEventId: string,
): GatePayload | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, mac] = parts;
  const secret = getSecret();
  if (!secret) return null;
  const expectedMac = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest();
  const presentedMac = b64urlDecode(mac);
  if (presentedMac.length !== expectedMac.length) return null;
  if (!crypto.timingSafeEqual(presentedMac, expectedMac)) return null;
  let payload: GatePayload;
  try {
    payload = JSON.parse(b64urlDecode(body).toString("utf8"));
  } catch {
    return null;
  }
  if (!payload || typeof payload !== "object") return null;
  if (payload.eventId !== expectedEventId) return null;
  if (typeof payload.issuedAt !== "number") return null;
  if (Date.now() - payload.issuedAt > COOKIE_MAX_AGE_MS) return null;
  if (typeof payload.subject !== "string") return null;
  return payload;
}

export function setGateCookie(
  res: Response,
  eventId: string,
  token: string,
): void {
  res.cookie(cookieNameFor(eventId), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_MS,
  });
}

export function clearGateCookie(res: Response, eventId: string): void {
  res.clearCookie(cookieNameFor(eventId), { path: "/" });
}

// Minimal cookie reader so we don't have to require cookie-parser to be
// wired before the gate is functional. If cookie-parser is mounted upstream
// (req.cookies present), prefer it; otherwise parse req.headers.cookie.
function readCookie(req: Request, name: string): string | undefined {
  const parsed = (req as Request & { cookies?: Record<string, string> }).cookies;
  if (parsed && typeof parsed[name] === "string") return parsed[name];
  const header = req.headers.cookie;
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq < 0) continue;
    const k = part.slice(0, eq).trim();
    if (k === name) {
      return decodeURIComponent(part.slice(eq + 1).trim());
    }
  }
  return undefined;
}

// Middleware factory: `app.get("/d/:slug", eventGate(), renderDashboard)`.
export function eventGate(): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    if (!slug) {
      res.status(400).send("Missing event slug");
      return;
    }
    const event = await storage.getEventBySlug(slug);
    if (!event) {
      res.status(404).send("Event not found");
      return;
    }
    const token = readCookie(req, cookieNameFor(event.id));
    const payload = verifyGateCookie(token, event.id);
    if (!payload) {
      res.redirect(302, `/d/${encodeURIComponent(slug)}/login`);
      return;
    }
    req.eventContext = {
      eventId: event.id,
      slug: event.slug,
      subject: payload.subject,
      event,
    };
    next();
  };
}
