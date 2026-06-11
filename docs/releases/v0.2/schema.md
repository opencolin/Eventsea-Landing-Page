# v0.2 — Drizzle schema additions

> Concrete schema for `shared/schema.ts` extensions in release v0.2.
> Builds on existing tables: `users`, `betaSignups`, `demoRequests`, `calendarAudits`, `marketplaceListings`.

## New tables

### `scraped_calendars`

Cache of upstream Luma calendar fetches. One row per calendar URL.

```ts
export const scrapedCalendars = pgTable("scraped_calendars", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  url: text("url").notNull().unique(),
  organizerName: text("organizer_name"),
  organizerLumaSlug: text("organizer_luma_slug"),
  rawJson: text("raw_json").notNull(),         // full HTML or Luma API response, gzipped if large
  fetchedAt: timestamp("fetched_at").defaultNow().notNull(),
  eventCount: integer("event_count").notNull().default(0),
  fetchError: text("fetch_error"),
});
```

Index: `idx_scraped_calendars_fetched_at` on `fetched_at desc` for cache-eviction queries.

### `scraped_events`

One row per event found in a scraped calendar. Re-scraping replaces all rows for a given `calendar_id`.

```ts
export const scrapedEvents = pgTable("scraped_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  calendarId: varchar("calendar_id").references(() => scrapedCalendars.id).notNull(),
  lumaEventId: text("luma_event_id"),
  title: text("title").notNull(),
  description: text("description"),
  startsAt: timestamp("starts_at"),
  endsAt: timestamp("ends_at"),
  location: text("location"),
  capacity: integer("capacity"),
  attendeeCount: integer("attendee_count"),    // observed when scraping past events
  hosts: text("hosts"),                         // comma-separated for now; JSON in v1
  sponsors: text("sponsors"),
  speakers: text("speakers"),
  rawJson: text("raw_json").notNull(),
  scrapedAt: timestamp("scraped_at").defaultNow().notNull(),
});
```

Index: `idx_scraped_events_calendar_id` on `calendar_id`.

### `audit_jobs`

Async job state for an audit. Each `calendar_audit` row gets exactly one `audit_job`.

```ts
export const auditJobs = pgTable("audit_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  calendarAuditId: varchar("calendar_audit_id").references(() => calendarAudits.id).notNull().unique(),
  status: text("status").notNull().default("queued"), // queued | scraping | scoring | drafting | emailing | done | error
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  errorMessage: text("error_message"),
  retryCount: integer("retry_count").notNull().default(0),
});
```

Index: `idx_audit_jobs_status` on `status` for the worker poll.

### `audit_reports`

The output of the audit pipeline. One per `audit_job` on success.

```ts
export const auditReports = pgTable("audit_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  auditJobId: varchar("audit_job_id").references(() => auditJobs.id).notNull().unique(),
  calendarAuditId: varchar("calendar_audit_id").references(() => calendarAudits.id).notNull(),
  publicSlug: varchar("public_slug").notNull().unique(), // for /r/:slug URL
  activityScore: integer("activity_score").notNull(),
  cadenceScore: integer("cadence_score").notNull(),
  audienceQualityScore: integer("audience_quality_score").notNull(),
  descriptionCraftScore: integer("description_craft_score").notNull(),
  coSponsorNetworkScore: integer("co_sponsor_network_score").notNull(),
  jsonReport: text("json_report").notNull(),       // structured per JSON schema below
  markdownReport: text("markdown_report").notNull(),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
});
```

Index: `idx_audit_reports_public_slug` on `public_slug` for `/r/:slug` lookup.

### `audit_deliveries`

Resend send log for the email. Multiple rows possible (retries, manual resends).

```ts
export const auditDeliveries = pgTable("audit_deliveries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  auditReportId: varchar("audit_report_id").references(() => auditReports.id).notNull(),
  email: text("email").notNull(),
  resendMessageId: text("resend_message_id"),
  status: text("status").notNull(),                 // sent | failed | bounced
  sentAt: timestamp("sent_at").defaultNow().notNull(),
  errorMessage: text("error_message"),
});
```

## JSON schema for `audit_reports.json_report`

```ts
type AuditReport = {
  version: "1.0";
  calendar: {
    url: string;
    organizerName: string;
    eventCount: number;
    analysisWindow: { from: string; to: string };
  };
  scores: {
    activity: number;            // 0–100
    cadence: number;
    audienceQuality: number;
    descriptionCraft: number;
    coSponsorNetwork: number;
  };
  topEvent: {
    title: string;
    score: number;               // 0–100
    insight: string;             // one-liner: why it scored so high
  };
  copyCritique: Array<{
    eventTitle: string;
    issue: string;                // "vague title", "missing speakers", etc.
    rewrite: string;              // suggested new title
    estimatedRsvpLift: string;    // "+18% RSVPs"
  }>;
  untappedCoSponsors: Array<{
    company: string;
    audienceOverlapPct: number;
    rationale: string;
  }>;
  attendanceBreakdown?: {
    // Only present if attendee-level data was available. v0.2 doesn't ship this;
    // present as null and let UI render "(coming Q3)".
    topRoles: Array<{ role: string; pct: number }>;
    repeatAttendeePct: number;
  } | null;
  sponsorNext: Array<{
    eventTitle: string;
    date: string;                 // ISO
    location: string;
    matchScore: number;           // 0–100
    suggestedTier: string;        // "Title $25k", "Lunch $1k", etc.
  }>;
  meta: {
    generatedAt: string;
    model: string;                // "claude-haiku-4-5-20251001"
    tokensUsed: number;
    elapsedMs: number;
  };
};
```

## Migration approach

- Use `npm run db:push` (drizzle-kit) — additive only, no destructive changes.
- All existing tables unchanged.
- Foreign keys ON DELETE CASCADE for `audit_jobs`, `audit_reports`, `audit_deliveries`, `scraped_events`.

## Cache + freshness rules

- `scraped_calendars`: 6-hour TTL. If `fetched_at > now() - 6h`, reuse instead of re-fetching.
- `audit_reports`: never invalidated; re-running an audit creates a *new* report (with a new `public_slug`). Old reports remain accessible.
- `audit_deliveries`: append-only. Retries add new rows.

## Test data fixtures

Seed `server/scripts/seed-test-audits.ts` with 3 fixture calendars:
1. `lu.ma/frontier-tower-sf` — a real, complex calendar with 12+ events.
2. `lu.ma/test-empty` — a calendar with no events (edge case).
3. `lu.ma/test-malformed` — a calendar URL that 404s (error path).

Run these against the full pipeline before declaring v0.2 done.
