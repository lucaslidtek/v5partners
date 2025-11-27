import React from "react";
import { useAuth } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, User, LogOut, Settings, LayoutDashboard, FileText } from "lucide-react";
import { Link, useLocation } from "wouter";

import logo from "@assets/v5partners_color1_1764265378727.png";

export function Layout({ children, showHeader = true }: { children: React.ReactNode; showHeader?: boolean }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-muted/30 font-sans text-foreground flex flex-col">
      {showHeader && (
        <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm/50 backdrop-blur-xl bg-background/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href={user ? "/dashboard" : "/"}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img src={logo} alt="V5 Partners" className="h-8 w-auto object-contain" />
                </div>
              </Link>

              {/* Main Nav (Desktop) */}
              {user && (
                <nav className="hidden md:flex items-center gap-1">
                  <Link href="/dashboard">
                    <Button variant={location === "/dashboard" ? "secondary" : "ghost"} size="sm" className="gap-2">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Button>
                  </Link>
                  <Link href="/summary">
                     <Button variant={location === "/summary" ? "secondary" : "ghost"} size="sm" className="gap-2">
                      <FileText className="h-4 w-4" /> Resumo
                    </Button>
                  </Link>
                </nav>
              )}
            </div>

            {user && (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-background"></span>
                </Button>
                
                <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-2 hover:bg-muted rounded-full sm:rounded-md">
                        <Avatar className="h-8 w-8 border border-border">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left hidden sm:block">
                          <p className="text-sm font-medium text-foreground leading-none">{user.name}</p>
                          <p className="text-xs text-muted-foreground mt-1 capitalize">{user.role === 'investor' ? 'Investidor' : user.role}</p>
                        </div>
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" /> Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" /> Configurações
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" /> Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </header>
      )}
      <main className="flex-grow">{children}</main>
    </div>
  );
}
