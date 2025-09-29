import { ArrowLeft, Zap, GitBranch, MessageSquare, Calendar, Mail, Database, Cloud, Code, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function Integrations() {
  const navigate = useNavigate();

  const integrations = [
    {
      icon: GitBranch,
      name: "GitHub",
      description: "Sync roadmap tasks with GitHub issues, pull requests, and project boards for seamless development workflow.",
      status: "Available",
      category: "Development"
    },
    {
      icon: MessageSquare,
      name: "Slack",
      description: "Get instant notifications and updates in your Slack channels when tasks are completed or updated.",
      status: "Available", 
      category: "Communication"
    },
    {
      icon: Calendar,
      name: "Google Calendar",
      description: "Automatically sync task deadlines and milestones with your Google Calendar for better time management.",
      status: "Available",
      category: "Productivity"
    },
    {
      icon: Mail,
      name: "Gmail",
      description: "Receive email notifications for important updates, deadline reminders, and task assignments.",
      status: "Available",
      category: "Communication"
    },
    {
      icon: Database,
      name: "Jira",
      description: "Import existing Jira tickets and sync task status between RoadmapPro and your Jira workspace.",
      status: "Coming Soon",
      category: "Project Management"
    },
    {
      icon: Cloud,
      name: "Microsoft Teams",
      description: "Collaborate directly within Teams with embedded roadmap views and real-time notifications.",
      status: "Coming Soon",
      category: "Communication"
    },
    {
      icon: Code,
      name: "GitLab",
      description: "Connect with GitLab repositories to track development progress and sync with merge requests.",
      status: "Coming Soon",
      category: "Development"
    },
    {
      icon: Webhook,
      name: "Webhooks",
      description: "Build custom integrations with our powerful webhook system for any external service or tool.",
      status: "Available",
      category: "Custom"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Coming Soon": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default: return "bg-muted";
    }
  };

  const categories = ["All", "Development", "Communication", "Productivity", "Project Management", "Custom"];

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
              <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
              <p className="text-sm text-muted-foreground">Connect RoadmapPro with your favorite tools</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-text">
            Connect Your Entire Workflow
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Integrate RoadmapPro with the tools your team already uses. Streamline workflows, 
            reduce context switching, and keep everyone in sync across all platforms.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-card border-0 shadow-soft text-center">
            <CardHeader>
              <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Automated Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Reduce manual work with automated syncing, notifications, and status updates across all your tools.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft text-center">
            <CardHeader>
              <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                <MessageSquare className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Unified Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Keep everyone informed with notifications in Slack, Teams, email, and other communication platforms.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft text-center">
            <CardHeader>
              <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                <Database className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Centralized Data</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Sync data bidirectionally to maintain consistency across all platforms without duplicate entry.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Integrations Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Available Integrations</h3>
            <div className="flex gap-2">
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                8+ Integrations
              </Badge>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-primary rounded-lg">
                        <integration.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{integration.name}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{integration.description}</p>
                  <Button 
                    variant={integration.status === "Available" ? "default" : "outline"}
                    className={integration.status === "Available" ? "bg-gradient-primary hover:shadow-glow transition-smooth" : ""}
                    disabled={integration.status === "Coming Soon"}
                  >
                    {integration.status === "Available" ? "Configure" : "Notify Me"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* API Section */}
        <div className="bg-gradient-card rounded-2xl p-12 border-0 shadow-soft mb-16">
          <div className="text-center mb-8">
            <div className="mx-auto p-4 bg-gradient-primary rounded-2xl w-fit mb-6">
              <Webhook className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Build Custom Integrations</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our REST API and webhooks to create custom integrations with any tool in your stack.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-background/50 border-0">
              <CardHeader>
                <CardTitle>REST API</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Full CRUD operations for roadmaps and tasks</li>
                  <li>✓ Team management and permissions</li>
                  <li>✓ Real-time status updates</li>
                  <li>✓ Comprehensive documentation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-background/50 border-0">
              <CardHeader>
                <CardTitle>Webhooks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Task creation, updates, and completion</li>
                  <li>✓ Roadmap milestone events</li>
                  <li>✓ Team member assignments</li>
                  <li>✓ Custom event filtering</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Connect Your Tools?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start integrating RoadmapPro with your existing workflow today. Setup takes just minutes.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-smooth"
              onClick={() => navigate("/dashboard")}
            >
              View Integrations
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/support")}
            >
              API Documentation
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}