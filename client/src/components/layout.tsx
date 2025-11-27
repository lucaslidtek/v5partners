import React from "react";
import { useAuth } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";
import { Link } from "wouter";

import logo from "@assets/v5partners_color1_1764265378727.png";

export function Layout({ children, showHeader = true }: { children: React.ReactNode; showHeader?: boolean }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#FAFBFC] font-sans text-foreground flex flex-col">
      {showHeader && (
        <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm safe-area-inset-top">
          <div className="px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Link href={user ? "/dashboard" : "/"}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img src={logo} alt="V5 Partners" className="h-7 md:h-8 w-auto object-contain" />
                </div>
              </Link>
            </div>

            {user && (
              <div className="flex items-center gap-2 md:gap-4 ml-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-muted h-10 w-10 md:h-auto md:w-auto">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="hidden md:flex items-center gap-3 pl-4 border-l border-border">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role === 'investor' ? 'Investidor' : user.role}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center text-primary font-medium text-sm">
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={logout} title="Sair" className="text-muted-foreground hover:text-destructive h-10 w-10 md:h-auto md:w-auto">
                  <LogOut className="h-5 w-5 md:h-4 md:w-4" />
                </Button>
              </div>
            )}
          </div>
        </header>
      )}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
