import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context";
import { motion } from "framer-motion";
import { Target, Briefcase, Store, Plus, CheckCircle2, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

const profileTypeConfig = {
  investor: {
    title: "Investidor / Comprador",
    icon: Target,
    description: "Procurando empresas para comprar ou investir",
    color: "bg-primary",
    badgeColor: "bg-primary/10 text-primary",
    hoverColor: "hover:bg-primary/5",
  },
  seller: {
    title: "Vendedor / Empresa",
    icon: Briefcase,
    description: "Vendendo sua empresa ou negócio",
    color: "bg-secondary",
    badgeColor: "bg-secondary/10 text-secondary",
    hoverColor: "hover:bg-secondary/5",
  },
  franchise: {
    title: "Franqueadora",
    icon: Store,
    description: "Expandir franquia encontrando franqueados",
    color: "bg-accent",
    badgeColor: "bg-accent/10 text-accent",
    hoverColor: "hover:bg-accent/5",
  },
};

const newProfileOptions = [
  {
    id: "investor",
    title: "Investidor / Comprador",
    icon: Target,
    description: "Quero encontrar empresas para comprar ou investir",
    color: "bg-primary",
    buttonColor: "bg-primary hover:bg-primary/90",
  },
  {
    id: "seller",
    title: "Vendedor / Empresa",
    icon: Briefcase,
    description: "Quero vender minha empresa ou negócio",
    color: "bg-secondary",
    buttonColor: "bg-secondary hover:bg-secondary/90",
  },
  {
    id: "franchise",
    title: "Franqueadora",
    icon: Store,
    description: "Quero expandir minha franquia encontrando franqueados",
    color: "bg-accent",
    buttonColor: "bg-accent hover:bg-accent/90",
  },
];

export default function PerfilMultiplosPage() {
  const { user, activeProfile, switchProfile, addProfile } = useAuth();
  const [, setLocation] = useLocation();
  const [showAddNew, setShowAddNew] = useState(false);

  if (!user) return null;

  return (
    <Layout>
      <div className="min-h-screen bg-white dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/dashboard")}
              className="rounded-full"
              data-testid="button-back-profiles"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                Meus Perfis
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Alterne entre seus perfis ou crie um novo
              </p>
            </div>
          </div>

          {/* Perfis Atuais */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Seus Perfis Ativos
            </h2>

            {user.profiles && user.profiles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.profiles.map((profile, index) => {
                  const config =
                    profileTypeConfig[
                      profile.type as keyof typeof profileTypeConfig
                    ];
                  const Icon = config.icon;
                  const isActive = activeProfile?.id === profile.id;

                  return (
                    <motion.div
                      key={profile.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className={`h-full transition-all duration-300 cursor-pointer border-2 ${
                          isActive
                            ? `${config.color} text-white border-opacity-50 shadow-lg`
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                        onClick={() => switchProfile(profile.id)}
                        data-testid={`card-profile-${profile.id}`}
                      >
                        {/* Active Indicator */}
                        {isActive && (
                          <div
                            className={`absolute top-0 left-0 w-full h-1 bg-white/50`}
                          />
                        )}

                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-12 h-12 rounded-lg ${
                                  isActive 
                                    ? 'bg-white/20' 
                                    : `${config.color}/10`
                                } flex items-center justify-center`}
                              >
                                <Icon
                                  className={`w-6 h-6 ${
                                    isActive 
                                      ? 'text-white' 
                                      : config.badgeColor
                                  }`}
                                />
                              </div>
                              <div>
                                <CardTitle className={`text-lg ${isActive ? 'text-white' : ''}`}>
                                  {config.title}
                                </CardTitle>
                                <CardDescription className={`text-sm mt-1 ${
                                  isActive 
                                    ? 'text-white/70' 
                                    : 'text-slate-600 dark:text-slate-400'
                                }`}>
                                  {profile.name}
                                </CardDescription>
                              </div>
                            </div>
                            {isActive && (
                              <CheckCircle2 className={`w-5 h-5 flex-shrink-0 text-white`} />
                            )}
                          </div>
                        </CardHeader>

                        <CardContent>
                          <p className={`text-sm mb-4 ${
                            isActive 
                              ? 'text-white/80' 
                              : 'text-slate-600 dark:text-slate-400'
                          }`}>
                            {config.description}
                          </p>

                          <div className={`pt-4 border-t ${
                            isActive 
                              ? 'border-white/20' 
                              : 'border-slate-200 dark:border-slate-700'
                          }`}>
                            <div className="flex flex-wrap gap-2">
                              {isActive ? (
                                <span className={`inline-block bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium`}>
                                  Ativo
                                </span>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="mt-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    switchProfile(profile.id);
                                  }}
                                  data-testid={`button-switch-${profile.id}`}
                                >
                                  Usar este perfil
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <p className="text-slate-500 dark:text-slate-400">
                    Nenhum perfil criado ainda
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Adicionar Novo Perfil */}
          {!showAddNew ? (
            <div className="flex justify-center">
              <Button
                size="lg"
                className="gap-2 px-8 h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setShowAddNew(true)}
                data-testid="button-add-profile"
              >
                <Plus className="w-5 h-5" />
                Adicionar Novo Perfil
              </Button>
            </div>
          ) : (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Escolha o tipo de perfil
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowAddNew(false)}
                  data-testid="button-cancel-new-profile"
                >
                  Cancelar
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newProfileOptions.map((option, index) => {
                  const Icon = option.icon as any;

                  return (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
                        <div
                          className={`absolute top-0 left-0 w-full h-1 ${option.color}`}
                        />

                        <CardHeader className="text-center pt-10 pb-4">
                          <div className={`mx-auto w-16 h-16 rounded-full ${option.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-8 h-8 ${
                              option.id === 'franchise'
                                ? 'text-accent'
                                : option.id === 'seller'
                                ? 'text-secondary'
                                : 'text-primary'
                            }`} />
                          </div>
                          <CardTitle className="text-lg">
                            {option.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {option.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="flex-grow pt-2 pb-6">
                          {/* Additional info could go here */}
                        </CardContent>

                        <div className="px-6 pb-6">
                          <Button
                            className={`w-full ${option.buttonColor} text-white font-semibold h-11`}
                            onClick={() => {
                              addProfile(
                                option.id as any,
                                option.title
                              );
                              setShowAddNew(false);
                            }}
                            data-testid={`button-add-${option.id}`}
                          >
                            Criar Perfil
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
