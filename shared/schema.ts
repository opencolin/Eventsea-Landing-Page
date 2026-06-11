import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
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
