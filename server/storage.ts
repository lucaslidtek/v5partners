import { type User, type InsertUser, type Company, type InsertCompany, type Investor, type InsertInvestor } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Company methods
  getCompany(id: string): Promise<Company | undefined>;
  getCompanyByUserId(userId: string): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  listCompanies(): Promise<Company[]>;

  // Investor methods
  getInvestor(id: string): Promise<Investor | undefined>;
  getInvestorByUserId(userId: string): Promise<Investor | undefined>;
  createInvestor(investor: InsertInvestor): Promise<Investor>;
  listInvestors(): Promise<Investor[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private companies: Map<string, Company>;
  private investors: Map<string, Investor>;

  constructor() {
    this.users = new Map();
    this.companies = new Map();
    this.investors = new Map();
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

  async getCompany(id: string): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getCompanyByUserId(userId: string): Promise<Company | undefined> {
    return Array.from(this.companies.values()).find(c => c.userId === userId);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = randomUUID();
    const company: Company = { ...insertCompany, id };
    this.companies.set(id, company);
    return company;
  }

  async listCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async getInvestor(id: string): Promise<Investor | undefined> {
    return this.investors.get(id);
  }

  async getInvestorByUserId(userId: string): Promise<Investor | undefined> {
    return Array.from(this.investors.values()).find(i => i.userId === userId);
  }

  async createInvestor(insertInvestor: InsertInvestor): Promise<Investor> {
    const id = randomUUID();
    const investor: Investor = {
      ...insertInvestor,
      id,
      sectorExperience: insertInvestor.sectorExperience ?? false
    };
    this.investors.set(id, investor);
    return investor;
  }

  async listInvestors(): Promise<Investor[]> {
    return Array.from(this.investors.values());
  }
}

export const storage = new MemStorage();
