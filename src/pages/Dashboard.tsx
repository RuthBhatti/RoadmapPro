import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, GitBranch, Users, Calendar, BarChart3, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface Roadmap {
  id: string;
  title: string;
  description: string;
  visibility: string;
  created_at: string;
  tasks?: { count: number }[];
}

export default function Dashboard() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchRoadmaps();
      } else {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchRoadmaps();
      } else {
        setUser(null);
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchRoadmaps = async () => {
    try {
      const { data, error } = await supabase
        .from("roadmaps")
        .select(`
          id,
          title,
          description,
          visibility,
          created_at,
          tasks:tasks(count)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRoadmaps(data || []);
    } catch (error: any) {
      toast({
        title: "Failed to load roadmaps",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const createNewRoadmap = () => {
    navigate("/roadmap/new");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="p-2 bg-gradient-primary rounded-lg shadow-soft">
                <GitBranch className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">RoadmapPro</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.email?.split('@')[0]}</p>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Roadmaps</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roadmaps.length}</div>
              <p className="text-xs text-muted-foreground">Active projects</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {roadmaps.reduce((acc, roadmap) => acc + (roadmap.tasks?.[0]?.count || 0), 0)}
              </div>
              <p className="text-xs text-muted-foreground">Across all roadmaps</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">You and your team</p>
            </CardContent>
          </Card>
        </div>

        {/* Roadmaps Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Your Roadmaps</h2>
            <p className="text-muted-foreground">Manage and track your project roadmaps</p>
          </div>
          <Button onClick={createNewRoadmap} className="bg-gradient-primary hover:shadow-glow transition-smooth">
            <Plus className="h-4 w-4 mr-2" />
            New Roadmap
          </Button>
        </div>

        {roadmaps.length === 0 ? (
          <Card className="border-2 border-dashed border-border bg-muted/20">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="p-4 bg-gradient-primary rounded-full mb-4 shadow-glow">
                <GitBranch className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your First Roadmap</h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                Start planning your next project with AI-powered task generation and real-time collaboration.
              </p>
              <Button onClick={createNewRoadmap} className="bg-gradient-primary hover:shadow-glow transition-smooth">
                <Plus className="h-4 w-4 mr-2" />
                Create Roadmap
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((roadmap) => (
              <Card key={roadmap.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-smooth cursor-pointer"
                    onClick={() => navigate(`/roadmap/${roadmap.id}`)}>
                <CardHeader>
                  <CardTitle className="text-lg">{roadmap.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {roadmap.description || "No description available"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {roadmap.tasks?.[0]?.count || 0} tasks
                    </span>
                    <span className="capitalize">{roadmap.visibility}</span>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Created {new Date(roadmap.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}