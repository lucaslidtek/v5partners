import { useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

  const role = user?.role || "investor";
  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      if (role === 'seller') {
        const score = Math.floor(Math.random() * 40) + 50;
        updateUserData({...formData, businessScore: score, status: score >= 60 ? 'active' : 'preparation'});
        setLocation("/resumo");
      } else if (role === 'franchise') {
        const score = Math.floor(Math.random() * 40) + 50;
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

  const getStepTitle = () => {
    if (role === "investor") {
      switch (step) {
        case 1: return "Perfil do Investidor";
        case 2: return "Tese de Investimento";
        case 3: return "Experiência e Background";
        case 4: return "Preferências e Critérios";
        default: return "";
      }
    } else if (role === "seller") {
      switch (step) {
        case 1: return "Perfil do Negócio";
        case 2: return "Performance Financeira";
        case 3: return "Maturidade e Estrutura";
        case 4: return "Condições da Venda";
        default: return "";
      }
    } else {
      switch (step) {
        case 1: return "Dados da Franquia";
        case 2: return "Modelo de Negócio";
        case 3: return "Perfil do Franqueado";
        case 4: return "Expansão e Suporte";
        default: return "";
      }
    }
  };

  const renderStepContent = () => {
    if (role === "investor") {
      switch (step) {
        case 1:
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input placeholder="Ex: João Silva" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                </div>
                <div className="space-y-2">
                  <Label>Idade</Label>
                  <Select onValueChange={(v) => setFormData({...formData, ageRange: v})}>
                    <SelectTrigger className="rounded-md h-11 border-slate-200 dark:border-slate-800">
                      <SelectValue placeholder="Selecione" />
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
        case 2:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Faixa de Investimento Disponível</Label>
                <Select onValueChange={(v) => setFormData({...formData, investmentRange: v})}>
                  <SelectTrigger className="rounded-md h-11 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Selecione o valor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upto300k">Até R$ 300.000</SelectItem>
                    <SelectItem value="300k-600k">R$ 300.000 - R$ 600.000</SelectItem>
                    <SelectItem value="600k-1m">R$ 600.000 - R$ 1.000.000</SelectItem>
                    <SelectItem value="1m-1.5m">R$ 1.000.000 - R$ 1.500.000</SelectItem>
                    <SelectItem value="1.5m-plus">Acima de R$ 1.500.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label>Modalidade Desejada</Label>
                <div className="grid gap-2">
                   {["Abrir franquia do zero", "Comprar franquia em operação (Repasse)", "Comprar negócio independente", "Sócio em operação existente"].map((opt) => (
                     <div 
                       key={opt} 
                       className="flex items-center space-x-2 border border-slate-200 dark:border-slate-800 p-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                       onClick={() => {
                         const checkbox = document.getElementById(opt) as HTMLInputElement;
                         if (checkbox) checkbox.click();
                       }}
                     >
                       <Checkbox id={opt} className="rounded-sm" />
                       <label htmlFor={opt} className="text-sm font-medium leading-none cursor-pointer w-full">{opt}</label>
                     </div>
                   ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Preferência de Localização</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Shopping centers", "Galerias", "Ruas e avenidas", "Todas"].map(loc => (
                    <div 
                      key={loc} 
                      className="flex items-center space-x-2 border border-slate-200 dark:border-slate-800 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                      onClick={() => {
                        const checkbox = document.getElementById(`loc-${loc}`) as HTMLInputElement;
                        if (checkbox) checkbox.click();
                      }}
                    >
                       <Checkbox id={`loc-${loc}`} className="rounded-sm" />
                       <label htmlFor={`loc-${loc}`} className="text-sm cursor-pointer w-full">{loc}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cidade de Interesse</Label>
                <Input placeholder="Ex: Curitiba, PR" onChange={(e) => setFormData({...formData, interestCity: e.target.value})}/>
              </div>
              <div className="space-y-2">
                <Label>Utilizará imóvel na negociação?</Label>
                <Select onValueChange={(v) => setFormData({...formData, useProperty: v})}>
                  <SelectTrigger className="rounded-md h-11 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                    <SelectItem value="talvez">A avaliar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        case 3:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Já teve empresa anteriormente?</Label>
                <div className="flex gap-4">
                  <Button 
                    type="button"
                    variant={formData.hasExperience === true ? "default" : "outline"} 
                    className={`flex-1 h-11 rounded-md ${formData.hasExperience === true ? "bg-primary text-white" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                    onClick={() => setFormData({...formData, hasExperience: true})}
                  >
                    <Check className="mr-2 h-4 w-4" /> Sim
                  </Button>
                  <Button 
                    type="button"
                    variant={formData.hasExperience === false ? "default" : "outline"} 
                    className={`flex-1 h-11 rounded-md ${formData.hasExperience === false ? "bg-primary text-white" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                    onClick={() => setFormData({...formData, hasExperience: false})}
                  >
                    <X className="mr-2 h-4 w-4" /> Não
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Habilidades Predominantes</Label>
                <div className="flex flex-wrap gap-2">
                  {["Gestão Administrativa", "Gestão de Pessoal", "Comercial", "Marketing", "Finanças", "Operacional", "Tecnologia"].map(skill => (
                    <div 
                      key={skill} 
                      className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      onClick={() => {
                        const checkbox = document.getElementById(`skill-${skill}`) as HTMLInputElement;
                        if (checkbox) checkbox.click();
                      }}
                    >
                       <Checkbox id={`skill-${skill}`} className="rounded-sm" />
                       <label htmlFor={`skill-${skill}`} className="text-sm font-medium cursor-pointer">{skill}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 4:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Setores de Interesse (Padrão ABF)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Alimentação", "Saúde, Beleza e Bem-Estar", "Serviços e Outros Negócios", "Educação", "Tecnologia", "Moda", "Casa e Construção", "Automotivo", "Hotelaria e Turismo", "Limpeza e Conservação", "Comunicação", "Indústria"].map(sector => (
                    <div 
                      key={sector} 
                      className="flex items-center space-x-2 border border-slate-200 dark:border-slate-800 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                      onClick={() => {
                        const checkbox = document.getElementById(`sector-onb-${sector}`) as HTMLInputElement;
                        if (checkbox) checkbox.click();
                      }}
                    >
                       <Checkbox id={`sector-onb-${sector}`} className="rounded-sm" />
                       <label htmlFor={`sector-onb-${sector}`} className="text-sm cursor-pointer w-full">{sector}</label>
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
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Tolerância ao Risco</Label>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Conservador</span>
                  </div>
                  <Slider defaultValue={[30]} max={100} step={10} className="w-full" />
                </div>
              </div>
            </div>
          );
        default: return null;
      }
    }

    if (role === "seller") {
      switch (step) {
        case 1:
          return (
            <div className="space-y-4">
              <Alert className="rounded-md border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950">
                <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="text-amber-800 dark:text-amber-200">
                  <strong>Informações Confidenciais:</strong> Seu nome e logo só serão visíveis para investidores após o NDA assinado.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Label>Nome Fantasia</Label>
                <Input placeholder="Ex: TechFlow Solutions" onChange={(e) => setFormData({...formData, tradeName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Cidade / Estado</Label>
                <Input placeholder="Ex: Curitiba, PR" onChange={(e) => setFormData({...formData, location: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Segmento de Atuação (Padrão ABF)</Label>
                <Select onValueChange={(v) => setFormData({...formData, segment: v})}>
                  <SelectTrigger className="rounded-md h-11 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Alimentação", "Saúde, Beleza e Bem-Estar", "Serviços", "Educação", "Tecnologia", "Moda", "Casa e Construção", "Automotivo", "Turismo", "Limpeza", "Comunicação", "Indústria"].map(s => (
                      <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        case 2:
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Faturamento Mensal Médio</Label>
                  <Input placeholder="R$ 0,00" />
                </div>
                <div className="space-y-2">
                  <Label>Lucratividade Média (%)</Label>
                  <Input placeholder="0%" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ROI (Meses)</Label>
                  <Input placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Ticket Médio</Label>
                  <Input placeholder="R$ 0,00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Grau de dependência do dono</Label>
                <Slider defaultValue={[70]} max={100} step={10} className="w-full" />
              </div>
            </div>
          );
        case 3:
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Motivo da Venda</Label>
                <Select onValueChange={(v) => setFormData({...formData, sellReason: v})}>
                  <SelectTrigger className="rounded-md h-11 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aposentadoria">Aposentadoria</SelectItem>
                    <SelectItem value="mudanca">Mudança de Cidade/País</SelectItem>
                    <SelectItem value="novos_projetos">Novos Projetos</SelectItem>
                    <SelectItem value="dissolucao">Dissolução de Sociedade</SelectItem>
                    <SelectItem value="incapacidade_financeira">Incapacidade Financeira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estágio do Negócio</Label>
                <div className="flex gap-2">
                  {["Crescendo", "Estável", "Em Queda"].map(stage => (
                    <Button 
                      key={stage} 
                      type="button"
                      variant={formData.stage === stage ? "default" : "outline"} 
                      className={`flex-1 h-11 rounded-md text-sm ${formData.stage === stage ? "bg-primary text-white" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"}`}
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
                    type="button"
                    variant={formData.liabilities === true ? "default" : "outline"} 
                    className={`flex-1 h-11 rounded-md ${formData.liabilities === true ? "bg-primary text-white" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                    onClick={() => setFormData({...formData, liabilities: true})}
                  >
                    <Check className="mr-2 h-4 w-4" /> Sim
                  </Button>
                  <Button 
                    type="button"
                    variant={formData.liabilities === false ? "default" : "outline"} 
                    className={`flex-1 h-11 rounded-md ${formData.liabilities === false ? "bg-primary text-white" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                    onClick={() => setFormData({...formData, liabilities: false})}
                  >
                    <X className="mr-2 h-4 w-4" /> Não
                  </Button>
                </div>
              </div>
            </div>
          );
        case 4:
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Valor Pedido (Valuation)</Label>
                <Input placeholder="R$ 0,00" className="text-lg font-semibold text-primary h-12 rounded-md" />
              </div>
              <div className="space-y-2">
                <Label>Aceita Imóvel na Negociação?</Label>
                <Select onValueChange={(v) => setFormData({...formData, acceptsProperty: v})}>
                  <SelectTrigger className="rounded-md h-11 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                    <SelectItem value="talvez">A avaliar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Imóvel Próprio incluído?</Label>
                <Select>
                  <SelectTrigger className="rounded-md h-11 border-slate-200 dark:border-slate-800">
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

    if (role === "franchise") {
      switch (step) {
        case 1:
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome da Franquia</Label>
                <Input placeholder="Ex: Minha Franquia" onChange={(e) => setFormData({...formData, franchiseName: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Segmento (ABF)</Label>
                  <Select onValueChange={(v) => setFormData({...formData, segment: v})}>
                    <SelectTrigger className="rounded-md h-11 border-slate-200 dark:border-slate-800">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Alimentação", "Saúde", "Serviços", "Educação", "Moda", "Casa", "Automotivo", "Turismo", "Limpeza", "Indústria"].map(s => (
                        <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Anos de Mercado</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Modelos Disponíveis</Label>
                <div className="grid grid-cols-2 gap-2">
                   {["Loja Física", "Quiosque", "Home Based", "Microfranquia"].map((opt) => (
                     <div 
                       key={opt} 
                       className="flex items-center space-x-2 border border-slate-200 dark:border-slate-800 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                       onClick={() => {
                         const checkbox = document.getElementById(opt) as HTMLInputElement;
                         if (checkbox) checkbox.click();
                       }}
                     >
                       <Checkbox id={opt} className="rounded-sm" />
                       <label htmlFor={opt} className="text-sm w-full cursor-pointer">{opt}</label>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          );
        case 2:
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Investimento Total Aproximado</Label>
                <Select onValueChange={(v) => setFormData({...formData, approxInvestment: v})}>
                  <SelectTrigger className="rounded-md h-11 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Selecione a faixa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upto100k">Até R$ 100.000</SelectItem>
                    <SelectItem value="100k-300k">R$ 100.000 - R$ 300.000</SelectItem>
                    <SelectItem value="300k-600k">R$ 300.000 - R$ 600.000</SelectItem>
                    <SelectItem value="600k-1m">R$ 600.000 - R$ 1.000.000</SelectItem>
                    <SelectItem value="1m-plus">Acima de R$ 1 milhão</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Faturamento Médio Anual</Label>
                  <Input placeholder="R$ 0,00" />
                </div>
                <div className="space-y-2">
                  <Label>ROI (%)</Label>
                  <Input placeholder="0%" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Payback Médio (Meses)</Label>
                <Slider defaultValue={[24]} max={60} step={1} className="w-full" />
              </div>
            </div>
          );
        case 3:
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Experiência Necessária?</Label>
                <Select onValueChange={(v) => setFormData({...formData, reqExperience: v})}>
                  <SelectTrigger className="rounded-md h-11 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Não exigida</SelectItem>
                    <SelectItem value="management">Gestão</SelectItem>
                    <SelectItem value="sector">Setor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Competências Essenciais</Label>
                <div className="flex flex-wrap gap-2">
                  {["Administrativa", "Pessoal", "Comercial", "Marketing", "Finanças", "Operacional", "Tecnologia"].map(skill => (
                    <div 
                      key={skill} 
                      className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      onClick={() => {
                        const checkbox = document.getElementById(`f-skill-${skill}`) as HTMLInputElement;
                        if (checkbox) checkbox.click();
                      }}
                    >
                       <Checkbox id={`f-skill-${skill}`} className="rounded-sm" />
                       <label htmlFor={`f-skill-${skill}`} className="text-sm font-medium cursor-pointer">{skill}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 4:
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Exclusividade Territorial?</Label>
                <div className="flex gap-4">
                  <Button 
                    type="button"
                    variant={formData.exclusivity === true ? "default" : "outline"} 
                    className={`flex-1 h-11 rounded-md ${formData.exclusivity === true ? "bg-primary text-white" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                    onClick={() => setFormData({...formData, exclusivity: true})}
                  >
                    <Check className="mr-2 h-4 w-4" /> Sim
                  </Button>
                  <Button 
                    type="button"
                    variant={formData.exclusivity === false ? "default" : "outline"} 
                    className={`flex-1 h-11 rounded-md ${formData.exclusivity === false ? "bg-primary text-white" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                    onClick={() => setFormData({...formData, exclusivity: false})}
                  >
                    <X className="mr-2 h-4 w-4" /> Não
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Suporte Oferecido</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Treinamento", "Consultoria", "Marketing", "Software", "Projeto", "Manuais"].map(sup => (
                    <div 
                      key={sup} 
                      className="flex items-center space-x-2 border border-slate-200 dark:border-slate-800 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                      onClick={() => {
                        const checkbox = document.getElementById(`sup-${sup}`) as HTMLInputElement;
                        if (checkbox) checkbox.click();
                      }}
                    >
                       <Checkbox id={`sup-${sup}`} className="rounded-sm" defaultChecked />
                       <label htmlFor={`sup-${sup}`} className="text-sm cursor-pointer w-full">{sup}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        default: return null;
      }
    }
  };

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-slate-200 dark:border-slate-800 shadow-xl dark:bg-slate-900 rounded-lg overflow-hidden">
          <CardHeader className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 pt-8 pb-6">
             <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" size="icon" onClick={handleBack} className="h-10 w-10 text-slate-400 hover:text-primary transition-colors">
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">
                    {role === 'investor' ? 'Investidor' : role === 'seller' ? 'Vendedor' : 'Franqueadora'}
                  </span>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">{getStepTitle()}</CardTitle>
                </div>
                <div className="w-10" />
             </div>
             <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 px-2">
               <span>Passo {step} de {totalSteps}</span>
               <span className="font-bold text-primary">{Math.round((step / totalSteps) * 100)}%</span>
             </div>
             <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-primary"
                 initial={{ width: 0 }}
                 animate={{ width: `${(step / totalSteps) * 100}%` }}
                 transition={{ duration: 0.5 }}
               />
             </div>
          </CardHeader>
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${role}-${step}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="p-8 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-between gap-4">
            <Button variant="ghost" onClick={handleBack} className="h-12 rounded-md px-6 font-semibold text-slate-600 dark:text-slate-400">
              <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
            <Button onClick={handleNext} className="h-12 rounded-md px-8 font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20">
              {step === totalSteps ? "Finalizar Cadastro" : "Próximo Passo"} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
