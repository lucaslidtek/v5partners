import React, { createContext, useContext, useState, ReactNode } from "react";
import { useLocation } from "wouter";

type ProfileType = "investor" | "seller" | "franchise" | null;

interface UserData {
  name: string;
  email: string;
  city: string;
  role: ProfileType;
  [key: string]: any;
}

interface AuthContextType {
  user: UserData | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  setProfileType: (type: ProfileType) => void;
  updateUserData: (data: Partial<UserData>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [, setLocation] = useLocation();

  const login = (email: string, name: string) => {
    setUser({
      email,
      name,
      city: "",
      role: "investor",
      // Investor Profile Data
      location: "São Paulo, SP",
      ageRange: "31-40",
      education: "Administração de Empresas",
      investmentRange: "500k-1m",
      roiTime: "medium",
      hasExperience: true,
      // Additional mock data for complete profile
      tradeName: "",
      segment: "",
      monthlyRevenue: "",
      ebitda: "",
      employees: "",
      sellReason: "",
      stage: "",
      franchiseName: "",
      yearsInMarket: "",
      numberOfUnits: "",
      initialInvestment: "",
      franchiseFee: "",
      payback: "",
      operatorType: "",
    });
    setLocation("/dashboard");
  };

  const logout = () => {
    setUser(null);
    setLocation("/");
  };

  const setProfileType = (type: ProfileType) => {
    if (user) {
      setUser({ ...user, role: type });
      setLocation("/onboarding");
    }
  };

  const updateUserData = (data: Partial<UserData>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setProfileType,
        updateUserData,
        isAuthenticated: !!user,
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
