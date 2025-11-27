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
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";

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
      updateUserData(formData);
      setLocation("/summary");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepContent = () => {
    // INVESTOR FLOW
    if (role === "investor") {
      switch (step) {
        case 1: // Dados Básicos
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input 
                    defaultValue={user?.name} 
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
        case 2: // Capacidade Financeira
          return (
            <div className="space-y-6">
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
                     <div key={opt} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-slate-50 cursor-pointer">
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
        case 3: // Experiência
          return (
             <div className="space-y-6">
              <div className="space-y-2">
                <Label>Já teve empresa anteriormente?</Label>
                 <div className="flex gap-4">
                   <Button variant="outline" className="flex-1" onClick={() => setFormData({...formData, hasExperience: true})}>Sim</Button>
                   <Button variant="outline" className="flex-1" onClick={() => setFormData({...formData, hasExperience: false})}>Não</Button>
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
                    <div key={skill} className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full">
                       <Checkbox id={`skill-${skill}`} />
                       <label htmlFor={`skill-${skill}`} className="text-sm font-medium">{skill}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        case 4: // Preferências
           return (
             <div className="space-y-6">
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
                    <span className="text-xs text-slate-500">Moderado</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={10} className="w-full" />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Investidor Ausente</span>
                    <span>Operação Full-time</span>
                  </div>
                </div>

                 <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Tolerância ao Risco</Label>
                    <span className="text-xs text-slate-500">Conservador</span>
                  </div>
                  <Slider defaultValue={[30]} max={100} step={10} className="w-full" />
                   <div className="flex justify-between text-xs text-slate-400">
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
    
    // Fallback for other roles (simplified for prototype)
    return (
      <div className="text-center py-10 text-slate-500">
        Formulário para {role === 'seller' ? 'Vendedor' : 'Franqueadora'} em desenvolvimento.
        <br/>
        Clique em continuar para ver o resumo.
      </div>
    );
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
    }
    return "Cadastro";
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
           <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
             <span>Passo {step} de {totalSteps}</span>
             <span>{Math.round((step / totalSteps) * 100)}% Completo</span>
           </div>
           <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-primary"
               initial={{ width: 0 }}
               animate={{ width: `${(step / totalSteps) * 100}%` }}
               transition={{ duration: 0.3 }}
             />
           </div>
        </div>

        <Card className="border-0 shadow-xl shadow-slate-200/60">
          <CardHeader className="border-b border-slate-100 pb-6">
            <CardTitle className="text-2xl">{getStepTitle()}</CardTitle>
            <p className="text-slate-500">Preencha as informações abaixo para encontrarmos o match ideal.</p>
          </CardHeader>
          <CardContent className="pt-6 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-100 py-6">
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={step === 1}
              className="border-slate-200"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
              {step === totalSteps ? "Finalizar Cadastro" : "Continuar"} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
