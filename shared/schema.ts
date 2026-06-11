import { sql } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  text,
  varchar,
  timestamp,
  jsonb,
  integer,
  boolean,
  doublePrecision,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const betaSignups = pgTable("beta_signups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  eventType: text("event_type"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const demoRequests = pgTable("demo_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  name: text("name").notNull(),
  company: text("company"),
  eventType: text("event_type"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const calendarAudits = pgTable("calendar_audits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  calendarUrl: text("calendar_url").notNull(),
  email: text("email"),
  auditType: text("audit_type").notNull().default("own"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const marketplaceListings = pgTable("marketplace_listings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  listingType: text("listing_type").notNull(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// -----------------------------------------------------------------------------
// PRD v1 (Event Lead Intelligence) — schema additions
// Per docs/council/tech-architect-proposal.md §2 and decision-2.md (Week 1).
// FKs use ON DELETE CASCADE so FR9 delete-on-request is one DELETE on attendees.
// -----------------------------------------------------------------------------

export const verdictEnum = pgEnum("verdict", ["V", "P", "U"]);
export const tierEnum = pgEnum("tier", ["deep", "light", "unscreenable"]);
export const leadTypeEnum = pgEnum("lead_type", [
  "Buyer",
  "Investor",
  "Champion",
  "Competitor",
  "Student",
  "Bigco",
  "Low",
  "SponsorStaff",
]);
export const curationKindEnum = pgEnum("curation_kind", [
  "builder_top_n",
  "judge_panel",
  "judge_pool",
  "excluded",
]);
export const exportFormatEnum = pgEnum("export_format", [
  "hubspot",
  "salesforce",
]);

// Embedded type for events.sponsors — the per-event sponsor product config
// (product name, ICP one-liner, competitor list). Validated at insert via Zod.
export type SponsorConfig = {
  key: string;
  name: string;
  icp: string;
  competitors?: string[];
};

export type EvidenceRef = {
  url: string;
  title?: string;
  snippet?: string;
};

export type FilterDescriptor = {
  search?: string;
  sponsorSort?: string;
  chips?: string[];
};

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

export const attendees = pgTable(
  "attendees",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    eventId: varchar("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
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
  },
  (t) => ({
    uniqEmail: uniqueIndex("attendees_event_email_uniq").on(t.eventId, t.email),
  }),
);

export const screenings = pgTable("screenings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  attendeeId: varchar("attendee_id")
    .notNull()
    .references(() => attendees.id, { onDelete: "cascade" }),
  verdict: verdictEnum("verdict").notNull(),
  tier: tierEnum("tier").notNull(),
  leadType: leadTypeEnum("lead_type").notNull(),
  verifiedCompany: text("verified_company"),
  verifiedRole: text("verified_role"),
  oneSentence: text("one_sentence"),
  why: text("why"),
  flags: jsonb("flags").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  evidence: jsonb("evidence")
    .$type<EvidenceRef[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  modelUsed: text("model_used"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sponsorScores = pgTable(
  "sponsor_scores",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    screeningId: varchar("screening_id")
      .notNull()
      .references(() => screenings.id, { onDelete: "cascade" }),
    sponsorKey: text("sponsor_key").notNull(),
    score: integer("score").notNull(),
    conflictOverride: boolean("conflict_override").notNull().default(false),
    rationale: text("rationale"),
  },
  (t) => ({
    uniq: uniqueIndex("sponsor_scores_screening_sponsor_uniq").on(
      t.screeningId,
      t.sponsorKey,
    ),
  }),
);

export const influence = pgTable("influence", {
  attendeeId: varchar("attendee_id")
    .primaryKey()
    .references(() => attendees.id, { onDelete: "cascade" }),
  xFollowers: integer("x_followers"),
  ghFollowers: integer("gh_followers"),
  socialReach: integer("social_reach"),
  influenceRank: integer("influence_rank"),
  fetchedAt: timestamp("fetched_at").defaultNow().notNull(),
});

export const curationTags = pgTable(
  "curation_tags",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    attendeeId: varchar("attendee_id")
      .notNull()
      .references(() => attendees.id, { onDelete: "cascade" }),
    kind: curationKindEnum("kind").notNull(),
    rank: integer("rank"),
    formulaScore: doublePrecision("formula_score"),
    humanApproved: boolean("human_approved").notNull().default(false),
    notes: text("notes"),
  },
  (t) => ({
    uniq: uniqueIndex("curation_attendee_kind_uniq").on(t.attendeeId, t.kind),
  }),
);

export const exportLogs = pgTable("export_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  format: exportFormatEnum("format").notNull(),
  filterDescriptor: jsonb("filter_descriptor")
    .$type<FilterDescriptor>()
    .notNull(),
  rowCount: integer("row_count").notNull(),
  exportedBy: text("exported_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Pipeline orchestrator state (in-process orchestrator per tech-architect §3).
// Each row is one pipeline run for one event; steps are idempotent and keyed
// on (eventId, attendeeId, stepName) inside the step tables themselves.
export const pipelineRuns = pgTable("pipeline_runs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("queued"),
  currentStep: text("current_step"),
  attendeeCount: integer("attendee_count").notNull().default(0),
  costCents: integer("cost_cents").notNull().default(0),
  error: text("error"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  finishedAt: timestamp("finished_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBetaSignupSchema = createInsertSchema(betaSignups).pick({
  email: true,
  eventType: true,
});

export const insertDemoRequestSchema = createInsertSchema(demoRequests).pick({
  email: true,
  name: true,
  company: true,
  eventType: true,
  message: true,
});

export const insertCalendarAuditSchema = createInsertSchema(calendarAudits).pick({
  calendarUrl: true,
  email: true,
  auditType: true,
});

export const insertMarketplaceListingSchema = createInsertSchema(marketplaceListings).pick({
  listingType: true,
  email: true,
  name: true,
  title: true,
  details: true,
});

// PRD v1 insert schemas.
export const sponsorConfigSchema = z.object({
  key: z.string().min(1),
  name: z.string().min(1),
  icp: z.string().min(1),
  competitors: z.array(z.string()).optional(),
});

export const insertEventSchema = createInsertSchema(events, {
  sponsors: z.array(sponsorConfigSchema),
}).pick({
  slug: true,
  name: true,
  source: true,
  sourceEventId: true,
  sponsors: true,
  passwordHash: true,
});

export const insertAttendeeSchema = createInsertSchema(attendees, {
  rawRow: z.record(z.string()),
}).pick({
  eventId: true,
  guestId: true,
  email: true,
  name: true,
  phone: true,
  company: true,
  buildDescription: true,
  linkedinUrl: true,
  xHandle: true,
  githubHandle: true,
  websiteUrl: true,
  demoUrl: true,
  rawRow: true,
  signalScore: true,
  isSponsorDomain: true,
  dupeOfId: true,
});

export const insertScreeningSchema = createInsertSchema(screenings, {
  flags: z.array(z.string()),
  evidence: z.array(
    z.object({
      url: z.string(),
      title: z.string().optional(),
      snippet: z.string().optional(),
    }),
  ),
}).pick({
  attendeeId: true,
  verdict: true,
  tier: true,
  leadType: true,
  verifiedCompany: true,
  verifiedRole: true,
  oneSentence: true,
  why: true,
  flags: true,
  evidence: true,
  modelUsed: true,
});

export const insertSponsorScoreSchema = createInsertSchema(sponsorScores).pick({
  screeningId: true,
  sponsorKey: true,
  score: true,
  conflictOverride: true,
  rationale: true,
});

export const insertInfluenceSchema = createInsertSchema(influence).pick({
  attendeeId: true,
  xFollowers: true,
  ghFollowers: true,
  socialReach: true,
  influenceRank: true,
});

export const insertCurationTagSchema = createInsertSchema(curationTags).pick({
  attendeeId: true,
  kind: true,
  rank: true,
  formulaScore: true,
  humanApproved: true,
  notes: true,
});

export const insertExportLogSchema = createInsertSchema(exportLogs, {
  filterDescriptor: z.object({
    search: z.string().optional(),
    sponsorSort: z.string().optional(),
    chips: z.array(z.string()).optional(),
  }),
}).pick({
  eventId: true,
  format: true,
  filterDescriptor: true,
  rowCount: true,
  exportedBy: true,
});

export const insertPipelineRunSchema = createInsertSchema(pipelineRuns).pick({
  eventId: true,
  status: true,
  currentStep: true,
  attendeeCount: true,
  costCents: true,
  error: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBetaSignup = z.infer<typeof insertBetaSignupSchema>;
export type BetaSignup = typeof betaSignups.$inferSelect;
export type InsertDemoRequest = z.infer<typeof insertDemoRequestSchema>;
export type DemoRequest = typeof demoRequests.$inferSelect;
export type InsertCalendarAudit = z.infer<typeof insertCalendarAuditSchema>;
export type CalendarAudit = typeof calendarAudits.$inferSelect;
export type InsertMarketplaceListing = z.infer<typeof insertMarketplaceListingSchema>;
export type MarketplaceListing = typeof marketplaceListings.$inferSelect;

// PRD v1 types.
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
export type InsertAttendee = z.infer<typeof insertAttendeeSchema>;
export type Attendee = typeof attendees.$inferSelect;
export type InsertScreening = z.infer<typeof insertScreeningSchema>;
export type Screening = typeof screenings.$inferSelect;
export type InsertSponsorScore = z.infer<typeof insertSponsorScoreSchema>;
export type SponsorScore = typeof sponsorScores.$inferSelect;
export type InsertInfluence = z.infer<typeof insertInfluenceSchema>;
export type Influence = typeof influence.$inferSelect;
export type InsertCurationTag = z.infer<typeof insertCurationTagSchema>;
export type CurationTag = typeof curationTags.$inferSelect;
export type InsertExportLog = z.infer<typeof insertExportLogSchema>;
export type ExportLog = typeof exportLogs.$inferSelect;
export type InsertPipelineRun = z.infer<typeof insertPipelineRunSchema>;
export type PipelineRun = typeof pipelineRuns.$inferSelect;
