import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CompatibilityLogo } from "@/components/compatibility-logo";
import { Badge } from "@/components/ui/badge";
import { Building2, Lock, Search, ChevronRight, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Company {
  id: number;
  name: string;
  sector: string;
  revenue: string;
  employees: string;
  location: string;
  description: string;
  matchScore: number;
  logo: string;
  logoColor: string;
  type: 'empresa' | 'investidor' | 'franqueadora';
}

const otherCompanies: Company[] = [
  {
    id: 101,
    name: "Confidencial #101",
    sector: "Tecnologia",
    revenue: "R$ 15M",
    employees: "45",
    location: "São Paulo, SP",
    description: "Plataforma SaaS focada em automação de processos empresariais com crescimento de 25% ao ano.",
    matchScore: 76,
    logo: "TC",
    logoColor: "bg-blue-500",
    type: "investidor"
  },
  {
    id: 102,
    name: "Confidencial #102",
    sector: "Varejo",
    revenue: "R$ 8M",
    employees: "28",
    location: "Rio de Janeiro, RJ",
    description: "Rede de lojas de moda com presença em shopping centers e loja online consolidada.",
    matchScore: 52,
    logo: "VR",
    logoColor: "bg-pink-500",
    type: "franqueadora"
  },
  {
    id: 103,
    name: "Confidencial #103",
    sector: "Logística",
    revenue: "R$ 22M",
    employees: "67",
    location: "Belo Horizonte, MG",
    description: "Empresa de logística e distribuição com frota própria e parcerias estratégicas.",
    matchScore: 38,
    logo: "LG",
    logoColor: "bg-amber-500",
    type: "empresa"
  },
  {
    id: 104,
    name: "Confidencial #104",
    sector: "Alimentação",
    revenue: "R$ 12M",
    employees: "35",
    location: "Brasília, DF",
    description: "Produção e distribuição de alimentos processados com marca conhecida no mercado.",
    matchScore: 68,
    logo: "AL",
    logoColor: "bg-green-500",
    type: "investidor"
  },
  {
    id: 105,
    name: "Confidencial #105",
    sector: "Educação",
    revenue: "R$ 10M",
    employees: "52",
    location: "Curitiba, PR",
    description: "Plataforma de educação online com mais de 50 mil alunos ativos mensalmente.",
    matchScore: 82,
    logo: "ED",
    logoColor: "bg-purple-500",
    type: "franqueadora"
  },
  {
    id: 106,
    name: "Confidencial #106",
    sector: "Consultoria",
    revenue: "R$ 18M",
    employees: "38",
    location: "Recife, PE",
    description: "Consultoria especializada em transformação digital para empresas de médio porte.",
    matchScore: 45,
    logo: "CS",
    logoColor: "bg-cyan-500",
    type: "investidor"
  }
];

export default function OutrasEmpresasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [sliderValue, setSliderValue] = useState([50]);
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [compatibilityRange, setCompatibilityRange] = useState([0, 100]);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const getCompatibilityColor = (score: number) => {
    if (score >= 70) {
      return {
        barColor: 'bg-emerald-500',
        bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
        borderColor: 'border-emerald-200 dark:border-emerald-800',
        textColor: 'text-emerald-600 dark:text-emerald-400'
      };
    } else if (score >= 40) {
      return {
        barColor: 'bg-amber-500',
        bgColor: 'bg-amber-50 dark:bg-amber-950/30',
        borderColor: 'border-amber-200 dark:border-amber-800',
        textColor: 'text-amber-600 dark:text-amber-400'
      };
    } else {
      return {
        barColor: 'bg-red-500',
        bgColor: 'bg-red-50 dark:bg-red-950/30',
        borderColor: 'border-red-200 dark:border-red-800',
        textColor: 'text-red-600 dark:text-red-400'
      };
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'investidor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'franqueadora':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'empresa':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'investidor':
        return 'Investidor';
      case 'franqueadora':
        return 'Franqueadora';
      case 'empresa':
        return 'Empresa';
      default:
        return 'Perfil';
    }
  };

  const renderLogo = (company: Company) => {
    return (
      <CompatibilityLogo matchScore={company.matchScore} isConfidential={true} size="md" />
    );
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredCompanies = otherCompanies.filter(company => {
    // Search term filter
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Profile type filter
    const matchesType = selectedTypes.size === 0 || selectedTypes.has(company.type);
    
    // Compatibility range filter
    const matchesCompatibility = company.matchScore >= compatibilityRange[0] && company.matchScore <= compatibilityRange[1];
    
    return matchesSearch && matchesType && matchesCompatibility;
  });

  return (
    <Layout>
      <div className={`${isMobile ? 'pb-20 px-4 py-4' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        {/* Header */}
        <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-slate-900 dark:text-white mb-2`}>
            Outros Perfis
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Explore perfis adicionais que podem ser de seu interesse. Os dados estão protegidos por NDA.
          </p>
        </div>

        {/* Info Box - NDA Warning */}
        <div className={`${isMobile ? 'mb-4' : 'mb-6'} bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4`}>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <Lock className="h-4 w-4 inline mr-2" />
            Todos os dados das empresas confidenciais estão protegidos por acordo de NDA. Para mais informações, entre em contato com o vendedor.
          </p>
        </div>

        {/* Search Bar */}
        <div className={`flex gap-2 mb-6 ${isMobile ? 'flex-col' : 'flex-row'}`}>
          <div className={`flex gap-2 ${isMobile ? 'w-full' : 'flex-grow'}`}>
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
            {isMobile && (
              <Button 
                onClick={() => setFilterSheetOpen(true)}
                className="h-11 bg-white text-slate-900 border-slate-200 whitespace-nowrap font-medium transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700 shadow-sm px-3"
                data-testid="button-open-filters-mobile"
              >
                <Filter className="h-4 w-4" />
              </Button>
            )}
          </div>
          {!isMobile && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-11 bg-white text-slate-900 border-slate-200 whitespace-nowrap font-medium transition-colors hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700 shadow-sm">
                  <Filter className="mr-2 h-4 w-4" /> Filtros Avançados
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Filtros Avançados</DialogTitle>
                  <DialogDescription>
                    Refine sua busca por empresas.
                  </DialogDescription>
                </DialogHeader>
                <div className="overflow-y-auto max-h-[70vh] pr-4">
                  <div className="py-6 space-y-6">
                    <div className="space-y-2">
                      <Label>Tipo de Perfil</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="empresa"
                            checked={selectedTypes.has('empresa')}
                            onCheckedChange={(checked) => {
                              const newTypes = new Set(selectedTypes);
                              if (checked) newTypes.add('empresa');
                              else newTypes.delete('empresa');
                              setSelectedTypes(newTypes);
                            }}
                            data-testid="checkbox-type-empresa"
                          />
                          <Label htmlFor="empresa" className="font-normal">Empresa</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="investidor"
                            checked={selectedTypes.has('investidor')}
                            onCheckedChange={(checked) => {
                              const newTypes = new Set(selectedTypes);
                              if (checked) newTypes.add('investidor');
                              else newTypes.delete('investidor');
                              setSelectedTypes(newTypes);
                            }}
                            data-testid="checkbox-type-investidor"
                          />
                          <Label htmlFor="investidor" className="font-normal">Investidor</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="franqueadora"
                            checked={selectedTypes.has('franqueadora')}
                            onCheckedChange={(checked) => {
                              const newTypes = new Set(selectedTypes);
                              if (checked) newTypes.add('franqueadora');
                              else newTypes.delete('franqueadora');
                              setSelectedTypes(newTypes);
                            }}
                            data-testid="checkbox-type-franqueadora"
                          />
                          <Label htmlFor="franqueadora" className="font-normal">Franqueadora</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Faixa de Compatibilidade</Label>
                      <div className="mb-3 flex justify-between items-center bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-100 dark:border-green-800">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          {compatibilityRange[0]}% - {compatibilityRange[1]}%
                        </span>
                      </div>
                      <Slider 
                        value={compatibilityRange} 
                        onValueChange={setCompatibilityRange} 
                        max={100} 
                        step={1} 
                        className="py-4"
                        data-testid="slider-compatibility"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Faixa de Receita</Label>
                      <div className="mb-3 flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-800">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          R$ {Math.round(sliderValue[0] / 10)}M
                        </span>
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">{sliderValue[0]}%</span>
                      </div>
                      <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} className="py-4" />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>R$ 1M</span>
                        <span>R$ 30M+</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Setores de Interesse</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tech" />
                          <Label htmlFor="tech" className="font-normal">Tecnologia</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="retail" />
                          <Label htmlFor="retail" className="font-normal">Varejo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="logistica" />
                          <Label htmlFor="logistica" className="font-normal">Logística</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="alimentacao" />
                          <Label htmlFor="alimentacao" className="font-normal">Alimentação</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="educacao" />
                          <Label htmlFor="educacao" className="font-normal">Educação</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="consultoria" />
                          <Label htmlFor="consultoria" className="font-normal">Consultoria</Label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 pb-4">
                      <Button className="w-full" data-testid="button-apply-filters">
                        Aplicar Filtros
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

        {/* Mobile Filters Sheet */}
        {isMobile && (
          <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
            <SheetContent side="bottom" className="rounded-t-3xl flex flex-col h-auto max-h-[90vh]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>
                  Refine sua busca por empresas.
                </SheetDescription>
              </SheetHeader>
              <div className="overflow-y-auto flex-1 pr-4">
                <div className="py-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Tipo de Perfil</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="m-empresa"
                          checked={selectedTypes.has('empresa')}
                          onCheckedChange={(checked) => {
                            const newTypes = new Set(selectedTypes);
                            if (checked) newTypes.add('empresa');
                            else newTypes.delete('empresa');
                            setSelectedTypes(newTypes);
                          }}
                          data-testid="checkbox-type-empresa-mobile"
                        />
                        <Label htmlFor="m-empresa" className="font-normal">Empresa</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="m-investidor"
                          checked={selectedTypes.has('investidor')}
                          onCheckedChange={(checked) => {
                            const newTypes = new Set(selectedTypes);
                            if (checked) newTypes.add('investidor');
                            else newTypes.delete('investidor');
                            setSelectedTypes(newTypes);
                          }}
                          data-testid="checkbox-type-investidor-mobile"
                        />
                        <Label htmlFor="m-investidor" className="font-normal">Investidor</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="m-franqueadora"
                          checked={selectedTypes.has('franqueadora')}
                          onCheckedChange={(checked) => {
                            const newTypes = new Set(selectedTypes);
                            if (checked) newTypes.add('franqueadora');
                            else newTypes.delete('franqueadora');
                            setSelectedTypes(newTypes);
                          }}
                          data-testid="checkbox-type-franqueadora-mobile"
                        />
                        <Label htmlFor="m-franqueadora" className="font-normal">Franqueadora</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Faixa de Compatibilidade</Label>
                    <div className="mb-3 flex justify-between items-center bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-100 dark:border-green-800">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {compatibilityRange[0]}% - {compatibilityRange[1]}%
                      </span>
                    </div>
                    <Slider 
                      value={compatibilityRange} 
                      onValueChange={setCompatibilityRange} 
                      max={100} 
                      step={1} 
                      className="py-4"
                      data-testid="slider-compatibility-mobile"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Faixa de Receita</Label>
                    <div className="mb-3 flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-800">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        R$ {Math.round(sliderValue[0] / 10)}M
                      </span>
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">{sliderValue[0]}%</span>
                    </div>
                    <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} className="py-4" />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>R$ 1M</span>
                      <span>R$ 30M+</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Setores de Interesse</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="m-tech" />
                        <Label htmlFor="m-tech" className="font-normal">Tecnologia</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="m-retail" />
                        <Label htmlFor="m-retail" className="font-normal">Varejo</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="m-logistica" />
                        <Label htmlFor="m-logistica" className="font-normal">Logística</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="m-alimentacao" />
                        <Label htmlFor="m-alimentacao" className="font-normal">Alimentação</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="m-educacao" />
                        <Label htmlFor="m-educacao" className="font-normal">Educação</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="m-consultoria" />
                        <Label htmlFor="m-consultoria" className="font-normal">Consultoria</Label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 pb-4">
                    <Button 
                      className="w-full" 
                      data-testid="button-apply-filters-mobile"
                      onClick={() => setFilterSheetOpen(false)}
                    >
                      Aplicar Filtros
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
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
                <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 hover:shadow-lg dark:hover:shadow-slate-800/70 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 h-full overflow-hidden cursor-pointer" data-testid={`card-company-${company.id}`}>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start gap-3 mb-5">
                      {renderLogo(company)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug" data-testid={`text-company-name-${company.id}`}>{company.name}</h3>
                          <Badge className={`${getTypeColor(company.type)} text-xs px-2 py-0.5 font-semibold`} data-testid={`badge-type-${company.id}`}>
                            {getTypeLabel(company.type)}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{company.sector}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 line-clamp-1 flex-1 leading-relaxed">{company.description}</p>

                    {(() => {
                      const colors = getCompatibilityColor(company.matchScore);
                      return (
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-2xs font-semibold text-slate-600 dark:text-slate-400">Compatibilidade</span>
                            <span className={`text-sm font-bold ${colors.textColor}`}>{company.matchScore}%</span>
                          </div>
                          <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${colors.barColor} rounded-full transition-all duration-500`} 
                              style={{ width: `${company.matchScore}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()}

                    <div className="grid grid-cols-3 gap-3 pt-5 border-t border-slate-100 dark:border-slate-700 mb-5">
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">Receita</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{company.revenue}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">Equipe</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{company.employees}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">Local</p>
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{company.location.split(',')[1]?.trim() || 'N/A'}</p>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-colors h-9 text-sm rounded-lg"
                      data-testid={`button-view-company-${company.id}`}
                      onClick={() => setSelectedCompany(company)}
                    >
                      <Lock className="h-3.5 w-3.5 mr-1.5" /> Mais Info
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Company Details - Sheet for Mobile, Dialog for Desktop */}
        {isMobile ? (
          <Sheet open={!!selectedCompany} onOpenChange={(open) => !open && setSelectedCompany(null)}>
            <SheetContent side="bottom" className="rounded-t-3xl flex flex-col h-[85vh]">
              <SheetHeader className="flex-shrink-0 pt-[0px] pb-[0px]">
                <div className="flex items-center gap-2 min-w-0">
                  {selectedCompany && renderLogo(selectedCompany)}
                  <div className="flex-1 min-w-0">
                    <SheetTitle className="text-lg sm:text-2xl font-bold truncate">{selectedCompany?.name}</SheetTitle>
                    {selectedCompany && <Badge className={`${getTypeColor(selectedCompany.type)} text-xs px-2 py-0.5 font-semibold mt-1`}>{getTypeLabel(selectedCompany.type)}</Badge>}
                  </div>
                </div>
              </SheetHeader>
              {selectedCompany && (
                <div className="flex-1 overflow-y-auto pr-4 space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white">Descrição</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{selectedCompany.description}</p>
                  </div>

                  {/* Compatibility Score */}
                  {(() => {
                    const colors = getCompatibilityColor(selectedCompany.matchScore);
                    return (
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-2xs font-semibold text-slate-600 dark:text-slate-400">Compatibilidade</span>
                          <span className={`text-sm font-bold ${colors.textColor}`}>{selectedCompany.matchScore}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${colors.barColor} rounded-full transition-all duration-500`}
                            style={{ width: `${selectedCompany.matchScore}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900 dark:text-white">Informações</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Setor</p>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedCompany.sector}</p>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Receita</p>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedCompany.revenue}</p>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Equipe</p>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedCompany.employees}</p>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Localização</p>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedCompany.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <Lock className="h-4 w-4 inline mr-2" />
                      Os dados desta empresa estão protegidos por NDA. Entre em contato com o vendedor para mais informações.
                    </p>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        ) : (
          <Dialog open={!!selectedCompany} onOpenChange={(open) => !open && setSelectedCompany(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  {selectedCompany && renderLogo(selectedCompany)}
                  <div>
                    <DialogTitle className="text-2xl">{selectedCompany?.name}</DialogTitle>
                    {selectedCompany && <Badge className={`${getTypeColor(selectedCompany.type)} text-sm px-2 py-0.5 font-semibold mt-2`}>{getTypeLabel(selectedCompany.type)}</Badge>}
                  </div>
                </div>
                <DialogDescription>{selectedCompany?.sector}</DialogDescription>
              </DialogHeader>

              {selectedCompany && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white">Descrição</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{selectedCompany.description}</p>
                  </div>

                  {/* Compatibility Score */}
                  {(() => {
                    const colors = getCompatibilityColor(selectedCompany.matchScore);
                    return (
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-2xs font-semibold text-slate-600 dark:text-slate-400">Compatibilidade</span>
                          <span className={`text-sm font-bold ${colors.textColor}`}>{selectedCompany.matchScore}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${colors.barColor} rounded-full transition-all duration-500`}
                            style={{ width: `${selectedCompany.matchScore}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900 dark:text-white">Informações</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Setor</p>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedCompany.sector}</p>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Receita</p>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedCompany.revenue}</p>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Equipe</p>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedCompany.employees}</p>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Localização</p>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedCompany.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <Lock className="h-4 w-4 inline mr-2" />
                      Os dados desta empresa estão protegidos por NDA. Entre em contato com o vendedor para mais informações.
                    </p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  );
}
