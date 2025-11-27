import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function ValuationPage() {
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
          <h1 className="text-3xl font-bold text-slate-900">Novo Valuation</h1>
          <p className="text-slate-500 mt-1">Inicie uma nova avaliação de empresa</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ferramenta de Valuation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              Esta ferramenta permitirá calcular o valor estimado de empresas com base em múltiplos de mercado e fluxo de caixa descontado.
            </p>
            <Button>Iniciar Nova Avaliação</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
