import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, Moon, Share2, Lock, Users, Globe } from "lucide-react";
import { useLocation } from "wouter";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/context";

export default function SettingsPage() {
  const [, setLocation] = useLocation();
  const { settings, updateSettings } = useAuth();

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    value, 
    onChange,
    testid 
  }: {
    icon: React.ElementType;
    title: string;
    description: string;
    value: boolean;
    onChange: (checked: boolean) => void;
    testid: string;
  }) => (
    <div className="flex items-center justify-between py-4 px-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mt-0.5">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-foreground dark:text-white" data-testid={`text-${testid}`}>{title}</p>
          <p className="text-sm text-muted-foreground dark:text-slate-400">{description}</p>
        </div>
      </div>
      <Switch 
        data-testid={`switch-${testid}`}
        checked={value}
        onCheckedChange={onChange}
      />
    </div>
  );

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-8 pl-0 hover:bg-transparent hover:text-primary"
          onClick={() => setLocation('/dashboard')}
          data-testid="button-back-settings"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Dashboard
        </Button>
        
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white" data-testid="text-settings-title">Configurações</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Personalize sua experiência e gerencie suas preferências</p>
        </div>

        {/* Preferências */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Preferências</h2>
          </div>
          <Card className="rounded-xl border text-card-foreground shadow-sm p-0 bg-card dark:bg-[#0F172B] dark:border-slate-800 overflow-hidden" data-testid="card-settings-preferences">
            <div className="divide-y divide-border dark:divide-slate-800">
              <SettingItem
                icon={Moon}
                title="Tema Escuro"
                description="Alternar entre tema claro e escuro"
                value={settings.darkMode}
                onChange={(checked) => updateSettings({ darkMode: checked })}
                testid="theme"
              />
              <SettingItem
                icon={Globe}
                title="Idioma"
                description="Português (Brasil) - em breve mais idiomas"
                value={true}
                onChange={() => {}}
                testid="language"
              />
            </div>
          </Card>
        </div>

        {/* Notificações */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-1 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Notificações</h2>
          </div>
          <Card className="rounded-xl border text-card-foreground shadow-sm p-0 bg-card dark:bg-[#0F172B] dark:border-slate-800 overflow-hidden" data-testid="card-settings-notifications">
            <div className="divide-y divide-border dark:divide-slate-800">
              <SettingItem
                icon={Bell}
                title="Notificações por Email"
                description="Receba atualizações importantes por email"
                value={settings.notifications}
                onChange={(checked) => updateSettings({ notifications: checked })}
                testid="notifications"
              />
            </div>
          </Card>
        </div>

        {/* Privacidade e Dados */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-1 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Privacidade e Dados</h2>
          </div>
          <Card className="rounded-xl border text-card-foreground shadow-sm p-0 bg-card dark:bg-[#0F172B] dark:border-slate-800 overflow-hidden" data-testid="card-settings-privacy">
            <div className="divide-y divide-border dark:divide-slate-800">
              <SettingItem
                icon={Share2}
                title="Compartilhar Dados"
                description="Ajude-nos a melhorar compartilhando dados de uso anônimos"
                value={settings.shareData}
                onChange={(checked) => updateSettings({ shareData: checked })}
                testid="analytics"
              />
              <SettingItem
                icon={Lock}
                title="Dados Privados"
                description="Suas informações pessoais nunca serão compartilhadas"
                value={true}
                onChange={() => {}}
                testid="privacy"
              />
            </div>
          </Card>
        </div>

        {/* Conta */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-1 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Conta</h2>
          </div>
          <Card className="rounded-xl border text-card-foreground shadow-sm p-0 bg-card dark:bg-[#0F172B] dark:border-slate-800 overflow-hidden" data-testid="card-settings-account">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground dark:text-white">Gerenciar Perfil</p>
                  <p className="text-sm text-muted-foreground dark:text-slate-400">Edite suas informações pessoais</p>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setLocation('/edit-profile')}
                  data-testid="button-edit-profile"
                  className="dark:border-slate-600 dark:hover:bg-slate-800"
                >
                  Editar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
