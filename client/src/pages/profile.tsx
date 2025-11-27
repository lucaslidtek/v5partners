import { Layout } from "@/components/layout";
import { useAuth } from "@/lib/context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function ProfilePage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8" data-testid="text-profile-title">Perfil</h1>
        
        <Card className="p-6 mb-6" data-testid="card-profile">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nome</label>
              <p className="text-lg font-semibold mt-1" data-testid="text-profile-name">{user?.name}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-lg font-semibold mt-1" data-testid="text-profile-email">{user?.email}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Função</label>
              <p className="text-lg font-semibold mt-1 capitalize" data-testid="text-profile-role">
                {user?.role === 'investor' ? 'Investidor' : user?.role}
              </p>
            </div>
          </div>
        </Card>

        <Button 
          variant="outline" 
          onClick={() => setLocation("/dashboard")} 
          data-testid="button-back-profile"
        >
          Voltar
        </Button>
      </div>
    </Layout>
  );
}
