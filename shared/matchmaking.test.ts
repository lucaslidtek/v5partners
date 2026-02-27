import { storage } from "../server/storage";
import { calculateMatch } from "./matchmaking";
import assert from "node:assert";

async function testMatchmaking() {
    console.log("🧪 Iniciando testes de Matchmaking...");

    // 1. Criar Usuários
    const user1 = await storage.createUser({ username: "empresa_v5", password: "123" });
    const user2 = await storage.createUser({ username: "investidor_v5", password: "123" });

    // 2. Criar Perfil de Empresa
    const company = await storage.createCompany({
        userId: user1.id,
        name: "Tech Solutions",
        location: "São Paulo",
        valuation: "1000000", // 1M
        sector: "Tecnologia",
        investmentType: "Total",
        businessStage: "Operação",
        operationObjective: "Expansão"
    });

    // 3. Criar Perfil de Investidor (Match Perfeito)
    const investor = await storage.createInvestor({
        userId: user2.id,
        preferredLocation: "São Paulo",
        investmentTicket: "1000000",
        targetSectors: "Tecnologia",
        riskAppetite: "Moderado",
        managementLevel: "Ativo",
        returnTerm: "Médio",
        sectorExperience: true
    });

    // 4. Calcular Match
    const result = calculateMatch(company, investor);

    console.log(`\nMatch Result: ${result.rating} (${result.score}%)`);
    console.log("Breakdown:", result.breakdown);

    // Asserções
    assert.ok(result.score >= 90, "O score deve ser alto para perfis compatíveis");
    assert.strictEqual(result.rating, "Match Forte");

    console.log("\n✅ Teste concluído com sucesso!");
}

testMatchmaking().catch(err => {
    console.error("❌ Erro nos testes:", err);
    process.exit(1);
});
