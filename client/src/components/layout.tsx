import React from "react";
import { useAuth } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Bell, User, LogOut, Settings, Target, Briefcase, Store } from "lucide-react";
import { Link, useLocation } from "wouter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import logoColor from "@assets/v5partners_color1_1764265378727.png";
import logoWhite from "@assets/v5partners_white1_1764345179398.png";
import { useContext } from "react";

export function Layout({ children, showHeader = true }: { children: React.ReactNode; showHeader?: boolean }) {
  const { user, logout, settings, switchProfile } = useAuth();
  const [, setLocation] = useLocation();

  const getProfileInfo = () => {
    switch(user?.role) {
      case "investor":
        return {
          title: "Investidor",
          icon: Target,
          badgeColor: "bg-primary/10 text-primary"
        };
      case "seller":
        return {
          title: "Vendedor",
          icon: Briefcase,
          badgeColor: "bg-secondary/10 text-secondary"
        };
      case "franchise":
        return {
          title: "Franqueadora",
          icon: Store,
          badgeColor: "bg-accent/10 text-accent"
        };
      default:
        return null;
    }
  };

  const profileInfo = getProfileInfo();
  const ProfileIcon = profileInfo?.icon;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-foreground dark:bg-slate-950">
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
              <div className="flex items-center gap-3 sm:gap-4">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-3 sm:gap-4 pl-3 sm:pl-4 border-l border-slate-200 dark:border-slate-700">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 leading-none">{user.name}</p>
                    {profileInfo && ProfileIcon && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div 
                            className={`${profileInfo.badgeColor} px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium mt-2 justify-end w-fit ml-auto cursor-pointer hover:opacity-80 transition-opacity`} 
                            data-testid="badge-profile-type-header"
                          >
                            <ProfileIcon className="w-3 h-3" />
                            <span>{profileInfo.title}</span>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <div className="px-2 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Meus Perfis</div>
                          {user.profiles?.map((profile) => (
                            <DropdownMenuItem 
                              key={profile.id}
                              onClick={() => switchProfile(profile.id)}
                              className="cursor-pointer"
                              data-testid={`menu-switch-profile-${profile.id}`}
                            >
                              <div className="flex items-center gap-2 w-full">
                                <div className={`w-2 h-2 rounded-full ${user.activeProfileId === profile.id ? 'bg-primary' : 'bg-slate-300'}`} />
                                <span>{profile.name}</span>
                              </div>
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setLocation("/perfil")} data-testid="menu-profile">
                            <User className="mr-2 h-4 w-4" />
                            <span>Ver Perfil</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button 
                        className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold hover:shadow-md hover:shadow-blue-500/30 transition-all duration-200 cursor-pointer"
                        data-testid="button-user-menu"
                      >
                        {user.name.substring(0, 2).toUpperCase()}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => setLocation("/perfil")} data-testid="menu-profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Perfil</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLocation("/configuracoes")} data-testid="menu-settings">
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
                    className="hidden sm:flex text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-200"
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
