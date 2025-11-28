import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/context";

export default function SettingsPage() {
  const [, setLocation] = useLocation();
  const { settings, updateSettings } = useAuth();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
          onClick={() => setLocation('/dashboard')}
          data-testid="button-back-settings"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Dashboard
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white" data-testid="text-settings-title">Configurações</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gerencie suas preferências</p>
        </div>
        
        <Card className="rounded-xl border text-card-foreground shadow p-6 bg-card dark:bg-[#0F172B] dark:border-slate-800" data-testid="card-settings">
          <div className="space-y-0">
            <div className="flex items-center justify-between py-4 border-b border-border dark:border-slate-800 last:border-b-0">
              <div>
                <p className="font-semibold text-foreground dark:text-white" data-testid="text-setting-notifications">Notificações</p>
                <p className="text-sm text-muted-foreground dark:text-slate-400">Receber notificações por email</p>
              </div>
              <Switch 
                data-testid="switch-notifications" 
                checked={settings.notifications}
                onCheckedChange={(checked) => updateSettings({ notifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between py-4 border-b border-border dark:border-slate-800 last:border-b-0">
              <div>
                <p className="font-semibold text-foreground dark:text-white" data-testid="text-setting-theme">Tema Escuro</p>
                <p className="text-sm text-muted-foreground dark:text-slate-400">Alternar entre tema claro e escuro</p>
              </div>
              <Switch 
                data-testid="switch-theme" 
                checked={settings.darkMode}
                onCheckedChange={(checked) => updateSettings({ darkMode: checked })}
              />
            </div>

            <div className="flex items-center justify-between py-4 border-b border-border dark:border-slate-800 last:border-b-0">
              <div>
                <p className="font-semibold text-foreground dark:text-white" data-testid="text-setting-analytics">Compartilhar Dados</p>
                <p className="text-sm text-muted-foreground dark:text-slate-400">Ajude-nos a melhorar compartilhando dados</p>
              </div>
              <Switch 
                data-testid="switch-analytics" 
                checked={settings.shareData}
                onCheckedChange={(checked) => updateSettings({ shareData: checked })}
              />
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
