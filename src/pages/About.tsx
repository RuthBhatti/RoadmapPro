import { ArrowLeft, GitBranch, Heart, Users, Target, Lightbulb, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function About() {
  const navigate = useNavigate();

  const values = [
    {
      icon: Users,
      title: "Team-First Approach",
      description: "We believe that great projects are built by great teams. Our platform is designed to empower collaboration and make every team member more effective."
    },
    {
      icon: Target,
      title: "AI-Powered Intelligence",
      description: "We harness the power of artificial intelligence to make project planning smarter, faster, and more accurate than ever before."
    },
    {
      icon: Lightbulb,
      title: "Continuous Innovation",
      description: "We're constantly evolving our platform based on user feedback and the latest advances in AI technology and project management best practices."
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Built for distributed teams worldwide, our platform works seamlessly across time zones, cultures, and working styles."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      background: "Former VP of Engineering at TechCorp, 15+ years in distributed team management"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder", 
      background: "AI researcher at MIT, led development teams at Google and Microsoft"
    },
    {
      name: "Elena Petrov",
      role: "Head of Product",
      background: "Product strategy expert with experience at Slack and Notion"
    },
    {
      name: "David Kim",
      role: "Head of AI",
      background: "Former research scientist at DeepMind, specializing in project planning algorithms"
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
              <h1 className="text-2xl font-bold text-foreground">About Us</h1>
              <p className="text-sm text-muted-foreground">Our mission and the team behind RoadmapPro</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-primary rounded-2xl shadow-glow">
              <GitBranch className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-text">
            Empowering Teams to Build the Future
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            At RoadmapPro, we're on a mission to transform how distributed teams plan, 
            collaborate, and execute projects by combining human creativity with AI intelligence.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Our Story</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  RoadmapPro was born out of frustration with traditional project management tools that 
                  couldn't keep up with the pace and complexity of modern distributed teams. Our founders, 
                  having led engineering teams at major tech companies, experienced firsthand the challenges 
                  of coordinating complex projects across multiple time zones and skill sets.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In 2023, we set out to build something different - a platform that could understand 
                  project requirements at a human level and automatically generate intelligent roadmaps 
                  with proper task breakdowns, dependencies, and team assignments. By leveraging cutting-edge 
                  AI technology, we've created a tool that doesn't just manage projects, but actively 
                  helps teams plan better.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, RoadmapPro is trusted by over 10,000 teams worldwide, from startups building 
                  their first product to enterprise organizations managing complex digital transformations. 
                  We're proud to be part of their success stories.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To democratize intelligent project planning by making AI-powered roadmap generation 
                accessible to teams of all sizes. We believe every team deserves the strategic 
                planning capabilities that were once available only to large enterprises with 
                dedicated project management offices.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Lightbulb className="h-6 w-6 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                A world where project planning is no longer a bottleneck to innovation. Where teams 
                can focus on building amazing products instead of wrestling with spreadsheets and 
                status meetings. Where AI and human intelligence work together to turn ambitious 
                ideas into successful realities.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Our Values</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-primary rounded-lg">
                      <value.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Meet Our Team</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {member.role}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{member.background}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gradient-card border-0 shadow-soft text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Active Teams</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-soft text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Roadmaps Created</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-soft text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Project Success Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-soft text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">40+</div>
              <div className="text-muted-foreground">Countries</div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-card rounded-2xl p-12 border-0 shadow-soft">
          <h3 className="text-3xl font-bold mb-4">Join Our Mission</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a startup building your first product or an enterprise managing complex 
            transformations, we're here to help you succeed.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-smooth"
              onClick={() => navigate("/auth")}
            >
              <Heart className="h-5 w-5 mr-2" />
              Get Started Free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/careers")}
            >
              Join Our Team
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}