import { useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/context";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Upload, X, Lock, Check } from "lucide-react";
import React from "react";

export default function EditProfilePage() {
  const { user, updateUserData, settings } = useAuth();
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
    } else {
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
              <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
                <Label className="block mb-3">Foto de Perfil (Opcional)</Label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {profilePhoto ? (
                      <div className="relative w-20 h-20">
                        <img src={profilePhoto} alt="Perfil" className="w-20 h-20 rounded-full object-cover" />
                        <button onClick={() => setProfilePhoto(undefined)} className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"><X className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
                        <Upload className="w-6 h-6 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Button variant="outline" className="h-11 rounded-md border-slate-200 dark:border-slate-800 font-semibold border-slate-200 dark:border-slate-800" asChild>
                        <span>Escolher Foto</span>
                      </Button>
                    </label>
                    <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input defaultValue={user?.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="h-11 rounded-md border-slate-200 dark:border-slate-800" />
                </div>
                <div className="space-y-2">
                  <Label>Idade</Label>
                  <Select defaultValue={user?.ageRange} onValueChange={(v) => setFormData({...formData, ageRange: v})}>
                    <SelectTrigger className="h-11 rounded-md border-slate-200 dark:border-slate-800 border-slate-200 dark:border-slate-800">
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
            </div>
          );
        case 2:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Investimento Disponível</Label>
                <Select defaultValue={user?.investmentRange} onValueChange={(v) => setFormData({...formData, investmentRange: v})}>
                  <SelectTrigger className="h-11 rounded-md border-slate-200 dark:border-slate-800 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Selecione" />
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
                     <div key={opt} className="flex items-center space-x-2 border border-slate-200 dark:border-slate-800 p-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer" onClick={() => document.getElementById(`opt-${opt}`)?.click()}>
                       <Checkbox id={`opt-${opt}`} className="rounded-sm" />
                       <label htmlFor={`opt-${opt}`} className="text-sm font-medium cursor-pointer w-full">{opt}</label>
                     </div>
                   ))}
                </div>
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
                    variant={(formData.hasExperience === undefined ? user?.hasExperience : formData.hasExperience) === true ? "default" : "outline"} 
                    className={`flex-1 h-11 rounded-md ${(formData.hasExperience === undefined ? user?.hasExperience : formData.hasExperience) === true ? "bg-primary text-white" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                    onClick={() => setFormData({...formData, hasExperience: true})}
                  >Sim</Button>
                  <Button 
                    type="button"
                    variant={(formData.hasExperience === undefined ? user?.hasExperience : formData.hasExperience) === false ? "default" : "outline"} 
                    className={`flex-1 h-11 rounded-md ${(formData.hasExperience === undefined ? user?.hasExperience : formData.hasExperience) === false ? "bg-primary text-white" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                    onClick={() => setFormData({...formData, hasExperience: false})}
                  >Não</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Habilidades Predominantes</Label>
                <div className="flex flex-wrap gap-2">
                  {["Gestão Administrativa", "Gestão de Pessoal", "Comercial", "Marketing", "Finanças", "Operacional", "Tecnologia"].map(skill => (
                    <div key={skill} className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer" onClick={() => document.getElementById(`skill-edit-${skill}`)?.click()}>
                      <Checkbox id={`skill-edit-${skill}`} className="rounded-sm" />
                      <label htmlFor={`skill-edit-${skill}`} className="text-sm font-medium cursor-pointer">{skill}</label>
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
                <Label>Setores de Interesse (ABF)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Alimentação", "Saúde", "Serviços", "Educação", "Tecnologia", "Moda", "Casa", "Automotivo", "Turismo", "Limpeza", "Comunicação", "Indústria"].map(sector => (
                    <div key={sector} className="flex items-center space-x-2 border border-slate-200 dark:border-slate-800 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer" onClick={() => document.getElementById(`sector-edit-${sector}`)?.click()}>
                      <Checkbox id={`sector-edit-${sector}`} className="rounded-sm" />
                      <label htmlFor={`sector-edit-${sector}`} className="text-sm cursor-pointer w-full">{sector}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
      }
    }

    if (role === "seller") {
      switch (step) {
        case 1:
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome Fantasia</Label>
                <Input defaultValue={user?.tradeName} onChange={(e) => setFormData({...formData, tradeName: e.target.value})} className="h-11 rounded-md border-slate-200 dark:border-slate-800" />
              </div>
              <div className="space-y-2">
                <Label>Segmento (ABF)</Label>
                <Select defaultValue={user?.segment} onValueChange={(v) => setFormData({...formData, segment: v})}>
                  <SelectTrigger className="h-11 rounded-md border-slate-200 dark:border-slate-800 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Alimentação", "Saúde", "Serviços", "Educação", "Tecnologia", "Moda", "Casa", "Automotivo", "Turismo", "Limpeza", "Comunicação", "Indústria"].map(s => (
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
                  <Label>Faturamento Mensal</Label>
                  <Input defaultValue={user?.monthlyRevenue} onChange={(e) => setFormData({...formData, monthlyRevenue: e.target.value})} className="h-11 rounded-md border-slate-200 dark:border-slate-800" />
                </div>
                <div className="space-y-2">
                  <Label>Lucratividade (%)</Label>
                  <Input defaultValue={user?.profitability} onChange={(e) => setFormData({...formData, profitability: e.target.value})} className="h-11 rounded-md border-slate-200 dark:border-slate-800" />
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
                  <SelectTrigger className="h-11 rounded-md border-slate-200 dark:border-slate-800 border-slate-200 dark:border-slate-800">
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
                      variant={(formData.stage === undefined ? user?.stage : formData.stage) === stage ? "default" : "outline"} 
                      className={`flex-1 h-11 h-11 rounded-md text-sm ${(formData.stage === undefined ? user?.stage : formData.stage) === stage ? "bg-primary text-white" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"}`}
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
                    variant={(formData.liabilities === undefined ? user?.liabilities : formData.liabilities) === true ? "default" : "outline"} 
                    className={`flex-1 h-11 rounded-md ${(formData.liabilities === undefined ? user?.liabilities : formData.liabilities) === true ? "bg-primary text-white" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                    onClick={() => setFormData({...formData, liabilities: true})}
                  >Sim</Button>
                  <Button 
                    type="button"
                    variant={(formData.liabilities === undefined ? user?.liabilities : formData.liabilities) === false ? "default" : "outline"} 
                    className={`flex-1 h-11 rounded-md ${(formData.liabilities === undefined ? user?.liabilities : formData.liabilities) === false ? "bg-primary text-white" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                    onClick={() => setFormData({...formData, liabilities: false})}
                  >Não</Button>
                </div>
              </div>
            </div>
          );
        case 4:
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Valor Pedido (Valuation)</Label>
                <Input defaultValue={user?.valuation} onChange={(e) => setFormData({...formData, valuation: e.target.value})} className="h-11 rounded-md border-slate-200 dark:border-slate-800 text-lg font-semibold text-primary" />
              </div>
              <div className="space-y-2">
                <Label>Imóvel Próprio incluído?</Label>
                <Select defaultValue={user?.propertyInvolved} onValueChange={(v) => setFormData({...formData, propertyInvolved: v})}>
                  <SelectTrigger className="h-11 rounded-md border-slate-200 dark:border-slate-800 border-slate-200 dark:border-slate-800">
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
          return <p className="text-center py-8">Confirme as alterações clicando em Salvar.</p>;
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="border-slate-200 dark:border-slate-800 shadow-md dark:bg-slate-900 rounded-lg overflow-hidden">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={handleBack} className="h-10 w-10"><ChevronLeft className="h-5 w-5" /></Button>
              <span className="text-sm font-bold text-primary uppercase tracking-widest">{role === 'investor' ? 'Investidor' : role === 'seller' ? 'Vendedor' : 'Franqueadora'}</span>
              <div className="w-10" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">{getStepTitle()}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
          <CardFooter className="p-8 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-between">
            <Button variant="ghost" onClick={handleBack} className="h-12 rounded-md px-6">Voltar</Button>
            <Button onClick={handleNext} className="h-12 rounded-md px-8 font-bold bg-primary text-white hover:bg-primary/90">
              {step === totalSteps ? "Salvar Alterações" : "Próximo Passo"} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
