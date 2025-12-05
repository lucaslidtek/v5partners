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
  Eye, Calendar, Lock, Clock, ArrowRight, Undo2, Check,
  Target, Briefcase, Store
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
  type: 'empresa' | 'investidor' | 'franqueadora';
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
  type: 'empresa' | 'investidor' | 'franqueadora';
};

const otherCompanies: OtherCompany[] = [
  {
    id: 101,
    name: "Confidencial #101",
    sector: "Tecnologia",
    location: "Rio de Janeiro, RJ",
    revenue: "R$ 5.2M",
    employees: 28,
    description: "Solução de software empresarial com foco em otimização de processos",
    matchScore: 76,
    logo: "E1",
    logoColor: "bg-purple-500",
    type: "investidor"
  },
  {
    id: 102,
    name: "Confidencial #102",
    sector: "Varejo",
    location: "Belo Horizonte, MG",
    revenue: "R$ 8.7M",
    employees: 52,
    description: "Rede de varejo especializada em produtos de qualidade premium",
    matchScore: 52,
    logo: "E2",
    logoColor: "bg-orange-500",
    type: "franqueadora"
  },
  {
    id: 103,
    name: "Confidencial #103",
    sector: "Logística",
    location: "Salvador, BA",
    revenue: "R$ 3.9M",
    employees: 35,
    description: "Empresa de logística e distribuição com foco no nordeste",
    matchScore: 38,
    logo: "E3",
    logoColor: "bg-cyan-500",
    type: "empresa"
  },
  {
    id: 104,
    name: "Confidencial #104",
    sector: "Alimentação",
    location: "Brasília, DF",
    revenue: "R$ 6.1M",
    employees: 42,
    description: "Produção e distribuição de alimentos com marca consolidada",
    matchScore: 68,
    logo: "E4",
    logoColor: "bg-red-500",
    type: "investidor"
  },
  {
    id: 105,
    name: "Confidencial #105",
    sector: "Educação",
    location: "Porto Alegre, RS",
    revenue: "R$ 4.5M",
    employees: 38,
    description: "Plataforma educacional com foco em treinamento corporativo",
    matchScore: 82,
    logo: "E5",
    logoColor: "bg-green-500",
    type: "franqueadora"
  },
  {
    id: 106,
    name: "Confidencial #106",
    sector: "Consultoria",
    location: "Fortaleza, CE",
    revenue: "R$ 7.3M",
    employees: 45,
    description: "Consultoria especializada em transformação digital e estratégia",
    matchScore: 45,
    logo: "E6",
    logoColor: "bg-indigo-500",
    type: "investidor"
  },
  {
    id: 107,
    name: "Confidencial #107",
    sector: "Fintech",
    location: "São Paulo, SP",
    revenue: "R$ 9.2M",
    employees: 55,
    description: "Plataforma de pagamentos e transações para pequenas empresas",
    matchScore: 85,
    logo: "E7",
    logoColor: "bg-yellow-500",
    type: "empresa"
  },
  {
    id: 108,
    name: "Confidencial #108",
    sector: "Saúde",
    location: "Campinas, SP",
    revenue: "R$ 11M",
    employees: 68,
    description: "Rede de clínicas e consultórios com gestão integrada",
    matchScore: 73,
    logo: "E8",
    logoColor: "bg-rose-500",
    type: "investidor"
  },
  {
    id: 109,
    name: "Confidencial #109",
    sector: "Imóvel",
    location: "Vitória, ES",
    revenue: "R$ 4.8M",
    employees: 22,
    description: "Plataforma de gestão e venda de imóveis com IA",
    matchScore: 61,
    logo: "E9",
    logoColor: "bg-teal-500",
    type: "empresa"
  },
  {
    id: 110,
    name: "Confidencial #110",
    sector: "Turismo",
    location: "Manaus, AM",
    revenue: "R$ 7.5M",
    employees: 34,
    description: "Agência de turismo especializada em ecoturismo amazônico",
    matchScore: 58,
    logo: "E10",
    logoColor: "bg-emerald-600",
    type: "investidor"
  },
  {
    id: 111,
    name: "Confidencial #111",
    sector: "Alimentos",
    location: "Goiânia, GO",
    revenue: "R$ 6.3M",
    employees: 41,
    description: "Produção de alimentos orgânicos e processados naturais",
    matchScore: 79,
    logo: "E11",
    logoColor: "bg-lime-500",
    type: "franqueadora"
  },
  {
    id: 112,
    name: "Confidencial #112",
    sector: "Moda",
    location: "São Paulo, SP",
    revenue: "R$ 13.5M",
    employees: 72,
    description: "Brand de moda casual com lojas físicas e e-commerce",
    matchScore: 88,
    logo: "E12",
    logoColor: "bg-pink-600",
    type: "investidor"
  },
  {
    id: 113,
    name: "Confidencial #113",
    sector: "Educação",
    location: "Belo Horizonte, MG",
    revenue: "R$ 5.7M",
    employees: 33,
    description: "Centro de cursos profissionalizantes e treinamentos corporativos",
    matchScore: 71,
    logo: "E13",
    logoColor: "bg-blue-600",
    type: "franqueadora"
  },
  {
    id: 114,
    name: "Confidencial #114",
    sector: "Tecnologia",
    location: "Recife, PE",
    revenue: "R$ 8.1M",
    employees: 47,
    description: "Startup de desenvolvimento de aplicativos mobile e web",
    matchScore: 82,
    logo: "E14",
    logoColor: "bg-violet-500",
    type: "empresa"
  },
  {
    id: 115,
    name: "Confidencial #115",
    sector: "Fitness",
    location: "Salvador, BA",
    revenue: "R$ 4.2M",
    employees: 28,
    description: "Rede de academias com metodologia premium e personal training",
    matchScore: 64,
    logo: "E15",
    logoColor: "bg-red-600",
    type: "investidor"
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
    logoColor: "bg-blue-500",
    type: "empresa"
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
    logoColor: "bg-pink-500",
    type: "franqueadora"
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
    logoImage: "/healthtech-logo.png",
    type: "empresa"
  },
  {
    id: 4,
    name: "GourmetBox Delivery",
    description: "Serviço de entrega de refeições gourmet com ingredientes premium para corporate.",
    matchScore: 87,
    revenue: "R$ 4.1M",
    ebitda: "22%",
    employees: 35,
    sector: "Alimentação/Delivery",
    location: "Rio de Janeiro, RJ",
    price: "R$ 9M",
    tags: ["Nicho Premium", "B2B2C", "Escalável"],
    isNew: true,
    stage: 'new',
    logo: "GB",
    logoColor: "bg-orange-500",
    type: "empresa"
  },
  {
    id: 5,
    name: "FitLife Franquias",
    description: "Rede de academias de fitness com tecnologia de inteligência artificial para treinos personalizados.",
    matchScore: 92,
    revenue: "R$ 8.7M",
    ebitda: "32%",
    employees: 52,
    sector: "Fitness/Saúde",
    location: "Belo Horizonte, MG",
    price: "R$ 12M",
    tags: ["Franquia Consolidada", "Tecnologia Proprietária", "Crescimento"],
    isNew: true,
    stage: 'new',
    logo: "FL",
    logoColor: "bg-red-500",
    type: "franqueadora"
  },
  {
    id: 6,
    name: "CloudStore Analytics",
    description: "Plataforma de analytics em tempo real para e-commerce e varejo omnichannel.",
    matchScore: 88,
    revenue: "R$ 5.5M",
    ebitda: "35%",
    employees: 28,
    sector: "SaaS/Analytics",
    location: "São Paulo, SP",
    price: "R$ 11M",
    tags: ["B2B SaaS", "Recorrência", "Margem Alta"],
    isNew: false,
    stage: 'interested',
    logo: "CA",
    logoColor: "bg-indigo-500",
    type: "empresa"
  },
  {
    id: 7,
    name: "Sustenta Brasil",
    description: "Empresa de produtos sustentáveis e biodegradáveis para empresas e consumidores finais.",
    matchScore: 85,
    revenue: "R$ 7.2M",
    ebitda: "18%",
    employees: 42,
    sector: "Sustentabilidade",
    location: "Brasília, DF",
    price: "R$ 13.5M",
    tags: ["ESG", "Crescimento de Mercado", "B2B2C"],
    isNew: true,
    stage: 'new',
    logo: "SB",
    logoColor: "bg-green-500",
    type: "empresa"
  },
  {
    id: 8,
    name: "EduCorp Training",
    description: "Plataforma de treinamento corporativo com cursos personalizados e certificações reconhecidas.",
    matchScore: 86,
    revenue: "R$ 6.9M",
    ebitda: "25%",
    employees: 38,
    sector: "Educação/Treinamento",
    location: "Curitiba, PR",
    price: "R$ 10.8M",
    tags: ["B2B", "Recorrência", "Escalável"],
    isNew: false,
    stage: 'interested',
    logo: "EC",
    logoColor: "bg-cyan-500",
    type: "franqueadora"
  },
  {
    id: 9,
    name: "MedSync Solutions",
    description: "Software para gestão integrada de clínicas e consultórios médicos com prontuário eletrônico.",
    matchScore: 90,
    revenue: "R$ 5.3M",
    ebitda: "31%",
    employees: 25,
    sector: "HealthTech",
    location: "Brasília, DF",
    price: "R$ 9.5M",
    tags: ["SaaS", "Regulado", "Mercado em Crescimento"],
    isNew: true,
    stage: 'new',
    logo: "MS",
    logoColor: "bg-rose-500",
    type: "empresa"
  },
];



