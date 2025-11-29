import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/context";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import ProfileSelectionPage from "@/pages/profile-selection";
import OnboardingPage from "@/pages/onboarding";
import SummaryPage from "@/pages/summary";
import DashboardPage from "@/pages/dashboard";
import ValuationPage from "@/pages/valuation";
import ProcessesPage from "@/pages/processes";
import ProfilePage from "@/pages/profile";
import EditProfilePage from "@/pages/edit-profile";
import SettingsPage from "@/pages/settings";
import PerfilMultiplosPage from "@/pages/perfil-multiplos";
import NovoPerfilPage from "@/pages/novo-perfil";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/registrar" component={RegisterPage} />
      <Route path="/escolha-de-perfil" component={ProfileSelectionPage} />
      <Route path="/meus-perfis" component={PerfilMultiplosPage} />
      <Route path="/novo-perfil" component={NovoPerfilPage} />
      <Route path="/integracao" component={OnboardingPage} />
      <Route path="/resumo" component={SummaryPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/avaliacao" component={ValuationPage} />
      <Route path="/processos" component={ProcessesPage} />
      <Route path="/perfil" component={ProfilePage} />
      <Route path="/editar-perfil" component={EditProfilePage} />
      <Route path="/configuracoes" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
