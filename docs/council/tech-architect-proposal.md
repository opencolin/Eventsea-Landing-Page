# Tech Architect Proposal — Event Lead Intelligence v1

**Author:** Tech Architect (post-PRD council)
**Date:** 2026-06-11
**Question:** Cleanest data model + system shape for FR1–FR9 on Express + Drizzle + Vite, and the 3 architectural calls that matter most.

## 1. The three hardest-to-reverse decisions

1. **Database identity model for `Attendee`** — propagates to ingest, scoring, influence, exports, FR8 diff. Migration is painful once events exist.
2. **Pipeline execution model** (in-process vs worker vs Inngest) — touches deploy topology, env config, error semantics, observability, retry contract. Swapping later means rewriting every orchestrator and re-running pilots.
3. **Dashboard delivery contract** (static-with-embedded-JSON vs SPA route) — locks the FR9 gate shape, FR8 redeploy verification, the CRM-export client code, the "self-contained per event" guarantee, and the hosting model.

Everything else (which model on Token Factory, which CSV parser, exact cookie name) is reversible at low cost.

## 2. Drizzle schema sketch (`shared/schema.ts` additions)

Follows existing repo conventions: `varchar` PK with `gen_random_uuid()`, `text` columns, `timestamp` with `defaultNow()`, `drizzle-zod` insert schemas.

