import { useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/context";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";

import logo from "@assets/v5partners_color1_1764265378727.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    login(email || "joao.silva@example.com", "João Silva");
  };

  return (
    <Layout showHeader={false}>
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md z-10"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-2">
              <img src={logo} alt="V5 Partners" className="h-16 w-auto object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-4">Bem-vindo de volta</h1>
            <p className="text-slate-500 mt-2">Acesse sua conta para gerenciar seus matches</p>
          </div>

          <Card className="border-slate-200 shadow-xl shadow-slate-200/50">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email corporativo</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="email" 
                      placeholder="seu@email.com" 
                      className="pl-9 border-slate-200 focus-visible:ring-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <a href="#" className="text-sm text-primary hover:underline font-medium">Esqueceu a senha?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-9 border-slate-200 focus-visible:ring-primary"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-11 text-base shadow-lg shadow-primary/20 mt-2">
                  Entrar na Plataforma <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 bg-slate-50/50 border-t border-slate-100 py-6">
              <div className="text-center text-sm text-slate-500">
                Não tem uma conta? <a href="#" className="text-primary font-bold hover:underline">Cadastre-se</a>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
