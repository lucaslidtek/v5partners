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
import { ChevronRight, ChevronLeft, ArrowLeft, Upload, X } from "lucide-react";

export default function EditProfilePage() {
  const { user, updateUserData } = useAuth();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>(user || {});
  const [profilePhoto, setProfilePhoto] = useState<string | undefined>(user?.profilePhoto);

  const role = user?.role || "investor";
  const totalSteps = 5;

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

  const renderStepContent = () => {
    if (role === "investor") {
      switch (step) {
        case 1:
          return (
            <div className="space-y-6">
              <div>
                <Label className="mb-4 block">Foto de Perfil (Opcional)</Label>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    {profilePhoto ? (
                      <div className="relative w-24 h-24">
                        <img src={profilePhoto} alt="Perfil" className="w-24 h-24 rounded-full object-cover" />
                        <button
                          onClick={() => setProfilePhoto(undefined)}
                          className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/80"
                          data-testid="button-remove-photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Button variant="outline" asChild>
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
                <Label>Localização</Label>
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
                <Label>Faixa de Investimento</Label>
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
              <div className="space-y-3">
                <Label>Experiência Anterior em Empresas</Label>
                <div className="grid gap-2">
                  {["Sim", "Não"].map((opt) => (
                    <div key={opt} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                      <Checkbox id={opt} />
                      <label htmlFor={opt} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full">{opt}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Setores de Experiência (Opcional)</Label>
                <Input 
                  defaultValue={user?.experienceSectors}
                  placeholder="Ex: Varejo, Tecnologia, Saúde" 
                  onChange={(e) => setFormData({...formData, experienceSectors: e.target.value})}
                  data-testid="input-sectors"
                />
              </div>

              <div className="space-y-2">
                <Label>Habilidades Predominantes (Opcional)</Label>
                <Input 
                  defaultValue={user?.skills}
                  placeholder="Ex: Gestão, Comercial, Marketing" 
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
                  defaultValue={user?.interestSectors}
                  placeholder="Ex: Alimentação, Saúde & Beleza, Tecnologia" 
                  onChange={(e) => setFormData({...formData, interestSectors: e.target.value})}
                  data-testid="input-interest"
                />
              </div>

              <div className="space-y-2">
                <Label>Grau de Envolvimento Operacional ({formData.operationalInvolvement || user?.operationalInvolvement || 50}%)</Label>
                <Slider 
                  defaultValue={[user?.operationalInvolvement || 50]}
                  max={100}
                  step={10}
                  onValueChange={(v) => setFormData({...formData, operationalInvolvement: v[0]})}
                  data-testid="slider-involvement"
                />
              </div>

              <div className="space-y-2">
                <Label>Tolerância ao Risco ({formData.riskTolerance || user?.riskTolerance || 50}%)</Label>
                <Slider 
                  defaultValue={[user?.riskTolerance || 50]}
                  max={100}
                  step={10}
                  onValueChange={(v) => setFormData({...formData, riskTolerance: v[0]})}
                  data-testid="slider-risk"
                />
              </div>
            </div>
          );
        case 5:
          return (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Resumo das Alterações</h3>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>✓ Informações pessoais atualizadas</li>
                  <li>✓ Preferências de investimento revisadas</li>
                  <li>✓ Experiência e habilidades atualizadas</li>
                  <li>✓ Interesses e tolerância ao risco ajustados</li>
                  {profilePhoto && <li>✓ Foto de perfil adicionada</li>}
                </ul>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Clique em "Salvar" para confirmar todas as alterações ao seu perfil.</p>
            </div>
          );
      }
    } else if (role === "seller") {
      switch (step) {
        case 1:
          return (
            <div className="space-y-6">
              <div>
                <Label className="mb-4 block">Foto de Perfil (Opcional)</Label>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    {profilePhoto ? (
                      <div className="relative w-24 h-24">
                        <img src={profilePhoto} alt="Perfil" className="w-24 h-24 rounded-full object-cover" />
                        <button
                          onClick={() => setProfilePhoto(undefined)}
                          className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/80"
                          data-testid="button-remove-photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Button variant="outline" asChild>
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
                <Label>Email</Label>
                <Input 
                  defaultValue={user?.email}
                  type="email"
                  placeholder="seu@email.com"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  data-testid="input-email"
                />
              </div>
              <div className="space-y-2">
                <Label>Nome Fantasia da Empresa</Label>
                <Input 
                  defaultValue={user?.tradeName}
                  placeholder="Ex: TechFlow Solutions"
                  onChange={(e) => setFormData({...formData, tradeName: e.target.value})}
                  data-testid="input-tradename"
                />
              </div>
              <div className="space-y-2">
                <Label>Localização</Label>
                <Input 
                  defaultValue={user?.location}
                  placeholder="Ex: São Paulo, SP" 
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  data-testid="input-location"
                />
              </div>
            </div>
          );
        case 2:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Segmento</Label>
                <Input 
                  defaultValue={user?.segment}
                  placeholder="Ex: Tecnologia" 
                  onChange={(e) => setFormData({...formData, segment: e.target.value})}
                  data-testid="input-segment"
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Operação</Label>
                <Input 
                  defaultValue={user?.operationType}
                  placeholder="Ex: E-commerce" 
                  onChange={(e) => setFormData({...formData, operationType: e.target.value})}
                  data-testid="input-operation"
                />
              </div>
              <div className="space-y-2">
                <Label>Faturamento Mensal Médio</Label>
                <Input 
                  defaultValue={user?.monthlyRevenue}
                  placeholder="Ex: R$ 85.000" 
                  onChange={(e) => setFormData({...formData, monthlyRevenue: e.target.value})}
                  data-testid="input-revenue"
                />
              </div>
            </div>
          );
        case 3:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>EBITDA / Lucro Líquido</Label>
                <Input 
                  defaultValue={user?.ebitda}
                  placeholder="Ex: R$ 22.000" 
                  onChange={(e) => setFormData({...formData, ebitda: e.target.value})}
                  data-testid="input-ebitda"
                />
              </div>
              <div className="space-y-2">
                <Label>Número de Funcionários</Label>
                <Input 
                  defaultValue={user?.employees}
                  placeholder="Ex: 8" 
                  onChange={(e) => setFormData({...formData, employees: e.target.value})}
                  data-testid="input-employees"
                />
              </div>
              <div className="space-y-2">
                <Label>Estágio do Negócio</Label>
                <Input 
                  defaultValue={user?.stage}
                  placeholder="Ex: Estável" 
                  onChange={(e) => setFormData({...formData, stage: e.target.value})}
                  data-testid="input-stage"
                />
              </div>
            </div>
          );
        case 4:
          return (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Motivo da Venda</Label>
                <Input 
                  defaultValue={user?.sellReason}
                  placeholder="Ex: Novos Projetos" 
                  onChange={(e) => setFormData({...formData, sellReason: e.target.value})}
                  data-testid="input-reason"
                />
              </div>
              <div className="space-y-2">
                <Label>Valor Pedido (Valuation)</Label>
                <Input 
                  defaultValue={user?.valuation}
                  placeholder="Ex: R$ 650.000" 
                  onChange={(e) => setFormData({...formData, valuation: e.target.value})}
                  data-testid="input-valuation"
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Transação Aceita</Label>
                <Input 
                  defaultValue={user?.transactionType}
                  placeholder="Ex: Venda Total (100%)" 
                  onChange={(e) => setFormData({...formData, transactionType: e.target.value})}
                  data-testid="input-transaction"
                />
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
              <p className="text-slate-600 dark:text-slate-400 text-sm">Clique em "Salvar" para confirmar todas as alterações ao seu perfil.</p>
            </div>
          );
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
          onClick={() => setLocation('/perfil')}
          data-testid="button-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2" data-testid="text-title">Editar Perfil</h1>
          <div className="flex justify-between items-center mt-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  i + 1 <= step 
                    ? 'bg-primary text-white' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>
                  {i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                    i + 1 < step ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="dark:bg-slate-900 dark:border-slate-800" data-testid="card-edit-form">
          <CardHeader>
            <CardTitle data-testid="text-step-title">
              {step === 1 && "Informações Pessoais"}
              {step === 2 && "Preferências de Investimento"}
              {step === 3 && "Experiência e Habilidades"}
              {step === 4 && "Interesses e Tolerância"}
              {step === 5 && "Confirmação"}
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack}
              data-testid="button-back-step"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
            <Button 
              onClick={handleNext}
              data-testid="button-next-step"
            >
              {step === totalSteps ? "Salvar" : "Próximo"} 
              {step !== totalSteps && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
