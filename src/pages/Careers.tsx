import { ArrowLeft, MapPin, Clock, DollarSign, Users, Code, Palette, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function Careers() {
  const navigate = useNavigate();

  const openRoles = [
    {
      icon: Code,
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      salary: "$140k - $180k",
      description: "Build and scale our React/TypeScript frontend and Node.js/Supabase backend. Experience with AI integrations and real-time systems preferred."
    },
    {
      icon: Palette,
      title: "Senior Product Designer",
      department: "Design",
      location: "Remote / New York",
      type: "Full-time", 
      salary: "$130k - $160k",
      description: "Lead design for our AI-powered project management platform. Experience with complex B2B SaaS products and design systems required."
    },
    {
      icon: BarChart3,
      title: "Product Manager",
      department: "Product",
      location: "Remote / Austin",
      type: "Full-time",
      salary: "$150k - $190k", 
      description: "Drive product strategy for AI features and integrations. Experience with developer tools and enterprise software strongly preferred."
    },
    {
      icon: Users,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote / London",
      type: "Full-time",
      salary: "$90k - $120k",
      description: "Help enterprise customers succeed with RoadmapPro. Experience with project management tools and distributed teams required."
    },
    {
      icon: Shield,
      title: "DevOps Engineer",
      department: "Engineering", 
      location: "Remote / Seattle",
      type: "Full-time",
      salary: "$130k - $170k",
      description: "Build and maintain our cloud infrastructure. Experience with AWS, Kubernetes, and CI/CD pipelines required."
    },
    {
      icon: Code,
      title: "AI Engineer",
      department: "AI/ML",
      location: "Remote / San Francisco", 
      type: "Full-time",
      salary: "$160k - $200k",
      description: "Enhance our AI-powered planning algorithms. Experience with LLMs, project management domain knowledge, and production ML systems."
    }
  ];

  const benefits = [
    "Competitive salary + equity",
    "Comprehensive health, dental, vision",
    "Unlimited PTO policy",
    "Remote-first culture",
    "$5,000 home office budget",
    "Learning & development stipend",
    "Company retreats twice yearly",
    "Latest MacBook Pro + equipment"
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Part-time": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Contract": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
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
              <h1 className="text-2xl font-bold text-foreground">Careers</h1>
              <p className="text-sm text-muted-foreground">Join our mission to transform project management</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-text">
            Build the Future of Project Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join a fast-growing team that's revolutionizing how distributed teams plan and execute projects. 
            Work with cutting-edge AI technology and make a real impact on thousands of teams worldwide.
          </p>
        </div>

        {/* Why Join Us */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Why RoadmapPro?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-0 shadow-soft text-center">
              <CardHeader>
                <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Exceptional Team</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Work alongside talented engineers, designers, and product experts from companies like Google, Microsoft, and Notion.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft text-center">
              <CardHeader>
                <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                  <Code className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Cutting-Edge Tech</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Build with the latest technologies including React, TypeScript, AI/ML, and modern cloud infrastructure.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft text-center">
              <CardHeader>
                <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                  <BarChart3 className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>High Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Your work directly impacts thousands of teams and millions of users. See the results of your efforts in real-time.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Open Positions</h3>
            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
              {openRoles.length} Open Roles
            </Badge>
          </div>
          
          <div className="space-y-6">
            {openRoles.map((role, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-primary rounded-lg">
                        <role.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{role.title}</CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {role.department}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {role.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {role.salary}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge className={getTypeColor(role.type)}>
                      {role.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{role.description}</p>
                  <Button 
                    className="bg-gradient-primary hover:shadow-glow transition-smooth"
                    onClick={() => navigate("/support")}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits & Perks */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Benefits & Perks</h3>
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl text-center">What We Offer</CardTitle>
              <CardDescription className="text-center text-lg">
                We believe in taking care of our team so they can do their best work
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Culture */}
        <div className="mb-16">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Culture</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="grid md:grid-cols-2 gap-8 text-center">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">Remote-First</h4>
                  <p className="text-muted-foreground">
                    We've been remote-first since day one. Work from anywhere, anytime, with flexible hours that fit your life.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">Continuous Learning</h4>
                  <p className="text-muted-foreground">
                    Invest in your growth with our learning budget, conference attendance, and internal tech talks.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">Inclusive Environment</h4>
                  <p className="text-muted-foreground">
                    Diverse perspectives make us stronger. We're committed to building an inclusive workplace for everyone.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">Work-Life Balance</h4>
                  <p className="text-muted-foreground">
                    Unlimited PTO, mental health support, and a culture that respects your time outside of work.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Process */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Our Hiring Process</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-gradient-card border-0 shadow-soft text-center">
              <CardHeader>
                <div className="mx-auto w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  1
                </div>
                <CardTitle className="text-lg">Application</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Submit your application with resume and cover letter</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft text-center">
              <CardHeader>
                <div className="mx-auto w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  2
                </div>
                <CardTitle className="text-lg">Phone Screen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">30-minute call with our recruiting team</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft text-center">
              <CardHeader>
                <div className="mx-auto w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  3
                </div>
                <CardTitle className="text-lg">Technical Interview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Role-specific technical assessment with team members</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft text-center">
              <CardHeader>
                <div className="mx-auto w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  4
                </div>
                <CardTitle className="text-lg">Final Interview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Culture fit and leadership interviews</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-card rounded-2xl p-12 border-0 shadow-soft">
          <h3 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't see a role that fits? We're always looking for exceptional talent. 
            Send us your resume and let's talk about how you can contribute to our mission.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-smooth"
              onClick={() => navigate("/support")}
            >
              Apply to a Role
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/support")}
            >
              Send General Application
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}