```ts
export const verdictEnum = pgEnum("verdict", ["V", "P", "U"]);
export const tierEnum   = pgEnum("tier",    ["deep", "light", "unscreenable"]);
export const leadTypeEnum = pgEnum("lead_type", [
  "Buyer", "Investor", "Champion", "Competitor", "Student", "Bigco", "Low", "SponsorStaff"
]);
export const curationKindEnum = pgEnum("curation_kind", [
  "builder_top_n", "judge_panel", "judge_pool", "excluded"
]);
export const exportFormatEnum = pgEnum("export_format", ["hubspot", "salesforce"]);

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  source: text("source"),
  sourceEventId: text("source_event_id"),
  sponsors: jsonb("sponsors").$type<SponsorConfig[]>().notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const attendees = pgTable("attendees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
  guestId: text("guest_id"),
  email: text("email").notNull(),
  name: text("name").notNull(),
  phone: text("phone"),
  company: text("company"),
  buildDescription: text("build_description"),
  linkedinUrl: text("linkedin_url"),
  xHandle: text("x_handle"),
  githubHandle: text("github_handle"),
  websiteUrl: text("website_url"),
  demoUrl: text("demo_url"),
  rawRow: jsonb("raw_row").$type<Record<string, string>>().notNull(),
  signalScore: integer("signal_score").notNull().default(0),
  isSponsorDomain: boolean("is_sponsor_domain").notNull().default(false),
  dupeOfId: varchar("dupe_of_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({
  uniqEmail: uniqueIndex("attendees_event_email_uniq").on(t.eventId, t.email),
}));

export const screenings = pgTable("screenings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  attendeeId: varchar("attendee_id").notNull().references(() => attendees.id, { onDelete: "cascade" }),
  verdict: verdictEnum("verdict").notNull(),
  tier: tierEnum("tier").notNull(),
  leadType: leadTypeEnum("lead_type").notNull(),
  verifiedCompany: text("verified_company"),
  verifiedRole: text("verified_role"),
  oneSentence: text("one_sentence"),
  why: text("why"),
  flags: jsonb("flags").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  evidence: jsonb("evidence").$type<EvidenceRef[]>().notNull().default(sql`'[]'::jsonb`),
  modelUsed: text("model_used"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sponsorScores = pgTable("sponsor_scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  screeningId: varchar("screening_id").notNull().references(() => screenings.id, { onDelete: "cascade" }),
  sponsorKey: text("sponsor_key").notNull(),
  score: integer("score").notNull(),
  conflictOverride: boolean("conflict_override").notNull().default(false),
  rationale: text("rationale"),
}, (t) => ({
  uniq: uniqueIndex("sponsor_scores_screening_sponsor_uniq").on(t.screeningId, t.sponsorKey),
}));

export const influence = pgTable("influence", {
  attendeeId: varchar("attendee_id").primaryKey().references(() => attendees.id, { onDelete: "cascade" }),
  xFollowers: integer("x_followers"),
  ghFollowers: integer("gh_followers"),
  socialReach: integer("social_reach"),
  influenceRank: integer("influence_rank"),
  fetchedAt: timestamp("fetched_at").defaultNow().notNull(),
});

export const curationTags = pgTable("curation_tags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  attendeeId: varchar("attendee_id").notNull().references(() => attendees.id, { onDelete: "cascade" }),
  kind: curationKindEnum("kind").notNull(),
  rank: integer("rank"),
  formulaScore: doublePrecision("formula_score"),
  humanApproved: boolean("human_approved").notNull().default(false),
  notes: text("notes"),
}, (t) => ({
  uniq: uniqueIndex("curation_attendee_kind_uniq").on(t.attendeeId, t.kind),
}));

export const exportLogs = pgTable("export_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
  format: exportFormatEnum("format").notNull(),
  filterDescriptor: jsonb("filter_descriptor").$type<FilterDescriptor>().notNull(),
  rowCount: integer("row_count").notNull(),
  exportedBy: text("exported_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

Notes:
- `Attendee.email` carries a per-event unique index, not global.
- `Screening` is 1-row-per-attendee in v1 but a separate table so re-screens (FR8) append without losing history.
- `SponsorScores` normalized so sponsor count can change per event without schema churn.
- All FKs `ON DELETE CASCADE` so FR9 delete-on-request is one delete.

## 3. Pipeline execution model — monolith in-process with persisted job state

**Decision: in-process orchestrator in Express, not BullMQ/Redis, not Inngest.**

Why:
- Pilot scale is 700–1,000 attendees/event; ~hours wall-clock; one event at a time. Worker fleets solve problems we don't have.
- Express + Neon gives us durable state. Adding Redis = second infra dep + separate deploy unit + class of "queue dropped my job" bugs that won't pay rent until v1.1.
- Inngest is right at v2 (autonomous, scheduled, multi-event). Wiring now buys vendor lock-in and a worse dev env.
- Reversal cost is bounded: idempotent step functions keyed by `(eventId, attendeeId, stepName)` with state in Postgres means swapping later = change dispatcher, not steps.

Shape:
- `server/pipeline/runs.ts` — `pipelineRuns` table; `POST /api/events/:id/pipeline/run` enqueues by inserting a row and `void`-ing orchestrator (same pattern as `forwardAuditToWebhook` in `server/routes.ts:109`).
- `server/pipeline/steps/{ingest,triage,deep,light,reconcile,score,influence,curate}.ts` — each step reads from Postgres, writes outputs in transaction, safe to re-run (`INSERT … ON CONFLICT DO UPDATE`).
- Client polls `GET /api/events/:id/pipeline/status` (TanStack Query already in deps).

**Upgrade to Inngest when:** v1.1 lands and ≥3 concurrent events on scheduled Luma pulls.

## 4. Dashboard shape — server-rendered HTML with embedded JSON

**Decision: each event ships as a single self-contained HTML response at `/d/:slug` from Express, with screened+scored data inlined as `<script type="application/json">`. Interactive shell (search/filter/sort, CRM export) is a small standalone bundle built separately from the marketing SPA.**

Why:
- PRD FR5 says **self-contained per event** — that's not a SPA pattern. A SPA route would force `/d/:slug` to fetch JSON from `/api/...`, which means FR9 protects both page AND API, and FR8 "verify the live page changed" stops grepping HTML and starts grepping API responses.
- Marketing site and dashboard have **opposite** caching, gating, lifecycle constraints. Marketing public + edge-cacheable. Dashboards private + per-event + mutable. Coupling = accidentally leak PII into public bundle, or private redeploy busts public cache.
- FR8 verification is trivial when data is in HTML body — `curl -H "Cookie: …" /d/slug | grep <newName>`.
- CRM export (FR7) is **client-side from embedded data**. With embedded JSON → one function. With SPA fetching paginated API → state-management problem.

Shape:
- New Express route `GET /d/:slug` in `server/routes.ts` (after gate middleware): loads event + attendees + screenings + scores + influence + curation in one query, renders HTML template, inlines JSON.
- New `client/dashboard/` Vite entry — separate `index.html`, separate build target (esbuild → one IIFE bundle), separate Tailwind config consuming same `components/ui/*`.
- Marketing client and dashboard don't import each other. Shared types live in `shared/`.

## 5. FR9 password gate — middleware design

**Decision: per-event password (bcrypt-hashed in `events.passwordHash`), POST login endpoint sets a signed HttpOnly cookie scoped to event slug, middleware mounted on `/d/:slug` and `/api/events/:id/*` redirects on missing/invalid cookie.**

Cookie:
- **Name:** `es_event_<eventId>` — per-event so sponsor invited to event A can't see event B; revocation is per-event.
- **Value:** HMAC-signed token. Payload: `{ eventId, issuedAt, subject }`. Subject is human-readable label sponsor typed at login ("Tavily / Sara") for export audit trail.
- **Attributes:** `HttpOnly`, `Secure` (prod), `SameSite=Lax` (so a sponsor clicking an emailed link doesn't lose cookie), `Path=/`, `Max-Age=604800` (7 days).
- **Signing secret:** new env var `EVENT_GATE_SECRET`. Rotation invalidates all cookies — desired blast radius.

Login flow:
1. `GET /d/:slug` with no/bad cookie → 302 to `/d/:slug/login` (HTML form; no JS; no lead data in body).
2. `POST /d/:slug/login` with `{ password, subject }` → bcrypt.compare against `events.passwordHash`. Mismatch → 401 + form. Match → Set-Cookie + 302 to `/d/:slug`.
3. `POST /d/:slug/logout` → clears cookie, 302 to `/login`.

Middleware (new `server/middleware/eventGate.ts`):
```ts
export function eventGate(req, res, next) {
  const slug = req.params.slug;
  const event = await db.query.events.findFirst({ where: eq(events.slug, slug) });
  if (!event) return res.status(404).send("Not found");
  const cookie = req.cookies[`es_event_${event.id}`];
  if (!cookie || !verifyHmac(cookie, process.env.EVENT_GATE_SECRET)) {
    return res.redirect(302, `/d/${slug}/login`);
  }
  req.eventContext = { eventId: event.id, subject: decode(cookie).subject };
  next();
}
```

Mounted on:
- `app.get("/d/:slug", eventGate, renderDashboard)`
- `app.use("/api/events/:slug", eventGate, eventApiRouter)` — covers FR7 export logging, FR8 status.

What this does NOT do (matches PRD FR9):
- No client-side JS gate.
- No platform SSO.
- Login page renders zero lead data. DoD check: `curl /d/:slug | grep -c <anyAttendeeEmail>` must return 0.

## 6. Reuse from existing repo

- **Drizzle conventions** (`shared/schema.ts:1-45`): follow line-for-line.
- **Route pattern** (`server/routes.ts:59-130`): try/catch with ZodError 400 branch + 500 fallback, structured JSON logs, fire-and-forget via `void`. Reuse for `/api/events/*`.
- **Storage abstraction** (`server/storage.ts:4-16`): `IStorage` interface. New `DbStorage` implementation; tests stay easy via `MemStorage`. Drizzle config already present.
- **Webhook + env-var pattern** (`server/routes.ts:12-56`, `.env.example`): canonical "operator notification, fail soft, structured warning if unset." Reuse for pipeline-run-complete, FR8 redeploy-verification, export-event audit.
- **UI components** (`client/src/components/ui/`): full shadcn/Radix set. Dashboard cards (FR5 tier badges, score pills, filter chips) are literal compositions.
- **Build pipeline** (`package.json:8`): `vite build && esbuild server/index.ts ...`. Adding second Vite entry for `client/dashboard/` = one config line.

## 7. System shape

```
CSV / Luma API
     │
     ▼
POST /api/events/:id/pipeline/run  ──►  pipelineRuns row + void orchestrator()
                                              │
                                              ▼
                                  [ingest → triage → deep+light (parallel)
                                   → reconcile → score → influence → curate]
                                              │
                       each step: read/write Postgres,
                       idempotent on (eventId, attendeeId, stepName)
                                              │
                                              ▼
                              GET /api/events/:slug/pipeline/status (poll)
                                              │
                                              ▼
                                eventGate middleware    ◄── EVENT_GATE_SECRET
                                              │
                                              ▼
                                    GET /d/:slug
                                              │
                                              ▼
                              server-rendered HTML + inline JSON
                              + small filter/sort/export client bundle
                                              │
                                              ▼
                                  client-side CRM export (FR7)
                                              │
                                              ▼
                                      exportLogs row
```

## 8. Sequencing

1. Schema migration: all tables above + pipelineRuns. Run `drizzle-kit push`. Wire `DbStorage` next to `MemStorage`.
2. `eventGate` middleware + login route + signed-cookie utility. **Build before any dashboard route exists** — gate is the contract, not decoration.
3. Pipeline orchestrator skeleton + ingest step + status endpoint. Smoke-test against real CSV from prior pilots.
4. Deep + light steps wrapping skill prompts; reconcile + score; influence fetcher (X via fxtwitter, GitHub via `gh api`). Each step fires webhook on completion.
5. Server-rendered `/d/:slug` + dashboard client bundle.
6. FR7 CRM export (client-side, BOM-prefixed).
7. FR8 diff/update loop + redeploy-verification webhook.

## 9. Anticipated pain

- **Neon connection limits under burst** — light-tier batch fan-out may open many concurrent writes. Mitigation: serialize through single `db` connection or Neon pooler.
- **Sponsor config schema drift** — `events.sponsors` as `jsonb` is right for v1, but lint at insert via Zod schema in `shared/schema.ts` so typo'd `sponsorKey` doesn't silently break joins on `sponsorScores`.
- **Curation human-review state** — PRD FR6 says "always end with a human-review pass." `curationTags.humanApproved` is the bit, but UI for approve/swap is deferred; v1 ships with formula picks and `humanApproved=false` everywhere, organizer overrides via config file (PRD §8 Q5).

## Critical files for implementation

- `/home/user/Eventsea-Landing-Page/shared/schema.ts`
- `/home/user/Eventsea-Landing-Page/server/routes.ts`
- `/home/user/Eventsea-Landing-Page/server/storage.ts`
- `/home/user/Eventsea-Landing-Page/server/index.ts`
- `/home/user/Eventsea-Landing-Page/drizzle.config.ts`
