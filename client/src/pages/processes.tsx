import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, FileText, Calendar, ArrowRight, Building2, MapPin } from "lucide-react";
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
 type: 'empresa' | 'investidor' | 'franqueadora';
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
         <Card className={`overflow-hidden border-none shadow-lg ring-1 ring-slate-200/60 transition-all duration-300 hover:shadow-xl hover:ring-primary/20 bg-white relative`}>
          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.color.split(' ')[0].replace('bg-', 'bg-')}`} />
          <CardContent className="p-0">
           <div className="flex flex-col md:flex-row">
            <div className="p-6 md:p-8 flex-grow">
             <div className="flex flex-col gap-3 mb-6">
              <div className="flex flex-wrap gap-2">
               <Badge className={`${getTypeColor(process.type)} text-[10px] uppercase tracking-wider px-2.5 py-1 font-bold border-none rounded-full shadow-none`}>
                {process.type === 'franqueadora' ? 'Franqueadora' : process.type === 'investidor' ? 'Investidor' : 'Empresa'}
               </Badge>
               <Badge className={`${config.color} text-[10px] uppercase tracking-wider px-2.5 py-1 font-black rounded-full border-none shadow-none`}>
                {config.label}
               </Badge>
              </div>
              
              <div className="flex items-center gap-4">
               {/* Logo Placeholder - assuming you might want to show logo here too */}
               <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm flex-shrink-0">
                <Building2 className="h-6 w-6 text-slate-400" />
               </div>
               <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">{process.name}</h3>
                <div className="flex items-center text-slate-500 text-sm mt-0.5 font-medium">
                 <MapPin className="mr-1 h-3 w-3" />
                 {process.sector} • {process.location}
                </div>
               </div>
              </div>
             </div>
             
             <p className="text-slate-600 mb-6 text-sm leading-relaxed bg-white/50 p-4 rounded-xl border border-slate-100 shadow-sm italic">
              "{process.description}"
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
            
            <div className="flex md:flex-col gap-6 justify-center md:justify-center md:min-w-[200px] bg-slate-50/50 p-6 md:p-8 border-t md:border-t-0 md:border-l border-slate-100">
             <div className="flex flex-col items-center md:items-start">
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Valor do Ativo</p>
              <p className="text-2xl font-black text-slate-900">{process.price}</p>
             </div>
             <div className="flex flex-col items-center md:items-start">
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Receita Anual</p>
              <p className="text-xl font-bold text-slate-700">{process.revenue}</p>
             </div>
             <Button 
              className="w-full shadow-md hover:shadow-lg transition-all font-bold h-11 rounded-xl"
             >
              Ver Detalhes <ArrowRight className="ml-2 h-4 w-4" />
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
