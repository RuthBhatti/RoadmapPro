import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EnvBanner } from "@/components/EnvBanner";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import CreateRoadmap from "./pages/CreateRoadmap";
import Roadmap from "./pages/Roadmap";
import Features from "./pages/Features";
import AIAssistant from "./pages/AIAssistant";
import Templates from "./pages/Templates";
import Integrations from "./pages/Integrations";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Support from "./pages/Support";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import SubscriptionCancelled from "./pages/SubscriptionCancelled";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <EnvBanner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roadmap/new" element={<CreateRoadmap />} />
          <Route path="/roadmap/:id" element={<Roadmap />} />
          <Route path="/features" element={<Features />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/support" element={<Support />} />
          <Route path="/subscription-success" element={<SubscriptionSuccess />} />
          <Route path="/subscription-cancelled" element={<SubscriptionCancelled />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
