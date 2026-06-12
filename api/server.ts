// Vercel serverless entry point.
//
// Vercel will route every request matching the rewrites in vercel.json
// (/api/*, /d/*) to this file. We construct an Express app that mirrors
// the dev/prod server in server/index.ts — body parsers, cookie parser
// for the FR9 gate, and all the existing route handlers — then export
// it as the default handler.
//
// IMPORTANT: this entry is for Vercel only. In local dev (`npm run dev`),
// the existing tsx-launched server in server/index.ts is the entry. In a
// long-running production node deploy, the esbuild bundle in dist/ is
// the entry. The serverless wrapper deliberately re-uses registerRoutes()
// so that all three paths share one set of HTTP handlers.

import express, { type Request, type Response, type NextFunction } from "express";
import cookieParser from "cookie-parser";
import { registerRoutes } from "../server/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let routesReady: Promise<unknown> | null = null;
function ensureRoutesRegistered() {
  if (!routesReady) {
    routesReady = registerRoutes(app);
  }
  return routesReady;
}

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const status =
    (err as { status?: number; statusCode?: number })?.status ??
    (err as { status?: number; statusCode?: number })?.statusCode ??
    500;
  const message = err instanceof Error ? err.message : "Internal Server Error";
  res.status(status).json({ message });
});

export default async function handler(req: Request, res: Response) {
  await ensureRoutesRegistered();
  return (app as unknown as (r: Request, s: Response) => void)(req, res);
}
