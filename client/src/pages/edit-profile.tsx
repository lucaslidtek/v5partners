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
import { ChevronRight, ChevronLeft, Upload, X, Lock } from "lucide-react";
import React from "react";

export default function EditProfilePage() {
  const { user, updateUserData } = useAuth();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>(user || {});
  const [profilePhoto, setProfilePhoto] = useState<string | undefined>(user?.profilePhoto);

  const role = user?.role || "investor";
  const totalSteps = role === "investor" ? 4 : 5;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setProfilePhoto(base64);
        setFormData({ ...formData, profilePhoto: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      updateUserData(formData);
      setLocation("/perfil");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else if (step === 1) {
      setLocation("/perfil");
    }
  };

  const getStepTitle = () => {
    if (role === "investor") {
      switch (step) {
        case 1: return "Informações Pessoais";
        case 2: return "Perfil de Investimento";
        case 3: return "Experiência Profissional";
        case 4: return "Preferências do Negócio";
        default: return "";
      }
    } else if (role === "seller") {
      switch (step) {
        case 1: return "Identificação e Setor";
        case 2: return "Tamanho da Operação";
        case 3: return "Estrutura e Momento";
        case 4: return "Informações do Deal";
        case 5: return "Confirmação";
        default: return "";
      }
    } else {
      switch (step) {
        case 1: return "Identificação da Franquia";
        case 2: return "Investimento e Retorno";
        case 3: return "Perfil do Franqueado";
        case 4: return "Expansão e Suporte";
        case 5: return "Confirmação";
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
              <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
                <Label className="block mb-3">Foto de Perfil (Opcional)</Label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {profilePhoto ? (
                      <div className="relative w-20 h-20">
                        <img src={profilePhoto} alt="Perfil" className="w-20 h-20 rounded-full object-cover" />
                        <button
                          onClick={() => setProfilePhoto(undefined)}
                          className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/80"
                          data-testid="button-remove-photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                        <Upload className="w-6 h-6 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" asChild>
                        <span data-testid="button-upload-photo">Escolher Foto</span>
                      </Button>
                    </label>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      data-testid="input-photo-upload"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">JPG ou PNG, máx. 5MB</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input 
                    defaultValue={user?.name} 
                    placeholder="Ex: João Silva"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Idade</Label>
                  <Select defaultValue={user?.ageRange} onValueChange={(v) => setFormData({...formData, ageRange: v})}>
                    <SelectTrigger data-testid="select-age">
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
                <Input 
                  defaultValue={user?.location} 
                  placeholder="Ex: São Paulo, SP" 
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  data-testid="input-location"
                />
              </div>
              <div className="space-y-2">
                <Label>Formação (Opcional)</Label>
                <Input 
                  defaultValue={user?.education}
                  placeholder="Ex: Administração de Empresas" 
                  onChange={(e) => setFormData({...formData, education: e.target.value})}
                  data-testid="input-education"
                />
              </div>
            </div>
          );
        case 2:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Faixa de Investimento Disponível</Label>
                <Select defaultValue={user?.investmentRange} onValueChange={(v) => setFormData({...formData, investmentRange: v})}>
                  <SelectTrigger data-testid="select-investment">
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
                <Select defaultValue={user?.roiTime} onValueChange={(v) => setFormData({...formData, roiTime: v})}>
                  <SelectTrigger data-testid="select-roi">
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
        case 3:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Já teve empresa anteriormente?</Label>
                <div className="flex gap-4">
                  <Button 
                    variant={formData.hasExperience === true ? "default" : "outline"} 
                    className={`flex-1 ${formData.hasExperience === true ? "" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"}`}
                    onClick={() => setFormData({...formData, hasExperience: true})}
                    data-testid="button-experience-yes"
                  >
                    Sim
                  </Button>
                  <Button 
                    variant={formData.hasExperience === false ? "default" : "outline"} 
                    className={`flex-1 ${formData.hasExperience === false ? "" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"}`}
                    onClick={() => setFormData({...formData, hasExperience: false})}
                    data-testid="button-experience-no"
                  >
                    Não
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Setores de Experiência</Label>
                <Input 
                  defaultValue={user?.experienceSectors}
                  placeholder="Ex: Varejo, Tecnologia, Saúde..." 
                  onChange={(e) => setFormData({...formData, experienceSectors: e.target.value})}
                  data-testid="input-sectors"
                />
              </div>
              <div className="space-y-2">
                <Label>Habilidades Predominantes</Label>
                <div className="flex flex-wrap gap-2">
                  {["Gestão", "Comercial", "Marketing", "Finanças", "Operacional", "RH"].map(skill => (
                    <div key={skill} className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                      <Checkbox id={`skill-${skill}`} />
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
                <Label>Setores de Interesse</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Alimentação", "Saúde & Beleza", "Serviços", "Educação", "Tecnologia", "Moda", "Casa & Construção", "Automotivo"].map(sector => (
                    <div key={sector} className="flex items-center space-x-2">
                      <Checkbox id={`sector-${sector}`} />
                      <label htmlFor={`sector-${sector}`} className="text-sm cursor-pointer">{sector}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Grau de Envolvimento Operacional</Label>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{formData.operationalInvolvement || user?.operationalInvolvement || 50}%</span>
                  </div>
                  <Slider 
                    defaultValue={[user?.operationalInvolvement || 50]}
                    max={100}
                    step={10}
                    onValueChange={(v) => setFormData({...formData, operationalInvolvement: v[0]})}
                    data-testid="slider-involvement"
                  />
                  <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span>Investidor Ausente</span>
                    <span>Operação Full-time</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Tolerância ao Risco</Label>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{formData.riskTolerance || user?.riskTolerance || 50}%</span>
                  </div>
                  <Slider 
                    defaultValue={[user?.riskTolerance || 50]}
                    max={100}
                    step={10}
                    onValueChange={(v) => setFormData({...formData, riskTolerance: v[0]})}
                    data-testid="slider-risk"
                  />
                  <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span>Baixo Risco</span>
                    <span>Alto Risco</span>
                  </div>
                </div>
              </div>
            </div>
          );
      }
    } else if (role === "seller") {
      switch (step) {
        case 1:
          return (
            <div className="space-y-4">
              <Alert className="border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950">
                <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="text-amber-800 dark:text-amber-200">
                  <strong>Informações Confidenciais:</strong> Seu nome e logo só serão visíveis para investidores <strong>após o NDA ser assinado</strong>. Antes disso, aparecerão como "Empresa Confidencial".
                </AlertDescription>
              </Alert>
              
              <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
                <Label className="block mb-3">Foto de Perfil (Opcional)</Label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {profilePhoto ? (
                      <div className="relative w-20 h-20">
                        <img src={profilePhoto} alt="Perfil" className="w-20 h-20 rounded-full object-cover" />
                        <button
                          onClick={() => setProfilePhoto(undefined)}
                          className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/80"
                          data-testid="button-remove-photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                        <Upload className="w-6 h-6 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" asChild>
                        <span data-testid="button-upload-photo">Escolher Foto</span>
                      </Button>
                    </label>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      data-testid="input-photo-upload"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">JPG ou PNG, máx. 5MB</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Nome Fantasia</Label>
                <Input 
                  defaultValue={user?.tradeName}
                  placeholder="Ex: TechFlow Solutions"
                  onChange={(e) => setFormData({...formData, tradeName: e.target.value})}
                  data-testid="input-tradename"
                />
              </div>
              <div className="space-y-2">
                <Label>Cidade / Estado</Label>
                <Input 
                  defaultValue={user?.location}
                  placeholder="Ex: Curitiba, PR" 
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  data-testid="input-location"
                />
              </div>
              <div className="space-y-2">
                <Label>Segmento de Atuação</Label>
                <Select defaultValue={user?.segment} onValueChange={(v) => setFormData({...formData, segment: v})}>
                  <SelectTrigger data-testid="select-segment">
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
            </div>
          );
        case 2:
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Faturamento Mensal Médio</Label>
                  <Input 
                    defaultValue={user?.monthlyRevenue}
                    placeholder="R$ 0,00" 
                    onChange={(e) => setFormData({...formData, monthlyRevenue: e.target.value})}
                    data-testid="input-revenue"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Lucro Líquido / EBITDA</Label>
                  <Input 
                    defaultValue={user?.ebitda}
                    placeholder="R$ 0,00" 
                    onChange={(e) => setFormData({...formData, ebitda: e.target.value})}
                    data-testid="input-ebitda"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ticket Médio</Label>
                  <Input 
                    defaultValue={user?.ticketAverage}
                    placeholder="R$ 0,00" 
                    onChange={(e) => setFormData({...formData, ticketAverage: e.target.value})}
                    data-testid="input-ticket"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nº Funcionários</Label>
                  <Input 
                    defaultValue={user?.employees}
                    type="number" 
                    placeholder="0" 
                    onChange={(e) => setFormData({...formData, employees: e.target.value})}
                    data-testid="input-employees"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Grau de dependência do dono</Label>
                <Slider 
                  defaultValue={[user?.ownerDependence || 70]}
                  max={100}
                  step={10}
                  onValueChange={(v) => setFormData({...formData, ownerDependence: v[0]})}
                  data-testid="slider-dependence"
                />
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>Baixa (Gestão Profissional)</span>
                  <span>Alta (Dono Operacional)</span>
                </div>
              </div>
            </div>
          );
        case 3:
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Motivo da Venda</Label>
                <Select defaultValue={user?.sellReason} onValueChange={(v) => setFormData({...formData, sellReason: v})}>
                  <SelectTrigger data-testid="select-reason">
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
                      variant={formData.stage === stage ? "default" : "outline"} 
                      className="flex-1 text-sm border-slate-200 dark:border-slate-700"
                      onClick={() => setFormData({...formData, stage})}
                      data-testid={`button-stage-${stage.toLowerCase()}`}
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
                    className={`flex-1 ${formData.liabilities === true ? "" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"}`}
                    onClick={() => setFormData({...formData, liabilities: true})}
                    data-testid="button-liabilities-yes"
                  >
                    Sim
                  </Button>
                  <Button 
                    variant={formData.liabilities === false ? "default" : "outline"} 
                    className={`flex-1 ${formData.liabilities === false ? "" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"}`}
                    onClick={() => setFormData({...formData, liabilities: false})}
                    data-testid="button-liabilities-no"
                  >
                    Não
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
                <Input 
                  defaultValue={user?.valuation}
                  placeholder="R$ 0,00" 
                  className="text-lg font-semibold text-primary"
                  onChange={(e) => setFormData({...formData, valuation: e.target.value})}
                  data-testid="input-valuation"
                />
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
                <Select defaultValue={user?.propertyInvolved}>
                  <SelectTrigger data-testid="select-property">
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
        case 5:
          return (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Resumo das Alterações</h3>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>✓ Informações da empresa atualizadas</li>
                  <li>✓ Dados operacionais revisados</li>
                  <li>✓ Informações financeiras ajustadas</li>
                  <li>✓ Termos de venda atualizados</li>
                  {profilePhoto && <li>✓ Foto de perfil adicionada</li>}
                </ul>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Clique em "Finalizar" para confirmar todas as alterações ao seu perfil.</p>
            </div>
          );
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="border-slate-200 dark:border-slate-700 shadow-md dark:bg-slate-900">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={handleBack} disabled={step === 1 && !user} data-testid="button-back-header">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider" data-testid="text-role">
                {role === 'investor' ? 'Investidor' : role === 'seller' ? 'Vendedor' : 'Franqueadora'}
              </span>
              <div className="w-10" />
            </div>
            <CardTitle className="text-2xl font-bold text-center dark:text-white" data-testid="text-step-title">{getStepTitle()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
              <span data-testid="text-step-counter">Passo {step} de {totalSteps}</span>
              <span data-testid="text-step-percent">{Math.round((step / totalSteps) * 100)}% Completo</span>
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
            <Button 
              variant="ghost" 
              onClick={handleBack} 
              disabled={step === 1 && !user}
              className="hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary"
              data-testid="button-back-footer"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
            <Button 
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90"
              data-testid="button-next-footer"
            >
              {step === totalSteps ? "Finalizar" : "Próximo"} 
              {step !== totalSteps && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
