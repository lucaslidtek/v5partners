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
import SettingsPage from "@/pages/settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/profile-selection" component={ProfileSelectionPage} />
      <Route path="/onboarding" component={OnboardingPage} />
      <Route path="/summary" component={SummaryPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/valuation" component={ValuationPage} />
      <Route path="/processes" component={ProcessesPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/settings" component={SettingsPage} />
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
