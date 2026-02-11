import { useState } from "react";
import { Layout } from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/context";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

import { Link } from "wouter";

import logoColor from "@assets/v5partners_color1_1764265378727.png";
import logoWhite from "@assets/v5partners_white1_1764345179398.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay for "modern" feel
    setTimeout(() => {
      login(email || "joao.silva@example.com", "João Silva");
    }, 800);
  };

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen w-full flex">
        {/* Left Panel - Brand & Visuals (Hidden on mobile) */}
        <div className="hidden lg:flex w-1/2 bg-[#00205D] relative overflow-hidden flex-col justify-between p-12 text-white">
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
             <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#0C70F2]/30 rounded-full blur-[120px]" />
             <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1BB5F2]/20 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10">
            <img src={logoWhite} alt="V5 Partners" className="h-12 w-auto mb-8" />
          </div>

          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-bold mb-6 leading-tight tracking-tight">
              Conectando Visões, <br/>
              <span className="text-[#27DEF2]">Criando Legados.</span>
            </h2>
            <p className="text-slate-200 text-lg mb-8 leading-relaxed">
              A plataforma premium de matchmaking que une investidores qualificados a oportunidades de negócios validadas.
            </p>
            
            <div className="space-y-4">
              {[
                "Matches baseados em dados reais",
                "Valuation profissional e imparcial",
                "Total confidencialidade e segurança"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1BB5F2]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-[#1BB5F2]" />
                  </div>
                  <span className="text-slate-100">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 text-sm text-slate-400">
            © 2025 V5 Partners. Todos os direitos reservados.
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 bg-background dark:bg-slate-900 flex items-center justify-center p-8 lg:p-24 relative">
          <div className="w-full max-w-sm space-y-8">
            <div className="text-center lg:text-left">
              <img src={logoColor} alt="V5 Partners" className="h-12 w-auto mb-8 lg:hidden mx-auto dark:hidden" />
              <img src={logoWhite} alt="V5 Partners" className="h-12 w-auto mb-8 lg:hidden mx-auto hidden dark:block" />
              <h1 className="text-3xl font-bold text-foreground dark:text-white tracking-tight">Bem-vindo</h1>
              <p className="text-muted-foreground dark:text-slate-400 mt-2">Entre com suas credenciais para acessar.</p>
            </div>

            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full h-11 border-input dark:border-slate-700 hover:bg-muted dark:hover:bg-slate-800 hover:border-slate-300 transition-all">
                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Entrar com o Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground dark:text-slate-400">Ou continue com email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground dark:text-white font-medium">Email corporativo</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    id="email" 
                    placeholder="nome@empresa.com" 
                    className="pl-10 h-12 bg-white dark:bg-slate-800 border-input dark:border-slate-700 transition-all duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-foreground dark:text-white font-medium">Senha</Label>
                  <a href="#" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                    Esqueceu?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-12 bg-white dark:bg-slate-800 border-input dark:border-slate-700 transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Entrando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Acessar Plataforma <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground dark:text-slate-400">Não tem uma conta? </span>
              <Link href="/registrar" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                Criar conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
