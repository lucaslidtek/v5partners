import { useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/context";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, X, User, Briefcase, Lock, Info } from "lucide-react";

export default function OnboardingPage() {
  const { user, updateUserData } = useAuth();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  // Default to investor flow if null (for safety)
  const role = user?.role || "investor";

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Logic for Seller Business Score simulation
      if (role === 'seller') {
        // Simulate a score calculation
        const score = Math.floor(Math.random() * 40) + 50; // Random score between 50 and 90
        
        if (score >= 60) {
           updateUserData({...formData, businessScore: score, status: 'active'});
           setLocation("/resumo"); // Or a success page showing the score
        } else {
           // In a real app, we would show a "Checklist" page. 
           // For now, let's just proceed but maybe we could show a toast or alert?
           // Let's assume for this mockup we just proceed to summary but with a "Preparation" status
           updateUserData({...formData, businessScore: score, status: 'preparation'});
           setLocation("/resumo"); 
        }
      } else if (role === 'franchise') {
        // Simulate Franchise Fit Score
        const score = Math.floor(Math.random() * 40) + 50; // Random score between 50 and 90
        updateUserData({...formData, franchiseScore: score, status: score >= 60 ? 'active' : 'preparation'});
        setLocation("/resumo");
      } else {
        updateUserData(formData);
        setLocation("/resumo");
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else if (step === 1) {
      setLocation("/escolha-de-perfil");
    }
  };

  const renderStepContent = () => {
    // INVESTOR FLOW
    if (role === "investor") {
      switch (step) {
        case 1: // Perfil do Investidor (Dados Básicos)
          return (
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Perfil do Investidor</h3>
                <p className="text-sm text-muted-foreground">Conte-nos sobre você para personalizarmos sua experiência.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input 
                    defaultValue={user?.name} 
                    placeholder="Ex: João Silva"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Idade</Label>
                  <Select onValueChange={(v) => setFormData({...formData, ageRange: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a faixa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20-30">20-30 anos</SelectItem>
                      <SelectItem value="31-40">31-40 anos</SelectItem>
                      <SelectItem value="41-50">41-50 anos</SelectItem>
                      <SelectItem value="51+">51+ anos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cidade / Estado</Label>
                <Input placeholder="Ex: São Paulo, SP" onChange={(e) => setFormData({...formData, location: e.target.value})}/>
              </div>
              <div className="space-y-2">
                <Label>Formação (Opcional)</Label>
                <Input placeholder="Ex: Administração de Empresas" onChange={(e) => setFormData({...formData, education: e.target.value})}/>
              </div>
            </div>
          );
        case 2: // Tese de Investimento (Capacidade e Modalidade)
          return (
            <div className="space-y-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Tese de Investimento</h3>
                <p className="text-sm text-muted-foreground">Defina o perfil financeiro e estratégico do negócio que busca.</p>
              </div>
              <div className="space-y-2">
                <Label>Faixa de Investimento Disponível</Label>
                <Select onValueChange={(v) => setFormData({...formData, investmentRange: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o valor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upto200k">Até R$ 200.000</SelectItem>
                    <SelectItem value="200k-500k">R$ 200.000 - R$ 500.000</SelectItem>
                    <SelectItem value="500k-1m">R$ 500.000 - R$ 1.000.000</SelectItem>
                    <SelectItem value="1m-plus">Acima de R$ 1.000.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label>Modalidade Desejada</Label>
                <div className="grid gap-2">
                   {["Abrir franquia do zero (Greenfield)", "Comprar franquia em operação (Repasse)", "Comprar negócio independente", "Sócio em operação existente"].map((opt) => (
                     <div key={opt} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                       <Checkbox id={opt} />
                       <label htmlFor={opt} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full">{opt}</label>
                     </div>
                   ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Retorno Desejado</Label>
                 <Select onValueChange={(v) => setFormData({...formData, roiTime: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Prazo esperado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Curto Prazo (1-2 anos)</SelectItem>
                    <SelectItem value="medium">Médio Prazo (3-5 anos)</SelectItem>
                    <SelectItem value="long">Longo Prazo (5+ anos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        case 3: // Experiência e Background
          return (
             <div className="space-y-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Experiência e Background</h3>
                <p className="text-sm text-muted-foreground">Sua experiência ajuda a filtrar negócios onde você pode agregar valor.</p>
              </div>
              <div className="space-y-2">
                <Label>Já teve empresa anteriormente?</Label>
                 <div className="flex gap-4">
                   <Button 
                    variant={formData.hasExperience === true ? "default" : "outline"} 
                    className={`flex-1 ${formData.hasExperience === true ? "" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/30 hover:text-primary"}`}
                    onClick={() => setFormData({...formData, hasExperience: true})}
                   >
                     <Check className="mr-2 h-4 w-4" /> Sim
                   </Button>
                   <Button 
                    variant={formData.hasExperience === false ? "default" : "outline"} 
                    className={`flex-1 ${formData.hasExperience === false ? "" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/30 hover:text-primary"}`}
                    onClick={() => setFormData({...formData, hasExperience: false})}
                   >
                     <X className="mr-2 h-4 w-4" /> Não
                   </Button>
                 </div>
              </div>
              <div className="space-y-2">
                <Label>Setores de Experiência</Label>
                <Input placeholder="Ex: Varejo, Tecnologia, Saúde..." />
              </div>
               <div className="space-y-2">
                <Label>Habilidades Predominantes</Label>
                <div className="flex flex-wrap gap-2">
                  {["Gestão", "Comercial", "Marketing", "Finanças", "Operacional", "RH"].map(skill => (
                    <div key={skill} className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                       <Checkbox id={`skill-${skill}`} />
                       <label htmlFor={`skill-${skill}`} className="text-sm font-medium">{skill}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 4: // Preferências e Critérios
           return (
             <div className="space-y-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Preferências e Critérios</h3>
                <p className="text-sm text-muted-foreground">Refine sua busca com critérios de setor e envolvimento.</p>
              </div>
              <div className="space-y-2">
                <Label>Setores de Interesse</Label>
                 <div className="grid grid-cols-2 gap-2">
                  {["Alimentação", "Saúde & Beleza", "Serviços", "Educação", "Tecnologia", "Moda", "Casa & Construção", "Automotivo"].map(sector => (
                    <div key={sector} className="flex items-center space-x-2">
                       <Checkbox id={`sector-${sector}`} />
                       <label htmlFor={`sector-${sector}`} className="text-sm">{sector}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Grau de Envolvimento Operacional</Label>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Moderado</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={10} className="w-full" />
                  <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span>Investidor Ausente</span>
                    <span>Operação Full-time</span>
                  </div>
                </div>

                 <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Tolerância ao Risco</Label>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Conservador</span>
                  </div>
                  <Slider defaultValue={[30]} max={100} step={10} className="w-full" />
                   <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span>Baixo Risco</span>
                    <span>Alto Risco</span>
                  </div>
                </div>
              </div>
            </div>
           );
        default: return null;
      }
    }

    // SELLER FLOW (Empresa à Venda)
    if (role === "seller") {
      switch (step) {
        case 1: // Perfil do Negócio
          return (
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Perfil do Negócio</h3>
                <p className="text-sm text-muted-foreground">Identifique sua empresa para iniciarmos a validação.</p>
              </div>
              <Alert className="border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950">
                <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="text-amber-800 dark:text-amber-200">
                  <strong>Informações Confidenciais:</strong> Seu nome e logo só serão visíveis para investidores <strong>após o NDA ser assinado</strong>. Antes disso, aparecerão como "Empresa Confidencial".
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Label>Nome Fantasia</Label>
                <Input 
                  placeholder="Ex: TechFlow Solutions" 
                  onChange={(e) => setFormData({...formData, tradeName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Logo da Empresa (URL)</Label>
                <Input 
                  placeholder="Ex: https://example.com/logo.png" 
                  onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">Cole a URL de sua logo. Será exibida após NDA assinado.</p>
              </div>
              <div className="space-y-2">
                <Label>Cidade / Estado</Label>
                <Input placeholder="Ex: Curitiba, PR" onChange={(e) => setFormData({...formData, location: e.target.value})}/>
              </div>
              <div className="space-y-2">
                <Label>Segmento de Atuação</Label>
                <Select onValueChange={(v) => setFormData({...formData, segment: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="varejo">Varejo</SelectItem>
                    <SelectItem value="servicos">Serviços</SelectItem>
                    <SelectItem value="alimentacao">Alimentação</SelectItem>
                    <SelectItem value="tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="saude">Saúde</SelectItem>
                    <SelectItem value="industria">Indústria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tipo de Operação</Label>
                <div className="grid grid-cols-2 gap-2">
                   {["Loja Física", "E-commerce", "Serviço", "Indústria"].map((opt) => (
                     <div key={opt} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                       <Checkbox id={opt} />
                       <label htmlFor={opt} className="text-sm font-medium w-full cursor-pointer">{opt}</label>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          );
        case 2: // Performance Financeira
          return (
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Performance Financeira</h3>
                <p className="text-sm text-muted-foreground">Números claros aumentam seu Business Score e atraem investidores sérios.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Faturamento Mensal Médio</Label>
                  <Input placeholder="R$ 0,00" />
                </div>
                 <div className="space-y-2">
                  <Label>Lucro Líquido / EBITDA</Label>
                  <Input placeholder="R$ 0,00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ticket Médio</Label>
                  <Input placeholder="R$ 0,00" />
                </div>
                 <div className="space-y-2">
                  <Label>Nº Funcionários</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Grau de dependência do dono</Label>
                <Slider defaultValue={[70]} max={100} step={10} className="w-full" />
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>Baixa (Gestão Profissional)</span>
                  <span>Alta (Dono Operacional)</span>
                </div>
              </div>
            </div>
          );
        case 3: // Maturidade e Estrutura
          return (
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Maturidade e Estrutura</h3>
                <p className="text-sm text-muted-foreground">Avaliamos a dependência do dono e o momento do negócio.</p>
              </div>
              <div className="space-y-2">
                <Label>Motivo da Venda</Label>
                <Select onValueChange={(v) => setFormData({...formData, sellReason: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aposentadoria">Aposentadoria</SelectItem>
                    <SelectItem value="mudanca">Mudança de Cidade/País</SelectItem>
                    <SelectItem value="novos_projetos">Novos Projetos</SelectItem>
                    <SelectItem value="dissolucao">Dissolução de Sociedade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <div className="space-y-2">
                <Label>Estágio do Negócio</Label>
                 <div className="flex gap-2">
                  {["Crescendo", "Estável", "Em Queda"].map(stage => (
                    <Button 
                      key={stage} 
                      variant="outline" 
                      className="flex-1 text-sm border-slate-200 dark:border-slate-700"
                      onClick={() => setFormData({...formData, stage})}
                    >
                      {stage}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Passivos Existentes?</Label>
                <div className="flex gap-4">
                   <Button 
                    variant={formData.liabilities === true ? "default" : "outline"} 
                    className={`flex-1 ${formData.liabilities === true ? "" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/30 hover:text-primary"}`}
                    onClick={() => setFormData({...formData, liabilities: true})}
                   >
                     <Check className="mr-2 h-4 w-4" /> Sim
                   </Button>
                   <Button 
                    variant={formData.liabilities === false ? "default" : "outline"} 
                    className={`flex-1 ${formData.liabilities === false ? "" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/30 hover:text-primary"}`}
                    onClick={() => setFormData({...formData, liabilities: false})}
                   >
                     <X className="mr-2 h-4 w-4" /> Não
                   </Button>
                 </div>
              </div>
            </div>
          );
        case 4: // Condições da Venda
          return (
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Condições da Venda</h3>
                <p className="text-sm text-muted-foreground">Defina o valor e o modelo de transação desejado.</p>
              </div>
              <div className="space-y-2">
                <Label>Valor Pedido (Valuation)</Label>
                <Input placeholder="R$ 0,00" className="text-lg font-semibold text-primary" />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Transação Aceita</Label>
                 <div className="grid grid-cols-1 gap-2">
                   {["Venda Total (100%)", "Venda Parcial (Sócio Majoritário)", "Venda Parcial (Sócio Minoritário)"].map((opt) => (
                     <div key={opt} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                       <Checkbox id={opt} />
                       <label htmlFor={opt} className="text-sm font-medium w-full cursor-pointer">{opt}</label>
                     </div>
                   ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Imóvel Próprio na Negociação?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nao">Não, é alugado</SelectItem>
                    <SelectItem value="sim_incluido">Sim, incluído na venda</SelectItem>
                    <SelectItem value="sim_aparte">Sim, negociado à parte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        default: return null;
      }
    }

    // FRANCHISOR FLOW (Franqueadora)
    if (role === "franchise") {
      switch (step) {
        case 1: // Identificação da Franquia
          return (
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Dados da Franquia</h3>
                <p className="text-sm text-muted-foreground">Informações institucionais para validar sua marca.</p>
              </div>
              <Alert className="border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950">
                <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="text-amber-800 dark:text-amber-200">
                  <strong>Informações Confidenciais:</strong> Seu nome e logo só serão visíveis para investidores <strong>após o NDA ser assinado</strong>. Antes disso, aparecerão como "Empresa Confidencial".
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Label>Nome da Franquia</Label>
                <Input 
                  placeholder="Ex: Minha Franquia"
                  onChange={(e) => setFormData({...formData, franchiseName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Logo da Franquia (URL)</Label>
                <Input 
                  placeholder="Ex: https://example.com/logo.png" 
                  onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">Cole a URL de sua logo. Será exibida após NDA assinado.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Segmento</Label>
                  <Input placeholder="Ex: Alimentação" />
                </div>
                <div className="space-y-2">
                  <Label>Anos de Mercado</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label>Nº de Unidades</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Cidade Sede</Label>
                  <Input placeholder="Cidade/UF" />
                </div>
              </div>
               <div className="space-y-2">
                <Label>Modelos Disponíveis</Label>
                <div className="grid grid-cols-2 gap-2">
                   {["Loja Física", "Quiosque", "Home Based", "Microfranquia"].map((opt) => (
                     <div key={opt} className="flex items-center space-x-2 border p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                       <Checkbox id={opt} />
                       <label htmlFor={opt} className="text-sm w-full cursor-pointer">{opt}</label>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          );
        case 2: // Modelo de Negócio
          return (
             <div className="space-y-4">
               <div className="mb-4">
                 <h3 className="text-lg font-medium">Modelo de Negócio</h3>
                 <p className="text-sm text-muted-foreground">Defina os valores de investimento e retorno para o franqueado.</p>
               </div>
               <div className="space-y-2">
                  <Label>Investimento Total Inicial (Faixa)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a faixa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upto100k">Até R$ 100.000</SelectItem>
                      <SelectItem value="100k-300k">R$ 100.000 - R$ 300.000</SelectItem>
                      <SelectItem value="300k-500k">R$ 300.000 - R$ 500.000</SelectItem>
                      <SelectItem value="500k-plus">Acima de R$ 500.000</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Taxa de Franquia</Label>
                    <Input placeholder="R$ 0,00" />
                 </div>
                  <div className="space-y-2">
                    <Label>Capital de Giro</Label>
                    <Input placeholder="R$ 0,00" />
                 </div>
               </div>
               <div className="space-y-2">
                  <Label>Payback Médio (Meses)</Label>
                  <Slider defaultValue={[24]} max={60} step={1} className="w-full" />
                  <div className="text-right text-sm text-slate-500 dark:text-slate-400 mt-1">24 meses</div>
               </div>
             </div>
          );
        case 3: // Perfil do Franqueado Ideal
          return (
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Perfil do Franqueado Ideal</h3>
                <p className="text-sm text-muted-foreground">Quem você busca para expandir sua rede com qualidade?</p>
              </div>
              <div className="space-y-2">
                <Label>Perfil Ideal</Label>
                <div className="flex gap-4">
                   <Button 
                    variant={formData.operatorType === 'investor' ? "default" : "outline"} 
                    className={`flex-1 ${formData.operatorType === 'investor' ? "" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/30 hover:text-primary"}`}
                    onClick={() => setFormData({...formData, operatorType: 'investor'})}
                   >
                     <User className="mr-2 h-4 w-4" /> Investidor
                   </Button>
                   <Button 
                    variant={formData.operatorType === 'operator' ? "default" : "outline"} 
                    className={`flex-1 ${formData.operatorType === 'operator' ? "" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/30 hover:text-primary"}`}
                    onClick={() => setFormData({...formData, operatorType: 'operator'})}
                   >
                     <Briefcase className="mr-2 h-4 w-4" /> Operador
                   </Button>
                 </div>
              </div>
              <div className="space-y-2">
                <Label>Experiência Necessária?</Label>
                 <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Não exigida</SelectItem>
                      <SelectItem value="management">Gestão de Negócios</SelectItem>
                      <SelectItem value="sector">Experiência no Setor</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
              <div className="space-y-2">
                <Label>Competências Essenciais</Label>
                <div className="flex flex-wrap gap-2">
                  {["Liderança", "Vendas", "Gestão Financeira", "Marketing Local"].map(skill => (
                    <div key={skill} className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                       <Checkbox id={`f-skill-${skill}`} />
                       <label htmlFor={`f-skill-${skill}`} className="text-sm font-medium">{skill}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 4: // Expansão e Suporte
           return (
             <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Regiões de Interesse para Expansão</Label>
                  <Input placeholder="Ex: Sul e Sudeste, Capitais..." />
                </div>
                <div className="space-y-2">
                  <Label>Exclusividade Territorial?</Label>
                   <div className="flex gap-4">
                     <Button 
                      variant={formData.exclusivity === true ? "default" : "outline"} 
                      className={`flex-1 ${formData.exclusivity === true ? "" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/30 hover:text-primary"}`}
                      onClick={() => setFormData({...formData, exclusivity: true})}
                     >
                       <Check className="mr-2 h-4 w-4" /> Sim
                     </Button>
                     <Button 
                      variant={formData.exclusivity === false ? "default" : "outline"} 
                      className={`flex-1 ${formData.exclusivity === false ? "" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/30 hover:text-primary"}`}
                      onClick={() => setFormData({...formData, exclusivity: false})}
                     >
                       <X className="mr-2 h-4 w-4" /> Não
                     </Button>
                   </div>
                </div>
                <div className="space-y-2">
                  <Label>Suporte Oferecido</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Treinamento Inicial", "Consultoria de Campo", "Marketing Nacional", "Software de Gestão", "Projeto Arquitetônico", "Manuais de Operação"].map(sup => (
                      <div key={sup} className="flex items-center space-x-2">
                         <Checkbox id={`sup-${sup}`} defaultChecked />
                         <label htmlFor={`sup-${sup}`} className="text-sm">{sup}</label>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
           );
        default: return null;
      }
    }
    
    return null;
  };

  const getStepTitle = () => {
    if (role === 'investor') {
      switch(step) {
        case 1: return "Dados Básicos";
        case 2: return "Perfil de Investimento";
        case 3: return "Experiência Profissional";
        case 4: return "Preferências do Negócio";
        default: return "";
      }
    } else if (role === 'seller') {
       switch(step) {
        case 1: return "Identificação e Setor";
        case 2: return "Tamanho da Operação";
        case 3: return "Estrutura e Momento";
        case 4: return "Informações do Deal";
        default: return "";
      }
    } else {
       switch(step) {
        case 1: return "Identificação da Franquia";
        case 2: return "Investimento e Retorno";
        case 3: return "Perfil do Franqueado";
        case 4: return "Expansão e Suporte";
        default: return "";
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="border-slate-200 dark:border-slate-700 shadow-md dark:bg-slate-900">
          <CardHeader className="relative">
             <div className="absolute left-6 top-8">
                <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8 text-slate-400 hover:text-primary transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                   {role === 'investor' ? 'Investidor' : role === 'seller' ? 'Vendedor' : 'Franqueadora'}
                </span>
                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">{getStepTitle()}</CardTitle>
             </div>
          </CardHeader>
          <CardContent>
           <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
             <span>Passo {step} de {totalSteps}</span>
             <span>{Math.round((step / totalSteps) * 100)}% Completo</span>
           </div>
           <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full mb-8">
             <motion.div 
               className="h-full bg-primary rounded-full"
               initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
               animate={{ width: `${(step / totalSteps) * 100}%` }}
               transition={{ duration: 0.5 }}
             />
           </div>

           <AnimatePresence mode="wait">
             <motion.div
               key={step}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3 }}
             >
               {renderStepContent()}
             </motion.div>
           </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-200 dark:border-slate-700 p-6">
            <Button variant="ghost" onClick={handleBack} disabled={step === 1 && !user} className="hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary">
              <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
              {step === totalSteps ? "Finalizar" : "Próximo"} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
