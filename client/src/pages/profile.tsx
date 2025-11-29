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
      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Nome Completo</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-name">{user?.name || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Email</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-email">{user?.email || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Localização</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-location">{user?.location || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Faixa Etária</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-age">{user?.ageRange || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Formação</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-education">{user?.education || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Faixa de Investimento</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-investment">{user?.investmentRange || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Modalidade Desejada</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-modality">{user?.modality || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Retorno Desejado</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-roi">{user?.roiTime || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Experiência Anterior em Empresas</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-experience">
          {user?.hasExperience === true ? "Sim" : user?.hasExperience === false ? "Não" : "-"}
        </p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Setores de Experiência</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-sectors">{user?.experienceSectors || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Habilidades Predominantes</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-skills">{user?.skills || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Setores de Interesse</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-interest-sectors">{user?.interestSectors || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Grau de Envolvimento Operacional</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-involvement">{user?.operationalInvolvement ? `${user.operationalInvolvement}%` : "-"}</p>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Tolerância ao Risco</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-risk-tolerance">{user?.riskTolerance ? `${user.riskTolerance}%` : "-"}</p>
      </div>
    </div>
  );

  const renderSellerProfile = () => (
    <div className="space-y-6">
      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Nome Fantasia da Empresa</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-trade-name">{user?.tradeName || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Logo da Empresa</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-logo">{user?.logoUrl || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Email do Proprietário</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-email">{user?.email || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Localização</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-location">{user?.location || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Segmento</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-segment">{user?.segment || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Tipo de Operação</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-operation-type">{user?.operationType || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Faturamento Mensal Médio</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-revenue">{user?.monthlyRevenue || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Ticket Médio</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-ticket">{user?.ticketAverage || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">EBITDA / Lucro Líquido</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-ebitda">{user?.ebitda || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Número de Funcionários</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-employees">{user?.employees || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Grau de Dependência do Dono</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-owner-dependence">{user?.ownerDependence ? `${user.ownerDependence}%` : "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Motivo da Venda</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-sell-reason">{user?.sellReason || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Estágio do Negócio</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-stage">{user?.stage || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Passivos Existentes?</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-liabilities">
          {user?.liabilities === true ? "Sim" : user?.liabilities === false ? "Não" : "-"}
        </p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Valor Pedido (Valuation)</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-valuation">{user?.valuation || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Tipo de Transação Aceita</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-transaction-type">{user?.transactionType || "-"}</p>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Imóvel Próprio na Negociação?</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-property-involved">{user?.propertyInvolved || "-"}</p>
      </div>
    </div>
  );

  const renderFranchiseProfile = () => (
    <div className="space-y-6">
      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Nome da Franquia</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-franchise-name">{user?.franchiseName || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Logo da Franquia</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-logo">{user?.logoUrl || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Email da Franqueadora</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-email">{user?.email || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Segmento</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-segment">{user?.segment || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Anos de Mercado</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-years-market">{user?.yearsInMarket || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Cidade Sede</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-headquarters">{user?.headquarters || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Número de Unidades</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-units">{user?.numberOfUnits || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Modelos Disponíveis</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-models">{user?.models || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Investimento Total Inicial (Faixa)</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-investment">{user?.initialInvestment || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Taxa de Franquia</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-franchise-fee">{user?.franchiseFee || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Capital de Giro</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-working-capital">{user?.workingCapital || "-"}</p>
      </div>

      <div className="border-b border-border dark:border-slate-700 pb-6">
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Payback Médio</label>
        <p className="text-lg font-semibold dark:text-white" data-testid="text-profile-payback">{user?.payback ? `${user.payback} meses` : "-"}</p>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground dark:text-slate-400 block mb-2">Perfil Ideal do Franqueado</label>
        <p className="text-lg font-semibold capitalize dark:text-white" data-testid="text-profile-operator-type">
          {user?.operatorType === "investor" ? "Investidor" : user?.operatorType === "operator" ? "Operador" : "-"}
        </p>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="w-full bg-gradient-to-b from-slate-50 dark:from-slate-900 to-transparent min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="ghost" 
              className="pl-0 hover:bg-transparent hover:text-primary"
              onClick={() => setLocation('/dashboard')}
              data-testid="button-back-profile"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
            <Button 
              onClick={() => setLocation('/editar-perfil')}
              data-testid="button-edit-profile"
              className="bg-primary hover:bg-primary/90"
            >
              Editar Perfil
            </Button>
          </div>

          {/* Profile Header Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg dark:shadow-slate-950/50 overflow-hidden mb-8">
            <div className="h-32 sm:h-40 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20" />
            
            <div className="px-6 sm:px-8 pb-6 sm:pb-8">
              {/* Profile Photo and Title */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 sm:-mt-20 mb-6">
                <div className="flex-shrink-0">
                  {user?.profilePhoto ? (
                    <img 
                      src={user.profilePhoto} 
                      alt={user.name} 
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-lg"
                      data-testid="img-profile-photo"
                    />
                  ) : (
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-primary to-primary/60 border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl font-bold text-white">{user?.name?.substring(0, 1)}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2" data-testid="text-profile-title">{user?.name || "Usuário"}</h1>
                  {profileInfo && ProfileIcon && (
                    <div className={`${profileInfo.badgeColor} px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold w-fit`} data-testid="badge-profile-type">
                      <ProfileIcon className="w-5 h-5" />
                      <span>{profileInfo.title}</span>
                    </div>
                  )}
                </div>

                {/* Mobile: Stack edit button */}
                <div className="sm:hidden w-full">
                  <Button 
                    onClick={() => setLocation('/editar-perfil')}
                    data-testid="button-edit-profile-mobile"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Editar Perfil
                  </Button>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user?.email || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Localização</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user?.location || "-"}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Tipo</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white capitalize">{user?.role || "-"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details Sections */}
          <div className="space-y-6">
            {/* Render sections grouped by category */}
            {user?.role === "investor" && (
              <>
                {/* Personal Info */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-slate-950/30 p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">Informações Pessoais</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Faixa Etária</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.ageRange || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Formação</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.education || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Investment Profile */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-slate-950/30 p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">Perfil de Investimento</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Faixa de Investimento</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.investmentRange || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Retorno Desejado</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.roiTime || "-"}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Modalidade Desejada</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.modality || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Experience & Skills */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-slate-950/30 p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">Experiência Profissional</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Experiência Anterior</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.hasExperience === true ? "Sim" : user?.hasExperience === false ? "Não" : "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Setores</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.experienceSectors || "-"}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Habilidades</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.skills || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Interests & Preferences */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-slate-950/30 p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">Preferências</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Setores de Interesse</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.interestSectors || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Envolvimento Operacional</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.operationalInvolvement ? `${user.operationalInvolvement}%` : "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Tolerância ao Risco</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.riskTolerance ? `${user.riskTolerance}%` : "-"}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {user?.role === "seller" && (
              <>
                {/* Company Info */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-slate-950/30 p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">Informações da Empresa</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Nome Fantasia</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.tradeName || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Segmento</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.segment || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Tipo de Operação</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.operationType || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Estágio</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.stage || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Financial Info */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-slate-950/30 p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">Informações Financeiras</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Faturamento Mensal</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.monthlyRevenue || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">EBITDA</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.ebitda || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Ticket Médio</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.ticketAverage || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Funcionários</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.employees || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Operational Info */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-slate-950/30 p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">Informações Operacionais</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Motivo da Venda</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.sellReason || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Dependência do Dono</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.ownerDependence ? `${user.ownerDependence}%` : "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Passivos</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.liabilities === true ? "Sim" : user?.liabilities === false ? "Não" : "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Imóvel Próprio</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.propertyInvolved || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Deal Info */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-slate-950/30 p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">Informações do Deal</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Valuation</p>
                      <p className="text-2xl font-bold text-primary">{user?.valuation || "-"}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Tipo de Transação</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.transactionType || "-"}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {user?.role === "franchise" && (
              <>
                {/* Franchise Info */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-slate-950/30 p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">Informações da Franquia</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Nome</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.franchiseName || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Segmento</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.segment || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Anos no Mercado</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.yearsInMarket || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Cidade Sede</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.headquarters || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Unidades</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.numberOfUnits || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Modelos</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.models || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Investment Info */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-slate-950/30 p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">Investimento e Retorno</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Investimento Inicial</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.initialInvestment || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Taxa de Franquia</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.franchiseFee || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Capital de Giro</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.workingCapital || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Payback Médio</p>
                      <p className="text-base font-medium text-slate-900 dark:text-white">{user?.payback ? `${user.payback} meses` : "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Operator Info */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-slate-950/30 p-6 sm:p-8">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">Perfil Ideal do Franqueado</h2>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Tipo</p>
                    <p className="text-base font-medium text-slate-900 dark:text-white capitalize">
                      {user?.operatorType === "investor" ? "Investidor" : user?.operatorType === "operator" ? "Operador" : "-"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
