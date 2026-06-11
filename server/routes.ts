import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBetaSignupSchema, insertDemoRequestSchema, insertCalendarAuditSchema, insertMarketplaceListingSchema } from "@shared/schema";
import { z } from "zod";

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
        auditType: validatedData.auditType,
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

  const httpServer = createServer(app);
  return httpServer;
}
