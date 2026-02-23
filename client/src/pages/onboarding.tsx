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
import logoColor from "@assets/v5partners_color1_1764265378727.png";
import logoWhite from "@assets/v5partners_white1_1764345179398.png";

export default function OnboardingPage() {
 const { user, updateUserData, settings } = useAuth();
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
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
       <div className="space-y-4">
        <Label>Modalidade Desejada</Label>
        <Select onValueChange={(v) => {
          const currentModalities = formData.modalities || [];
          if (!currentModalities.includes(v)) {
           setFormData({...formData, modalities: [...currentModalities, v]});
          }
        }}>
         <SelectTrigger className="rounded-xl h-12 border-slate-200 dark:border-slate-800">
          <SelectValue placeholder="Selecione as modalidades" />
         </SelectTrigger>
         <SelectContent>
          {["Abrir franquia do zero", "Comprar franquia em operação (Repasse)", "Comprar negócio independente", "Sócio em operação existente"].map(opt => (
           <SelectItem key={opt} value={opt}>{opt}</SelectItem>
          ))}
         </SelectContent>
        </Select>
        {formData.modalities?.length > 0 && (
         <div className="flex flex-wrap gap-2 mt-2">
          {formData.modalities.map((m: string) => (
           <div key={m} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
            {m}
            <button 
             onClick={() => setFormData({...formData, modalities: formData.modalities.filter((item: string) => item !== m)})}
             className="hover:text-primary/70"
            >
             <X className="h-3 w-3" />
            </button>
           </div>
          ))}
         </div>
        )}
       </div>
       <div className="space-y-4">
        <Label>Preferência de Localização</Label>
        <Select onValueChange={(v) => {
          const currentLocs = formData.preferredLocations || [];
          if (!currentLocs.includes(v)) {
           setFormData({...formData, preferredLocations: [...currentLocs, v]});
          }
        }}>
         <SelectTrigger className="rounded-xl h-12 border-slate-200 dark:border-slate-800">
          <SelectValue placeholder="Selecione as localizações" />
         </SelectTrigger>
         <SelectContent>
          {["Shopping centers", "Galerias", "Ruas e avenidas", "Todas"].map(loc => (
           <SelectItem key={loc} value={loc}>{loc}</SelectItem>
          ))}
         </SelectContent>
        </Select>
        {formData.preferredLocations?.length > 0 && (
         <div className="flex flex-wrap gap-2 mt-2">
          {formData.preferredLocations.map((l: string) => (
           <div key={l} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
            {l}
            <button 
             onClick={() => setFormData({...formData, preferredLocations: formData.preferredLocations.filter((item: string) => item !== l)})}
             className="hover:text-primary/70"
            >
             <X className="h-3 w-3" />
            </button>
           </div>
          ))}
         </div>
        )}
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
       <div className="space-y-4">
        <Label>Habilidades Predominantes</Label>
        <Select onValueChange={(v) => {
          const currentSkills = formData.skills || [];
          if (!currentSkills.includes(v)) {
           setFormData({...formData, skills: [...currentSkills, v]});
          }
        }}>
         <SelectTrigger className="rounded-xl h-12 border-slate-200 dark:border-slate-800">
          <SelectValue placeholder="Selecione as habilidades" />
         </SelectTrigger>
         <SelectContent>
          {["Gestão Administrativa", "Gestão de Pessoal", "Comercial", "Marketing", "Finanças", "Operacional", "Tecnologia"].map(skill => (
           <SelectItem key={skill} value={skill}>{skill}</SelectItem>
          ))}
         </SelectContent>
        </Select>
        {formData.skills?.length > 0 && (
         <div className="flex flex-wrap gap-2 mt-2">
          {formData.skills.map((s: string) => (
           <div key={s} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
            {s}
            <button 
             onClick={() => setFormData({...formData, skills: formData.skills.filter((item: string) => item !== s)})}
             className="hover:text-primary/70"
            >
             <X className="h-3 w-3" />
            </button>
           </div>
          ))}
         </div>
        )}
       </div>
      </div>
     );
    case 4:
     return (
      <div className="space-y-6">
       <div className="space-y-2">
        <Label>Setores de Interesse (Padrão ABF)</Label>
        <Select onValueChange={(v) => {
         const currentSectors = formData.sectors || [];
         if (!currentSectors.includes(v)) {
          setFormData({...formData, sectors: [...currentSectors, v]});
         }
        }}>
         <SelectTrigger className="rounded-xl h-12 border-slate-200 dark:border-slate-800">
          <SelectValue placeholder="Selecione os setores" />
         </SelectTrigger>
         <SelectContent>
          {["Alimentação", "Saúde, Beleza e Bem-Estar", "Serviços e Outros Negócios", "Educação", "Tecnologia", "Moda", "Casa e Construção", "Automotivo", "Hotelaria e Turismo", "Limpeza e Conservação", "Comunicação", "Indústria"].map(sector => (
           <SelectItem key={sector} value={sector}>{sector}</SelectItem>
          ))}
         </SelectContent>
        </Select>
        {formData.sectors?.length > 0 && (
         <div className="flex flex-wrap gap-2 mt-2">
          {formData.sectors.map((s: string) => (
           <div key={s} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
            {s}
            <button 
             onClick={() => setFormData({...formData, sectors: formData.sectors.filter((item: string) => item !== s)})}
             className="hover:text-primary/70"
            >
             <X className="h-3 w-3" />
            </button>
           </div>
          ))}
         </div>
        )}
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
      <div className="space-y-6">
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
         <Label className="text-sm font-medium">Faturamento Mensal Médio</Label>
         <Input 
          placeholder="R$ 0,00" 
          className="h-11 rounded-md border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
         />
        </div>
        <div className="space-y-2">
         <Label className="text-sm font-medium">Lucratividade Média (%)</Label>
         <Input 
          placeholder="0%" 
          className="h-11 rounded-md border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
         />
        </div>
       </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
         <Label className="text-sm font-medium">ROI (Meses)</Label>
         <Input 
          placeholder="0" 
          className="h-11 rounded-md border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
         />
        </div>
        <div className="space-y-2">
         <Label className="text-sm font-medium">Ticket Médio</Label>
         <Input 
          placeholder="R$ 0,00" 
          className="h-11 rounded-md border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
         />
        </div>
       </div>
       <div className="space-y-4 pt-2">
        <div className="flex justify-between items-center">
         <Label className="text-sm font-medium">Grau de dependência do dono</Label>
         <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">70%</span>
        </div>
        <Slider defaultValue={[70]} max={100} step={10} className="w-full py-2" />
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
    <Card className="w-full max-w-2xl border-slate-200 dark:border-slate-800 dark:bg-slate-900 rounded-lg overflow-hidden">
     <CardHeader className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 pt-8 pb-6">
       <div className="flex justify-center mb-6">
        <img 
         src={settings.darkMode ? logoWhite : logoColor} 
         alt="V5 Partners" 
         className="h-10 w-auto object-contain" 
        />
       </div>
       <div className="flex flex-col items-center mb-6 relative min-h-[64px] justify-center">
        <div className="sm:absolute left-0 top-1/2 sm:-translate-y-1/2 mb-2 sm:mb-0">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLocation("/escolha-de-perfil")} 
            className="h-8 px-2 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"
          >
            <User className="h-3 w-3" />
            Trocar ({role === 'investor' ? 'Investidor' : role === 'seller' ? 'Vendedor' : 'Franqueadora'})
          </Button>
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white text-center">{getStepTitle()}</CardTitle>
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
     <CardFooter className="p-4 sm:p-8 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex flex-row justify-between items-center gap-2 sm:gap-4">
      <Button variant="ghost" onClick={handleBack} className="h-10 sm:h-12 rounded-md px-3 sm:px-6 font-semibold text-slate-600 dark:text-slate-400 text-sm sm:text-base whitespace-nowrap">
       <ChevronLeft className="mr-1 sm:mr-2 h-4 w-4" /> Voltar
      </Button>
      <Button onClick={handleNext} className="h-10 sm:h-12 rounded-md px-4 sm:px-8 font-bold bg-primary text-white hover:bg-primary/90 text-sm sm:text-base flex-1 sm:flex-none">
       <span className="truncate">
        {step === totalSteps ? "Finalizar Cadastro" : "Próximo Passo"}
       </span>
       <ChevronRight className="ml-1 sm:ml-2 h-4 w-4 flex-shrink-0" />
      </Button>
     </CardFooter>
    </Card>
   </div>
  </Layout>
 );
}
