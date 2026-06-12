import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { insertBetaSignupSchema, insertDemoRequestSchema, insertCalendarAuditSchema, insertMarketplaceListingSchema } from "../shared/schema";
import {
  eventGate,
  signGateCookie,
  setGateCookie,
  clearGateCookie,
} from "./middleware/eventGate";
import { z } from "zod";

// Server-rendered HTML helpers for the FR9 gate. Hand-rolled so the login
// page can be statically asserted to render zero attendee data (PRD FR9
// acceptance test: `curl /d/:slug/login | grep -c <anyAttendeeEmail>` = 0).
function htmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderLoginPage(opts: {
  slug: string;
  eventName: string;
  error?: string;
}): string {
  const action = `/d/${encodeURIComponent(opts.slug)}/login`;
  const error = opts.error
    ? `<p class="error" role="alert">${htmlEscape(opts.error)}</p>`
    : "";
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex,nofollow" />
    <title>Sign in — ${htmlEscape(opts.eventName)}</title>
    <style>
      body { font-family: system-ui, sans-serif; max-width: 32rem; margin: 4rem auto; padding: 0 1rem; color: #111; }
      h1 { font-size: 1.25rem; margin-bottom: 0.5rem; }
      p.meta { color: #555; margin-top: 0; font-size: 0.9rem; }
      form { display: grid; gap: 0.75rem; margin-top: 1.5rem; }
      label { display: grid; gap: 0.25rem; font-size: 0.875rem; }
      input { padding: 0.5rem 0.75rem; border: 1px solid #ccc; border-radius: 0.375rem; font: inherit; }
      button { padding: 0.5rem 1rem; border: 0; border-radius: 0.375rem; background: #111; color: white; font: inherit; cursor: pointer; }
      .error { color: #b00020; font-size: 0.875rem; }
    </style>
  </head>
  <body>
    <h1>${htmlEscape(opts.eventName)}</h1>
    <p class="meta">Private event dashboard. Sign in to continue.</p>
    ${error}
    <form method="post" action="${action}" autocomplete="off">
      <label>
        Password
        <input type="password" name="password" required autofocus />
      </label>
      <label>
        Your name or team (optional)
        <input type="text" name="subject" placeholder="e.g. Tavily / Sara" maxlength="80" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  </body>
</html>`;
}

function renderDashboardStub(eventName: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex,nofollow" />
    <title>${htmlEscape(eventName)} — Event dashboard</title>
    <style>body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 4rem auto; padding: 0 1rem; }</style>
  </head>
  <body>
    <h1>Event dashboard for ${htmlEscape(eventName)} — pipeline pending</h1>
    <p>FR9 gate is wired. Real dashboard ships in Week 4 (FR5).</p>
    <form method="post" action="/d/${htmlEscape(eventName)}/logout"><button type="submit">Sign out</button></form>
  </body>
</html>`;
}

// Forward a calendar-audit submission to AUDIT_WEBHOOK_URL (e.g. a
// Slack/Resend incoming webhook) so the founder sees it in real time
// while the in-memory store still serves the API response. The webhook
// call is fire-and-forget: failures or missing config never fail the
// user-facing request.
async function forwardAuditToWebhook(payload: {
  calendarUrl: string;
  email: string | null | undefined;
  auditType: string;
  submittedAt: string;
}): Promise<void> {
  const webhookUrl = process.env.AUDIT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn(
      JSON.stringify({
        level: "warn",
        event: "audit_webhook_not_configured",
        message: "AUDIT_WEBHOOK_URL not set; calendar audit submission stored in memory only.",
        submittedAt: payload.submittedAt,
      }),
    );
    return;
  }
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      console.warn(
        JSON.stringify({
          level: "warn",
          event: "audit_webhook_non_2xx",
          status: response.status,
          submittedAt: payload.submittedAt,
        }),
      );
    }
  } catch (err) {
    console.warn(
      JSON.stringify({
        level: "warn",
        event: "audit_webhook_failed",
        error: err instanceof Error ? err.message : String(err),
        submittedAt: payload.submittedAt,
      }),
    );
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/beta-signup", async (req, res) => {
    try {
      const validatedData = insertBetaSignupSchema.parse(req.body);
      const signup = await storage.createBetaSignup(validatedData);
      res.json({ success: true, data: signup });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  app.post("/api/demo-request", async (req, res) => {
    try {
      const validatedData = insertDemoRequestSchema.parse(req.body);
      const request = await storage.createDemoRequest(validatedData);
      res.json({ success: true, data: request });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  app.post("/api/calendar-audit", async (req, res) => {
    try {
      const validatedData = insertCalendarAuditSchema.parse(req.body);
      const audit = await storage.createCalendarAudit(validatedData);
      // Fire-and-forget the webhook so the response is not blocked on a
      // slow upstream. We don't await: the in-memory store is the
      // source of truth for the response, the webhook is the operator
      // notification channel.
      void forwardAuditToWebhook({
        calendarUrl: validatedData.calendarUrl,
        email: validatedData.email,
        auditType: validatedData.auditType ?? "own",
        submittedAt: new Date().toISOString(),
      });
      res.json({ success: true, data: audit });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  app.get("/api/beta-signups", async (_req, res) => {
    try {
      const signups = await storage.getBetaSignups();
      res.json({ success: true, data: signups });
    } catch {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.get("/api/demo-requests", async (_req, res) => {
    try {
      const requests = await storage.getDemoRequests();
      res.json({ success: true, data: requests });
    } catch {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.get("/api/calendar-audits", async (_req, res) => {
    try {
      const audits = await storage.getCalendarAudits();
      res.json({ success: true, data: audits });
    } catch {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.post("/api/marketplace-listing", async (req, res) => {
    try {
      const validatedData = insertMarketplaceListingSchema.parse(req.body);
      const listing = await storage.createMarketplaceListing(validatedData);
      res.json({ success: true, data: listing });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  app.get("/api/marketplace-listings", async (_req, res) => {
    try {
      const listings = await storage.getMarketplaceListings();
      res.json({ success: true, data: listings });
    } catch {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // ---------------------------------------------------------------------------
  // PRD v1 — FR9 password gate routes (Week 1).
  // Per docs/council/tech-architect-proposal.md §5. Render server-side HTML so
  // the login page has zero JS and zero attendee data in the body.
  // ---------------------------------------------------------------------------

  app.get("/d/:slug/login", async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const event = await storage.getEventBySlug(slug);
    if (!event) {
      res.status(404).send("Event not found");
      return;
    }
    res
      .status(200)
      .type("html")
      .send(renderLoginPage({ slug, eventName: event.name }));
  });

  app.post("/d/:slug/login", async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const event = await storage.getEventBySlug(slug);
    if (!event) {
      res.status(404).send("Event not found");
      return;
    }
    const password =
      typeof req.body?.password === "string" ? req.body.password : "";
    const subjectInput =
      typeof req.body?.subject === "string" ? req.body.subject : "";
    const subject = subjectInput.trim().slice(0, 80) || "anonymous";
    let ok = false;
    try {
      ok = password.length > 0 && (await bcrypt.compare(password, event.passwordHash));
    } catch {
      ok = false;
    }
    if (!ok) {
      res
        .status(401)
        .type("html")
        .send(
          renderLoginPage({
            slug,
            eventName: event.name,
            error: "Incorrect password.",
          }),
        );
      return;
    }
    const token = signGateCookie({
      eventId: event.id,
      issuedAt: Date.now(),
      subject,
    });
    if (!token) {
      // EVENT_GATE_SECRET missing/short — fail closed, do not set cookie.
      res.status(500).send("Gate misconfigured: EVENT_GATE_SECRET unset.");
      return;
    }
    setGateCookie(res, event.id, token);
    res.redirect(302, `/d/${encodeURIComponent(slug)}`);
  });

  app.post("/d/:slug/logout", async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const event = await storage.getEventBySlug(slug);
    if (event) {
      clearGateCookie(res, event.id);
    }
    res.redirect(302, `/d/${encodeURIComponent(slug)}/login`);
  });

  // Stub dashboard route behind the gate. Real implementation lands Week 4.
  app.get("/d/:slug", eventGate(), async (req: Request, res: Response) => {
    const ctx = req.eventContext!;
    res
      .status(200)
      .type("html")
      .send(renderDashboardStub(ctx.event.name));
  });

  const httpServer = createServer(app);
  return httpServer;
}
