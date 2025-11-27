import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/context";
import { useLocation } from "wouter";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { 
  Search, Filter, Heart, FileText, MessageSquare, 
  MapPin, DollarSign, Users, TrendingUp, Building2, 
  Eye, Calendar, Lock, Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const initialMatches: Match[] = [
  {
    id: 1,
    name: "TechFlow Solutions",
    description: "Plataforma SaaS B2B para gestão de workflows empresariais com alta recorrência.",
    matchScore: 94,
    revenue: "R$ 3.2M",
    ebitda: "28%",
    employees: 22,
    sector: "SaaS/Tecnologia",
    location: "São Paulo, SP",
    price: "R$ 8.5M",
    tags: ["Receita recorrente", "Alta margem", "Escalável"],
    isNew: true,
    stage: 'new'
  },
  {
    id: 2,
    name: "Empresa Confidencial #156",
    description: "E-commerce especializado em produtos premium para pets com marca própria consolidada.",
    matchScore: 89,
    revenue: "R$ 12.5M",
    ebitda: "15%",
    employees: 45,
    sector: "Varejo/E-commerce",
    location: "Curitiba, PR",
    price: "R$ 15M",
    tags: ["Marca Própria", "Crescimento Acelerado"],
    isNew: false,
    stage: 'interested'
  },
  {
    id: 3,
    name: "HealthTech Innovation",
    description: "Soluções de telemedicina integradas com prontuários eletrônicos.",
    matchScore: 91,
    revenue: "R$ 6.8M",
    ebitda: "18%",
    employees: 30,
    sector: "Saúde",
    location: "Florianópolis, SC",
    price: "R$ 10.5M",
    tags: ["Telemedicina", "SaaS"],
    isNew: false,
    stage: 'nda_signed'
  }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const savedMatches = localStorage.getItem('matches');
    if (savedMatches) {
      setMatches(JSON.parse(savedMatches));
    } else {
      setMatches(initialMatches);
      localStorage.setItem('matches', JSON.stringify(initialMatches));
    }
  }, []);

  const updateMatchStage = (id: number, newStage: Match['stage']) => {
    const updatedMatches = matches.map(match => 
      match.id === id ? { ...match, stage: newStage } : match
    );
    setMatches(updatedMatches);
    localStorage.setItem('matches', JSON.stringify(updatedMatches));

    let title = "";
    let description = "";

    switch(newStage) {
      case 'interested':
        title = "Interesse Registrado";
        description = "A empresa foi notificada do seu interesse.";
        break;
      case 'nda_signed':
        title = "NDA Solicitado";
        description = "Solicitação enviada. Aguarde a liberação dos documentos.";
        break;
      case 'meeting_scheduled':
        title = "Reunião Solicitada";
        description = "Enviamos sua disponibilidade para o vendedor.";
        break;
    }

    toast({
      title,
      description,
    });
  };

  function TargetIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    )
  }

  const stats = [
    { label: "Matches Ativos", value: "12", icon: TargetIcon, color: "text-primary" },
    { label: "Empresas Favoritadas", value: "4", icon: Heart, color: "text-secondary" },
    { label: "NDAs Assinados", value: "2", icon: FileText, color: "text-accent" },
    { label: "Negociações", value: "1", icon: MessageSquare, color: "text-slate-700" },
  ];


  const getStageInfo = (stage: string) => {
    switch(stage) {
      case 'new':
        return { label: 'Demonstrar Interesse', icon: Heart, nextStep: 'Solicitar NDA' };
      case 'interested':
        return { label: 'Solicitar NDA', icon: Lock, nextStep: 'Agendar Reunião' };
      case 'nda_signed':
        return { label: 'Agendar Reunião', icon: Calendar, nextStep: 'Finalizar' };
      default:
        return { label: 'Demonstrar Interesse', icon: Heart, nextStep: 'Solicitar NDA' };
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Olá, {user?.name || "Investidor"}! 👋</h1>
          <p className="text-slate-500 mt-1">Aqui estão as oportunidades mais compatíveis com seu perfil de investimento</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Buscar por setor, localização ou nome..." 
              className="pl-10 h-11 bg-white border-slate-200 shadow-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-11 border-slate-200 bg-white whitespace-nowrap">
                  <Filter className="mr-2 h-4 w-4" /> Filtros Avançados
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtros Avançados</SheetTitle>
                  <SheetDescription>
                    Refine sua busca por oportunidades de investimento.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Faixa de Valor (Valuation)</Label>
                    <Slider defaultValue={[50]} max={100} step={1} className="py-4" />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>R$ 1M</span>
                      <span>R$ 100M+</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Setores de Interesse</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tech" />
                        <Label htmlFor="tech" className="font-normal">Tecnologia / SaaS</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="retail" />
                        <Label htmlFor="retail" className="font-normal">Varejo</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="health" />
                        <Label htmlFor="health" className="font-normal">Saúde</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="fintech" />
                        <Label htmlFor="fintech" className="font-normal">Fintech</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Métricas Financeiras</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ebitda" defaultChecked />
                        <Label htmlFor="ebitda" className="font-normal">EBITDA Positivo</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="growth" />
                        <Label htmlFor="growth" className="font-normal">Crescimento {'>'} 20% a.a.</Label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" onClick={() => document.querySelector('[data-radix-collection-item]')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}>
                      Aplicar Filtros
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Button 
              variant="outline" 
              className="h-11 border-slate-200 bg-white whitespace-nowrap"
              onClick={() => setLocation('/valuation')}
            >
              <TrendingUp className="mr-2 h-4 w-4" /> Novo Valuation
            </Button>
            <Button 
              variant="outline" 
              className="h-11 border-slate-200 bg-white whitespace-nowrap"
              onClick={() => setLocation('/processes')}
            >
              <Clock className="mr-2 h-4 w-4" /> Acompanhar Processos
            </Button>
          </div>
        </div>

        {/* Matches Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Matches Recomendados</h2>
            <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200">2 novos</Badge>
          </div>

          {matches.map((match) => (
            <motion.div 
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-slate-900">{match.name}</h3>
                        {match.isNew && (
                          <span className="bg-emerald-600 text-white text-xs px-2.5 py-0.5 rounded-full shadow-sm font-normal">Novo Match</span>
                        )}
                      </div>
                      <p className="text-slate-500">{match.description}</p>
                    </div>
                    <div className="text-right">
                      {/* You can add actions here if needed */}
                    </div>
                  </div>

                  {/* Compatibility Bar */}
                  <div className="bg-sky-50/50 rounded-lg p-4 mb-6 border border-sky-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-slate-700">Compatibilidade com seu perfil</span>
                      <span className="text-lg font-bold text-primary">{match.matchScore}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${match.matchScore}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Excelente match: empresa no seu setor preferido com múltiplo atrativo
                    </p>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Receita Anual</p>
                      <p className="font-bold text-slate-900">{match.revenue}</p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">EBITDA</p>
                      <p className="font-bold text-green-600">{match.ebitda}</p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Funcionários</p>
                      <p className="font-bold text-slate-900">{match.employees}</p>
                    </div>
                     <div className="text-center p-3 bg-slate-50 rounded-lg col-span-2 md:col-span-1">
                      <p className="text-xs text-slate-500 mb-1">Setor</p>
                      <p className="font-bold text-slate-900 truncate" title={match.sector}>{match.sector}</p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg col-span-2 md:col-span-1 border border-primary/10 bg-primary/5">
                      <p className="text-xs text-slate-500 mb-1">Preço Pedido</p>
                      <p className="font-bold text-primary">{match.price}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {match.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="border-slate-200 text-slate-600 font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Process Progress */}
                  <div className="mb-4 mt-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2 px-1">
                      <span className={match.stage === 'new' || match.stage === 'interested' || match.stage === 'nda_signed' ? "font-medium text-primary" : ""}>Interesse</span>
                      <div className="h-px bg-slate-200 flex-1 mx-2"></div>
                      <span className={match.stage === 'interested' || match.stage === 'nda_signed' ? "font-medium text-primary" : ""}>NDA</span>
                      <div className="h-px bg-slate-200 flex-1 mx-2"></div>
                      <span className={match.stage === 'nda_signed' ? "font-medium text-primary" : ""}>Reunião</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-full">
                      <div 
                        className="h-full bg-primary transition-all duration-500 ease-in-out" 
                        style={{ 
                          width: match.stage === 'new' ? '10%' : match.stage === 'interested' ? '50%' : '100%' 
                        }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                     <Button variant="outline" className="border-slate-200 hover:bg-slate-50 hover:text-slate-900">
                      <Eye className="mr-2 h-4 w-4" /> Ver Detalhes
                    </Button>

                    {match.stage === 'new' && (
                      <Button 
                        className="bg-primary hover:bg-primary/90 shadow-sm group"
                        onClick={() => updateMatchStage(match.id, 'interested')}
                      >
                        <Heart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Tenho Interesse
                      </Button>
                    )}

                    {match.stage === 'interested' && (
                      <Button 
                        className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm border-amber-700"
                        onClick={() => updateMatchStage(match.id, 'nda_signed')}
                      >
                        <Lock className="mr-2 h-4 w-4" /> Solicitar NDA
                      </Button>
                    )}

                    {match.stage === 'nda_signed' && (
                      <Button 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm border-emerald-700"
                        onClick={() => updateMatchStage(match.id, 'meeting_scheduled')}
                      >
                        <Calendar className="mr-2 h-4 w-4" /> Agendar Reunião
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
