import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, Shield, Rocket, Target, Zap, ShieldCheck } from "lucide-react";

type Slide = {
  title: string;
  text: string;
  cta?: string;
  icon: any;
  color: string;
};

const slidesByRole: Record<string, Slide[]> = {
  seller: [
    {
      title: "Valorizamos o seu legado.",
      text: "Vender uma empresa é mais do que uma transação, é o próximo passo da sua vida. Criamos um ambiente seguro e discreto para você encontrar o sucessor ideal para o que construiu.",
      icon: Shield,
      color: "blue"
    },
    {
      title: "Chega de curiosos. Apenas compradores reais.",
      text: "Nosso algoritmo blinda você de especuladores. Filtramos o mercado para trazer apenas investidores com capacidade financeira comprovada e fit real com o seu setor.",
      icon: Target,
      color: "emerald"
    },
    {
      title: "O mercado aguarda sua empresa.",
      text: "Para conectarmos você aos melhores compradores, precisamos entender os detalhes do negócio.",
      cta: "Criar meu Perfil Confidencial",
      icon: Rocket,
      color: "indigo"
    }
  ],
  investor: [
    {
      title: "Invista com inteligência e dados.",
      text: "Bem-vindo à V5 Partners. Aqui tratamos a compra de empresas com rigor institucional. Você está prestes a acessar oportunidades verificadas, longe da desorganização do mercado comum.",
      icon: Sparkles,
      color: "blue"
    },
    {
      title: "Oportunidades filtradas, risco mitigado.",
      text: "Não entregamos listas frias. Nossa tecnologia cruza sua tese de investimento com negócios pré-analisados. Você só vê o que realmente faz sentido para o seu portfólio e momento.",
      icon: ShieldCheck,
      color: "emerald"
    },
    {
      title: "Sua próxima aquisição está aqui.",
      text: "Para o match funcionar, precisamos calibrar sua busca (setor, faturamento, região). Vamos definir sua tese?",
      cta: "Definir Tese de Investimento",
      icon: Zap,
      color: "indigo"
    }
  ],
  franchise: [
    {
      title: "Expansão assertiva começa aqui.",
      text: "Sabemos que o desafio não é apenas vender uma unidade, é encontrar quem performa. Conectamos sua marca a empreendedores que buscam segurança e têm capital pronto.",
      icon: Rocket,
      color: "blue"
    },
    {
      title: "O franqueado ideal, pronto para assinar.",
      text: "O sistema da V5 vai além do 'tenho interesse'. Triamos investidores pelo capital disponível e perfil comportamental. Entregamos o candidato pronto para a entrevista final.",
      icon: Target,
      color: "emerald"
    },
    {
      title: "Vamos acelerar sua expansão?",
      text: "Cadastre os detalhes da sua franquia e os requisitos mandatórios (Hard/Soft skills). Nós cuidamos de encontrar quem veste a camisa.",
      cta: "Cadastrar minha Franquia",
      icon: Sparkles,
      color: "indigo"
    }
  ]
};

export default function WelcomeCarouselPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const role = user?.role || "investor";
  const slides = slidesByRole[role] || slidesByRole.investor;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setLocation("/integracao");
    }
  };

  const handleSkip = () => setLocation("/integracao");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full">
        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "w-8 bg-primary" : "w-2 bg-slate-200 dark:bg-slate-800"
                }`} 
              />
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={handleSkip} className="text-slate-400">
            Pular
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 text-center sm:text-left"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto sm:mx-0 ${
              slides[currentSlide].color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
              slides[currentSlide].color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' :
              'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
            }`}>
              {(() => {
                const Icon = slides[currentSlide].icon;
                return <Icon className="h-8 w-8" />;
              })()}
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                {slides[currentSlide].text}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12">
          <Button 
            onClick={handleNext} 
            className="w-full h-14 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all active:scale-[0.98]"
          >
            {slides[currentSlide].cta || "Próximo"}
            {currentSlide < slides.length - 1 && <ChevronRight className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
