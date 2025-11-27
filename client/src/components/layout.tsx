import React from "react";
import { useAuth } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Bell, User, LogOut } from "lucide-react";
import { Link } from "wouter";

import logo from "@assets/v5partners_color1_1764265378727.png";

export function Layout({ children, showHeader = true }: { children: React.ReactNode; showHeader?: boolean }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#FAFBFC] font-sans text-foreground">
      {showHeader && (
        <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href={user ? "/dashboard" : "/"}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img src={logo} alt="V5 Partners" className="h-8 w-auto object-contain" />
                </div>
              </Link>
            </div>

            {user && (
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-muted">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-3 pl-4 border-l border-border">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role === 'investor' ? 'Investidor' : user.role}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center text-primary font-medium">
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                  <Button variant="ghost" size="icon" onClick={logout} title="Sair" className="text-muted-foreground hover:text-destructive">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </header>
      )}
      <main>{children}</main>
    </div>
  );
}
