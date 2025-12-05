import { Layout } from "@/components/layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context";
import { motion } from "framer-motion";
import { Target, Briefcase, Store, CheckCircle2 } from "lucide-react";
import logoColor from "@assets/v5partners_color1_1764265378727.png";
import logoWhite from "@assets/v5partners_white1_1764345179398.png";
import { useContext } from "react";

export default function ProfileSelectionPage() {
  const { setProfileType, settings } = useAuth();

  const profiles = [
    {
      id: "investor",
      title: "Sou Investidor",
      icon: Target,
      description: "Quero encontrar empresas para comprar ou investir",
      features: [
        "Acesso a empresas pré-validadas",
        "Matches personalizados com IA",
        "Relatórios exclusivos do mercado",
        "Networking com outros investidores"
      ],
      color: "bg-primary",
      buttonColor: "bg-primary hover:bg-primary/90",
      textColor: "text-white"
    },
    {
      id: "seller",
      title: "Sou Empresa",
      icon: Briefcase,
      description: "Quero vender minha empresa ou negócio",
      features: [
        "Valuation profissional gratuito",
        "Exposição para investidores qualificados",
        "Processo confidencial e seguro",
        "Suporte durante toda negociação"
      ],
      color: "bg-secondary",
      buttonColor: "bg-secondary hover:bg-secondary/90",
      textColor: "text-white"
    },
    {
      id: "franchise",
      title: "Sou Franqueadora",
      icon: Store,
      description: "Quero expandir minha franquia encontrando franqueados",
      features: [
        "Perfis pré-qualificados de franqueados",
        "Análise de potencial por região",
        "Gestão de pipeline de expansão",
        "Relatórios de performance territorial"
      ],
      color: "bg-accent",
      buttonColor: "bg-accent hover:bg-accent/90",
      textColor: "text-white"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-slate-200 dark:border-slate-700 hover:border-primary/30 hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-300 flex flex-col relative overflow-hidden group cursor-pointer">
                <div className={`absolute top-0 left-0 w-full h-1.5 ${profile.color}`} />
                
                <CardHeader className="text-center pt-12 pb-4 relative z-10">
                  <div className={`mx-auto w-20 h-20 rounded-2xl ${profile.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out`}>
                    <profile.icon className={`w-10 h-10 ${profile.id === 'franchise' ? 'text-accent' : profile.id === 'seller' ? 'text-secondary' : 'text-primary'}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{profile.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed px-4">{profile.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow py-6 px-8 relative z-10">
                  <ul className="space-y-4">
                    {profile.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${profile.id === 'franchise' ? 'bg-accent' : profile.id === 'seller' ? 'bg-secondary' : 'bg-primary'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pb-8 pt-4 px-8 relative z-10">
                  <Button 
                    className={`w-full ${profile.buttonColor} ${profile.textColor} font-bold h-12 text-base shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300`}
                    onClick={() => setProfileType(profile.id as any)}
                    data-testid={`button-select-${profile.id}`}
                  >
                    Continuar como {profile.title.replace('Sou ', '')}
                  </Button>
                </CardFooter>
                
                {/* Decorative gradient background opacity on hover */}
                <div className={`absolute inset-0 bg-gradient-to-b ${profile.id === 'franchise' ? 'from-accent/5' : profile.id === 'seller' ? 'from-secondary/5' : 'from-primary/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
