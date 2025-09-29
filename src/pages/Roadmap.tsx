import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { KanbanBoard } from "@/components/KanbanBoard";
import { GanttChart } from "@/components/GanttChart";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  Brain,
  Calendar,
  Target,
  TrendingUp,
  List,
  BarChart3,
  Layout
} from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimate_hours?: number;
  assignee_id?: string;
  depends_on?: string;
  ai_generated: boolean;
  order_idx: number;
  created_at: string;
}

interface Roadmap {
  id: string;
  title: string;
  description?: string;
  visibility: string;
  created_at: string;
  owner: string;
}

interface TeamMember {
  user_id: string;
  role: string;
  skills: string[];
  load_factor: number;
}

interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  totalEstimatedHours: number;
  completedHours: number;
}

export default function Roadmap() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [stats, setStats] = useState<ProjectStats>({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    totalEstimatedHours: 0,
    completedHours: 0
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'todo' | 'in_progress' | 'completed'>('all');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchRoadmapData(session.user);
      } else {
        navigate("/auth");
      }
    });
  }, [id, navigate]);

  const fetchRoadmapData = async (currentUser: SupabaseUser) => {
    try {
      // Fetch roadmap details
      const { data: roadmapData, error: roadmapError } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('id', id)
        .single();

      if (roadmapError) throw roadmapError;
      
      // Check if user has access
      if (roadmapData.owner !== currentUser.id && roadmapData.visibility !== 'link') {
        toast({
          title: "Access denied",
          description: "You don't have permission to view this roadmap.",
          variant: "destructive",
        });
        navigate("/dashboard");
        return;
      }

      setRoadmap(roadmapData);

      // Fetch tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('roadmap_id', id)
        .order('order_idx', { ascending: true });

      if (tasksError) throw tasksError;
      setTasks(tasksData || []);

      // Fetch team members
      const { data: membersData, error: membersError } = await supabase
        .from('roadmap_members')
        .select('*')
        .eq('roadmap_id', id);

      if (membersError) {
        console.error("Error fetching team members:", membersError);
      } else {
        setTeamMembers(membersData || []);
      }

      // Calculate stats
      if (tasksData) {
        const totalTasks = tasksData.length;
        const completedTasks = tasksData.filter(task => task.status === 'completed').length;
        const inProgressTasks = tasksData.filter(task => task.status === 'in_progress').length;
        const totalEstimatedHours = tasksData.reduce((sum, task) => sum + (task.estimate_hours || 0), 0);
        const completedHours = tasksData
          .filter(task => task.status === 'completed')
          .reduce((sum, task) => sum + (task.estimate_hours || 0), 0);

        setStats({
          totalTasks,
          completedTasks,
          inProgressTasks,
          totalEstimatedHours,
          completedHours
        });
      }

    } catch (error: any) {
      toast({
        title: "Error loading roadmap",
        description: error.message,
        variant: "destructive",
      });
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId);

      if (error) throw error;

      // Update local state
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      // Recalculate stats
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      
      const completedTasks = updatedTasks.filter(task => task.status === 'completed').length;
      const inProgressTasks = updatedTasks.filter(task => task.status === 'in_progress').length;
      const completedHours = updatedTasks
        .filter(task => task.status === 'completed')
        .reduce((sum, task) => sum + (task.estimate_hours || 0), 0);

      setStats(prev => ({
        ...prev,
        completedTasks,
        inProgressTasks,
        completedHours
      }));

      toast({
        title: "Task updated",
        description: `Task marked as ${newStatus.replace('_', ' ')}.`,
      });

    } catch (error: any) {
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'blocked':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);
  const progressPercentage = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading roadmap...</p>
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Roadmap not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">{roadmap.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {roadmap.description || "No description provided"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Calendar className="h-3 w-3" />
                Created {new Date(roadmap.created_at).toLocaleDateString()}
              </Badge>
              {tasks.some(task => task.ai_generated) && (
                <Badge variant="default" className="gap-1 bg-gradient-primary">
                  <Brain className="h-3 w-3" />
                  AI Generated
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Project Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalTasks}</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completedTasks}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.inProgressTasks}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Est. Hours</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalEstimatedHours}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="mb-8 bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Project Progress
            </CardTitle>
            <CardDescription>
              Overall completion status and milestone tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{progressPercentage}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Hours Completed: </span>
                  <span className="font-medium text-foreground">{stats.completedHours} / {stats.totalEstimatedHours}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Tasks Remaining: </span>
                  <span className="font-medium text-foreground">{stats.totalTasks - stats.completedTasks}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Management Section with Multiple Views */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Task Management
                </CardTitle>
                <CardDescription>
                  View and manage project tasks with multiple visualization options
                </CardDescription>
              </div>
              <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  List View
                </TabsTrigger>
                <TabsTrigger value="kanban" className="flex items-center gap-2">
                  <Layout className="h-4 w-4" />
                  Kanban Board
                </TabsTrigger>
                <TabsTrigger value="gantt" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Gantt Chart
                </TabsTrigger>
              </TabsList>

              <TabsContent value="list">
                <div className="space-y-4">
                  {filteredTasks.length === 0 ? (
                    <div className="text-center py-12">
                      <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {filter === 'all' ? 'No tasks found. Create some tasks to get started!' : `No ${filter.replace('_', ' ')} tasks found.`}
                      </p>
                    </div>
                  ) : (
                    filteredTasks.map((task) => (
                      <div key={task.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {getStatusIcon(task.status)}
                              <h3 className="font-medium text-foreground">{task.title}</h3>
                              <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                                {task.priority}
                              </Badge>
                              {task.ai_generated && (
                                <Badge variant="outline" className="text-xs gap-1">
                                  <Brain className="h-3 w-3" />
                                  AI
                                </Badge>
                              )}
                            </div>
                            {task.description && (
                              <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              {task.estimate_hours && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {task.estimate_hours}h
                                </span>
                              )}
                              <span>Order: {task.order_idx}</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <Select value={task.status} onValueChange={(value: Task['status']) => updateTaskStatus(task.id, value)}>
                              <SelectTrigger className="w-[130px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="todo">To Do</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="blocked">Blocked</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="kanban">
                <KanbanBoard tasks={tasks} onTaskStatusChange={updateTaskStatus} />
              </TabsContent>

              <TabsContent value="gantt">
                <GanttChart tasks={tasks} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}