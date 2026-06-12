import {
  type User,
  type InsertUser,
  type BetaSignup,
  type InsertBetaSignup,
  type DemoRequest,
  type InsertDemoRequest,
  type CalendarAudit,
  type InsertCalendarAudit,
  type MarketplaceListing,
  type InsertMarketplaceListing,
  type Event,
  type InsertEvent,
} from "../shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createBetaSignup(signup: InsertBetaSignup): Promise<BetaSignup>;
  createDemoRequest(request: InsertDemoRequest): Promise<DemoRequest>;
  createCalendarAudit(audit: InsertCalendarAudit): Promise<CalendarAudit>;
  createMarketplaceListing(listing: InsertMarketplaceListing): Promise<MarketplaceListing>;
  getBetaSignups(): Promise<BetaSignup[]>;
  getDemoRequests(): Promise<DemoRequest[]>;
  getCalendarAudits(): Promise<CalendarAudit[]>;
  getMarketplaceListings(): Promise<MarketplaceListing[]>;
  // PRD v1 — minimum surface needed for Week 1 (FR9 gate). Real Drizzle-backed
  // implementation lands in Week 2 alongside FR1 ingest.
  getEventBySlug(slug: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private betaSignups: Map<string, BetaSignup>;
  private demoRequests: Map<string, DemoRequest>;
  private calendarAudits: Map<string, CalendarAudit>;
  private marketplaceListings: Map<string, MarketplaceListing>;
  private events: Map<string, Event>;
  private eventsBySlug: Map<string, string>;

  constructor() {
    this.users = new Map();
    this.betaSignups = new Map();
    this.demoRequests = new Map();
    this.calendarAudits = new Map();
    this.marketplaceListings = new Map();
    this.events = new Map();
    this.eventsBySlug = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createBetaSignup(insertSignup: InsertBetaSignup): Promise<BetaSignup> {
    const id = randomUUID();
    const signup: BetaSignup = { 
      ...insertSignup, 
      id, 
      createdAt: new Date() 
    };
    this.betaSignups.set(id, signup);
    return signup;
  }

  async createDemoRequest(insertRequest: InsertDemoRequest): Promise<DemoRequest> {
    const id = randomUUID();
    const request: DemoRequest = { 
      ...insertRequest, 
      id, 
      createdAt: new Date() 
    };
    this.demoRequests.set(id, request);
    return request;
  }

  async createCalendarAudit(insertAudit: InsertCalendarAudit): Promise<CalendarAudit> {
    const id = randomUUID();
    const audit: CalendarAudit = {
      ...insertAudit,
      id,
      email: insertAudit.email ?? null,
      auditType: insertAudit.auditType ?? "own",
      createdAt: new Date(),
    };
    this.calendarAudits.set(id, audit);
    return audit;
  }

  async getBetaSignups(): Promise<BetaSignup[]> {
    return Array.from(this.betaSignups.values());
  }

  async getDemoRequests(): Promise<DemoRequest[]> {
    return Array.from(this.demoRequests.values());
  }

  async getCalendarAudits(): Promise<CalendarAudit[]> {
    return Array.from(this.calendarAudits.values());
  }

  async createMarketplaceListing(insertListing: InsertMarketplaceListing): Promise<MarketplaceListing> {
    const id = randomUUID();
    const listing: MarketplaceListing = {
      ...insertListing,
      id,
      details: insertListing.details ?? null,
      createdAt: new Date(),
    };
    this.marketplaceListings.set(id, listing);
    return listing;
  }

  async getMarketplaceListings(): Promise<MarketplaceListing[]> {
    return Array.from(this.marketplaceListings.values());
  }

  async getEventBySlug(slug: string): Promise<Event | undefined> {
    const id = this.eventsBySlug.get(slug);
    if (!id) return undefined;
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = {
      id,
      slug: insertEvent.slug,
      name: insertEvent.name,
      source: insertEvent.source ?? null,
      sourceEventId: insertEvent.sourceEventId ?? null,
      sponsors: insertEvent.sponsors,
      passwordHash: insertEvent.passwordHash,
      createdAt: new Date(),
    };
    this.events.set(id, event);
    this.eventsBySlug.set(event.slug, id);
    return event;
  }
}

export const storage = new MemStorage();

// Bootstrap a deterministic test event when EVENTSEA_BOOTSTRAP_TEST_EVENT is
// set, so the verify-gate.sh smoke test (and any local dev poking at the
// gate before Week 2 ingest lands) has a known event to hit. Password hash
// is for "test-password". No-op in production unless the env is set.
async function maybeBootstrapTestEvent() {
  if (!process.env.EVENTSEA_BOOTSTRAP_TEST_EVENT) return;
  const existing = await storage.getEventBySlug("test-slug");
  if (existing) return;
  const bcrypt = await import("bcryptjs");
  const passwordHash = await bcrypt.hash("test-password", 10);
  await storage.createEvent({
    slug: "test-slug",
    name: "Smoke Test Event",
    source: "test",
    sourceEventId: null,
    sponsors: [
      { key: "tavily", name: "Tavily", icp: "Agent search API buyers" },
    ],
    passwordHash,
  });
}
void maybeBootstrapTestEvent();
