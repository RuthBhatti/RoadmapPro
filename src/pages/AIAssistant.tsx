import { ArrowLeft, Brain, Sparkles, Target, Clock, Users, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function AIAssistant() {
  const navigate = useNavigate();

  const capabilities = [
    {
      icon: Target,
      title: "Intelligent Task Breakdown",
      description: "Gemini AI analyzes your project goals and automatically breaks them down into actionable, well-defined tasks with proper sequencing."
    },
    {
      icon: Users,
      title: "Smart Team Assignments",
      description: "AI matches tasks to team members based on their skills, current workload, and availability for optimal productivity."
    },
    {
      icon: Clock,
      title: "Realistic Time Estimates",
      description: "Get accurate time predictions based on task complexity, team experience, and historical project data."
    },
    {
      icon: Lightbulb,
      title: "Proactive Suggestions",
      description: "Receive intelligent recommendations for improving project flow, identifying risks, and optimizing timelines."
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
              <h1 className="text-2xl font-bold text-foreground">AI Assistant</h1>
              <p className="text-sm text-muted-foreground">Powered by Google Gemini for intelligent project planning</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-primary rounded-2xl shadow-glow">
              <Brain className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-text">
            Meet Your AI Planning Assistant
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powered by Google's Gemini AI, our assistant transforms your project ideas into 
            detailed, actionable roadmaps with intelligent task assignments and realistic timelines.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">How Our AI Assistant Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-0 shadow-soft text-center">
              <CardHeader>
                <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>1. Analyze Your Project</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Describe your project goals, timeline, and team. Our AI understands the context and requirements.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft text-center">
              <CardHeader>
                <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>2. Generate Smart Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  AI breaks down complex projects into manageable tasks with dependencies and time estimates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft text-center">
              <CardHeader>
                <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>3. Assign Intelligently</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Tasks are automatically assigned to team members based on skills, workload, and availability.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Capabilities */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">AI Capabilities</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-primary rounded-lg">
                      <capability.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{capability.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {capability.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Example */}
        <div className="bg-gradient-card rounded-2xl p-8 border-0 shadow-soft mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">See AI in Action</h3>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-lg font-semibold mb-3">You Input:</h4>
                <div className="bg-background/50 rounded-lg p-4 text-sm">
                  "Build a mobile e-commerce app with user authentication, product catalog, shopping cart, and payment integration. Timeline: 3 months. Team: 2 developers, 1 designer, 1 PM."
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">AI Generates:</h4>
                <ul className="text-sm space-y-2">
                  <li>✓ 47 detailed tasks across 6 phases</li>
                  <li>✓ Intelligent task dependencies</li>
                  <li>✓ Realistic 12-week timeline</li>
                  <li>✓ Optimized team assignments</li>
                  <li>✓ Risk assessments & recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Experience AI-Powered Planning</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let our AI assistant transform how you plan and manage projects. Get started in minutes.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-glow transition-smooth"
            onClick={() => navigate("/roadmap/new")}
          >
            <Brain className="h-5 w-5 mr-2" />
            Try AI Assistant Now
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}