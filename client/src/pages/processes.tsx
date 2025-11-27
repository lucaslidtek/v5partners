import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function ProcessesPage() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
          onClick={() => setLocation('/dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Dashboard
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Acompanhar Processos</h1>
          <p className="text-slate-500 mt-1">Gerencie suas negociações e NDAs ativos</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                Em Andamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg bg-slate-50">
                <h3 className="font-semibold mb-1">TechFlow Solutions</h3>
                <p className="text-sm text-slate-500 mb-3">NDA Assinado • Aguardando Data Room</p>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Concluídos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 italic">Nenhum processo concluído ainda.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
