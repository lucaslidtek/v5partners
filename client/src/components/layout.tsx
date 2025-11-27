import React from "react";
import { useAuth } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Bell, User, LogOut } from "lucide-react";
import { Link } from "wouter";

export function Layout({ children, showHeader = true }: { children: React.ReactNode; showHeader?: boolean }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      {showHeader && (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href={user ? "/dashboard" : "/"}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    V5
                  </div>
                  <span className="text-xl font-bold text-slate-900 tracking-tight">Partners</span>
                </div>
              </Link>
            </div>

            {user && (
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user.role === 'investor' ? 'Investidor' : user.role}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-primary font-medium">
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                  <Button variant="ghost" size="icon" onClick={logout} title="Sair">
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
