import { useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/lib/context";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";

export default function NovoPerfilPage() {
  const { addProfile } = useAuth();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [profileName, setProfileName] = useState("");

  // Get tipo from URL params
  const params = new URLSearchParams(window.location.search);
  const tipo = (params.get("tipo") || "investor") as "investor" | "seller" | "franchise";

  const getTotalSteps = () => {
    return tipo === "investor" ? 4 : 5;
  };

  const totalSteps = getTotalSteps();

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save the new profile
      addProfile(tipo, profileName || `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} ${new Date().getFullYear()}`, formData);
      setLocation("/meus-perfis");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setLocation("/meus-perfis");
    }
  };

  const getStepTitle = () => {
    if (tipo === "investor") {
      switch (step) {
        case 1: return "Nome do Perfil";
        case 2: return "Perfil de Investimento";
        case 3: return "Experiência Profissional";
        case 4: return "Preferências do Negócio";
        default: return "";
      }
    } else if (tipo === "seller") {
      switch (step) {
        case 1: return "Nome do Perfil";
        case 2: return "Identificação e Setor";
        case 3: return "Tamanho da Operação";
        case 4: return "Estrutura e Momento";
        case 5: return "Informações do Deal";
        default: return "";
      }
    } else {
      switch (step) {
        case 1: return "Nome do Perfil";
        case 2: return "Identificação da Franquia";
        case 3: return "Investimento e Retorno";
        case 4: return "Perfil do Franqueado";
        case 5: return "Expansão e Suporte";
        default: return "";
      }
    }
  };

  const renderStepContent = () => {
    if (step === 1) {
      // All profile types start with name
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base font-semibold">Nome deste Perfil</Label>
            <Input
              placeholder={`Ex: ${tipo === "investor" ? "Investimento 2024" : tipo === "seller" ? "Minha Empresa" : "Franquia Brasil"}`}
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="h-11"
              data-testid="input-profile-name"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dê um nome descritivo para identificar este perfil facilmente
            </p>
          </div>
        </div>
      );
    }

    if (tipo === "investor") {
      switch (step) {
        case 2:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Faixa de Investimento</Label>
                <Select onValueChange={(v) => setFormData({...formData, investmentRange: v})}>
                  <SelectTrigger data-testid="select-investment-range">
                    <SelectValue placeholder="Selecione a faixa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100k-500k">R$ 100k - R$ 500k</SelectItem>
                    <SelectItem value="500k-1m">R$ 500k - R$ 1M</SelectItem>
                    <SelectItem value="1m-5m">R$ 1M - R$ 5M</SelectItem>
                    <SelectItem value="5m+">Acima de R$ 5M</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Modalidade Desejada</Label>
                <Select onValueChange={(v) => setFormData({...formData, modality: v})}>
                  <SelectTrigger data-testid="select-modality">
                    <SelectValue placeholder="Selecione uma modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Comprar negócio independente">Comprar negócio independente</SelectItem>
                    <SelectItem value="Franquias">Franquias</SelectItem>
                    <SelectItem value="Sociedade">Sociedade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Retorno Esperado</Label>
                <Select onValueChange={(v) => setFormData({...formData, roiTime: v})}>
                  <SelectTrigger data-testid="select-roi">
                    <SelectValue placeholder="Selecione o prazo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Curto Prazo (1-2 anos)">Curto Prazo (1-2 anos)</SelectItem>
                    <SelectItem value="Médio Prazo (3-5 anos)">Médio Prazo (3-5 anos)</SelectItem>
                    <SelectItem value="Longo Prazo (5+ anos)">Longo Prazo (5+ anos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );

        case 3:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Tem experiência em empresas?</Label>
                <div className="flex gap-4 mt-3">
                  <Button
                    variant={formData.hasExperience === true ? "default" : "outline"}
                    onClick={() => setFormData({...formData, hasExperience: true})}
                    className="flex-1"
                    data-testid="button-experience-yes"
                  >
                    Sim
                  </Button>
                  <Button
                    variant={formData.hasExperience === false ? "default" : "outline"}
                    onClick={() => setFormData({...formData, hasExperience: false})}
                    className="flex-1"
                    data-testid="button-experience-no"
                  >
                    Não
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Setores de Experiência</Label>
                <Input
                  placeholder="Ex: Varejo, Tecnologia, Saúde"
                  value={formData.experienceSectors || ""}
                  onChange={(e) => setFormData({...formData, experienceSectors: e.target.value})}
                  data-testid="input-experience-sectors"
                />
              </div>

              <div className="space-y-2">
                <Label>Habilidades Predominantes</Label>
                <Input
                  placeholder="Ex: Gestão, Comercial, Marketing"
                  value={formData.skills || ""}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  data-testid="input-skills"
                />
              </div>
            </div>
          );

        case 4:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Setores de Interesse</Label>
                <Input
                  placeholder="Ex: Alimentação, Saúde & Beleza, Tecnologia"
                  value={formData.interestSectors || ""}
                  onChange={(e) => setFormData({...formData, interestSectors: e.target.value})}
                  data-testid="input-interest-sectors"
                />
              </div>

              <div className="space-y-3">
                <Label>Grau de Envolvimento Operacional: {formData.operationalInvolvement || 50}%</Label>
                <Slider
                  value={[formData.operationalInvolvement || 50]}
                  onValueChange={(v) => setFormData({...formData, operationalInvolvement: v[0]})}
                  min={0}
                  max={100}
                  step={10}
                  className="w-full"
                  data-testid="slider-involvement"
                />
              </div>

              <div className="space-y-3">
                <Label>Tolerância ao Risco: {formData.riskTolerance || 50}%</Label>
                <Slider
                  value={[formData.riskTolerance || 50]}
                  onValueChange={(v) => setFormData({...formData, riskTolerance: v[0]})}
                  min={0}
                  max={100}
                  step={10}
                  className="w-full"
                  data-testid="slider-risk"
                />
              </div>
            </div>
          );

        default:
          return null;
      }
    }

    // SELLER
    if (tipo === "seller") {
      switch (step) {
        case 2:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Nome da Empresa</Label>
                <Input
                  placeholder="Ex: TechFlow Solutions"
                  value={formData.tradeName || ""}
                  onChange={(e) => setFormData({...formData, tradeName: e.target.value})}
                  data-testid="input-trade-name"
                />
              </div>

              <div className="space-y-2">
                <Label>Segmento</Label>
                <Select onValueChange={(v) => setFormData({...formData, segment: v})}>
                  <SelectTrigger data-testid="select-segment">
                    <SelectValue placeholder="Selecione o segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="Varejo">Varejo</SelectItem>
                    <SelectItem value="Serviços">Serviços</SelectItem>
                    <SelectItem value="Alimentação">Alimentação</SelectItem>
                    <SelectItem value="Saúde">Saúde</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tipo de Operação</Label>
                <Select onValueChange={(v) => setFormData({...formData, operationType: v})}>
                  <SelectTrigger data-testid="select-operation-type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Loja Física">Loja Física</SelectItem>
                    <SelectItem value="Serviços">Serviços</SelectItem>
                    <SelectItem value="Consultoria">Consultoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );

        case 3:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Faturamento Mensal Médio</Label>
                <Input
                  placeholder="Ex: R$ 85.000"
                  value={formData.monthlyRevenue || ""}
                  onChange={(e) => setFormData({...formData, monthlyRevenue: e.target.value})}
                  data-testid="input-revenue"
                />
              </div>

              <div className="space-y-2">
                <Label>Ticket Médio</Label>
                <Input
                  placeholder="Ex: R$ 450"
                  value={formData.ticketAverage || ""}
                  onChange={(e) => setFormData({...formData, ticketAverage: e.target.value})}
                  data-testid="input-ticket"
                />
              </div>

              <div className="space-y-2">
                <Label>EBITDA / Lucro Líquido</Label>
                <Input
                  placeholder="Ex: R$ 22.000"
                  value={formData.ebitda || ""}
                  onChange={(e) => setFormData({...formData, ebitda: e.target.value})}
                  data-testid="input-ebitda"
                />
              </div>

              <div className="space-y-2">
                <Label>Número de Funcionários</Label>
                <Input
                  placeholder="Ex: 8"
                  value={formData.employees || ""}
                  onChange={(e) => setFormData({...formData, employees: e.target.value})}
                  data-testid="input-employees"
                />
              </div>
            </div>
          );

        case 4:
          return (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Grau de Dependência do Dono: {formData.ownerDependence || 50}%</Label>
                <Slider
                  value={[formData.ownerDependence || 50]}
                  onValueChange={(v) => setFormData({...formData, ownerDependence: v[0]})}
                  min={0}
                  max={100}
                  step={10}
                  data-testid="slider-owner-dependence"
                />
              </div>

              <div className="space-y-2">
                <Label>Motivo da Venda</Label>
                <Select onValueChange={(v) => setFormData({...formData, sellReason: v})}>
                  <SelectTrigger data-testid="select-sell-reason">
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Novos Projetos">Novos Projetos</SelectItem>
                    <SelectItem value="Aposentadoria">Aposentadoria</SelectItem>
                    <SelectItem value="Problemas Financeiros">Problemas Financeiros</SelectItem>
                    <SelectItem value="Falta de Tempo">Falta de Tempo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Estágio do Negócio</Label>
                <Select onValueChange={(v) => setFormData({...formData, stage: v})}>
                  <SelectTrigger data-testid="select-stage">
                    <SelectValue placeholder="Selecione o estágio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inicial">Inicial</SelectItem>
                    <SelectItem value="Crescimento">Crescimento</SelectItem>
                    <SelectItem value="Estável">Estável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );

        case 5:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Valor Pedido (Valuation)</Label>
                <Input
                  placeholder="Ex: R$ 650.000"
                  value={formData.valuation || ""}
                  onChange={(e) => setFormData({...formData, valuation: e.target.value})}
                  data-testid="input-valuation"
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de Transação Aceita</Label>
                <Select onValueChange={(v) => setFormData({...formData, transactionType: v})}>
                  <SelectTrigger data-testid="select-transaction-type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Venda Total (100%)">Venda Total (100%)</SelectItem>
                    <SelectItem value="Venda Parcial (Até 50%)">Venda Parcial (Até 50%)</SelectItem>
                    <SelectItem value="Sociedade">Sociedade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Imóvel Próprio Envolvido?</Label>
                <Select onValueChange={(v) => setFormData({...formData, propertyInvolved: v})}>
                  <SelectTrigger data-testid="select-property">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sim, imóvel próprio">Sim, imóvel próprio</SelectItem>
                    <SelectItem value="Não, é alugado">Não, é alugado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );

        default:
          return null;
      }
    }

    // FRANCHISE
    if (tipo === "franchise") {
      switch (step) {
        case 2:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Nome da Franquia</Label>
                <Input
                  placeholder="Ex: Franquia Café Express"
                  value={formData.franchiseName || ""}
                  onChange={(e) => setFormData({...formData, franchiseName: e.target.value})}
                  data-testid="input-franchise-name"
                />
              </div>

              <div className="space-y-2">
                <Label>Segmento</Label>
                <Select onValueChange={(v) => setFormData({...formData, segment: v})}>
                  <SelectTrigger data-testid="select-franchise-segment">
                    <SelectValue placeholder="Selecione o segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alimentação">Alimentação</SelectItem>
                    <SelectItem value="Varejo">Varejo</SelectItem>
                    <SelectItem value="Serviços">Serviços</SelectItem>
                    <SelectItem value="Educação">Educação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Anos no Mercado</Label>
                <Input
                  placeholder="Ex: 12"
                  type="number"
                  value={formData.yearsInMarket || ""}
                  onChange={(e) => setFormData({...formData, yearsInMarket: e.target.value})}
                  data-testid="input-years-market"
                />
              </div>
            </div>
          );

        case 3:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Número de Unidades</Label>
                <Input
                  placeholder="Ex: 28"
                  type="number"
                  value={formData.numberOfUnits || ""}
                  onChange={(e) => setFormData({...formData, numberOfUnits: e.target.value})}
                  data-testid="input-units"
                />
              </div>

              <div className="space-y-2">
                <Label>Investimento Inicial (Faixa)</Label>
                <Input
                  placeholder="Ex: R$ 300.000 - R$ 500.000"
                  value={formData.initialInvestment || ""}
                  onChange={(e) => setFormData({...formData, initialInvestment: e.target.value})}
                  data-testid="input-investment-range"
                />
              </div>

              <div className="space-y-2">
                <Label>Taxa de Franquia</Label>
                <Input
                  placeholder="Ex: R$ 45.000"
                  value={formData.franchiseFee || ""}
                  onChange={(e) => setFormData({...formData, franchiseFee: e.target.value})}
                  data-testid="input-franchise-fee"
                />
              </div>
            </div>
          );

        case 4:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Capital de Giro</Label>
                <Input
                  placeholder="Ex: R$ 30.000"
                  value={formData.workingCapital || ""}
                  onChange={(e) => setFormData({...formData, workingCapital: e.target.value})}
                  data-testid="input-working-capital"
                />
              </div>

              <div className="space-y-2">
                <Label>Payback Médio (em meses)</Label>
                <Input
                  placeholder="Ex: 24"
                  type="number"
                  value={formData.payback || ""}
                  onChange={(e) => setFormData({...formData, payback: parseInt(e.target.value) || 0})}
                  data-testid="input-payback"
                />
              </div>

              <div className="space-y-2">
                <Label>Perfil Ideal do Franqueado</Label>
                <Select onValueChange={(v) => setFormData({...formData, operatorType: v})}>
                  <SelectTrigger data-testid="select-operator-type">
                    <SelectValue placeholder="Selecione o perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investor">Investidor</SelectItem>
                    <SelectItem value="operator">Operador</SelectItem>
                    <SelectItem value="both">Ambos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );

        case 5:
          return (
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Resumo do Novo Perfil</h3>
                <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <p><strong>Nome:</strong> {profileName}</p>
                  <p><strong>Tipo:</strong> Franqueadora</p>
                  <p><strong>Franquia:</strong> {formData.franchiseName}</p>
                </div>
              </div>
            </div>
          );

        default:
          return null;
      }
    }
  };

  const isStepValid = () => {
    if (step === 1) return profileName.trim().length > 0;
    return true;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                data-testid="button-back-novo-perfil"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Novo Perfil
              </h1>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Etapa {step} de {totalSteps}
            </p>
          </div>

          {/* Card */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>{getStepTitle()}</CardTitle>
            </CardHeader>

            <CardContent className="min-h-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </CardContent>

            <CardFooter className="flex justify-between gap-4">
              <Button
                variant="outline"
                className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors h-9 rounded-lg"
                onClick={handleBack}
                data-testid="button-back-step"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-primary hover:bg-primary/90"
                data-testid="button-next-step"
              >
                {step === totalSteps ? "Concluir" : "Próximo"}
                {step !== totalSteps && <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
