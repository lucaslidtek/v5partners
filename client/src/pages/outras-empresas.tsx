import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Lock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface Company {
  id: number;
  name: string;
  sector: string;
  revenue: string;
  employees: string;
  location: string;
  description: string;
  logo: string;
  logoColor: string;
}

const otherCompanies: Company[] = [
  {
    id: 101,
    name: "Empresa Confidencial #101",
    sector: "Tecnologia",
    revenue: "R$ 15M",
    employees: "45",
    location: "São Paulo, SP",
    description: "Plataforma SaaS focada em automação de processos empresariais com crescimento de 25% ao ano.",
    logo: "TC",
    logoColor: "bg-blue-500"
  },
  {
    id: 102,
    name: "Empresa Confidencial #102",
    sector: "Varejo",
    revenue: "R$ 8M",
    employees: "28",
    location: "Rio de Janeiro, RJ",
    description: "Rede de lojas de moda com presença em shopping centers e loja online consolidada.",
    logo: "VR",
    logoColor: "bg-pink-500"
  },
  {
    id: 103,
    name: "Empresa Confidencial #103",
    sector: "Logística",
    revenue: "R$ 22M",
    employees: "67",
    location: "Belo Horizonte, MG",
    description: "Empresa de logística e distribuição com frota própria e parcerias estratégicas.",
    logo: "LG",
    logoColor: "bg-amber-500"
  },
  {
    id: 104,
    name: "Empresa Confidencial #104",
    sector: "Alimentação",
    revenue: "R$ 12M",
    employees: "35",
    location: "Brasília, DF",
    description: "Produção e distribuição de alimentos processados com marca conhecida no mercado.",
    logo: "AL",
    logoColor: "bg-green-500"
  },
  {
    id: 105,
    name: "Empresa Confidencial #105",
    sector: "Educação",
    revenue: "R$ 10M",
    employees: "52",
    location: "Curitiba, PR",
    description: "Plataforma de educação online com mais de 50 mil alunos ativos mensalmente.",
    logo: "ED",
    logoColor: "bg-purple-500"
  },
  {
    id: 106,
    name: "Empresa Confidencial #106",
    sector: "Consultoria",
    revenue: "R$ 18M",
    employees: "38",
    location: "Recife, PE",
    description: "Consultoria especializada em transformação digital para empresas de médio porte.",
    logo: "CS",
    logoColor: "bg-cyan-500"
  }
];

export default function OutrasEmpresasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredCompanies = otherCompanies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className={`${isMobile ? 'pb-20 px-4 py-4' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        {/* Header */}
        <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-slate-900 dark:text-white mb-2`}>
            Outras Empresas
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Explore empresas adicionais que podem ser de seu interesse. Os dados estão protegidos por NDA.
          </p>
        </div>

        {/* Search Bar */}
        <div className={`flex gap-2 mb-6 ${isMobile ? 'flex-col' : 'flex-row'}`}>
          <div className="relative flex-grow flex items-center gap-2">
            <Search className={`absolute ${isMobile ? 'left-3' : 'left-3'} top-3.5 h-4 w-4 text-slate-400`} />
            <Input 
              placeholder={isMobile ? "Buscar..." : "Buscar por setor, localização ou nome..."} 
              className={`pl-10 h-11 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-slate-900/30 focus:ring-2 focus:ring-primary/20 transition-all`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-search-other-companies"
            />
          </div>
        </div>

        {/* Companies Grid */}
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
          {filteredCompanies.length === 0 ? (
            <Card className="border-dashed border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 col-span-full">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-slate-400 dark:text-slate-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">Nenhuma empresa encontrada</h3>
                <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mt-1">
                  Ajuste seu filtro de busca e tente novamente.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredCompanies.map((company) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 hover:shadow-md dark:hover:shadow-slate-800/50 transition-all duration-300 h-full overflow-hidden" data-testid={`card-company-${company.id}`}>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`h-12 w-12 rounded-lg ${company.logoColor} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-sm">{company.logo}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm" data-testid={`text-company-name-${company.id}`}>{company.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{company.sector}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 flex-1">{company.description}</p>

                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-700 mb-4">
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Receita</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{company.revenue}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Equipe</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{company.employees}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Local</p>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{company.location.split(',')[1]?.trim() || 'N/A'}</p>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full text-sm border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                      data-testid={`button-view-company-${company.id}`}
                    >
                      <Lock className="h-3.5 w-3.5 mr-2" /> Mais Informações
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Info Box */}
        <div className={`${isMobile ? 'mt-6' : 'mt-12'} bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4`}>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <Lock className="h-4 w-4 inline mr-2" />
            Todos os dados das empresas confidenciais estão protegidos por acordo de NDA. Para mais informações, entre em contato com o vendedor.
          </p>
        </div>
      </div>
    </Layout>
  );
}
