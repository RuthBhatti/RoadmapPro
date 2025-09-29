import { ArrowLeft, Zap, Smartphone, Globe, Shield, Palette, Code, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function Templates() {
  const navigate = useNavigate();

  const templates = [
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Complete roadmap for iOS/Android app development with authentication, APIs, and deployment phases.",
      duration: "3-6 months",
      complexity: "Medium",
      tasks: 45,
      categories: ["Development", "Mobile"]
    },
    {
      icon: Globe,
      title: "Web Application Launch",
      description: "Full-stack web application from concept to production with CI/CD, testing, and monitoring.",
      duration: "2-4 months", 
      complexity: "High",
      tasks: 38,
      categories: ["Development", "Web"]
    },
    {
      icon: Palette,
      title: "Design System Creation",
      description: "Build a comprehensive design system with components, documentation, and implementation guide.",
      duration: "6-8 weeks",
      complexity: "Medium",
      tasks: 22,
      categories: ["Design", "Documentation"]
    },
    {
      icon: Shield,
      title: "Security Audit & Compliance",
      description: "Complete security assessment and compliance implementation for enterprise applications.",
      duration: "4-6 weeks",
      complexity: "High", 
      tasks: 28,
      categories: ["Security", "Compliance"]
    },
    {
      icon: Code,
      title: "API Development & Documentation",
      description: "RESTful API development with authentication, rate limiting, documentation, and testing.",
      duration: "4-8 weeks",
      complexity: "Medium",
      tasks: 32,
      categories: ["Backend", "API"]
    },
    {
      icon: Briefcase,
      title: "Digital Transformation",
      description: "Enterprise digital transformation roadmap covering process automation and system modernization.",
      duration: "6-12 months",
      complexity: "High",
      tasks: 67,
      categories: ["Enterprise", "Strategy"]
    }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Medium": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "High": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-muted";
    }
  };

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
              <h1 className="text-2xl font-bold text-foreground">Templates</h1>
              <p className="text-sm text-muted-foreground">Pre-built roadmaps for common project types</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-text">
            Jump-Start Your Projects with Expert Templates
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Save time and leverage proven methodologies with our curated collection of 
            project templates. Each template includes detailed tasks, timelines, and best practices.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gradient-card border-0 shadow-soft text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Templates Available</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-soft text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Projects Created</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-soft text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-soft text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-muted-foreground">User Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Templates Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8">Popular Templates</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {templates.map((template, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-primary rounded-lg">
                        <template.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{template.title}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground mt-1">
                          {template.duration} • {template.tasks} tasks
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getComplexityColor(template.complexity)}>
                      {template.complexity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{template.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.categories.map((category, catIndex) => (
                      <Badge key={catIndex} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                    onClick={() => navigate("/roadmap/new")}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Use This Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Template CTA */}
        <div className="bg-gradient-card rounded-2xl p-12 border-0 shadow-soft text-center">
          <h3 className="text-3xl font-bold mb-4">Need a Custom Template?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our AI assistant can create custom roadmap templates tailored to your specific 
            industry, methodology, or project requirements.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-smooth"
              onClick={() => navigate("/roadmap/new")}
            >
              Create Custom Template
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/support")}
            >
              Request Template
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}