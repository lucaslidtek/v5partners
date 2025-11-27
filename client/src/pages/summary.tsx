import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, ShieldCheck, Upload, Clock, ArrowRight } from "lucide-react";

export default function SummaryPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <div className="text-4xl">🎉</div>
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Quase Pronto!</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Complete seu perfil para desbloquear acesso total à plataforma e receber matches personalizados.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span className="text-slate-900">Progresso do Perfil</span>
            <span className="text-primary">75%</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[75%] rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Completed Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="text-secondary h-5 w-5" /> Etapas Concluídas
            </h3>
            <div className="space-y-3">
              {["Informações Básicas", "Perfil de Investimento", "Documentos Pessoais"].map((item) => (
                <Card key={item} className="border border-slate-200 shadow-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                       <CheckCircle2 className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{item}</p>
                      <p className="text-xs text-slate-500">Concluído</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="text-accent h-5 w-5" /> Próximas Etapas
            </h3>
             <div className="space-y-3">
                <Card className="border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500 rounded-bl-lg">
                    Alta Prioridade
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                         <Upload className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Comprovação de Renda</p>
                        <p className="text-xs text-slate-500">Para acessar oportunidades premium</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full bg-primary text-white hover:bg-primary/90">
                      <Upload className="mr-2 h-3 w-3" /> Enviar Documentos
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border border-slate-200 shadow-sm">
                   <div className="absolute top-4 right-4">
                      <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Crítica</span>
                   </div>
                   <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                         <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div className="pr-12">
                        <p className="font-medium text-slate-900">Verificação de Identidade</p>
                        <p className="text-xs text-slate-500">Validação obrigatória para contato com vendedores</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                      <Upload className="mr-2 h-3 w-3" /> Enviar Documentos
                    </Button>
                  </CardContent>
                </Card>
             </div>
          </div>
        </div>

        <Card className="bg-sky-50 border-sky-100 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-4">
              <span className="text-2xl mr-2">🚀</span>
              <h3 className="text-lg font-bold text-slate-900">Benefícios do Perfil Completo</h3>
            </div>
            <p className="text-center text-slate-600 text-sm mb-6">Veja o que você ganha ao finalizar sua verificação</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 "Acesso a oportunidades exclusivas e confidenciais",
                 "Matches mais precisos baseados em capacidade financeira",
                 "Contato direto com proprietários das empresas",
                 "Relatórios detalhados e due diligence inicial",
                 "Suporte especializado durante negociação"
               ].map(benefit => (
                 <div key={benefit} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span>{benefit}</span>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 h-12 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" onClick={() => setLocation("/dashboard")}>
            Finalizar Perfil Agora <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="flex-1 h-12 text-base border-slate-200 bg-white" onClick={() => setLocation("/dashboard")}>
            <Clock className="mr-2 h-4 w-4" /> Continuar Depois
          </Button>
        </div>

        <div className="mt-8 flex justify-center gap-4">
           <Button variant="ghost" size="sm" className="text-slate-500">
              <FileText className="mr-2 h-3 w-3" /> Ver Lista de Documentos
           </Button>
            <Button variant="ghost" size="sm" className="text-slate-500">
              <span className="mr-2">👤</span> Falar com Suporte
           </Button>
        </div>
      </div>
    </Layout>
  );
}
