import { ArrowLeft, Mail, MessageSquare, Book, Video, Search, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function Support() {
  const navigate = useNavigate();

  const supportOptions = [
    {
      icon: MessageSquare,
      title: "Live Chat", 
      description: "Get instant help from our support team",
      availability: "24/7",
      response: "< 2 minutes"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      availability: "Business hours",
      response: "< 4 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Talk directly with our technical experts",
      availability: "Mon-Fri 9AM-6PM PST", 
      response: "Immediate"
    },
    {
      icon: Book,
      title: "Documentation",
      description: "Comprehensive guides and API references",
      availability: "Always available",
      response: "Self-service"
    }
  ];

  const faqs = [
    {
      question: "How does AI task generation work?",
      answer: "Our AI analyzes your project description, team skills, and timeline to automatically generate detailed tasks with dependencies and assignments."
    },
    {
      question: "Can I integrate RoadmapPro with existing tools?",
      answer: "Yes! We support integrations with GitHub, Slack, Google Calendar, Gmail, and many more. Webhooks are also available for custom integrations."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use enterprise-grade encryption, follow SOC 2 compliance standards, and never share your data with third parties."
    },
    {
      question: "How accurate are the AI-generated timelines?",
      answer: "Our AI considers team skills, historical data, and project complexity to provide realistic estimates. Accuracy improves over time as the system learns from your team's patterns."
    },
    {
      question: "Can I customize the AI-generated roadmaps?",
      answer: "Yes, all AI-generated content is fully editable. You can modify tasks, adjust timelines, reassign team members, and add custom requirements."
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
              <h1 className="text-2xl font-bold text-foreground">Support Center</h1>
              <p className="text-sm text-muted-foreground">Get help with RoadmapPro</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-text">
            How Can We Help You?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our support team is here to help you succeed with RoadmapPro. 
            Find answers, get assistance, or contact our experts directly.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for help articles, guides, or FAQs..."
              className="pl-12 py-3 text-lg"
            />
          </div>
        </div>

        {/* Support Options */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Get Support</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-smooth text-center">
                <CardHeader>
                  <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                    <option.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" />
                      {option.availability}
                    </div>
                    <div>Response: {option.response}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    {option.title === "Live Chat" ? "Start Chat" :
                     option.title === "Email Support" ? "Send Email" :
                     option.title === "Phone Support" ? "Call Now" : "View Docs"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
                  <Mail className="h-6 w-6 text-primary" />
                  Contact Support
                </CardTitle>
                <CardDescription className="text-center text-lg">
                  Send us a message and we'll get back to you within 4 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Name *</label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email *</label>
                    <Input type="email" placeholder="your.email@company.com" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Subject *</label>
                  <Input placeholder="What can we help you with?" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Message *</label>
                  <Textarea 
                    placeholder="Please describe your issue or question in detail. Include any error messages, screenshots, or steps to reproduce the problem."
                    rows={6}
                  />
                </div>
                
                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-smooth">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    For urgent issues, contact us directly at{" "}
                    <a href="mailto:support@roadmappro.com" className="text-primary hover:underline">
                      support@roadmappro.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h3>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-card border-0 shadow-soft text-center">
            <CardHeader>
              <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                <Book className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Comprehensive guides, API references, and best practices for using RoadmapPro effectively.
              </p>
              <Button variant="outline">Browse Docs</Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft text-center">
            <CardHeader>
              <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                <Video className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Video Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Step-by-step video guides covering everything from basic setup to advanced AI features.
              </p>
              <Button variant="outline">Watch Videos</Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft text-center">
            <CardHeader>
              <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                <MessageSquare className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Community Forum</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Connect with other users, share tips, and get answers from the RoadmapPro community.
              </p>
              <Button variant="outline">Join Forum</Button>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise Support */}
        <div className="bg-gradient-card rounded-2xl p-12 border-0 shadow-soft text-center">
          <h3 className="text-3xl font-bold mb-4">Need Enterprise Support?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get dedicated support with priority response times, custom training sessions, 
            and a dedicated customer success manager for your organization.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-smooth"
            >
              Contact Sales
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}