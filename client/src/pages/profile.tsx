import { Layout } from "@/components/layout";
import { useAuth } from "@/lib/context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Target, Briefcase, Store } from "lucide-react";
import { useLocation } from "wouter";

export default function ProfilePage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const getProfileInfo = () => {
    switch(user?.role) {
      case "investor":
        return {
          title: "Investidor / Comprador",
          description: "Procurando empresas para comprar ou investir",
          icon: Target,
          bgColor: "bg-primary",
          textColor: "text-white",
          badgeColor: "bg-primary/10 text-primary"
        };
      case "seller":
        return {
          title: "Vendedor / Empresa",
          description: "Vendendo sua empresa ou negócio",
          icon: Briefcase,
          bgColor: "bg-secondary",
          textColor: "text-primary",
          badgeColor: "bg-secondary/10 text-secondary"
        };
      case "franchise":
        return {
          title: "Franqueadora",
          description: "Expandindo a franquia com novos franqueados",
          icon: Store,
          bgColor: "bg-accent",
          textColor: "text-white",
          badgeColor: "bg-accent/10 text-accent"
        };
      default:
        return null;
    }
  };

  const profileInfo = getProfileInfo();
  const ProfileIcon = profileInfo?.icon;

  const renderInvestorProfile = () => (
    <div className="space-y-6">
      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Nome Completo</label>
        <p className="text-lg font-semibold" data-testid="text-profile-name">{user?.name || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Email</label>
        <p className="text-lg font-semibold" data-testid="text-profile-email">{user?.email || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Localização</label>
        <p className="text-lg font-semibold" data-testid="text-profile-location">{user?.location || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Faixa Etária</label>
        <p className="text-lg font-semibold" data-testid="text-profile-age">{user?.ageRange || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Formação</label>
        <p className="text-lg font-semibold" data-testid="text-profile-education">{user?.education || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Faixa de Investimento</label>
        <p className="text-lg font-semibold" data-testid="text-profile-investment">{user?.investmentRange || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Retorno Desejado</label>
        <p className="text-lg font-semibold" data-testid="text-profile-roi">{user?.roiTime || "-"}</p>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground block mb-2">Experiência Anterior em Empresas</label>
        <p className="text-lg font-semibold" data-testid="text-profile-experience">
          {user?.hasExperience === true ? "Sim" : user?.hasExperience === false ? "Não" : "-"}
        </p>
      </div>
    </div>
  );

  const renderSellerProfile = () => (
    <div className="space-y-6">
      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Nome Fantasia da Empresa</label>
        <p className="text-lg font-semibold" data-testid="text-profile-trade-name">{user?.tradeName || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Email do Proprietário</label>
        <p className="text-lg font-semibold" data-testid="text-profile-email">{user?.email || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Localização</label>
        <p className="text-lg font-semibold" data-testid="text-profile-location">{user?.location || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Segmento</label>
        <p className="text-lg font-semibold" data-testid="text-profile-segment">{user?.segment || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Faturamento Mensal Médio</label>
        <p className="text-lg font-semibold" data-testid="text-profile-revenue">{user?.monthlyRevenue || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">EBITDA / Lucro Líquido</label>
        <p className="text-lg font-semibold" data-testid="text-profile-ebitda">{user?.ebitda || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Número de Funcionários</label>
        <p className="text-lg font-semibold" data-testid="text-profile-employees">{user?.employees || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Motivo da Venda</label>
        <p className="text-lg font-semibold" data-testid="text-profile-sell-reason">{user?.sellReason || "-"}</p>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground block mb-2">Estágio do Negócio</label>
        <p className="text-lg font-semibold" data-testid="text-profile-stage">{user?.stage || "-"}</p>
      </div>
    </div>
  );

  const renderFranchiseProfile = () => (
    <div className="space-y-6">
      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Nome da Franquia</label>
        <p className="text-lg font-semibold" data-testid="text-profile-franchise-name">{user?.franchiseName || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Email da Franqueadora</label>
        <p className="text-lg font-semibold" data-testid="text-profile-email">{user?.email || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Segmento</label>
        <p className="text-lg font-semibold" data-testid="text-profile-segment">{user?.segment || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Anos de Mercado</label>
        <p className="text-lg font-semibold" data-testid="text-profile-years-market">{user?.yearsInMarket || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Número de Unidades</label>
        <p className="text-lg font-semibold" data-testid="text-profile-units">{user?.numberOfUnits || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Investimento Inicial (Faixa)</label>
        <p className="text-lg font-semibold" data-testid="text-profile-investment">{user?.initialInvestment || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Taxa de Franquia</label>
        <p className="text-lg font-semibold" data-testid="text-profile-franchise-fee">{user?.franchiseFee || "-"}</p>
      </div>

      <div className="border-b border-border pb-6">
        <label className="text-sm font-medium text-muted-foreground block mb-2">Payback Médio</label>
        <p className="text-lg font-semibold" data-testid="text-profile-payback">{user?.payback || "-"}</p>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground block mb-2">Perfil Ideal do Franqueado</label>
        <p className="text-lg font-semibold capitalize" data-testid="text-profile-operator-type">
          {user?.operatorType === "investor" ? "Investidor" : user?.operatorType === "operator" ? "Operador" : "-"}
        </p>
      </div>
    </div>
  );

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

        {profileInfo && ProfileIcon && (
          <Card className={`${profileInfo.bgColor} ${profileInfo.textColor} p-6 mb-8`} data-testid="card-profile-type">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${profileInfo.badgeColor} flex-shrink-0`}>
                <ProfileIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1" data-testid="text-profile-type-title">{profileInfo.title}</h2>
                <p className="opacity-90" data-testid="text-profile-type-description">{profileInfo.description}</p>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6" data-testid="card-profile">
          {user?.role === "investor" && renderInvestorProfile()}
          {user?.role === "seller" && renderSellerProfile()}
          {user?.role === "franchise" && renderFranchiseProfile()}
        </Card>
      </div>
    </Layout>
  );
}
