// Vercel serverless entry point.
//
// Self-contained on purpose: we do NOT import from `server/` or `shared/`
// because Vercel's serverless bundler resolves TypeScript module paths
// differently than tsx and esbuild's full bundle (it ships unresolved
// `./path` specifiers that Node ESM then can't load). Keeping the chain
// short avoids the entire class of `ERR_MODULE_NOT_FOUND` failures.
//
// The endpoints below cover what the public landing page actually uses:
// lead-capture forms. State is intentionally NOT persisted (the prior
// MemStorage was effectively the same — wiped on cold start). The data
// the founder cares about is forwarded to AUDIT_WEBHOOK_URL in real time;
// in-app history requires the v1 Week 2 DbStorage that's not deployed yet.

import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { z } from "zod";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Schemas ---------------------------------------------------------------

const calendarAuditSchema = z.object({
  calendarUrl: z.string().min(1),
  email: z.string().email().nullish(),
  auditType: z.enum(["own", "competitor"]).optional(),
});

const marketplaceListingSchema = z.object({
  listingType: z.enum(["event", "venue", "sponsor-interest"]),
  email: z.string().email(),
  name: z.string().min(1),
  title: z.string().min(1),
  details: z.string().optional(),
});

const betaSignupSchema = z.object({
  email: z.string().email(),
  eventType: z.string().nullish(),
});

const demoRequestSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  company: z.string().nullish(),
  eventType: z.string().nullish(),
  message: z.string().nullish(),
});

// --- Webhook forwarder -----------------------------------------------------

async function forwardWebhook(payload: Record<string, unknown>): Promise<void> {
  const webhookUrl = process.env.AUDIT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn(
      JSON.stringify({
        level: "warn",
        event: "webhook_not_configured",
        payload,
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
          event: "webhook_non_2xx",
          status: response.status,
        }),
      );
    }
  } catch (err) {
    console.warn(
      JSON.stringify({
        level: "warn",
        event: "webhook_failed",
        error: err instanceof Error ? err.message : String(err),
      }),
    );
  }
}

// --- Endpoint helper -------------------------------------------------------

function handlePost<T>(schema: z.ZodType<T>, kind: string) {
  return async (req: Request, res: Response) => {
    try {
      const parsed = schema.parse(req.body);
      void forwardWebhook({
        kind,
        submittedAt: new Date().toISOString(),
        ...(parsed as Record<string, unknown>),
      });
      res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid input data",
          errors: err.errors,
        });
        return;
      }
      console.error(
        JSON.stringify({
          level: "error",
          event: `${kind}_failed`,
          error: err instanceof Error ? err.message : String(err),
        }),
      );
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
}

app.post("/api/calendar-audit", handlePost(calendarAuditSchema, "calendar_audit"));
app.post(
  "/api/marketplace-listing",
  handlePost(marketplaceListingSchema, "marketplace_listing"),
);
app.post("/api/beta-signup", handlePost(betaSignupSchema, "beta_signup"));
app.post("/api/demo-request", handlePost(demoRequestSchema, "demo_request"));

// Admin GET endpoints intentionally omitted — they served MemStorage state
// that has no value on serverless (wiped per cold start). The founder reads
// AUDIT_WEBHOOK_URL output instead. /d/:slug FR9 gate is also omitted; it
// will return once v1 Week 2 wires DbStorage onto Neon.

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(
    JSON.stringify({
      level: "error",
      event: "unhandled",
      error: err instanceof Error ? err.message : String(err),
    }),
  );
  const status =
    (err as { status?: number; statusCode?: number })?.status ??
    (err as { status?: number; statusCode?: number })?.statusCode ??
    500;
  res.status(status).json({
    success: false,
    message: err instanceof Error ? err.message : "Internal server error",
  });
});

export default app;
