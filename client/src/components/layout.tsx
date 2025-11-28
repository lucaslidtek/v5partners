import React from "react";
import { useAuth } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Bell, User, LogOut, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import logoColor from "@assets/v5partners_color1_1764265378727.png";
import logoWhite from "@assets/v5partners_pb4_1764265422084.png";
import { useContext } from "react";

export function Layout({ children, showHeader = true }: { children: React.ReactNode; showHeader?: boolean }) {
  const { user, logout, settings } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground dark:bg-slate-950">
      {showHeader && (
        <header className="bg-white dark:bg-slate-900 border-b border-border dark:border-slate-800 sticky top-0 z-50 shadow-sm dark:shadow-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href={user ? "/dashboard" : "/"}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img src={settings.darkMode ? logoWhite : logoColor} alt="V5 Partners" className="h-8 w-auto object-contain" />
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
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button 
                        className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center text-primary font-medium hover:bg-muted/80 transition-colors cursor-pointer"
                        data-testid="button-user-menu"
                      >
                        {user.name.substring(0, 2).toUpperCase()}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => setLocation("/profile")} data-testid="menu-profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Perfil</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLocation("/settings")} data-testid="menu-settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Configurações</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} data-testid="menu-logout" className="text-destructive focus:text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={logout} 
                    title="Sair" 
                    className="hidden sm:flex text-muted-foreground hover:text-destructive"
                    data-testid="button-logout-desktop"
                  >
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
