import { Layout } from "@/components/layout";
import { useAuth } from "@/lib/context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function ProfilePage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
          onClick={() => setLocation('/dashboard')}
          data-testid="button-back-profile"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Dashboard
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900" data-testid="text-profile-title">Perfil</h1>
          <p className="text-slate-500 mt-1">Informações da sua conta</p>
        </div>
        
        <Card className="p-6" data-testid="card-profile">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nome</label>
              <p className="text-lg font-semibold mt-2" data-testid="text-profile-name">{user?.name}</p>
            </div>
            
            <div className="border-t border-border pt-6">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-lg font-semibold mt-2" data-testid="text-profile-email">{user?.email}</p>
            </div>
            
            <div className="border-t border-border pt-6">
              <label className="text-sm font-medium text-muted-foreground">Função</label>
              <p className="text-lg font-semibold mt-2 capitalize" data-testid="text-profile-role">
                {user?.role === 'investor' ? 'Investidor' : user?.role}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
