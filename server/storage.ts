import { type User, type InsertUser, type BetaSignup, type InsertBetaSignup, type DemoRequest, type InsertDemoRequest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createBetaSignup(signup: InsertBetaSignup): Promise<BetaSignup>;
  createDemoRequest(request: InsertDemoRequest): Promise<DemoRequest>;
  getBetaSignups(): Promise<BetaSignup[]>;
  getDemoRequests(): Promise<DemoRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private betaSignups: Map<string, BetaSignup>;
  private demoRequests: Map<string, DemoRequest>;

  constructor() {
    this.users = new Map();
    this.betaSignups = new Map();
    this.demoRequests = new Map();
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

  async getBetaSignups(): Promise<BetaSignup[]> {
    return Array.from(this.betaSignups.values());
  }

  async getDemoRequests(): Promise<DemoRequest[]> {
    return Array.from(this.demoRequests.values());
  }
}

export const storage = new MemStorage();
