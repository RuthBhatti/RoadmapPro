import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Zap, GitBranch, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first
    if (window.location.pathname !== '/') {
      navigate('/', { replace: true });
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleGetStarted = () => {
    navigate("/roadmap/new");
  };

  const handleSignIn = () => {
    navigate("/auth");
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogoClick}>
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <GitBranch className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">RoadmapPro</h1>
              <p className="text-sm text-muted-foreground">Collaborative Planning</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('roadmap')} className="text-muted-foreground hover:text-foreground transition-colors">
              Roadmap
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </button>
          </nav>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button variant="hero" size="sm" className="shadow-medium" onClick={handleGetStarted}>
              <Zap className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};