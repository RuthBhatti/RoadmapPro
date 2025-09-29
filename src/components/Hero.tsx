import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Sparkles, Users, Zap, Target } from "lucide-react";

export const Hero = () => {
  const { toast } = useToast();

  const handleStartBuilding = () => {
    window.location.href = "/login";
  };

  const handleViewDemo = () => {
    const element = document.getElementById('roadmap');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      toast({
        title: "Demo Preview",
        description: "Scroll down to see the roadmap preview and feature showcase!",
      });
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Roadmap Planning
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6 leading-tight">
            Build Roadmaps
            <br />
            <span className="text-foreground">Together</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Create, visualize, and track project roadmaps with your team. 
            AI helps generate tasks and dependencies while providing multiple views to keep everyone aligned.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" variant="hero" className="shadow-strong" onClick={handleStartBuilding}>
              <Zap className="h-5 w-5 mr-2" />
              Start Building
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="shadow-soft" onClick={handleViewDemo}>
              <Users className="h-5 w-5 mr-2" />
              View Demo
            </Button>
          </div>
        </div>
        
        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-0">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Task Generation</h3>
            <p className="text-muted-foreground text-sm">
              Define high-level goals and let AI suggest detailed tasks, dependencies, and timelines automatically.
            </p>
          </Card>
          
          <Card className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-0">
            <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
            <p className="text-muted-foreground text-sm">
              Share roadmaps with team members and stakeholders. Keep everyone aligned with shared visibility and progress tracking.
            </p>
          </Card>
          
          <Card className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-0">
            <div className="bg-success/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Multiple Views</h3>
            <p className="text-muted-foreground text-sm">
              Switch between list, Kanban board, and Gantt chart views to visualize your project timeline and progress.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};