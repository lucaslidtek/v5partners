import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/context";
import { motion } from "framer-motion";
import { 
  Search, Filter, Heart, FileText, MessageSquare, 
  MapPin, DollarSign, Users, TrendingUp, Building2, 
  Eye, Calendar, Lock, Clock, ChevronRight
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

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
    { label: "Matches Ativos", value: "12", icon: TargetIcon, color: "text-primary", bg: "bg-primary/10" },
    { label: "Empresas Favoritadas", value: "4", icon: Heart, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "NDAs Assinados", value: "2", icon: FileText, color: "text-accent", bg: "bg-accent/10" },
    { label: "Negociações", value: "1", icon: MessageSquare, color: "text-chart-5", bg: "bg-muted" },
  ];

  const matches = [
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
      isNew: true
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
      isNew: false
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Olá, {user?.name || "Investidor"}! 👋</h1>
            <p className="text-muted-foreground mt-1 text-lg">Explore as oportunidades mais compatíveis com seu perfil.</p>
          </div>
          <div className="flex items-center gap-2">
             <Button className="shadow-md">
                <TargetIcon className="mr-2 h-4 w-4" />
                Ver meus matches
             </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por setor, localização ou nome..." 
                  className="pl-10 h-11 bg-background border-input"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                <Button variant="outline" className="h-11 whitespace-nowrap">
                  <Filter className="mr-2 h-4 w-4" /> Filtros
                </Button>
                <Button variant="outline" className="h-11 whitespace-nowrap">
                  <TrendingUp className="mr-2 h-4 w-4" /> Valuation
                </Button>
                <Button variant="outline" className="h-11 whitespace-nowrap">
                  <Clock className="mr-2 h-4 w-4" /> Recentes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Matches Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              Matches Recomendados
              <Badge variant="secondary" className="rounded-full px-2.5 py-0.5">2 novos</Badge>
            </h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80">Ver todos <ChevronRight className="ml-1 h-4 w-4" /></Button>
          </div>

          {matches.map((match) => (
            <motion.div 
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-border/50 shadow-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column: Info */}
                    <div className="flex-grow space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{match.name}</h3>
                          {match.isNew && (
                            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80">Novo Match</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-lg leading-relaxed">{match.description}</p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="space-y-1">
                           <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Receita</p>
                           <p className="font-bold text-foreground text-lg">{match.revenue}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">EBITDA</p>
                           <p className="font-bold text-green-600 text-lg">{match.ebitda}</p>
                        </div>
                         <div className="space-y-1">
                           <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Preço</p>
                           <p className="font-bold text-primary text-lg">{match.price}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Setor</p>
                           <p className="font-bold text-foreground truncate" title={match.sector}>{match.sector}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {match.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80 font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Match Score & Actions */}
                    <div className="lg:w-72 flex flex-col gap-4 shrink-0">
                       <div className="bg-accent/5 rounded-xl p-5 border border-accent/20">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-bold text-foreground">Compatibilidade</span>
                          <span className="text-xl font-bold text-primary">{match.matchScore}%</span>
                        </div>
                        <div className="h-2.5 bg-muted rounded-full overflow-hidden mb-3">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${match.matchScore}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Excelente match com base em suas preferências de setor e faturamento.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button className="w-full col-span-2 shadow-sm">
                          <Heart className="mr-2 h-4 w-4" /> Tenho Interesse
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Eye className="mr-2 h-4 w-4" /> Detalhes
                        </Button>
                         <Button variant="outline" className="w-full">
                          <Lock className="mr-2 h-4 w-4" /> NDA
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
