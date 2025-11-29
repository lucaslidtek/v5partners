import { Layout } from "@/components/layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context";
import { motion } from "framer-motion";
import { Target, Briefcase, Store, CheckCircle2, Clock, Zap, TrendingUp, Users, Shield, MapPin, BarChart3, ChevronRight } from "lucide-react";
import logoColor from "@assets/v5partners_color1_1764265378727.png";
import logoWhite from "@assets/v5partners_white1_1764345179398.png";

export default function ProfileSelectionPage() {
  const { setProfileType, settings } = useAuth();

  const profiles = [
    {
      id: "investor",
      title: "Investidor / Comprador",
      icon: Target,
      description: "Quero encontrar empresas para comprar ou investir",
      badges: ["⏱️ 10 min", "🟢 Iniciante-Avançado"],
      features: [
        { icon: Zap, text: "Matches personalizados com IA" },
        { icon: TrendingUp, text: "Acesso a oportunidades pré-validadas" },
        { icon: BarChart3, text: "Relatórios detalhados de mercado" },
        { icon: Users, text: "Networking com investidores qualificados" }
      ],
      color: "bg-primary",
      buttonColor: "bg-primary hover:bg-primary/90",
      textColor: "text-white",
      highlight: true,
      highlight_text: "🏆 Mais Popular"
    },
    {
      id: "seller",
      title: "Vendedor / Empresa",
      icon: Briefcase,
      description: "Quero vender minha empresa ou negócio",
      badges: ["⏱️ 15 min", "🟡 Intermediário"],
      features: [
        { icon: BarChart3, text: "Valuation profissional e imparcial" },
        { icon: Shield, text: "Confidencialidade 100% garantida" },
        { icon: TrendingUp, text: "Exposição para investidores qualificados" },
        { icon: Users, text: "Suporte especializado na negociação" }
      ],
      color: "bg-secondary",
      buttonColor: "bg-secondary hover:bg-secondary/90",
      textColor: "text-blue-900",
      highlight: false
    },
    {
      id: "franchise",
      title: "Franqueadora",
      icon: Store,
      description: "Expandir minha franquia encontrando franqueados",
      badges: ["⏱️ 12 min", "🟡 Intermediário"],
      features: [
        { icon: Users, text: "Perfis pré-qualificados de franqueados" },
        { icon: MapPin, text: "Análise de potencial por região" },
        { icon: BarChart3, text: "Gestão inteligente de pipeline" },
        { icon: TrendingUp, text: "Relatórios de performance territorial" }
      ],
      color: "bg-accent",
      buttonColor: "bg-accent hover:bg-accent/90",
      textColor: "text-white",
      highlight: false
    }
  ];

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
             <img src={settings.darkMode ? logoWhite : logoColor} alt="V5 Partners" className="h-12 w-auto object-contain" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Escolha seu perfil</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Selecione a opção que melhor descreve você para começar</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={profile.highlight ? "md:scale-105" : ""}
            >
              <Card className={`h-full border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 flex flex-col relative overflow-hidden group ${
                profile.highlight 
                  ? "ring-2 ring-primary shadow-xl" 
                  : "hover:border-slate-300 dark:hover:border-slate-600"
              }`}>
                <div className={`absolute top-0 left-0 w-full h-1.5 ${profile.color}`} />
                
                {/* Highlight Badge */}
                {profile.highlight && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {profile.highlight_text}
                  </div>
                )}
                
                <CardHeader className="text-center pt-8 pb-3">
                  <div className={`mx-auto w-16 h-16 rounded-full ${profile.color}/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <profile.icon className={`w-8 h-8 ${profile.id === 'franchise' ? 'text-accent' : profile.id === 'seller' ? 'text-secondary' : 'text-primary'}`} />
                  </div>
                  
                  {/* Badges com Tempo e Complexidade */}
                  <div className="flex flex-wrap gap-2 justify-center mb-3">
                    {profile.badges.map((badge, i) => (
                      <span key={i} className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-2.5 py-1 rounded-full font-medium">
                        {badge}
                      </span>
                    ))}
                  </div>
                  
                  <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">{profile.title}</CardTitle>
                  <CardDescription className="mt-2 text-sm text-slate-600 dark:text-slate-400">{profile.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow py-5">
                  <ul className="space-y-2.5">
                    {profile.features.map((feature, i) => {
                      const FeatureIcon = feature.icon;
                      const colorClass = profile.id === 'franchise' ? 'text-accent' : profile.id === 'seller' ? 'text-secondary' : 'text-primary';
                      return (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                          <FeatureIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colorClass}`} />
                          <span className="leading-snug">{feature.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
                
                <CardFooter className="pb-6 pt-2 flex flex-col gap-3">
                  <Button 
                    className={`w-full ${profile.buttonColor} ${profile.textColor} font-semibold h-12 shadow-lg shadow-black/5 group/btn`}
                    onClick={() => setProfileType(profile.id as any)}
                    data-testid={`button-select-${profile.id}`}
                  >
                    Continuar como {profile.title.split(' / ')[0]}
                    <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Helper Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center max-w-2xl mx-auto"
        >
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Ainda está em dúvida?</p>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 font-medium">
            📞 Falar com especialista
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
}
