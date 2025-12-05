import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function ValuationPage() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
          onClick={() => setLocation('/dashboard')}
          data-testid="button-back-valuation"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Dashboard
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Novo Valuation</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Inicie uma nova avaliação de empresa com nossa tecnologia proprietária</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="h-full border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Ferramenta de Valuation Inteligente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">1</span>
                    Métodos Utilizados
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: "Fluxo de Caixa Descontado", value: "DCF" },
                      { label: "Múltiplos de Mercado", value: "Market" },
                      { label: "Valor Patrimonial", value: "Asset" }
                    ].map((method) => (
                      <div key={method.value} className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center shadow-sm hover:border-primary/50 transition-colors cursor-default">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{method.value}</div>
                        <div className="font-medium text-slate-700 dark:text-slate-300 text-sm">{method.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">2</span>
                    Dados Necessários
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {["DRE dos últimos 3 anos", "Projeção de faturamento", "Estrutura de custos", "Investimentos previstos (Capex)"].map((item) => (
                       <li key={item} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                         {item}
                       </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    Iniciar Nova Avaliação Gratuitamente
                  </Button>
                  <p className="text-center text-xs text-slate-400 mt-4">Tempo estimado: 15-20 minutos</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
             <Card className="bg-slate-900 text-white border-slate-800 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -ml-32 -mb-32" />
                
                <CardContent className="relative z-10 flex flex-col h-full justify-center py-12">
                   <div className="mb-8 text-center">
                      <div className="text-4xl font-bold mb-2">R$ 12.5M</div>
                      <div className="text-slate-400 text-sm uppercase tracking-wider">Valuation Médio</div>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Acuracidade</span>
                        <span className="text-green-400 font-bold">94%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-green-500 w-[94%]" />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Base Comparativa</span>
                        <span className="text-white font-bold">12k+ Empresas</span>
                      </div>
                      
                      <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 mt-8">
                        <p className="text-sm text-slate-300 italic">
                          "A ferramenta de valuation da V5 Partners foi essencial para negociarmos um valor justo na nossa rodada seed."
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-slate-700" />
                           <div className="text-xs">
                              <div className="font-bold text-white">CEO, TechStartup</div>
                              <div className="text-slate-500">SaaS B2B</div>
                           </div>
                        </div>
                      </div>
                   </div>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
