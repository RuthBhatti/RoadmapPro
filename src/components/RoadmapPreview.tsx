import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MoreHorizontal, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const RoadmapPreview = () => {
  const navigate = useNavigate();

  const handleAddToRoadmap = () => {
    navigate('/roadmap/new');
  };
  const mockTasks = [
    {
      id: 1,
      title: "User Authentication System",
      status: "In Progress",
      priority: "High",
      assignees: ["Alex", "Sarah"],
      startDate: "Mar 1",
      endDate: "Mar 15",
      progress: 65,
      aiGenerated: true
    },
    {
      id: 2,
      title: "Real-time Collaboration Engine",
      status: "Planning",
      priority: "Critical",
      assignees: ["Mike", "Lisa", "John"],
      startDate: "Mar 10",
      endDate: "Apr 5",
      progress: 15,
      aiGenerated: true
    },
    {
      id: 3,
      title: "Visual Roadmap Builder",
      status: "Not Started",
      priority: "Medium",
      assignees: ["Emma"],
      startDate: "Mar 20",
      endDate: "Apr 15",
      progress: 0,
      aiGenerated: false
    }
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Visualize Your Project Timeline</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how AI-generated tasks integrate seamlessly with your manual planning. 
            Track progress and dependencies in beautiful, interactive roadmaps.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Timeline Overview */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-medium border-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Q1 2024 Roadmap</h3>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Gantt Chart Mockup */}
              <div className="space-y-4">
                {mockTasks.map((task) => (
                  <div key={task.id} className="relative">
                    <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-primary"></div>
                          <span className="font-medium text-sm">{task.title}</span>
                          {task.aiGenerated && (
                            <Sparkles className="h-3 w-3 text-accent" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {task.startDate} - {task.endDate}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-2 bg-muted/50 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Task Details */}
          <div className="space-y-4">
            <Card className="p-4 shadow-medium border-0">
              <h4 className="font-semibold mb-3">Active Tasks</h4>
              <div className="space-y-3">
                {mockTasks.slice(0, 2).map((task) => (
                  <div key={task.id} className="border-l-2 border-primary pl-3">
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-medium text-sm">{task.title}</span>
                      {task.aiGenerated && (
                        <Sparkles className="h-3 w-3 text-accent mt-0.5" />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge variant="secondary">
                        {task.status}
                      </Badge>
                      <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {task.assignees.join(", ")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {task.progress}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 shadow-medium border-0 bg-gradient-accent">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-accent-foreground" />
                <span className="font-semibold text-accent-foreground text-sm">AI Suggestions</span>
              </div>
              <p className="text-accent-foreground/80 text-xs mb-3">
                Based on your current progress, I suggest adding a "Performance Testing" phase after the collaboration engine.
              </p>
              <Button size="sm" variant="secondary" className="w-full" onClick={handleAddToRoadmap}>
                Add to Roadmap
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};