import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useLocation } from "wouter";

type ProfileType = "investor" | "seller" | "franchise" | null;

interface Profile {
  id: string;
  type: "investor" | "seller" | "franchise";
  name: string;
  data: {
    [key: string]: any;
  };
}

interface UserData {
  name: string;
  email: string;
  city: string;
  role: ProfileType;
  profilePhoto?: string;
  profiles: Profile[];
  activeProfileId?: string;
  [key: string]: any;
}

interface SettingsData {
  darkMode: boolean;
  notifications: boolean;
  shareData: boolean;
}

interface AuthContextType {
  user: UserData | null;
  activeProfile: Profile | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  setProfileType: (type: ProfileType) => void;
  addProfile: (type: "investor" | "seller" | "franchise", name: string, data?: any) => void;
  switchProfile: (profileId: string) => void;
  updateUserData: (data: Partial<UserData>) => void;
  updateActiveProfileData: (data: any) => void;
  isAuthenticated: boolean;
  settings: SettingsData;
  updateSettings: (settings: Partial<SettingsData>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const createInvestorProfile = () => ({
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
});

const createSellerProfile = () => ({
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
});

const createFranchiseProfile = () => ({
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [settings, setSettings] = useState<SettingsData>(() => {
    const saved = localStorage.getItem("settings");
    return saved ? JSON.parse(saved) : { darkMode: false, notifications: true, shareData: false };
  });
  const [, setLocation] = useLocation();

  const login = (email: string, name: string) => {
    const profiles: Profile[] = [
      {
        id: "investor-1",
        type: "investor",
        name: "Investidor Principal",
        data: createInvestorProfile(),
      }
    ];

    setUser({
      email,
      name,
      city: "São Paulo",
      role: null,
      profiles,
      activeProfileId: "investor-1",
    });
    setLocation("/escolha-de-perfil");
  };

  const logout = () => {
    setUser(null);
    setLocation("/");
  };

  const setProfileType = (type: ProfileType) => {
    if (user && type) {
      setUser({ ...user, role: type });
      setLocation("/integracao");
    }
  };

  const addProfile = (type: "investor" | "seller" | "franchise", name: string, data?: any) => {
    if (user) {
      const profileId = `${type}-${Date.now()}`;
      const newProfile: Profile = {
        id: profileId,
        type,
        name,
        data: data || (
          type === "investor" ? createInvestorProfile() :
          type === "seller" ? createSellerProfile() :
          createFranchiseProfile()
        ),
      };
      
      const updatedProfiles = [...user.profiles, newProfile];
      setUser({ 
        ...user, 
        profiles: updatedProfiles,
        activeProfileId: profileId,
        role: type,
      });
    }
  };

  const switchProfile = (profileId: string) => {
    if (user) {
      const profile = user.profiles.find(p => p.id === profileId);
      if (profile) {
        setUser({
          ...user,
          activeProfileId: profileId,
          role: profile.type,
        });
      }
    }
  };

  const updateUserData = (data: Partial<UserData>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const updateActiveProfileData = (data: any) => {
    if (user && user.activeProfileId) {
      const updatedProfiles = user.profiles.map(p => 
        p.id === user.activeProfileId 
          ? { ...p, data: { ...p.data, ...data } }
          : p
      );
      setUser({ ...user, profiles: updatedProfiles });
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

  const getActiveProfile = (): Profile | null => {
    if (!user || !user.activeProfileId) return null;
    return user.profiles.find(p => p.id === user.activeProfileId) || null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        activeProfile: getActiveProfile(),
        login,
        logout,
        setProfileType,
        addProfile,
        switchProfile,
        updateUserData,
        updateActiveProfileData,
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
