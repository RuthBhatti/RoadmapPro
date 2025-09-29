import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Calendar, Clock } from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimate_hours?: number;
  ai_generated: boolean;
  order_idx: number;
  created_at: string;
}

interface GanttChartProps {
  tasks: Task[];
}

export const GanttChart = ({ tasks }: GanttChartProps) => {
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => a.order_idx - b.order_idx);
  }, [tasks]);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-blue-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'blocked': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  // Calculate timeline based on task order and estimates
  const timelineData = useMemo(() => {
    let currentWeek = 0;
    const taskTimelines = sortedTasks.map((task, index) => {
      const duration = Math.max(1, Math.ceil((task.estimate_hours || 8) / 40)); // Assume 40-hour work weeks
      const startWeek = currentWeek;
      const endWeek = currentWeek + duration - 1;
      currentWeek += duration;
      
      return {
        ...task,
        startWeek,
        endWeek,
        duration,
        progress: task.status === 'completed' ? 100 : 
                 task.status === 'in_progress' ? 50 : 0
      };
    });

    const totalWeeks = Math.max(12, currentWeek); // Minimum 12 weeks display
    return { taskTimelines, totalWeeks };
  }, [sortedTasks]);

  const weeks = Array.from({ length: timelineData.totalWeeks }, (_, i) => i + 1);

  return (
    <Card className="bg-gradient-card border-0 shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Project Timeline (Gantt View)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {/* Timeline Header */}
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[300px_1fr] gap-4 mb-4">
              <div className="font-medium text-sm text-muted-foreground">Task</div>
              <div className="grid grid-flow-col gap-1" style={{ gridTemplateColumns: `repeat(${timelineData.totalWeeks}, 1fr)` }}>
                {weeks.map(week => (
                  <div key={week} className="text-xs text-muted-foreground text-center p-1 border-r border-border/30">
                    W{week}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Rows */}
            <div className="space-y-2">
              {timelineData.taskTimelines.map((task) => (
                <div key={task.id} className="grid grid-cols-[300px_1fr] gap-4 items-center py-2 border-b border-border/20">
                  {/* Task Info */}
                  <div className="pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {task.title}
                      </h4>
                      {task.ai_generated && (
                        <Brain className="h-3 w-3 text-accent flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="text-xs">
                        {task.priority}
                      </Badge>
                      {task.estimate_hours && (
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {task.estimate_hours}h
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Timeline Bar */}
                  <div className="relative h-8 grid grid-flow-col gap-1" style={{ gridTemplateColumns: `repeat(${timelineData.totalWeeks}, 1fr)` }}>
                    {weeks.map(week => (
                      <div key={week} className="border-r border-border/20 relative">
                        {week >= task.startWeek + 1 && week <= task.endWeek + 1 && (
                          <div 
                            className={`absolute inset-0 rounded-sm ${getStatusColor(task.status)} opacity-80 flex items-center justify-center`}
                          >
                            {task.progress > 0 && (
                              <div 
                                className="absolute left-0 top-0 bottom-0 bg-white/30 rounded-sm"
                                style={{ width: `${task.progress}%` }}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border/20 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                <span>In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                <span>To Do</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                <span>Blocked</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};