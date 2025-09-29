import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Zap, 
  Globe, 
  Shield, 
  BarChart3, 
  Workflow,
  MessageSquare,
  GitMerge
} from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Planning",
      description: "GPT-4 integration analyzes your goals and generates detailed task breakdowns with smart dependencies and realistic timelines.",
      badge: "AI",
      color: "text-accent"
    },
    {
      icon: Globe,
      title: "Team Collaboration",
      description: "Share roadmaps with team members and stakeholders. Track progress together with role-based access controls and shared visibility.",
      badge: "Team",
      color: "text-primary"
    },
    {
      icon: BarChart3,
      title: "Visual Project Views",
      description: "Multiple visualization options including Gantt charts, Kanban boards, and timeline views make complex projects easy to understand and track.",
      badge: "Visual",
      color: "text-success"
    },
    {
      icon: Shield,
      title: "Role-based Access",
      description: "Secure authentication with granular permissions ensures team members see only what they need to see.",
      badge: "Secure",
      color: "text-warning"
    },
    {
      icon: Workflow,
      title: "Smart Dependencies",
      description: "AI automatically detects and suggests task dependencies, critical paths, and potential bottlenecks in your roadmap.",
      badge: "Smart",
      color: "text-accent"
    },
    {
      icon: GitMerge,
      title: "CI/CD Integration",
      description: "Connect with GitHub Actions and other DevOps tools to automatically update roadmaps based on deployment status.",
      badge: "DevOps",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Full Feature Suite
          </Badge>
          <h2 className="text-4xl font-bold mb-6">
            Everything Your Team Needs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-powered task generation to real-time collaboration, 
            RoadmapPro provides all the tools modern distributed teams need to succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 border-0 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{feature.title}</h3>
                    <Badge 
                      variant="outline" 
                      className="text-xs text-primary border-primary/20 bg-primary/10"
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Integration Preview */}
        <div className="mt-20 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/10 shadow-medium">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Ready to get started?</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Connect to Supabase for Full Functionality
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              To enable authentication, real-time collaboration, AI features, and data persistence, 
              connect your project to Supabase using our native integration.
            </p>
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-lg text-sm">
              <Zap className="h-4 w-4" />
              One-click Supabase integration available
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};