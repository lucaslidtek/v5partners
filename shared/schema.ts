import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, numeric, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums for better data consistency
export const businessStageEnum = pgEnum("business_stage", ["Ideação", "Operação", "Faturamento", "Maturidade"]);
export const riskAppetiteEnum = pgEnum("risk_appetite", ["Conservador", "Moderado", "Agressivo"]);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  location: text("location").notNull(), // Região
  valuation: numeric("valuation").notNull(),
  sector: text("sector").notNull(), // Segmento
  investmentType: text("investment_type").notNull(), // Minoritário, Majoritário, Total
  businessStage: text("business_stage").notNull(), // Faturamento, Maturidade...
  operationObjective: text("operation_objective").notNull(), // Expansão, Sucessão, Saída
});

export const investors = pgTable("investors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  preferredLocation: text("preferred_location").notNull(),
  investmentTicket: numeric("investment_ticket").notNull(), // Capacidade financeira
  targetSectors: text("target_sectors").notNull(), // CSV or JSON string for multiple sectors
  riskAppetite: text("risk_appetite").notNull(), // Conservador, Moderado, Agressivo
  managementLevel: text("management_level").notNull(), // Ativo, Passivo
  returnTerm: text("return_term").notNull(), // Curto, Médio, Longo
  sectorExperience: boolean("sector_experience").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCompanySchema = createInsertSchema(companies);
export const insertInvestorSchema = createInsertSchema(investors);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;

export type InsertInvestor = z.infer<typeof insertInvestorSchema>;
export type Investor = typeof investors.$inferSelect;
