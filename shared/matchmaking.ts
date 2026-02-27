import { type Company, type Investor } from "./schema";

export type MatchRating = "Match Forte" | "Match Potencial" | "Match Fraco" | "Baixa Aderência";

export interface MatchResult {
    score: number; // 0 to 100
    rating: MatchRating;
    breakdown: Record<string, number>;
}

/**
 * Normaliza valores de 0 a 1 para o cálculo do score.
 * Em um cenário real, estas funções seriam mais complexas ouvindo NLP ou mapas.
 */
const normalize = {
    // Compara strings simples (ex: Localização, Setor)
    exact: (a: string, b: string): number => (a.toLowerCase() === b.toLowerCase() ? 1 : 0),

    // Compara inclusão em lista ou CSV (ex: Setores de interesse)
    includes: (item: string, list: string): number => {
        const items = list.split(",").map(i => i.trim().toLowerCase());
        return items.includes(item.toLowerCase()) ? 1 : 0.5; // 0.5 se for relacionado/parcial (mock logic)
    },

    // Compara valores financeiros (Ticket vs Valuation)
    // Nota 1 se o ticket for >= valuation, ou proporcional se estiver próximo
    financial: (ticket: number | string, valuation: number | string): number => {
        const t = typeof ticket === "string" ? parseFloat(ticket) : ticket;
        const v = typeof valuation === "string" ? parseFloat(valuation) : valuation;
        if (t >= v) return 1;
        if (t >= v * 0.7) return 0.7;
        if (t >= v * 0.5) return 0.4;
        return 0;
    }
};

export function calculateMatch(company: Company, investor: Investor): MatchResult {
    const breakdown: Record<string, number> = {};

    // 1. Fit Estrutural (40%)
    breakdown.location = normalize.exact(company.location, investor.preferredLocation) * 15;
    breakdown.valuation = normalize.financial(investor.investmentTicket, company.valuation) * 15;
    breakdown.sector = normalize.includes(company.sector, investor.targetSectors) * 10;

    // 2. Fit Estratégico (35%)
    breakdown.investmentType = normalize.exact(company.investmentType, "Total") ? 10 : 7; // Mock logic: assume semi-match
    breakdown.businessStage = normalize.exact(company.businessStage, "Operação") ? 10 : 5;
    breakdown.operationObjective = normalize.exact(company.operationObjective, "Expansão") ? 10 : 5;
    breakdown.ticket = 5; // Fixed 5% for Ticket Mínimo/Máximo as decided in plan

    // 3. Fit de Perfil (25%)
    breakdown.risk = investor.riskAppetite === "Moderado" ? 10 : 5;
    breakdown.management = investor.managementLevel === "Ativo" ? 5 : 3;
    breakdown.returnTerm = investor.returnTerm === "Médio" ? 5 : 2;
    breakdown.experience = investor.sectorExperience ? 5 : 0;

    const totalScore = Object.values(breakdown).reduce((acc, curr) => acc + curr, 0);

    let rating: MatchRating = "Baixa Aderência";
    if (totalScore >= 80) rating = "Match Forte";
    else if (totalScore >= 65) rating = "Match Potencial";
    else if (totalScore >= 50) rating = "Match Fraco";

    return {
        score: Math.round(totalScore),
        rating,
        breakdown
    };
}

export function classifyMatch(score: number): MatchRating {
    if (score >= 80) return "Match Forte";
    if (score >= 65) return "Match Potencial";
    if (score >= 50) return "Match Fraco";
    return "Baixa Aderência";
}
