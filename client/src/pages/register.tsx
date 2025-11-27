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
import logoWhite from "@assets/v5partners_pb4_1764265422084.png";

export default function RegisterPage() {
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
        <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
             <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/40 rounded-full blur-[120px]" />
             <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10">
            <img src={logoWhite} alt="V5 Partners" className="h-12 w-auto mb-8" />
          </div>

          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Conectando Visões, <br/>
              <span className="text-secondary">Criando Legados.</span>
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              A plataforma premium de matchmaking que une investidores qualificados a oportunidades de negócios validadas.
            </p>
            
            <div className="space-y-4">
              {[
                "Matches baseados em dados reais",
                "Valuation profissional e imparcial",
                "Total confidencialidade e segurança"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="text-slate-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 text-sm text-slate-500">
            © 2025 V5 Partners. Todos os direitos reservados.
          </div>
        </div>

        {/* Right Panel - Register Form */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 lg:p-24 relative">
          <div className="w-full max-w-sm space-y-8">
            <div className="text-center lg:text-left">
              <img src={logoColor} alt="V5 Partners" className="h-12 w-auto mb-8 lg:hidden mx-auto" />
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Criar conta</h1>
              <p className="text-slate-500 mt-2">Preencha seus dados para começar.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-11 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                Google
              </Button>
              <Button variant="outline" className="h-11 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
                LinkedIn
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400">Ou continue com email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">Email corporativo</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    id="email" 
                    placeholder="nome@empresa.com" 
                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-700 font-medium">Senha</Label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base bg-primary hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Criando conta...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Criar conta <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-slate-500">Já tem uma conta? </span>
              <Link href="/">
                <a className="font-semibold text-primary hover:text-primary/80 transition-colors">Fazer login</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
