import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8" data-testid="text-settings-title">Configurações</h1>
        
        <Card className="p-6 mb-6" data-testid="card-settings">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-semibold" data-testid="text-setting-notifications">Notificações</p>
                <p className="text-sm text-muted-foreground">Receber notificações por email</p>
              </div>
              <Switch data-testid="switch-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-semibold" data-testid="text-setting-theme">Tema Escuro</p>
                <p className="text-sm text-muted-foreground">Alternar entre tema claro e escuro</p>
              </div>
              <Switch data-testid="switch-theme" />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold" data-testid="text-setting-analytics">Compartilhar Dados</p>
                <p className="text-sm text-muted-foreground">Ajude-nos a melhorar compartilhando dados</p>
              </div>
              <Switch data-testid="switch-analytics" />
            </div>
          </div>
        </Card>

        <Button 
          variant="outline" 
          onClick={() => setLocation("/dashboard")} 
          data-testid="button-back-settings"
        >
          Voltar
        </Button>
      </div>
    </Layout>
  );
}
