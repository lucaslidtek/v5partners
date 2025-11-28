import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, FileText, Calendar, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

type Match = {
  id: number;
  name: string;
  description: string;
  matchScore: number;
  revenue: string;
  ebitda: string;
  employees: number;
  sector: string;
  location: string;
  price: string;
  tags: string[];
  isNew: boolean;
  stage: 'new' | 'interested' | 'nda_signed' | 'meeting_scheduled';
};

export default function ProcessesPage() {
  const [, setLocation] = useLocation();
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const savedMatches = localStorage.getItem('matches');
    if (savedMatches) {
      setMatches(JSON.parse(savedMatches));
    }
  }, []);

  const activeProcesses = matches.filter(m => m.stage !== 'new');
  
  const getStageConfig = (stage: Match['stage']) => {
    switch(stage) {
      case 'interested':
        return {
          label: "Interesse Demonstrado",
          description: "Aguardando retorno do vendedor para prosseguir com o NDA.",
          color: "bg-amber-100 text-amber-800",
          borderColor: "border-amber-200",
          icon: Clock,
          progress: 33
        };
      case 'nda_signed':
        return {
          label: "NDA Assinado",
          description: "Acesso ao Data Room liberado. Analisando documentos.",
          color: "bg-blue-100 text-blue-800",
          borderColor: "border-blue-200",
          icon: FileText,
          progress: 66
        };
      case 'meeting_scheduled':
        return {
          label: "Reunião Agendada",
          description: "Próxima reunião de apresentação com os sócios.",
          color: "bg-emerald-100 text-emerald-800",
          borderColor: "border-emerald-200",
          icon: Calendar,
          progress: 90
        };
      default:
        return {
          label: "Novo",
          description: "",
          color: "bg-slate-100",
          borderColor: "border-slate-200",
          icon: Clock,
          progress: 0
        };
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
          onClick={() => setLocation('/dashboard')}
          data-testid="button-back-processes"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Dashboard
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Acompanhar Processos</h1>
          <p className="text-slate-500 mt-1">Gerencie suas negociações e NDAs ativos</p>
        </div>

        {activeProcesses.length === 0 ? (
          <Card className="border-dashed border-2 border-slate-200 bg-slate-50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">Nenhum processo ativo</h3>
              <p className="text-slate-500 text-center max-w-sm mt-1 mb-4">
                Demonstre interesse em oportunidades no Dashboard para iniciar um processo de negociação.
              </p>
              <Button onClick={() => setLocation('/dashboard')}>
                Ir para Dashboard
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {activeProcesses.map((process) => {
              const config = getStageConfig(process.stage);
              const StageIcon = config.icon;
              
              return (
                <motion.div
                  key={process.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className={`border-l-4 ${config.borderColor.replace('border-', 'border-l-')}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-grow">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-slate-900">{process.name}</h3>
                              <p className="text-slate-500 text-sm">{process.sector} • {process.location}</p>
                            </div>
                            <Badge variant="outline" className={`${config.color} border-transparent`}>
                              <StageIcon className="mr-1.5 h-3.5 w-3.5" />
                              {config.label}
                            </Badge>
                          </div>
                          
                          <p className="text-slate-600 mb-4 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                            {process.description}
                          </p>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-slate-500">
                              <span>Progresso da Negociação</span>
                              <span>{config.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary transition-all duration-500"
                                style={{ width: `${config.progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              {config.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex md:flex-col gap-2 justify-center md:justify-start md:min-w-[140px] border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                          <div className="text-center md:text-left mb-2">
                            <p className="text-xs text-slate-500">Valor</p>
                            <p className="font-bold text-slate-900">{process.price}</p>
                          </div>
                          <div className="text-center md:text-left mb-4">
                            <p className="text-xs text-slate-500">Receita</p>
                            <p className="font-bold text-slate-900">{process.revenue}</p>
                          </div>
                          <Button size="sm" variant="outline" className="w-full">
                            Ver Detalhes <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
