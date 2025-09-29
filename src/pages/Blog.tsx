import { ArrowLeft, Calendar, Clock, User, ArrowRight, TrendingUp, Lightbulb, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function Blog() {
  const navigate = useNavigate();

  const featuredPost = {
    title: "How AI is Revolutionizing Project Management in 2024",
    excerpt: "Discover how artificial intelligence is transforming the way teams plan, execute, and deliver projects. From automated task generation to intelligent resource allocation.",
    author: "Sarah Chen",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "AI & Technology",
    image: "🤖"
  };

  const blogPosts = [
    {
      title: "10 Best Practices for Remote Team Project Management",
      excerpt: "Essential strategies for managing distributed teams effectively, including communication protocols, tool selection, and performance tracking.",
      author: "Marcus Rodriguez", 
      date: "March 12, 2024",
      readTime: "6 min read",
      category: "Remote Work",
      image: "🏠"
    },
    {
      title: "Building Effective Roadmaps: A Complete Guide",
      excerpt: "Learn how to create roadmaps that actually drive results. From stakeholder alignment to milestone tracking and everything in between.",
      author: "Elena Petrov",
      date: "March 8, 2024", 
      readTime: "12 min read",
      category: "Project Management",
      image: "🗺️"
    },
    {
      title: "The Future of AI-Assisted Planning",
      excerpt: "Explore upcoming trends in AI-powered project planning, including predictive analytics, risk assessment, and automated optimization.",
      author: "David Kim",
      date: "March 5, 2024",
      readTime: "9 min read", 
      category: "AI & Technology",
      image: "🔮"
    },
    {
      title: "Case Study: How TechCorp Reduced Project Delivery Time by 40%",
      excerpt: "Real-world success story of how a Fortune 500 company transformed their project management process using AI-powered roadmapping.",
      author: "Sarah Chen",
      date: "March 1, 2024",
      readTime: "10 min read",
      category: "Case Studies", 
      image: "📈"
    },
    {
      title: "Integrating RoadmapPro with Your Existing Workflow",
      excerpt: "Step-by-step guide to seamlessly integrate RoadmapPro with popular tools like Slack, GitHub, Jira, and Google Workspace.",
      author: "Marcus Rodriguez",
      date: "February 28, 2024",
      readTime: "7 min read",
      category: "Integrations",
      image: "🔗"
    },
    {
      title: "The Psychology of Project Success: Motivation and Team Dynamics",
      excerpt: "Understanding the human factors that make projects succeed or fail, and how to build motivation and accountability into your roadmaps.",
      author: "Elena Petrov", 
      date: "February 25, 2024",
      readTime: "8 min read",
      category: "Team Management",
      image: "🧠"
    }
  ];

  const categories = [
    { name: "AI & Technology", count: 8, icon: Zap },
    { name: "Project Management", count: 12, icon: TrendingUp },
    { name: "Remote Work", count: 6, icon: Users },
    { name: "Best Practices", count: 10, icon: Lightbulb }
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "AI & Technology": "bg-purple-500/10 text-purple-500 border-purple-500/20",
      "Project Management": "bg-blue-500/10 text-blue-500 border-blue-500/20", 
      "Remote Work": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      "Case Studies": "bg-amber-500/10 text-amber-500 border-amber-500/20",
      "Integrations": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      "Team Management": "bg-pink-500/10 text-pink-500 border-pink-500/20"
    };
    return colors[category] || "bg-muted";
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
              <h1 className="text-2xl font-bold text-foreground">Blog</h1>
              <p className="text-sm text-muted-foreground">Insights on project management and AI</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-text">
            The RoadmapPro Blog
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore insights, best practices, and the latest trends in AI-powered project management. 
            Learn from our team and the community of successful project leaders.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-6">Browse by Category</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-smooth cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <category.icon className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-muted-foreground">{category.count} articles</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8">Featured Article</h3>
          <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className={getCategoryColor(featuredPost.category)}>
                  {featuredPost.category}
                </Badge>
                <div className="text-4xl">{featuredPost.image}</div>
              </div>
              <CardTitle className="text-2xl mb-3">{featuredPost.title}</CardTitle>
              <CardDescription className="text-base leading-relaxed mb-4">
                {featuredPost.excerpt}
              </CardDescription>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {featuredPost.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {featuredPost.readTime}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
                Read Full Article
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Articles */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Recent Articles</h3>
            <Button variant="outline">View All Articles</Button>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                    <div className="text-2xl">{post.image}</div>
                  </div>
                  <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-card rounded-2xl p-12 border-0 shadow-soft text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the latest insights on project management, AI trends, and best practices 
            delivered straight to your inbox every week.
          </p>
          <div className="flex gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            />
            <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No spam, unsubscribe at any time. Read our privacy policy.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}