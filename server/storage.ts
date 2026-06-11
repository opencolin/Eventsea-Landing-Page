import { type User, type InsertUser, type BetaSignup, type InsertBetaSignup, type DemoRequest, type InsertDemoRequest, type CalendarAudit, type InsertCalendarAudit } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createBetaSignup(signup: InsertBetaSignup): Promise<BetaSignup>;
  createDemoRequest(request: InsertDemoRequest): Promise<DemoRequest>;
  createCalendarAudit(audit: InsertCalendarAudit): Promise<CalendarAudit>;
  getBetaSignups(): Promise<BetaSignup[]>;
  getDemoRequests(): Promise<DemoRequest[]>;
  getCalendarAudits(): Promise<CalendarAudit[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private betaSignups: Map<string, BetaSignup>;
  private demoRequests: Map<string, DemoRequest>;
  private calendarAudits: Map<string, CalendarAudit>;

  constructor() {
    this.users = new Map();
    this.betaSignups = new Map();
    this.demoRequests = new Map();
    this.calendarAudits = new Map();
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
}

export const storage = new MemStorage();
