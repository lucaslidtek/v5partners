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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { 
  Search, Filter, Heart, FileText, MessageSquare, 
  MapPin, DollarSign, Users, TrendingUp, Building2, 
  Eye, Calendar, Lock, Clock, ArrowRight
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
  const [activeTab, setActiveTab] = useState("new");
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);
  const [lastAction, setLastAction] = useState<{ id: number; previousStage: Match['stage'] } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const selectedMatch = matches.find(m => m.id === selectedMatchId);

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
    const savedMatches = localStorage.getItem('matches');
    if (savedMatches) {
      setMatches(JSON.parse(savedMatches));
    } else {
      setMatches(initialMatches);
      localStorage.setItem('matches', JSON.stringify(initialMatches));
    }

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
      <div className={`${isMobile ? 'pb-24' : ''} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isMobile ? 'py-3' : 'py-8'}`}>
        {/* Welcome Section */}
        <div className={`${isMobile ? 'mb-3' : 'mb-8'}`}>
          <h1 className={`${isMobile ? 'text-2xl font-bold' : 'text-3xl font-bold'} text-slate-900`}>Olá, {user?.name || "Investidor"}! 👋</h1>
          {!isMobile && <p className="text-slate-500 mt-1">Aqui estão as oportunidades mais compatíveis com seu perfil de investimento</p>}
        </div>

        {/* Stats Grid */}
        {isMobile ? (
          <div className="grid grid-cols-2 gap-2 mb-3">
            {stats.slice(0, 4).map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-3 border border-primary/10">
                <p className="text-2xs text-slate-600 font-medium mb-1.5">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>
        ) : (
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
        )}

        {/* Search and Filter Bar */}
        <div className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-col md:flex-row gap-4'} ${isMobile ? 'mb-1' : 'mb-8'}`}>
          <div className="relative flex-grow">
            <Search className={`absolute ${isMobile ? 'left-3.5 top-3.5' : 'left-3 top-3'} ${isMobile ? 'h-4 w-4' : 'h-4 w-4'} text-slate-400`} />
            <Input 
              placeholder={isMobile ? "Buscar oportunidades..." : "Buscar por setor, localização ou nome..."} 
              className={`pl-10 ${isMobile ? 'h-11 rounded-lg' : 'h-11'} bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-primary/20 transition-all`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-search"
            />
          </div>
          <div className={`flex ${isMobile ? 'gap-2' : 'gap-2'} overflow-x-auto pb-2 md:pb-0`}>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className={`${isMobile ? 'h-11 px-3 rounded-lg' : 'h-11'} border-slate-200 bg-white whitespace-nowrap font-medium transition-colors hover:bg-slate-50`}>
                  <Filter className={`${isMobile ? 'h-4 w-4 mr-2' : 'mr-2 h-4 w-4'}`} /> {isMobile ? 'Filtros' : 'Filtros Avançados'}
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
              variant={isMobile ? "default" : "outline"}
              className={`${isMobile ? 'h-11 px-3 rounded-lg font-semibold shadow-md bg-primary hover:bg-primary/90 text-white' : 'h-11 border-slate-200 bg-white whitespace-nowrap'} whitespace-nowrap`}
              onClick={() => setLocation('/valuation')}
            >
              <TrendingUp className={`${isMobile ? 'h-4 w-4 mr-2' : 'mr-2 h-4 w-4'}`} /> {isMobile ? 'Valuation' : 'Novo Valuation'}
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab} className={`w-full ${isMobile ? 'fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200/50 shadow-2xl z-50 mt-1' : ''}`}>
          <div className={`${isMobile ? 'border-0 mb-0 px-0 py-0' : 'border-b border-slate-200 mb-8'}`}>
            <TabsList className={`${isMobile ? 'grid w-full grid-cols-2 h-auto bg-transparent p-0 gap-0 rounded-none' : 'grid w-full max-w-md grid-cols-2 h-auto bg-transparent p-0 gap-0'}`}>
              <TabsTrigger 
                value="new" 
                className={`relative px-0 ${isMobile ? 'py-4' : 'py-3'} h-auto bg-transparent text-slate-600 hover:text-slate-900 data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all duration-300 font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}
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
                className={`relative px-0 ${isMobile ? 'py-4' : 'py-3'} h-auto bg-transparent text-slate-600 hover:text-slate-900 data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all duration-300 font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}
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

          {/* New Matches Tab */}
          <TabsContent value="new" className={`${isMobile ? 'space-y-2 px-4 py-3 -mx-4' : 'space-y-6'}`}>
            {filteredMatches.filter(m => m.stage === 'new').length === 0 ? (
              <Card className="border-dashed border-2 border-slate-200 bg-slate-50">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">Nenhum novo match</h3>
                  <p className="text-slate-500 text-center max-w-sm mt-1">
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
              <Card className={`border-slate-200 ${!isMobile && 'hover:border-primary/30 hover:shadow-lg'} transition-all duration-300 overflow-hidden ${isMobile ? 'border-l-4 border-l-primary rounded-xl' : ''}`}>
                <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
                  {/* Header com título e status */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className={`${isMobile ? 'text-base font-bold' : 'text-xl font-bold'} text-slate-900 leading-tight`}>{match.name}</h3>
                      <p className={`${isMobile ? 'text-2xs' : 'text-sm'} text-slate-500 mt-1`}>{match.sector} • {match.location}</p>
                    </div>
                    {match.isNew && (
                      <span className={`${isMobile ? 'text-2xs px-2 py-1' : 'text-xs px-2.5 py-0.5'} bg-emerald-600 text-white rounded-full font-semibold whitespace-nowrap`}>Novo</span>
                    )}
                  </div>

                  {/* Progresso Bar */}
                  <div className={`${isMobile ? 'mb-3' : 'mb-6'}`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className={`${isMobile ? 'text-2xs' : 'text-xs'} font-semibold text-slate-600`}>Progresso</span>
                      <span className={`${isMobile ? 'text-sm' : 'text-sm'} font-bold text-primary`}>{match.matchScore}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500" 
                        style={{ width: `${match.matchScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Key Metrics Grid */}
                  {!isMobile && (
                    <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 mb-6`}>
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
                  )}

                  {/* Tags */}
                  <div className={`flex flex-wrap ${isMobile ? 'gap-1.5 mb-3' : 'gap-2 mb-6'}`}>
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
                  <div className={`grid ${isMobile ? 'grid-cols-2 gap-2 pt-3' : 'grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-slate-100'} ${!isMobile && 'border-t border-slate-100'}`}>
                    {/* Primary Action Button */}
                    {match.stage === 'new' && (
                      <Button 
                        className={`bg-primary hover:bg-primary/90 shadow-md font-semibold group ${isMobile ? 'h-10 text-sm col-span-2' : ''}`}
                        onClick={() => updateMatchStage(match.id, 'interested')}
                      >
                        <Heart className={`h-4 w-4 ${!isMobile && 'mr-2'} group-hover:scale-110 transition-transform`} /> {isMobile ? 'Marcar Interesse' : 'Tenho Interesse'}
                      </Button>
                    )}

                    {match.stage === 'interested' && (
                      <Button 
                        className={`bg-amber-600 hover:bg-amber-700 text-white shadow-md font-semibold ${isMobile ? 'h-10 text-sm col-span-2' : ''}`}
                        onClick={() => updateMatchStage(match.id, 'nda_signed')}
                      >
                        <Lock className={`h-4 w-4 ${!isMobile && 'mr-2'}`} /> {isMobile ? 'NDA' : 'Solicitar NDA'}
                      </Button>
                    )}

                    {match.stage === 'nda_signed' && (
                      <Button 
                        className={`bg-emerald-600 hover:bg-emerald-700 text-white shadow-md font-semibold ${isMobile ? 'h-10 text-sm col-span-2' : ''}`}
                        onClick={() => updateMatchStage(match.id, 'meeting_scheduled')}
                      >
                        <Calendar className={`h-4 w-4 ${!isMobile && 'mr-2'}`} /> {isMobile ? 'Reunião' : 'Agendar Reunião'}
                      </Button>
                    )}

                    {/* Secondary Action - Details */}
                    <Button 
                      variant="outline" 
                      className={`border-slate-200 hover:bg-slate-50 font-semibold transition-colors ${isMobile ? 'h-10 text-sm' : ''}`}
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

          {/* Active Processes Tab */}
          <TabsContent value="active" className={`${isMobile ? 'space-y-2 px-4 py-3 -mx-4' : 'space-y-6'}`}>
            {filteredMatches.filter(m => m.stage !== 'new').length === 0 ? (
              <Card className="border-dashed border-2 border-slate-200 bg-slate-50">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">Nenhum processo ativo</h3>
                  <p className="text-slate-500 text-center max-w-sm mt-1">
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
                    <Card className={`border-l-4 ${config.borderColor} ${isMobile ? 'rounded-xl' : ''}`}>
                      <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex-1">
                            <h3 className={`${isMobile ? 'text-base font-bold' : 'text-lg font-bold'} text-slate-900`}>{process.name}</h3>
                            <p className={`${isMobile ? 'text-2xs' : 'text-sm'} text-slate-500 mt-0.5`}>{process.sector} • {process.location}</p>
                          </div>
                          <Badge className={`${config.color} ${isMobile ? 'text-2xs py-1 px-2 whitespace-nowrap' : 'text-xs'}`}>
                            {isMobile ? config.label.split(' ')[0] : config.label}
                          </Badge>
                        </div>

                        {/* Progress Bar */}
                        <div className={`${isMobile ? 'mb-3' : 'mb-4'}`}>
                          <div className={`flex justify-between ${isMobile ? 'text-2xs' : 'text-xs'} font-semibold text-slate-600 mb-1.5`}>
                            <span>Progresso</span>
                            <span>{config.progress}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-500"
                              style={{ width: `${config.progress}%` }}
                            />
                          </div>
                        </div>

                        {!isMobile && (
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="p-3 bg-slate-50 rounded-lg">
                              <p className="text-xs text-slate-500 mb-1">Valor</p>
                              <p className="font-bold text-slate-900">{process.price}</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg">
                              <p className="text-xs text-slate-500 mb-1">Receita</p>
                              <p className="font-bold text-slate-900">{process.revenue}</p>
                            </div>
                          </div>
                        )}

                        <div className={`flex gap-2 ${isMobile ? 'pt-3' : 'pt-2 border-t border-slate-100'} ${!isMobile && 'border-t border-slate-100'}`}>
                          <Button 
                            variant="outline" 
                            className={`flex-1 border-slate-200 hover:bg-slate-50 font-semibold transition-colors ${isMobile ? 'h-10 text-sm' : ''}`}
                            onClick={() => setSelectedMatchId(process.id)}
                            data-testid={`button-details-${process.id}`}
                          >
                            <Eye className={`h-4 w-4 ${!isMobile && 'mr-2'}`} /> {isMobile ? 'Ver' : 'Ver Detalhes'}
                          </Button>
                          {process.stage === 'interested' && (
                            <Button 
                              variant="ghost" 
                              className={`flex-1 text-slate-500 hover:text-slate-700 hover:bg-slate-50 font-semibold ${isMobile ? 'h-10 text-sm' : ''}`}
                              onClick={() => updateMatchStage(process.id, 'new')}
                              data-testid={`button-revert-${process.id}`}
                            >
                              ↶ {!isMobile && 'Reverter'}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </TabsContent>
        </Tabs>

        {/* Match Details Dialog */}
        <Dialog open={!!selectedMatch} onOpenChange={(open) => !open && setSelectedMatchId(null)}>
          <DialogContent className={`${isMobile ? 'max-w-full mx-2 max-h-[80vh]' : 'max-w-2xl max-h-[90vh]'} overflow-y-auto`}>
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedMatch?.name}</DialogTitle>
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
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
