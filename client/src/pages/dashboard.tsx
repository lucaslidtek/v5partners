import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CompatibilityLogo } from "@/components/compatibility-logo";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { 
  Search, Filter, Heart, FileText, MessageSquare, 
  MapPin, DollarSign, Users, TrendingUp, Building2, 
  Eye, Calendar, Lock, Clock, ArrowRight, Undo2
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
  logo?: string;
  logoColor?: string;
  logoImage?: string;
};

type OtherCompany = {
  id: number;
  name: string;
  sector: string;
  location: string;
  revenue: string;
  employees: number;
  description: string;
  matchScore: number;
  logo?: string;
  logoColor?: string;
};

const otherCompanies: OtherCompany[] = [
  {
    id: 101,
    name: "Empresa Confidencial #101",
    sector: "Tecnologia",
    location: "Rio de Janeiro, RJ",
    revenue: "R$ 5.2M",
    employees: 28,
    description: "Solução de software empresarial com foco em otimização de processos",
    matchScore: 76,
    logo: "E1",
    logoColor: "bg-purple-500"
  },
  {
    id: 102,
    name: "Empresa Confidencial #102",
    sector: "Varejo",
    location: "Belo Horizonte, MG",
    revenue: "R$ 8.7M",
    employees: 52,
    description: "Rede de varejo especializada em produtos de qualidade premium",
    matchScore: 52,
    logo: "E2",
    logoColor: "bg-orange-500"
  },
  {
    id: 103,
    name: "Empresa Confidencial #103",
    sector: "Logística",
    location: "Salvador, BA",
    revenue: "R$ 3.9M",
    employees: 35,
    description: "Empresa de logística e distribuição com foco no nordeste",
    matchScore: 38,
    logo: "E3",
    logoColor: "bg-cyan-500"
  },
  {
    id: 104,
    name: "Empresa Confidencial #104",
    sector: "Alimentação",
    location: "Brasília, DF",
    revenue: "R$ 6.1M",
    employees: 42,
    description: "Produção e distribuição de alimentos com marca consolidada",
    matchScore: 68,
    logo: "E4",
    logoColor: "bg-red-500"
  },
  {
    id: 105,
    name: "Empresa Confidencial #105",
    sector: "Educação",
    location: "Porto Alegre, RS",
    revenue: "R$ 4.5M",
    employees: 38,
    description: "Plataforma educacional com foco em treinamento corporativo",
    matchScore: 82,
    logo: "E5",
    logoColor: "bg-green-500"
  },
  {
    id: 106,
    name: "Empresa Confidencial #106",
    sector: "Consultoria",
    location: "Fortaleza, CE",
    revenue: "R$ 7.3M",
    employees: 45,
    description: "Consultoria especializada em transformação digital e estratégia",
    matchScore: 45,
    logo: "E6",
    logoColor: "bg-indigo-500"
  },
];

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
    stage: 'new',
    logo: "TF",
    logoColor: "bg-blue-500"
  },
  {
    id: 2,
    name: "PetPremium Brasil",
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
    stage: 'interested',
    logo: "PP",
    logoColor: "bg-pink-500"
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
    stage: 'nda_signed',
    logo: "HT",
    logoColor: "bg-emerald-500",
    logoImage: "/healthtech-logo.png"
  }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState("new");
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);
  const [lastAction, setLastAction] = useState<{ id: number; previousStage: Match['stage'] } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  
  // Create a combined list for selecting both matches and other companies
  const allCompanies = [
    ...matches,
    ...otherCompanies.map(oc => ({
      ...oc,
      description: oc.description || '',
      matchScore: 0,
      ebitda: 'N/A',
      price: 'N/A',
      tags: [],
      isNew: false,
      stage: 'new' as const
    }))
  ];
  
  const selectedMatch = allCompanies.find(m => m.id === selectedMatchId);

  const getValuationLabel = (value: number) => {
    if (value <= 25) return "R$ 1M - R$ 10M";
    if (value <= 50) return "R$ 10M - R$ 30M";
    if (value <= 75) return "R$ 30M - R$ 60M";
    return "R$ 60M - R$ 100M+";
  };

  const filteredMatches = matches.filter(match => {
    const searchLower = searchTerm.toLowerCase();
    return (
      match.name.toLowerCase().includes(searchLower) ||
      match.sector.toLowerCase().includes(searchLower) ||
      match.location.toLowerCase().includes(searchLower) ||
      match.description.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    localStorage.removeItem('matches');
    setMatches(initialMatches);
    localStorage.setItem('matches', JSON.stringify(initialMatches));

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateMatchStage = (id: number, newStage: Match['stage']) => {
    const previousMatch = matches.find(m => m.id === id);
    if (!previousMatch) return;

    setLastAction({ id, previousStage: previousMatch.stage });

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
      case 'new':
        title = "Devolvido para Matches";
        description = "A empresa voltou para a lista de matches recomendados.";
        break;
    }

    toast({
      title,
      description
    });
  };

  const revertAction = () => {
    if (lastAction) {
      updateMatchStage(lastAction.id, lastAction.previousStage);
      setLastAction(null);
    }
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

  const getDisplayName = (match: Match) => {
    if (match.stage === 'nda_signed' || match.stage === 'meeting_scheduled') {
      return match.name;
    }
    return `Empresa Confidencial #${match.id}`;
  };

  const renderLogo = (match: Match, matchScore?: number) => {
    // Show CompatibilityLogo only when NDA not signed
    if (match.stage === 'new' || match.stage === 'interested') {
      return <CompatibilityLogo matchScore={matchScore || match.matchScore} isConfidential size="md" />;
    }
    
    // Show actual logo when NDA is signed
    if (match.logoImage) {
      return (
        <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          <img src={match.logoImage} alt={match.name} className="w-full h-full object-cover" />
        </div>
      );
    }
    return (
      <div className={`h-12 w-12 rounded-lg ${match.logoColor || 'bg-slate-200'} flex items-center justify-center flex-shrink-0`}>
        <span className="text-white font-bold text-sm">{match.logo}</span>
      </div>
    );
  };

  const newStats = [
    { label: "Matches Disponíveis", value: "12", icon: TargetIcon, color: "text-primary" },
    { label: "Empresas Favoritadas", value: "4", icon: Heart, color: "text-secondary" },
  ];

  const activeStats = [
    { label: "NDAs Assinados", value: "2", icon: FileText, color: "text-accent" },
    { label: "Negociações Ativas", value: "1", icon: MessageSquare, color: "text-slate-700" },
  ];

  const stats = activeTab === "active" ? activeStats : newStats;


  const getCompatibilityColor = (score: number) => {
    if (score >= 70) {
      return {
        barColor: 'bg-emerald-500',
        bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
        borderColor: 'border-emerald-200 dark:border-emerald-800',
        textColor: 'text-emerald-600 dark:text-emerald-400'
      };
    } else if (score >= 40) {
      return {
        barColor: 'bg-amber-500',
        bgColor: 'bg-amber-50 dark:bg-amber-950/30',
        borderColor: 'border-amber-200 dark:border-amber-800',
        textColor: 'text-amber-600 dark:text-amber-400'
      };
    } else {
      return {
        barColor: 'bg-red-500',
        bgColor: 'bg-red-50 dark:bg-red-950/30',
        borderColor: 'border-red-200 dark:border-red-800',
        textColor: 'text-red-600 dark:text-red-400'
      };
    }
  };

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
      <div className={`${isMobile ? 'pb-40' : ''} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isMobile ? 'py-4' : 'py-8'}`}>
        {/* Welcome Section */}
        <div className={`${isMobile ? 'mb-6' : 'mb-8'} flex items-center justify-between`}>
          <div>
            <h1 className={`${isMobile ? 'text-2xl font-bold' : 'text-3xl font-bold'} text-slate-900 dark:text-white`}>
              {activeTab === "new" ? "Matches Recomendados" : activeTab === "active" ? "Processos Ativos" : "Outras Empresas"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">
              {activeTab === "new" ? "Explore novos matches recomendados para você" : activeTab === "active" ? "Acompanhe seus processos em andamento" : "Oportunidades adicionais de investimento"}
            </p>
          </div>
        </div>

        {/* Stats Grid - Desktop & Mobile Carousel - Only show on New and Active tabs */}
        {activeTab !== 'others' && (
        <div className={`${isMobile ? 'mb-6' : 'mb-8'}`}>
          <div className={`${isMobile ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}`}>
            {stats.map((stat, index) => (
              <Card key={index} className={`border-slate-200 dark:border-slate-800 dark:bg-slate-900 hover:shadow-md dark:hover:shadow-slate-900/50 transition-shadow`}>
                <CardContent className="p-4 md:p-6 flex items-center justify-between">
                  <div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-slate-500 dark:text-slate-400 mb-1`}>{stat.label}</p>
                    <p className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-slate-900 dark:text-white`}>{stat.value}</p>
                  </div>
                  <div className={`${isMobile ? 'h-10 w-10' : 'h-12 w-12'} rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        )}

        {/* Search and Filter Bar */}
        <div className={`flex ${isMobile ? 'flex-col gap-3 mb-6' : 'flex-col md:flex-row gap-4 mb-8'}`}>
          <div className="relative flex-grow flex items-center gap-2">
            <Search className={`absolute ${isMobile ? 'left-3.5 top-3.5' : 'left-3 top-3'} ${isMobile ? 'h-4 w-4' : 'h-4 w-4'} text-slate-400`} />
            <Input 
              placeholder={isMobile ? "Buscar oportunidades..." : "Buscar por setor, localização ou nome..."} 
              className={`pl-10 ${isMobile ? 'h-11 rounded-lg' : 'h-11'} bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-slate-900/30 focus:ring-2 focus:ring-primary/20 transition-all`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-search"
            />
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-11 w-11 flex-shrink-0 border-slate-200 bg-white hover:bg-slate-50">
                    <Filter className="h-4 w-4 text-slate-600" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-3xl flex flex-col h-[85vh]">
                  <SheetHeader className="flex-shrink-0 pt-[0px] pb-[0px]">
                    <SheetTitle>Filtros Avançados</SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto pr-4">
                    <div className="py-6 space-y-6">
                      <div className="space-y-2">
                        <Label>Faixa de Valor (Valuation)</Label>
                      <div className="mb-3 flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-800">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          {getValuationLabel(sliderValue[0])}
                        </span>
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">{sliderValue[0]}%</span>
                      </div>
                      <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} className="py-4" />
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

                    <div className="pt-4 pb-4">
                      <Button className="w-full" onClick={() => document.querySelector('[data-radix-collection-item]')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}>
                        Aplicar Filtros
                      </Button>
                    </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
          {!isMobile && (
            <div className={`flex gap-2 overflow-x-auto pb-2 md:pb-0`}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-11 bg-white text-slate-900 border-slate-200 whitespace-nowrap font-medium transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700 shadow-sm">
                    <Filter className="mr-2 h-4 w-4" /> Filtros Avançados
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Filtros Avançados</DialogTitle>
                    <DialogDescription>
                      Refine sua busca por oportunidades de investimento.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="overflow-y-auto max-h-[70vh] pr-4">
                    <div className="py-6 space-y-6">
                      <div className="space-y-2">
                        <Label>Faixa de Valor (Valuation)</Label>
                      <div className="mb-3 flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-800">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          {getValuationLabel(sliderValue[0])}
                        </span>
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">{sliderValue[0]}%</span>
                      </div>
                      <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} className="py-4" />
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

                    <div className="pt-4 pb-4">
                      <Button className="w-full" onClick={() => document.querySelector('[data-radix-collection-item]')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}>
                        Aplicar Filtros
                      </Button>
                    </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button 
                className="h-11 bg-white text-slate-900 border-slate-200 whitespace-nowrap font-medium transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700 shadow-sm"
                onClick={() => setLocation('/avaliacao')}
              >
                <TrendingUp className="mr-2 h-4 w-4" /> Novo Valuation
              </Button>
            </div>
          )}
        </div>

        {/* Tabs Section - Desktop Only */}
        {!isMobile && (
        <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <div className="border-b border-slate-200 dark:border-slate-800 mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-auto bg-transparent p-0 gap-0">
              <TabsTrigger 
                value="new" 
                className="relative px-0 py-3 h-auto bg-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all duration-300 font-medium text-sm whitespace-nowrap"
              >
                Matches Recomendados
                <Badge 
                  className="ml-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border-0"
                >
                  {filteredMatches.filter(m => m.stage === 'new').length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="active" 
                className="relative px-0 py-3 h-auto bg-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all duration-300 font-medium text-sm whitespace-nowrap"
              >
                Processos Ativos
                <Badge 
                  className="ml-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border-0"
                >
                  {filteredMatches.filter(m => m.stage !== 'new').length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* New Matches Tab - Desktop */}
          <TabsContent value="new" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMatches.filter(m => m.stage === 'new').length === 0 ? (
              <Card className="border-dashed border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-slate-400 dark:text-slate-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Nenhum novo match</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mt-1">
                    Todos os matches já têm processos em andamento. Continue acompanhando na aba de Processos.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredMatches.filter(m => m.stage === 'new').map((match) => (
            <motion.div 
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className={`border-slate-200 dark:border-slate-800 dark:bg-slate-900 ${!isMobile && 'hover:border-primary/30 dark:hover:border-primary/50 hover:shadow-lg dark:hover:shadow-slate-900/50'} transition-all duration-300 overflow-hidden ${isMobile ? 'border-l-4 border-l-primary rounded-xl' : ''}`}>
                <div className={`${isMobile ? 'p-5' : 'p-8'}`}>
                  {/* Header com logo, título e status */}
                  {isMobile ? (
                    <>
                      <div className="flex gap-3 items-start mb-3">
                        {renderLogo(match, match.matchScore)}
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex-1">{getDisplayName(match)}</h3>
                        {match.isNew && (
                          <span className="text-xs px-2.5 py-1.5 bg-emerald-600 text-white rounded-full font-semibold whitespace-nowrap flex-shrink-0">Novo</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 font-medium">{match.sector} • {match.location}</p>
                    </>
                  ) : (
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex gap-4 flex-1 items-start">
                        {renderLogo(match, match.matchScore)}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{getDisplayName(match)}</h3>
                          <p className="text-base text-slate-500 dark:text-slate-400 mt-1 font-medium">{match.sector} • {match.location}</p>
                        </div>
                      </div>
                      {match.isNew && (
                        <span className="text-xs px-3 py-1 bg-emerald-600 text-white rounded-full font-semibold whitespace-nowrap">Novo</span>
                      )}
                    </div>
                  )}

                  {/* Match Score Bar - More Prominent */}
                  {(() => {
                    const colors = getCompatibilityColor(match.matchScore);
                    return (
                      <div className={`${isMobile ? 'mb-5' : 'mb-7'} ${colors.bgColor} p-4 rounded-lg border ${colors.borderColor}`}>
                        <div className="flex justify-between items-center mb-2.5">
                          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-slate-700 dark:text-slate-300`}>Compatibilidade com seu Perfil</span>
                          <span className={`${isMobile ? 'text-lg font-bold' : 'text-xl font-bold'} ${colors.textColor}`}>{match.matchScore}%</span>
                        </div>
                        <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${colors.barColor} rounded-full transition-all duration-500`} 
                            style={{ width: `${match.matchScore}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}

                  {/* Description Preview */}
                  <p className={`${isMobile ? 'text-sm' : 'text-base'} text-slate-600 dark:text-slate-400 line-clamp-2 mb-5`}>{match.description}</p>

                  {/* Key Metrics Grid - Mobile Optimized */}
                  {isMobile ? (
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/10 dark:border-primary/20">
                        <p className="text-2xs text-slate-500 dark:text-slate-400 mb-1.5 font-medium">Preço</p>
                        <p className="font-bold text-primary text-sm">{match.price}</p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <p className="text-2xs text-slate-500 dark:text-slate-400 mb-1.5 font-medium">Receita</p>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{match.revenue}</p>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <p className="text-2xs text-slate-500 dark:text-slate-400 mb-1.5 font-medium">EBITDA</p>
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{match.ebitda}</p>
                      </div>
                    </div>
                  ) : (
                    <div className={`grid grid-cols-3 gap-4 mb-7`}>
                      <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/10 dark:border-primary/20">
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">Preço</p>
                        <p className="font-bold text-primary text-2xl">{match.price}</p>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">Receita</p>
                        <p className="font-bold text-slate-900 dark:text-white text-xl">{match.revenue}</p>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">EBITDA</p>
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 text-xl">{match.ebitda}</p>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className={`flex flex-wrap ${isMobile ? 'gap-2 mb-5' : 'gap-2 mb-7'}`}>
                    {match.tags.map(tag => (
                      <Badge key={tag} variant="outline" className={`border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium ${isMobile ? 'text-xs px-2.5 py-1' : 'text-sm'}`}>
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className={`grid ${isMobile ? 'grid-cols-2 gap-3 pt-5' : 'grid-cols-1 md:grid-cols-2 gap-3 pt-7 border-t border-slate-100 dark:border-slate-800'}`}>
                    {/* Primary Action Button */}
                    {match.stage === 'new' && (
                      <Button 
                        className={`bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/30 text-white font-bold group transition-all ${isMobile ? 'h-10 text-sm' : 'h-11'}`}
                        onClick={() => updateMatchStage(match.id, 'interested')}
                      >
                        <Heart className={`h-4 w-4 ${!isMobile && 'mr-2'} group-hover:scale-110 transition-transform`} /> {isMobile ? 'Interesse' : 'Tenho Interesse'}
                      </Button>
                    )}

                    {match.stage === 'interested' && (
                      <Button 
                        className={`bg-amber-600 hover:bg-amber-700 text-white shadow-md font-semibold ${isMobile ? 'h-10 text-sm' : ''}`}
                        onClick={() => updateMatchStage(match.id, 'nda_signed')}
                      >
                        <Lock className={`h-4 w-4 ${!isMobile && 'mr-2'}`} /> {isMobile ? 'NDA' : 'Solicitar NDA'}
                      </Button>
                    )}

                    {match.stage === 'nda_signed' && (
                      <Button 
                        className={`bg-emerald-600 hover:bg-emerald-700 text-white shadow-md font-semibold ${isMobile ? 'h-10 text-sm' : ''}`}
                        onClick={() => updateMatchStage(match.id, 'meeting_scheduled')}
                      >
                        <Calendar className={`h-4 w-4 ${!isMobile && 'mr-2'}`} /> {isMobile ? 'Reunião' : 'Agendar Reunião'}
                      </Button>
                    )}

                    {/* Secondary Action - Details */}
                    <Button 
                      variant="outline" 
                      className={`border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors ${isMobile ? 'h-10 text-sm' : ''}`}
                      onClick={() => setSelectedMatchId(match.id)}
                      data-testid={`button-details-${match.id}`}
                    >
                      <Eye className={`h-4 w-4 ${!isMobile && 'mr-2'}`} /> {isMobile ? 'Ver' : 'Ver Detalhes'}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
              ))
            )}
          </TabsContent>

          {/* Active Processes Tab - Desktop */}
          <TabsContent value="active" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMatches.filter(m => m.stage !== 'new').length === 0 ? (
              <Card className="border-dashed border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-slate-400 dark:text-slate-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Nenhum processo ativo</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mt-1">
                    Demonstre interesse em oportunidades para iniciar um processo de negociação.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredMatches.filter(m => m.stage !== 'new').map((process) => {
                const getStageConfig = (stage: Match['stage']) => {
                  switch(stage) {
                    case 'interested':
                      return {
                        label: "Interesse Demonstrado",
                        color: "bg-amber-100 text-amber-800",
                        borderColor: "border-amber-500",
                        progress: 33
                      };
                    case 'nda_signed':
                      return {
                        label: "NDA Assinado",
                        color: "bg-blue-100 text-blue-800",
                        borderColor: "border-blue-500",
                        progress: 66
                      };
                    case 'meeting_scheduled':
                      return {
                        label: "Reunião Agendada",
                        color: "bg-emerald-100 text-emerald-800",
                        borderColor: "border-emerald-500",
                        progress: 90
                      };
                    default:
                      return {
                        label: "Em Andamento",
                        color: "bg-slate-100",
                        borderColor: "border-slate-500",
                        progress: 0
                      };
                  }
                };

                const config = getStageConfig(process.stage);
                
                // Get next step
                const getNextStep = (stage: Match['stage']) => {
                  switch(stage) {
                    case 'interested':
                      return { label: 'Solicitar NDA', action: 'nda_signed', icon: Lock };
                    case 'nda_signed':
                      return { label: 'Agendar Reunião', action: 'meeting_scheduled', icon: Calendar };
                    default:
                      return null;
                  }
                };
                
                const nextStep = getNextStep(process.stage);

                return (
                  <motion.div
                    key={process.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className={`border-l-4 ${config.borderColor} dark:bg-slate-900 ${isMobile ? 'rounded-xl' : ''}`}>
                      <CardContent className={`${isMobile ? 'p-5' : 'p-8'}`}>
                        {isMobile ? (
                          <>
                            <div className="flex gap-2 items-start mb-2">
                              {renderLogo(process)}
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex-1">{getDisplayName(process)}</h3>
                              <Badge className={`${config.color} text-xs py-1.5 px-2.5 whitespace-nowrap flex-shrink-0`}>
                                {config.label}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{process.sector} • {process.location}</p>
                          </>
                        ) : (
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex gap-4 flex-1 items-start min-w-0">
                              {renderLogo(process)}
                              <div className="flex-1 min-w-0">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{getDisplayName(process)}</h3>
                                <p className="text-base text-slate-500 dark:text-slate-400 mt-1">{process.sector} • {process.location}</p>
                              </div>
                            </div>
                            <Badge className={`${config.color} text-sm py-1.5 px-3`}>
                              {config.label}
                            </Badge>
                          </div>
                        )}

                        {/* Next Step Hint */}
                        {nextStep && (
                          <div className={`${isMobile ? 'mb-4 p-3' : 'mb-6 p-4'} bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 rounded-lg`}>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-sky-700 dark:text-sky-300`}>
                              Próximo passo: {nextStep.label}
                            </p>
                          </div>
                        )}

                        {/* Progress Bar */}
                        <div className={`${isMobile ? 'mb-4' : 'mb-6'}`}>
                          <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-slate-600 dark:text-slate-400 mb-1.5`}>
                            <span>Progresso</span>
                            <span>{config.progress}%</span>
                          </div>
                          <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-500"
                              style={{ width: `${config.progress}%` }}
                            />
                          </div>
                        </div>

                        {isMobile ? (
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                              <p className="text-2xs text-slate-500 dark:text-slate-400 mb-1">Valor</p>
                              <p className="font-bold text-slate-900 dark:text-white text-sm">{process.price}</p>
                            </div>
                            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                              <p className="text-2xs text-slate-500 dark:text-slate-400 mb-1">Receita</p>
                              <p className="font-bold text-slate-900 dark:text-white text-sm">{process.revenue}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Valor</p>
                              <p className="font-bold text-slate-900 dark:text-white text-xl">{process.price}</p>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Receita</p>
                              <p className="font-bold text-slate-900 dark:text-white text-xl">{process.revenue}</p>
                            </div>
                          </div>
                        )}

                        <div className={`flex gap-2 ${isMobile ? 'pt-3 flex-col' : 'pt-6 border-t border-slate-100 dark:border-slate-800'}`}>
                          {nextStep ? (
                            <>
                              <Button 
                                className={`${isMobile ? 'flex-1 h-10 text-sm' : 'flex-1'} bg-primary hover:bg-primary/90 text-white font-semibold`}
                                onClick={() => updateMatchStage(process.id, nextStep.action as Match['stage'])}
                                data-testid={`button-next-step-${process.id}`}
                              >
                                <nextStep.icon className={`h-4 w-4 ${!isMobile && 'mr-2'}`} /> {isMobile ? nextStep.label.split(' ')[0] : nextStep.label}
                              </Button>
                              <Button 
                                variant="outline" 
                                className={`flex-1 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors ${isMobile ? 'h-10 text-sm' : ''}`}
                                onClick={() => setSelectedMatchId(process.id)}
                                data-testid={`button-details-${process.id}`}
                              >
                                <Eye className={`h-4 w-4 ${!isMobile && 'mr-2'}`} /> {isMobile ? 'Ver' : 'Detalhes'}
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button 
                                variant="outline" 
                                className={`flex-1 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors ${isMobile ? 'h-10 text-sm' : ''}`}
                                onClick={() => setSelectedMatchId(process.id)}
                                data-testid={`button-details-${process.id}`}
                              >
                                <Eye className={`h-4 w-4 ${!isMobile && 'mr-2'}`} /> {isMobile ? 'Ver' : 'Ver Detalhes'}
                              </Button>
                              <Button 
                                variant="ghost" 
                                className={`flex-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold ${isMobile ? 'h-10 text-sm' : ''}`}
                                onClick={() => updateMatchStage(process.id, 'new')}
                                data-testid={`button-revert-${process.id}`}
                              >
                                <Undo2 className="h-4 w-4 mr-2" /> Reverter
                              </Button>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </TabsContent>

          {/* Other Companies Tab */}
          <TabsContent value="others" className={`${isMobile ? 'space-y-2 px-4 py-3 -mx-4 border-0' : 'grid grid-cols-1 lg:grid-cols-3 gap-6'}`}>
            {otherCompanies.map((company) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 hover:shadow-md dark:hover:shadow-slate-800/50 transition-all duration-300 h-full overflow-hidden" data-testid={`card-company-${company.id}`}>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`h-12 w-12 rounded-lg ${company.logoColor} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-sm">{company.logo}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm" data-testid={`text-company-name-${company.id}`}>{company.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{company.sector}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 flex-1">{company.description}</p>

                    {(() => {
                      const colors = getCompatibilityColor(company.matchScore);
                      return (
                        <div className={`${colors.bgColor} p-3 rounded-lg border ${colors.borderColor} mb-4`}>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Compatibilidade</span>
                            <span className={`text-sm font-bold ${colors.textColor}`}>{company.matchScore}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${colors.barColor} rounded-full transition-all duration-500`} 
                              style={{ width: `${company.matchScore}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()}

                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-700 mb-4">
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Receita</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{company.revenue}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Equipe</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{company.employees}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Local</p>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{company.location.split(',')[1]?.trim() || 'N/A'}</p>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full text-sm border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                      data-testid={`button-view-company-${company.id}`}
                    >
                      <Lock className="h-3.5 w-3.5 mr-2" /> Mais Informações
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
        )}

        {/* Mobile Tab Content */}
        {isMobile && (
          <div className="space-y-2 mt-4">
            {/* Aba Novos */}
            {activeTab === "new" && (
              <>
                {filteredMatches.filter(m => m.stage === 'new').length === 0 ? (
                  <Card className="border-dashed border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                        <Heart className="h-6 w-6 text-slate-400 dark:text-slate-600" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white">Nenhum novo match</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mt-1">
                        Todos os matches já têm processos em andamento. Continue acompanhando na aba de Processos.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredMatches.filter(m => m.stage === 'new').map((match) => (
                    <motion.div 
                      key={match.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="border-l-4 border-l-primary dark:bg-slate-900 rounded-lg">
                        <div className="p-4">
                          {/* Header */}
                          {(() => {
                            const colors = getCompatibilityColor(match.matchScore);
                            return (
                              <div className="flex gap-2 items-start mb-2">
                                {renderLogo(match, match.matchScore)}
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{getDisplayName(match)}</h3>
                                  <p className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5">{match.sector}</p>
                                </div>
                                {match.isNew && (
                                  <span className="text-2xs px-2 py-1 bg-emerald-600 text-white rounded-full font-semibold whitespace-nowrap flex-shrink-0">Novo</span>
                                )}
                              </div>
                            );
                          })()}
                          <p className="text-2xs text-slate-500 dark:text-slate-400 mb-3 truncate">{match.location}</p>

                          {/* Compatibility Score */}
                          {(() => {
                            const colors = getCompatibilityColor(match.matchScore);
                            return (
                              <div className="mb-3">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-2xs font-semibold text-slate-600 dark:text-slate-400">Compatibilidade</span>
                                  <span className={`text-sm font-bold ${colors.textColor}`}>{match.matchScore}%</span>
                                </div>
                                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${colors.barColor} rounded-full transition-all duration-500`} 
                                    style={{ width: `${match.matchScore}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })()}

                          {/* Description */}
                          <p className="text-2xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">{match.description}</p>

                          {/* Metrics Grid - 2 columns for better fit */}
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="p-2 bg-primary/5 dark:bg-primary/10 rounded-md border border-primary/10 dark:border-primary/20">
                              <p className="text-2xs text-slate-500 dark:text-slate-400 mb-0.5 font-medium">Preço</p>
                              <p className="font-bold text-primary text-sm">{match.price}</p>
                            </div>
                            <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-100 dark:border-slate-700/50">
                              <p className="text-2xs text-slate-500 dark:text-slate-400 mb-0.5 font-medium">Receita</p>
                              <p className="font-bold text-slate-900 dark:text-white text-sm">{match.revenue}</p>
                            </div>
                          </div>

                          {/* EBITDA metric */}
                          <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-100 dark:border-slate-700/50 mb-3">
                            <p className="text-2xs text-slate-500 dark:text-slate-400 mb-0.5 font-medium">EBITDA</p>
                            <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{match.ebitda}</p>
                          </div>

                          {/* Tags - horizontal scroll for small screens */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {match.tags.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-normal text-2xs px-2 py-0.5">
                                {tag}
                              </Badge>
                            ))}
                            {match.tags.length > 2 && (
                              <Badge variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-normal text-2xs px-2 py-0.5">
                                +{match.tags.length - 2}
                              </Badge>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-2">
                            <Button 
                              className="bg-primary hover:bg-primary/90 text-white font-semibold h-9 text-sm rounded-lg transition-all active:scale-95"
                              onClick={() => updateMatchStage(match.id, 'interested')}
                            >
                              <Heart className="h-4 w-4 mr-1" /> Interesse
                            </Button>
                            <Button 
                              variant="outline" 
                              className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors h-9 text-sm rounded-lg"
                              onClick={() => setSelectedMatchId(match.id)}
                              data-testid={`button-details-${match.id}`}
                            >
                              <Eye className="h-4 w-4 mr-1" /> Ver
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </>
            )}

            {/* Aba Ativos */}
            {activeTab === "active" && (
              <>
                {filteredMatches.filter(m => m.stage !== 'new').length === 0 ? (
                  <Card className="border-dashed border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                        <Clock className="h-6 w-6 text-slate-400 dark:text-slate-600" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white">Nenhum processo ativo</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mt-1">
                        Demonstre interesse em oportunidades para iniciar um processo de negociação.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredMatches.filter(m => m.stage !== 'new').map((process) => {
                    const getStageConfig = (stage: Match['stage']) => {
                      switch(stage) {
                        case 'interested':
                          return {
                            label: "Interesse Demonstrado",
                            color: "bg-amber-100 text-amber-800",
                            borderColor: "border-amber-500",
                            progress: 33
                          };
                        case 'nda_signed':
                          return {
                            label: "NDA Assinado",
                            color: "bg-blue-100 text-blue-800",
                            borderColor: "border-blue-500",
                            progress: 66
                          };
                        case 'meeting_scheduled':
                          return {
                            label: "Reunião Agendada",
                            color: "bg-emerald-100 text-emerald-800",
                            borderColor: "border-emerald-500",
                            progress: 90
                          };
                        default:
                          return {
                            label: "Em Andamento",
                            color: "bg-slate-100",
                            borderColor: "border-slate-500",
                            progress: 0
                          };
                      }
                    };

                    const config = getStageConfig(process.stage);
                    
                    return (
                      <motion.div
                        key={process.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Card className={`border-l-4 ${config.borderColor} dark:bg-slate-900 rounded-lg`}>
                          <CardContent className="p-4">
                            {/* Header */}
                            {(() => {
                              const colors = getCompatibilityColor(process.matchScore);
                              return (
                                <div className="flex gap-2 items-start mb-2">
                                  {renderLogo(process, process.matchScore)}
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{getDisplayName(process)}</h3>
                                    <p className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5">{process.sector}</p>
                                  </div>
                                </div>
                              );
                            })()}

                            {/* Location & Status Badge */}
                            <div className="flex gap-2 items-center mb-3">
                              <p className="text-2xs text-slate-500 dark:text-slate-400 truncate flex-1">{process.location}</p>
                              <Badge className={`${config.color} text-2xs py-1 px-2 whitespace-nowrap flex-shrink-0 font-medium`}>
                                {config.label}
                              </Badge>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-3">
                              <div className="flex justify-between text-2xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                                <span>Progresso</span>
                                <span className="text-primary font-bold">{config.progress}%</span>
                              </div>
                              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary transition-all duration-500"
                                  style={{ width: `${config.progress}%` }}
                                />
                              </div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-100 dark:border-slate-700/50">
                                <p className="text-2xs text-slate-500 dark:text-slate-400 mb-0.5 font-medium">Valor</p>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{process.price}</p>
                              </div>
                              <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-100 dark:border-slate-700/50">
                                <p className="text-2xs text-slate-500 dark:text-slate-400 mb-0.5 font-medium">Receita</p>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{process.revenue}</p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-2">
                              {(() => {
                                const getNextStep = (stage: Match['stage']) => {
                                  switch(stage) {
                                    case 'interested':
                                      return { label: 'NDA', action: 'nda_signed', icon: Lock };
                                    case 'nda_signed':
                                      return { label: 'Reunião', action: 'meeting_scheduled', icon: Calendar };
                                    default:
                                      return null;
                                  }
                                };
                                const nextStep = getNextStep(process.stage);
                                return nextStep ? (
                                  <>
                                    <Button 
                                      className="bg-primary hover:bg-primary/90 text-white font-semibold h-9 text-sm rounded-lg transition-all active:scale-95"
                                      onClick={() => updateMatchStage(process.id, nextStep.action as Match['stage'])}
                                    >
                                      <nextStep.icon className="h-4 w-4 mr-1" /> {nextStep.label}
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors h-9 text-sm rounded-lg"
                                      onClick={() => setSelectedMatchId(process.id)}
                                      data-testid={`button-details-${process.id}`}
                                    >
                                      <Eye className="h-4 w-4 mr-1" /> Ver
                                    </Button>
                                  </>
                                ) : (
                                  <Button 
                                    variant="outline" 
                                    className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors h-9 text-sm rounded-lg col-span-2"
                                    onClick={() => setSelectedMatchId(process.id)}
                                    data-testid={`button-details-${process.id}`}
                                  >
                                    <Eye className="h-4 w-4 mr-1.5" /> Ver Detalhes
                                  </Button>
                                );
                              })()}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })
                )}
              </>
            )}

            {/* Aba Outras Empresas */}
            {activeTab === "others" && (
              <>
                {otherCompanies.length === 0 ? (
                  <Card className="border-dashed border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                        <Building2 className="h-6 w-6 text-slate-400 dark:text-slate-600" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white">Nenhuma empresa disponível</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mt-1">
                        Não há outras empresas no momento.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  otherCompanies.map((company) => (
                    <motion.div
                      key={company.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 rounded-lg">
                        <CardContent className="p-4">
                          {/* Header */}
                          {(() => {
                            const colors = getCompatibilityColor(company.matchScore);
                            return (
                              <div className="flex items-start gap-2 mb-3">
                                <CompatibilityLogo matchScore={company.matchScore} isConfidential={true} size="sm" />
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{company.name}</h3>
                                  <p className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5">{company.sector}</p>
                                </div>
                              </div>
                            );
                          })()}

                          {/* Description */}
                          <p className="text-2xs text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">{company.description}</p>

                          {/* Compatibility Score */}
                          {(() => {
                            const colors = getCompatibilityColor(company.matchScore);
                            return (
                              <div className="mb-3">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-2xs font-semibold text-slate-600 dark:text-slate-400">Compatibilidade</span>
                                  <span className={`text-sm font-bold ${colors.textColor}`}>{company.matchScore}%</span>
                                </div>
                                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${colors.barColor} rounded-full transition-all duration-500`} 
                                    style={{ width: `${company.matchScore}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })()}

                          {/* Metrics Grid */}
                          <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700 mb-3">
                            <div className="text-center">
                              <p className="text-2xs text-slate-500 dark:text-slate-400 mb-0.5 font-medium">Receita</p>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">{company.revenue}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xs text-slate-500 dark:text-slate-400 mb-0.5 font-medium">Equipe</p>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">{company.employees}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xs text-slate-500 dark:text-slate-400 mb-0.5 font-medium">Local</p>
                              <p className="text-2xs font-bold text-slate-900 dark:text-white truncate">{company.location.split(',')[1]?.trim() || 'N/A'}</p>
                            </div>
                          </div>

                          {/* Action Button */}
                          <Button 
                            variant="outline" 
                            className="w-full text-sm border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 h-9 rounded-lg transition-all active:scale-95"
                            onClick={() => setSelectedMatchId(company.id)}
                            data-testid={`button-more-info-${company.id}`}
                          >
                            <Lock className="h-3.5 w-3.5 mr-1.5" /> Mais Info
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </>
            )}
          </div>
        )}

        {/* Match Details - Sheet for Mobile, Dialog for Desktop */}
        {isMobile ? (
          <Sheet open={!!selectedMatch} onOpenChange={(open) => !open && setSelectedMatchId(null)}>
            <SheetContent side="bottom" className="rounded-t-3xl flex flex-col h-[85vh]">
              <SheetHeader className="flex-shrink-0 pt-[0px] pb-[0px]">
                <div className="flex items-center gap-2 min-w-0">
                  {selectedMatch && renderLogo(selectedMatch, selectedMatch?.matchScore)}
                  <SheetTitle className="text-lg sm:text-2xl font-bold truncate">{selectedMatch ? getDisplayName(selectedMatch) : ''}</SheetTitle>
                </div>
              </SheetHeader>
              {selectedMatch && (
                <div className="flex-1 overflow-y-auto pr-4">
                  <div className="space-y-6 pb-6">
                    {/* Match Score */}
                    <div className="bg-sky-50 rounded-lg p-4 border border-sky-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-slate-700">Compatibilidade com seu perfil</span>
                      <span className="text-lg font-bold text-primary">{selectedMatch.matchScore}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${selectedMatch.matchScore}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Excelente match: empresa no seu setor preferido com múltiplo atrativo
                    </p>
                  </div>

                  {/* Detailed Metrics */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Métricas Financeiras</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">Receita Anual</p>
                        <p className="font-bold text-slate-900">{selectedMatch.revenue}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">EBITDA</p>
                        <p className="font-bold text-green-600">{selectedMatch.ebitda}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">Funcionários</p>
                        <p className="font-bold text-slate-900">{selectedMatch.employees}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">Setor</p>
                        <p className="font-bold text-slate-900">{selectedMatch.sector}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">Localização</p>
                        <p className="font-bold text-slate-900">{selectedMatch.location}</p>
                      </div>
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <p className="text-xs text-slate-500 mb-1">Preço Pedido</p>
                        <p className="font-bold text-primary">{selectedMatch.price}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900">Diferenciais</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMatch.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="border-slate-200 text-slate-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stage Information */}
                  <div className="space-y-2 bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-900">Status do Processo</h4>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2 px-1">
                      <span className={selectedMatch.stage === 'new' || selectedMatch.stage === 'interested' || selectedMatch.stage === 'nda_signed' ? "font-medium text-primary" : ""}>Interesse</span>
                      <div className="h-px bg-slate-200 flex-1 mx-2"></div>
                      <span className={selectedMatch.stage === 'interested' || selectedMatch.stage === 'nda_signed' ? "font-medium text-primary" : ""}>NDA</span>
                      <div className="h-px bg-slate-200 flex-1 mx-2"></div>
                      <span className={selectedMatch.stage === 'nda_signed' ? "font-medium text-primary" : ""}>Reunião</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ 
                          width: selectedMatch.stage === 'new' ? '10%' : selectedMatch.stage === 'interested' ? '50%' : '100%' 
                        }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {selectedMatch.stage === 'new' && (
                      <Button 
                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold"
                        onClick={() => updateMatchStage(selectedMatch.id, 'interested')}
                      >
                        <Heart className="h-4 w-4 mr-2" /> Demonstrar Interesse
                      </Button>
                    )}
                    {selectedMatch.stage === 'interested' && (
                      <Button 
                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                        onClick={() => updateMatchStage(selectedMatch.id, 'nda_signed')}
                      >
                        <Lock className="h-4 w-4 mr-2" /> Solicitar NDA
                      </Button>
                    )}
                    {selectedMatch.stage === 'nda_signed' && (
                      <Button 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                        onClick={() => updateMatchStage(selectedMatch.id, 'meeting_scheduled')}
                      >
                        <Calendar className="h-4 w-4 mr-2" /> Agendar Reunião
                      </Button>
                    )}
                  </div>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        ) : (
          <Dialog open={!!selectedMatch} onOpenChange={(open) => !open && setSelectedMatchId(null)}>
            <DialogContent className={`max-w-2xl max-h-[90vh] overflow-y-auto`}>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  {selectedMatch && renderLogo(selectedMatch, selectedMatch?.matchScore)}
                  <DialogTitle className="text-2xl">{selectedMatch ? getDisplayName(selectedMatch) : ''}</DialogTitle>
                </div>
                <DialogDescription>{selectedMatch?.description}</DialogDescription>
              </DialogHeader>
              
              {selectedMatch && (
                <div className="space-y-6">
                  {/* Match Score */}
                  <div className="bg-sky-50 rounded-lg p-4 border border-sky-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-slate-700">Compatibilidade com seu perfil</span>
                      <span className="text-lg font-bold text-primary">{selectedMatch.matchScore}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${selectedMatch.matchScore}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Excelente match: empresa no seu setor preferido com múltiplo atrativo
                    </p>
                  </div>

                  {/* Detailed Metrics */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Métricas Financeiras</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">Receita Anual</p>
                        <p className="font-bold text-slate-900">{selectedMatch.revenue}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">EBITDA</p>
                        <p className="font-bold text-green-600">{selectedMatch.ebitda}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">Funcionários</p>
                        <p className="font-bold text-slate-900">{selectedMatch.employees}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">Setor</p>
                        <p className="font-bold text-slate-900">{selectedMatch.sector}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">Localização</p>
                        <p className="font-bold text-slate-900">{selectedMatch.location}</p>
                      </div>
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <p className="text-xs text-slate-500 mb-1">Preço Pedido</p>
                        <p className="font-bold text-primary">{selectedMatch.price}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900">Diferenciais</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMatch.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="border-slate-200 text-slate-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stage Information */}
                  <div className="space-y-2 bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-900">Status do Processo</h4>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2 px-1">
                      <span className={selectedMatch.stage === 'new' || selectedMatch.stage === 'interested' || selectedMatch.stage === 'nda_signed' ? "font-medium text-primary" : ""}>Interesse</span>
                      <div className="h-px bg-slate-200 flex-1 mx-2"></div>
                      <span className={selectedMatch.stage === 'interested' || selectedMatch.stage === 'nda_signed' ? "font-medium text-primary" : ""}>NDA</span>
                      <div className="h-px bg-slate-200 flex-1 mx-2"></div>
                      <span className={selectedMatch.stage === 'nda_signed' ? "font-medium text-primary" : ""}>Reunião</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ 
                          width: selectedMatch.stage === 'new' ? '10%' : selectedMatch.stage === 'interested' ? '50%' : '100%' 
                        }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {selectedMatch.stage === 'new' && (
                      <Button 
                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold"
                        onClick={() => updateMatchStage(selectedMatch.id, 'interested')}
                      >
                        <Heart className="h-4 w-4 mr-2" /> Demonstrar Interesse
                      </Button>
                    )}
                    {selectedMatch.stage === 'interested' && (
                      <Button 
                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                        onClick={() => updateMatchStage(selectedMatch.id, 'nda_signed')}
                      >
                        <Lock className="h-4 w-4 mr-2" /> Solicitar NDA
                      </Button>
                    )}
                    {selectedMatch.stage === 'nda_signed' && (
                      <Button 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                        onClick={() => updateMatchStage(selectedMatch.id, 'meeting_scheduled')}
                      >
                        <Calendar className="h-4 w-4 mr-2" /> Agendar Reunião
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}

        {/* Mobile Tab Bar */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-slate-950/50 pb-6">
            <div className="flex items-center justify-around h-16 px-2">
              <button
                onClick={() => setActiveTab("new")}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-all ${
                  activeTab === "new"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-slate-600 dark:text-slate-400"
                }`}
                data-testid="tab-bar-button-new"
              >
                <Heart className="h-5 w-5 mb-0.5" />
                <span className="text-xs font-medium text-center">Novos</span>
              </button>
              <button
                onClick={() => setActiveTab("active")}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-all ${
                  activeTab === "active"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-slate-600 dark:text-slate-400"
                }`}
                data-testid="tab-bar-button-active"
              >
                <Clock className="h-5 w-5 mb-0.5" />
                <span className="text-xs font-medium text-center">Ativos</span>
              </button>
              <button
                onClick={() => setActiveTab("others")}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-all ${
                  activeTab === "others"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-slate-600 dark:text-slate-400"
                }`}
                data-testid="tab-bar-button-others"
              >
                <Building2 className="h-5 w-5 mb-0.5" />
                <span className="text-xs font-medium text-center">Outras</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
