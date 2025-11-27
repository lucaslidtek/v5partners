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
import { ChevronRight, ChevronLeft } from "lucide-react";

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
    } else if (step === 1) {
      setLocation("/profile-selection");
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

    // SELLER FLOW (Empresa à Venda)
    if (role === "seller") {
      switch (step) {
        case 1: // Identificação e Setor
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome Fantasia (Opcional)</Label>
                <Input 
                  placeholder="Se desejar manter confidencial, deixe em branco" 
                  onChange={(e) => setFormData({...formData, tradeName: e.target.value})}
                />
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
                     <div key={opt} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-slate-50 cursor-pointer">
                       <Checkbox id={opt} />
                       <label htmlFor={opt} className="text-sm font-medium w-full cursor-pointer">{opt}</label>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          );
        case 2: // Tamanho da Operação
          return (
            <div className="space-y-4">
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
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Baixa (Gestão Profissional)</span>
                  <span>Alta (Dono Operacional)</span>
                </div>
              </div>
            </div>
          );
        case 3: // Estrutura e Momento
          return (
            <div className="space-y-4">
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
                      className="flex-1 text-sm border-slate-200"
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
                   <Button variant="outline" className="flex-1" onClick={() => setFormData({...formData, liabilities: true})}>Sim</Button>
                   <Button variant="outline" className="flex-1" onClick={() => setFormData({...formData, liabilities: false})}>Não</Button>
                 </div>
              </div>
            </div>
          );
        case 4: // Informações do Deal
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Valor Pedido (Valuation)</Label>
                <Input placeholder="R$ 0,00" className="text-lg font-semibold text-primary" />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Transação Aceita</Label>
                 <div className="grid grid-cols-1 gap-2">
                   {["Venda Total (100%)", "Venda Parcial (Sócio Majoritário)", "Venda Parcial (Sócio Minoritário)"].map((opt) => (
                     <div key={opt} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-slate-50 cursor-pointer">
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
              <div className="space-y-2">
                <Label>Nome da Franquia</Label>
                <Input 
                  onChange={(e) => setFormData({...formData, franchiseName: e.target.value})}
                />
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
                     <div key={opt} className="flex items-center space-x-2 border p-2 rounded-md hover:bg-slate-50 cursor-pointer">
                       <Checkbox id={opt} />
                       <label htmlFor={opt} className="text-sm w-full cursor-pointer">{opt}</label>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          );
        case 2: // Investimento
          return (
             <div className="space-y-4">
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
                  <div className="text-right text-sm text-slate-500 mt-1">24 meses</div>
               </div>
             </div>
          );
        case 3: // Perfil do Franqueado
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Perfil Ideal</Label>
                <div className="flex gap-4">
                   <Button variant="outline" className="flex-1" onClick={() => setFormData({...formData, operatorType: 'investor'})}>Investidor</Button>
                   <Button variant="outline" className="flex-1" onClick={() => setFormData({...formData, operatorType: 'operator'})}>Operador</Button>
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
                    <div key={skill} className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full">
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
                     <Button variant="outline" className="flex-1">Sim</Button>
                     <Button variant="outline" className="flex-1">Não</Button>
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
        <Card className="border-slate-200 shadow-md">
          <CardHeader>
             <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="icon" onClick={handleBack} disabled={step === 1 && !user}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                   {role === 'investor' ? 'Investidor' : role === 'seller' ? 'Vendedor' : 'Franqueadora'}
                </span>
                <div className="w-10" /> {/* Spacer */}
             </div>
             <CardTitle className="text-2xl font-bold text-center">{getStepTitle()}</CardTitle>
          </CardHeader>
          <CardContent>
           <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
             <span>Passo {step} de {totalSteps}</span>
             <span>{Math.round((step / totalSteps) * 100)}% Completo</span>
           </div>
           <div className="h-2 w-full bg-slate-100 rounded-full mb-8">
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
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="ghost" onClick={handleBack} disabled={step === 1 && !user} className="hover:bg-slate-50 hover:text-primary">
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
