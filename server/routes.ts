import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { calculateMatch } from "@shared/matchmaking";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // prefix all routes with /api

  app.get("/api/companies", async (_req, res) => {
    const companies = await storage.listCompanies();
    res.json(companies);
  });

  app.get("/api/investors", async (_req, res) => {
    const investors = await storage.listInvestors();
    res.json(investors);
  });

  // Main matchmaking endpoint
  app.get("/api/matches/:userId", async (req, res) => {
    const { userId } = req.params;

    // Check if user is a company or investor
    const companyProfile = await storage.getCompanyByUserId(userId);
    const investorProfile = await storage.getInvestorByUserId(userId);

    if (!companyProfile && !investorProfile) {
      return res.status(404).json({ message: "Perfil não encontrado para este usuário" });
    }

    if (investorProfile) {
      // Find matches for this investor (list of companies)
      const companies = await storage.listCompanies();
      const matches = companies.map(company => ({
        company,
        match: calculateMatch(company, investorProfile)
      })).sort((a, b) => b.match.score - a.match.score);

      return res.json(matches);
    }

    if (companyProfile) {
      // Find matches for this company (list of investors)
      const investors = await storage.listInvestors();
      const matches = investors.map(investor => ({
        investor,
        match: calculateMatch(companyProfile, investor)
      })).sort((a, b) => b.match.score - a.match.score);

      return res.json(matches);
    }
  });

  return httpServer;
}
