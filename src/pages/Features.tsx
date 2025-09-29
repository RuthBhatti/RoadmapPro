import { ArrowLeft, Brain, Users, Zap, Globe, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Task Generation",
      description: "Our Gemini AI analyzes your project description and automatically generates intelligent task breakdowns with proper dependencies and assignments."
    },
    {
      icon: Users,
      title: "Smart Team Management",
      description: "Assign tasks based on team member skills, availability, and workload. AI ensures optimal resource allocation across your projects."
    },
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description: "Work together seamlessly with live updates, instant notifications, and collaborative editing features that keep everyone in sync."
    },
    {
      icon: Globe,
      title: "Universal Access",
      description: "Access your roadmaps from anywhere with our responsive web platform. Works on desktop, tablet, and mobile devices."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption, role-based access control, and compliance with industry standards."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track progress with detailed insights, timeline predictions, and performance metrics to keep your projects on track."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Features</h1>
              <p className="text-sm text-muted-foreground">Powerful tools for modern project management</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-text">
            Everything You Need to Build Better Roadmaps
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-powered task generation to real-time collaboration, RoadmapPro provides 
            all the tools your team needs to plan, execute, and succeed.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-smooth">
              <CardHeader>
                <div className="p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-card rounded-2xl p-12 border-0 shadow-soft">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Project Management?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using RoadmapPro to build better roadmaps with AI assistance.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-smooth"
              onClick={() => navigate("/auth")}
            >
              Get Started Free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/dashboard")}
            >
              View Demo
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}