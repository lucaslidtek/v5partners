import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useLocation } from "wouter";

type ProfileType = "investor" | "seller" | "franchise" | null;

interface UserData {
  name: string;
  email: string;
  city: string;
  role: ProfileType;
  profilePhoto?: string;
  [key: string]: any;
}

interface SettingsData {
  darkMode: boolean;
  notifications: boolean;
  shareData: boolean;
}

interface AuthContextType {
  user: UserData | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  setProfileType: (type: ProfileType) => void;
  updateUserData: (data: Partial<UserData>) => void;
  isAuthenticated: boolean;
  settings: SettingsData;
  updateSettings: (settings: Partial<SettingsData>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [settings, setSettings] = useState<SettingsData>(() => {
    const saved = localStorage.getItem("settings");
    return saved ? JSON.parse(saved) : { darkMode: false, notifications: true, shareData: false };
  });
  const [, setLocation] = useLocation();

  const login = (email: string, name: string) => {
    setUser({
      email,
      name,
      city: "São Paulo",
      role: null,
      // Investor Profile Data
      location: "São Paulo, SP",
      ageRange: "31-40",
      education: "Administração de Empresas",
      investmentRange: "500k-1m",
      modality: "Comprar negócio independente",
      roiTime: "Médio Prazo (3-5 anos)",
      hasExperience: true,
      experienceSectors: "Varejo, Tecnologia, Saúde",
      skills: "Gestão, Comercial, Marketing",
      interestSectors: "Alimentação, Saúde & Beleza, Tecnologia, Educação",
      operationalInvolvement: 60,
      riskTolerance: 40,
      
      // Seller Profile Data
      tradeName: "TechFlow Solutions",
      logoUrl: "https://via.placeholder.com/200",
      segment: "Tecnologia",
      operationType: "E-commerce",
      monthlyRevenue: "R$ 85.000",
      ticketAverage: "R$ 450",
      ebitda: "R$ 22.000",
      employees: "8",
      ownerDependence: 70,
      sellReason: "Novos Projetos",
      stage: "Estável",
      liabilities: false,
      valuation: "R$ 650.000",
      transactionType: "Venda Total (100%)",
      propertyInvolved: "Não, é alugado",
      
      // Franchise Profile Data
      franchiseName: "Franquia Café Express",
      franchiseLogo: "https://via.placeholder.com/200",
      yearsInMarket: "12",
      numberOfUnits: "28",
      headquarters: "Rio de Janeiro, RJ",
      models: "Loja Física, Quiosque, Home Based",
      initialInvestment: "R$ 300.000 - R$ 500.000",
      franchiseFee: "R$ 45.000",
      workingCapital: "R$ 30.000",
      payback: 24,
      operatorType: "investor",
    });
    setLocation("/escolha-de-perfil");
  };

  const logout = () => {
    setUser(null);
    setLocation("/");
  };

  const setProfileType = (type: ProfileType) => {
    if (user) {
      setUser({ ...user, role: type });
      setLocation("/integracao");
    }
  };

  const updateUserData = (data: Partial<UserData>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const updateSettings = (newSettings: Partial<SettingsData>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("settings", JSON.stringify(updated));
    
    if (newSettings.darkMode !== undefined) {
      if (newSettings.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setProfileType,
        updateUserData,
        isAuthenticated: !!user,
        settings,
        updateSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