const CircularProgress = ({ value, size = 50, strokeWidth = 4, color = "text-primary" }: any) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-slate-200 dark:text-slate-800"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${color} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute text-xs font-bold text-slate-900 dark:text-white">{value}%</span>
    </div>
  );
};

export default function DashboardPage() {
  const { user, activeProfile } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState("new");
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);
  const [lastAction, setLastAction] = useState<{ id: number; previousStage: Match['stage'] } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [selectedTypesOthers, setSelectedTypesOthers] = useState<Set<string>>(new Set());
  const [compatibilityRangeOthers, setCompatibilityRangeOthers] = useState([0, 100]);
  const [selectedSectors, setSelectedSectors] = useState<Set<string>>(new Set());
  const [selectedMetrics, setSelectedMetrics] = useState<Set<string>>(new Set());
  
  const getValuationLabel = (value: number) => {
    if (value <= 25) return "R$ 1M - R$ 10M";
    if (value <= 50) return "R$ 10M - R$ 30M";
    if (value <= 75) return "R$ 30M - R$ 60M";
    return "R$ 60M - R$ 100M+";
  };

  // Get allowed profile types based on user's current profile type
  const getAllowedProfileTypes = () => {
    if (!activeProfile?.type) return null;
    
    if (activeProfile.type === 'investor') {
      return ['empresa', 'franqueadora'];
    }
    // For seller and franchise profiles, only show investors
    return ['investidor'];
  };

  const allowedTypes = getAllowedProfileTypes();

  const filteredMatches = matches.filter(match => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      match.name.toLowerCase().includes(searchLower) ||
      match.sector.toLowerCase().includes(searchLower) ||
      match.location.toLowerCase().includes(searchLower) ||
      match.description.toLowerCase().includes(searchLower)
    );
    
    // Filter by profile type matching logic
    const matchesProfileType = !allowedTypes || allowedTypes.includes(match.type);
    
    return matchesSearch && matchesProfileType;
  });

  const filteredOtherCompanies = otherCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by profile type matching logic
    const matchesProfileType = !allowedTypes || allowedTypes.includes(company.type);
    
    const matchesType = selectedTypesOthers.size === 0 || selectedTypesOthers.has(company.type);
    const matchesCompatibility = company.matchScore >= compatibilityRangeOthers[0] && company.matchScore <= compatibilityRangeOthers[1];
    
    return matchesSearch && matchesProfileType && matchesType && matchesCompatibility;
  });
  
  // Create a combined list for selecting both matches and other companies
  const allCompanies = [
    ...matches,
    ...filteredOtherCompanies.map(oc => ({
      ...oc,
      description: oc.description || '',
      matchScore: oc.matchScore,
      ebitda: 'N/A',
      price: 'N/A',
      tags: [],
      isNew: false,
      stage: 'new' as const
    }))
  ];
  
  const selectedMatch = allCompanies.find(m => m.id === selectedMatchId);

  useEffect(() => {
    // Force clear cache and reload with new data
    localStorage.clear();
    sessionStorage.clear();
    setMatches(initialMatches);
    localStorage.setItem('matches', JSON.stringify(initialMatches));
    localStorage.setItem('dataVersion', 'v2');

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
    return `Confidencial #${match.id}`;
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

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'investidor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'franqueadora':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'empresa':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'investidor':
        return 'Investidor';
      case 'franqueadora':
        return 'Franqueadora';
      case 'empresa':
        return 'Empresa';
      default:
        return 'Perfil';
    }
  };

  return (
    <Layout>
      <div className={`${isMobile ? 'pb-40' : ''} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isMobile ? 'py-4' : 'py-8'}`}>
        {/* Welcome Section */}
        <div className={`${isMobile ? 'mb-6' : 'mb-8'} flex items-center justify-between`}>
          <div>
            <h1 className={`${isMobile ? 'text-2xl font-bold' : 'text-3xl font-bold'} text-slate-900 dark:text-white`}>
              {activeTab === "new" ? "Matches Recomendados" : activeTab === "active" ? "Processos Ativos" : "Outros Perfis"}
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
                      {activeTab === 'others' && (
                        <>
                          <div className="space-y-3">
                            <Label>Tipo de Perfil</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {['empresa', 'investidor', 'franqueadora'].map((type) => {
                                const getIcon = (typeVal: string) => {
                                  if (typeVal === 'investidor') return Target;
                                  if (typeVal === 'empresa') return Briefcase;
                                  return Store;
                                };
                                const IconComponent = getIcon(type);
                                return (
                                <Button
                                  key={type}
                                  onClick={() => {
                                    const newTypes = new Set(selectedTypesOthers);
                                    if (newTypes.has(type)) newTypes.delete(type);
                                    else newTypes.add(type);
                                    setSelectedTypesOthers(newTypes);
                                  }}
                                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                                    selectedTypesOthers.has(type)
                                      ? 'bg-primary text-white shadow-lg'
                                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                                  }`}
                                >
                                  <IconComponent className="h-4 w-4" />
                                  {type === 'empresa' ? 'Empresa' : type === 'investidor' ? 'Investidor' : 'Franqueadora'}
                                </Button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Faixa de Compatibilidade</Label>
                            <div className="mb-3 flex justify-between items-center bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-100 dark:border-green-800">
                              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                {compatibilityRangeOthers[0]}% - {compatibilityRangeOthers[1]}%
                              </span>
                            </div>
                            <Slider 
                              value={compatibilityRangeOthers} 
                              onValueChange={setCompatibilityRangeOthers} 
                              max={100} 
                              step={1} 
                              className="py-4"
                            />
                            <div className="flex justify-between text-xs text-slate-500">
                              <span>0%</span>
                              <span>100%</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label>Setores de Interesse</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {[
                                { id: 'tech', label: 'Tecnologia / SaaS' },
                                { id: 'retail', label: 'Varejo' },
                                { id: 'health', label: 'Saúde' },
                                { id: 'fintech', label: 'Fintech' }
                              ].map((sector) => (
                                <Button
                                  key={sector.id}
                                  onClick={() => {
                                    const newSectors = new Set(selectedSectors);
                                    if (newSectors.has(sector.id)) newSectors.delete(sector.id);
                                    else newSectors.add(sector.id);
                                    setSelectedSectors(newSectors);
                                  }}
                                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                                    selectedSectors.has(sector.id)
                                      ? 'bg-primary text-white shadow-lg'
                                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                                  }`}
                                >
                                  {sector.label}

                                </Button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label>Métricas Financeiras</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {[
                                { id: 'ebitda', label: 'EBITDA Positivo' },
                                { id: 'growth', label: `Crescimento > 20% a.a.` }
                              ].map((metric) => (
                                <Button
                                  key={metric.id}
                                  onClick={() => {
                                    const newMetrics = new Set(selectedMetrics);
                                    if (newMetrics.has(metric.id)) newMetrics.delete(metric.id);
                                    else newMetrics.add(metric.id);
                                    setSelectedMetrics(newMetrics);
                                  }}
                                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                                    selectedMetrics.has(metric.id)
                                      ? 'bg-primary text-white shadow-lg'
                                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                                  }`}
                                >
                                  {metric.label}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                      {activeTab !== 'others' && (
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
                        )}
                    
                    {activeTab !== 'others' && (
                      <>
                        <div className="space-y-3">
                          <Label>Setores de Interesse</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {[
                              { id: 'tech', label: 'Tecnologia / SaaS' },
                              { id: 'retail', label: 'Varejo' },
                              { id: 'health', label: 'Saúde' },
                              { id: 'fintech', label: 'Fintech' }
                            ].map((sector) => (
                              <Button
                                key={sector.id}
                                onClick={() => {
                                  const newSectors = new Set(selectedSectors);
                                  if (newSectors.has(sector.id)) newSectors.delete(sector.id);
                                  else newSectors.add(sector.id);
                                  setSelectedSectors(newSectors);
                                }}
                                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                                  selectedSectors.has(sector.id)
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                              >
                                {sector.label}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>Métricas Financeiras</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {[
                              { id: 'ebitda', label: 'EBITDA Positivo' },
                              { id: 'growth', label: `Crescimento > 20% a.a.` }
                            ].map((metric) => (
                              <Button
                                key={metric.id}
                                onClick={() => {
                                  const newMetrics = new Set(selectedMetrics);
                                  if (newMetrics.has(metric.id)) newMetrics.delete(metric.id);
                                  else newMetrics.add(metric.id);
                                  setSelectedMetrics(newMetrics);
                                }}
                                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                                  selectedMetrics.has(metric.id)
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                              >
                                {metric.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

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
                      {activeTab === 'others' ? 'Refine sua busca por perfis.' : 'Refine sua busca por oportunidades de investimento.'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="overflow-y-auto max-h-[70vh] pr-4">
                    <div className="py-6 space-y-6">
                      {activeTab === 'others' && (
                        <>
                          <div className="space-y-3">
                            <Label>Tipo de Perfil</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {['empresa', 'investidor', 'franqueadora'].map((type) => {
                                const getIcon = (typeVal: string) => {
                                  if (typeVal === 'investidor') return Target;
                                  if (typeVal === 'empresa') return Briefcase;
                                  return Store;
                                };
                                const IconComponent = getIcon(type);
                                return (
                                <Button
                                  key={type}
                                  onClick={() => {
                                    const newTypes = new Set(selectedTypesOthers);
                                    if (newTypes.has(type)) newTypes.delete(type);
                                    else newTypes.add(type);
                                    setSelectedTypesOthers(newTypes);
                                  }}
                                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                                    selectedTypesOthers.has(type)
                                      ? 'bg-primary text-white shadow-lg'
                                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                                  }`}
                                >
                                  <IconComponent className="h-4 w-4" />
                                  {type === 'empresa' ? 'Empresa' : type === 'investidor' ? 'Investidor' : 'Franqueadora'}
                                </Button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Faixa de Compatibilidade</Label>
                            <div className="mb-3 flex justify-between items-center bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-100 dark:border-green-800">
                              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                {compatibilityRangeOthers[0]}% - {compatibilityRangeOthers[1]}%
                              </span>
                            </div>
                            <Slider 
                              value={compatibilityRangeOthers} 
                              onValueChange={setCompatibilityRangeOthers} 
                              max={100} 
                              step={1} 
                              className="py-4"
                            />
                            <div className="flex justify-between text-xs text-slate-500">
                              <span>0%</span>
                              <span>100%</span>
                            </div>
                          </div>
                        </>
                      )}
                      {activeTab !== 'others' && (
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
                        )}
                    
                    {activeTab !== 'others' && (
                      <>
                        <div className="space-y-3">
                          <Label>Setores de Interesse</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {[
                              { id: 'tech', label: 'Tecnologia / SaaS' },
                              { id: 'retail', label: 'Varejo' },
                              { id: 'health', label: 'Saúde' },
                              { id: 'fintech', label: 'Fintech' }
                            ].map((sector) => (
                              <Button
                                key={sector.id}
                                onClick={() => {
                                  const newSectors = new Set(selectedSectors);
                                  if (newSectors.has(sector.id)) newSectors.delete(sector.id);
                                  else newSectors.add(sector.id);
                                  setSelectedSectors(newSectors);
                                }}
                                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                                  selectedSectors.has(sector.id)
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                              >
                                {sector.label}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>Métricas Financeiras</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {[
                              { id: 'ebitda', label: 'EBITDA Positivo' },
                              { id: 'growth', label: `Crescimento > 20% a.a.` }
                            ].map((metric) => (
                              <Button
                                key={metric.id}
                                onClick={() => {
                                  const newMetrics = new Set(selectedMetrics);
                                  if (newMetrics.has(metric.id)) newMetrics.delete(metric.id);
                                  else newMetrics.add(metric.id);
                                  setSelectedMetrics(newMetrics);
                                }}
                                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                                  selectedMetrics.has(metric.id)
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                              >
                                {metric.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

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
              <Card className="border-dashed border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 col-span-full">
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
              filteredMatches.filter(m => m.stage === 'new').map((match, index) => (
            <motion.div 
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className={`h-full border-slate-200 dark:border-slate-800 dark:bg-slate-900 hover:shadow-xl dark:hover:shadow-primary/5 transition-all duration-300 overflow-hidden ${isMobile ? 'border-l-4 border-l-primary rounded-xl' : ''}`}>
                <div className={`${isMobile ? 'p-5' : 'p-6'}`}>
                  {/* Header redesigned */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4 flex-1">
                       {renderLogo(match, match.matchScore)}
                       <div>
                          <div className="flex items-center gap-2 mb-1">
                             <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{getDisplayName(match)}</h3>
                             {match.isNew && (
                               <span className="text-[10px] px-2 py-0.5 bg-sky-100 text-sky-700 rounded-full font-bold uppercase tracking-wider">Novo</span>
                             )}
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                            {match.sector} 
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                            {match.location}
                          </p>
                       </div>
                    </div>
                    
                    {/* Circular Score */}
                    <div className="flex flex-col items-center">
                       <CircularProgress value={match.matchScore} size={48} strokeWidth={4} color={getCompatibilityColor(match.matchScore).textColor.split(' ')[0]} />
                       <span className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Match</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-6 min-h-[40px] leading-relaxed">
                    {match.description}
                  </p>

                  {/* Metrics - Cleaner */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-semibold">Preço</p>
                        <p className="font-bold text-slate-900 dark:text-white text-base">{match.price}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-semibold">Receita</p>
                        <p className="font-bold text-slate-900 dark:text-white text-base">{match.revenue}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-semibold">EBITDA</p>
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 text-base">{match.ebitda}</p>
                      </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {match.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button 
                      variant="ghost" 
                      className="h-10 text-slate-600 hover:text-primary hover:bg-primary/5 font-semibold transition-colors"
                      onClick={() => setSelectedMatchId(match.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" /> Detalhes
                    </Button>

                    {match.stage === 'new' && (
                      <Button 
                        className="h-10 bg-primary hover:bg-primary/90 text-white font-bold shadow-md hover:shadow-primary/20 transition-all"
                        onClick={() => updateMatchStage(match.id, 'interested')}
                      >
                        <Heart className="h-4 w-4 mr-2" /> Tenho Interesse
                      </Button>
                    )}
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
              <Card className="border-dashed border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 col-span-full">
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
              filteredMatches.filter(m => m.stage !== 'new').map((process, index) => {
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
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Card className={`h-full border-l-4 ${config.borderColor} dark:bg-slate-900 hover:shadow-xl transition-all duration-300 ${isMobile ? 'rounded-xl' : ''}`}>
                      <CardContent className={`${isMobile ? 'p-5' : 'p-8'}`}>
                        {isMobile ? (
                          // Mobile View - Keeping it compact but polished
                          <>
                            <div className="flex gap-3 items-start mb-3">
                              {renderLogo(process)}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{getDisplayName(process)}</h3>
                                  <Badge className={`${getTypeColor(process.type)} border-0 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider`}>{getTypeLabel(process.type)}</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={`${config.color} border-0 text-[10px] py-0.5 px-2 font-bold`}>
                                    {config.label}
                                  </Badge>
                                  <span className="text-xs text-slate-400">•</span>
                                  <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{process.location}</span>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          // Desktop View - Expanded and Premium
                          <div className="flex items-start justify-between gap-6 mb-6">
                            <div className="flex gap-5 flex-1 items-start min-w-0">
                              {renderLogo(process)}
                              <div className="flex-1 min-w-0 pt-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{getDisplayName(process)}</h3>
                                  <Badge className={`${getTypeColor(process.type)} border-0 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider`}>{getTypeLabel(process.type)}</Badge>
                                </div>
                                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 gap-3 font-medium">
                                  <span>{process.sector}</span>
                                  <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                                  <span>{process.location}</span>
                                </div>
                              </div>
                            </div>
                            <Badge className={`${config.color} border-0 text-sm py-1.5 px-4 font-bold shadow-sm`}>
                              {config.label}
                            </Badge>
                          </div>
                        )}

                        {/* Next Step Hint - Premium Card */}
                        {nextStep && (
                          <div className={`${isMobile ? 'mb-4 p-3' : 'mb-8 p-4'} bg-gradient-to-r from-sky-50 to-white dark:from-sky-900/20 dark:to-slate-900 border border-sky-100 dark:border-sky-800/50 rounded-xl shadow-sm flex items-center gap-4`}>
                            <div className={`rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400 flex-shrink-0 ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`}>
                              <nextStep.icon className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'}`} />
                            </div>
                            <div className="flex-1">
                              <p className={`font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider ${isMobile ? 'text-[10px] mb-0.5' : 'text-xs mb-1'}`}>
                                Próximo Passo
                              </p>
                              <p className={`font-bold text-slate-900 dark:text-white ${isMobile ? 'text-sm' : 'text-base'}`}>
                                {nextStep.label}
                              </p>
                            </div>
                            {!isMobile && (
                              <Button 
                                size="sm" 
                                className="bg-sky-600 hover:bg-sky-700 text-white shadow-sm font-semibold"
                                onClick={() => updateMatchStage(process.id, nextStep.action as Match['stage'])}
                              >
                                Realizar Agora
                              </Button>
                            )}
                          </div>
                        )}

                        {isMobile ? (
                          // Mobile Metrics
                          <div className="space-y-4 mb-4">
                            <div>
                                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                                  <span>Progresso</span>
                                  <span className="text-primary">{config.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${config.progress}%` }} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Valor</p>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{process.price}</p>
                              </div>
                              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Receita</p>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{process.revenue}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Desktop Metrics Grid
                          <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-slate-200 dark:hover:border-slate-600 transition-colors">
                              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Valor Pedido</p>
                              <p className="font-bold text-slate-900 dark:text-white text-xl">{process.price}</p>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-slate-200 dark:hover:border-slate-600 transition-colors">
                              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Receita Anual</p>
                              <p className="font-bold text-slate-900 dark:text-white text-xl">{process.revenue}</p>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-slate-200 dark:hover:border-slate-600 transition-colors">
                               <div className="flex justify-between items-center mb-2">
                                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Progresso</p>
                                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{config.progress}%</span>
                               </div>
                               <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
                                  <div className="h-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${config.progress}%` }} />
                               </div>
                            </div>
                          </div>
                        )}

                        <div className={`flex gap-3 ${isMobile ? 'flex-col' : 'pt-6 border-t border-slate-100 dark:border-slate-800'}`}>
                          {nextStep ? (
                            <>
                              <Button 
                                size={isMobile ? "sm" : "lg"}
                                className={`${isMobile ? 'flex-1 h-10' : 'flex-1 h-12'} bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5`}
                                onClick={() => updateMatchStage(process.id, nextStep.action as Match['stage'])}
                                data-testid={`button-next-step-${process.id}`}
                              >
                                <nextStep.icon className={`h-4 w-4 ${!isMobile && 'mr-2'}`} /> {isMobile ? nextStep.label.split(' ')[0] : nextStep.label}
                              </Button>
                              <Button 
                                variant="outline" 
                                size={isMobile ? "sm" : "lg"}
                                className={`flex-1 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors ${isMobile ? 'h-10' : 'h-12'}`}
                                onClick={() => setSelectedMatchId(process.id)}
                                data-testid={`button-details-${process.id}`}
                              >
                                <Eye className={`h-4 w-4 ${!isMobile && 'mr-2'}`} /> {isMobile ? 'Ver' : 'Ver Detalhes'}
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button 
                                variant="outline" 
                                size={isMobile ? "sm" : "lg"}
                                className={`flex-1 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors ${isMobile ? 'h-10' : 'h-12'}`}
                                onClick={() => setSelectedMatchId(process.id)}
                                data-testid={`button-details-${process.id}`}
                              >
                                <Eye className={`h-4 w-4 ${!isMobile && 'mr-2'}`} /> {isMobile ? 'Ver' : 'Ver Detalhes'}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size={isMobile ? "sm" : "lg"}
                                className={`flex-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold ${isMobile ? 'h-10' : 'h-12'}`}
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
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{getDisplayName(match)}</h3>
                                    <Badge className={`${getTypeColor(match.type)} text-xs px-1.5 py-0.5 font-semibold`}>{getTypeLabel(match.type)}</Badge>
                                  </div>
                                  <p className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5">{match.sector}</p>
                                </div>
                                {match.isNew && (
                                  <span className="text-xs px-1.5 py-0.5 bg-sky-100 text-sky-700 rounded-full font-semibold whitespace-nowrap flex-shrink-0">Novo</span>
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
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{getDisplayName(process)}</h3>
                                      <Badge className={`${getTypeColor(process.type)} text-xs px-1.5 py-0.5 font-semibold`}>{getTypeLabel(process.type)}</Badge>
                                    </div>
                                    <p className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5">{process.sector}</p>
                                  </div>
                                </div>
                              );
                            })()}

                            {/* Location & Status Badge */}
                            <div className="flex gap-2 items-center mb-3">
                              <p className="text-2xs text-slate-500 dark:text-slate-400 truncate flex-1">{process.location}</p>
                              <Badge className={`${config.color} text-xs px-1.5 py-0.5 whitespace-nowrap flex-shrink-0 font-semibold`}>
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
                  filteredOtherCompanies.map((company) => (
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
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{company.name}</h3>
                                    <Badge className={`${getTypeColor(company.type)} text-xs px-1.5 py-0.5 font-semibold`}>{getTypeLabel(company.type)}</Badge>
                                  </div>
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
                  <div className="flex-1 min-w-0">
                    <SheetTitle className="text-lg sm:text-2xl font-bold truncate">{selectedMatch ? getDisplayName(selectedMatch) : ''}</SheetTitle>
                    {selectedMatch && <Badge className={`${getTypeColor(selectedMatch.type)} text-xs px-2 py-0.5 font-semibold mt-1`}>{getTypeLabel(selectedMatch.type)}</Badge>}
                  </div>
                </div>
              </SheetHeader>
              {selectedMatch && (
                <div className="flex-1 overflow-y-auto pr-4">
                  <div className="space-y-6 pb-6">
                    {/* Match Score */}
                    {(() => {
                      const colors = getCompatibilityColor(selectedMatch.matchScore);
                      return (
                        <div className={`${colors.bgColor} rounded-lg p-4 border ${colors.borderColor}`}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-slate-700">Compatibilidade com seu perfil</span>
                            <span className={`text-lg font-bold ${colors.textColor}`}>{selectedMatch.matchScore}%</span>
                          </div>
                          <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${colors.barColor} rounded-full`}
                              style={{ width: `${selectedMatch.matchScore}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-2">
                            Excelente match: empresa no seu setor preferido com múltiplo atrativo
                          </p>
                        </div>
                      );
                    })()}

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
                  <div>
                    <DialogTitle className="text-2xl">{selectedMatch ? getDisplayName(selectedMatch) : ''}</DialogTitle>
                    {selectedMatch && <Badge className={`${getTypeColor(selectedMatch.type)} text-sm px-2 py-0.5 font-semibold mt-2`}>{getTypeLabel(selectedMatch.type)}</Badge>}
                  </div>
                </div>
                <DialogDescription>{selectedMatch?.description}</DialogDescription>
              </DialogHeader>
              
              {selectedMatch && (
                <div className="space-y-6">
                  {/* Match Score */}
                  {(() => {
                    const colors = getCompatibilityColor(selectedMatch.matchScore);
                    return (
                      <div className={`${colors.bgColor} rounded-lg p-4 border ${colors.borderColor}`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-slate-700">Compatibilidade com seu perfil</span>
                          <span className={`text-lg font-bold ${colors.textColor}`}>{selectedMatch.matchScore}%</span>
                        </div>
                        <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${colors.barColor} rounded-full`}
                            style={{ width: `${selectedMatch.matchScore}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Excelente match: empresa no seu setor preferido com múltiplo atrativo
                        </p>
                      </div>
                    );
                  })()}

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
                <span className="text-xs font-medium text-center">Outros</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
