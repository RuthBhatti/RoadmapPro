import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Clock, Users, ChevronRight } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimate_hours?: number;
  ai_generated: boolean;
}

interface KanbanBoardProps {
  tasks: Task[];
  onTaskStatusChange: (taskId: string, newStatus: Task['status']) => void;
}

export const KanbanBoard = ({ tasks, onTaskStatusChange }: KanbanBoardProps) => {
  const columns = [
    { id: 'todo' as const, title: 'To Do', color: 'bg-slate-100 dark:bg-slate-800' },
    { id: 'in_progress' as const, title: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900/30' },
    { id: 'completed' as const, title: 'Completed', color: 'bg-green-100 dark:bg-green-900/30' },
    { id: 'blocked' as const, title: 'Blocked', color: 'bg-red-100 dark:bg-red-900/30' }
  ];

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    onTaskStatusChange(taskId, newStatus);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {columns.map((column) => {
        const columnTasks = tasks.filter(task => task.status === column.id);
        
        return (
          <div key={column.id} className={`${column.color} rounded-lg p-4 min-h-[400px]`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">{column.title}</h3>
              <Badge variant="outline" className="bg-background/50">
                {columnTasks.length}
              </Badge>
            </div>
            
            <div className="space-y-3">
              {columnTasks.map((task) => (
                <Card key={task.id} className="bg-card border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium leading-tight">
                        {task.title}
                      </CardTitle>
                      {task.ai_generated && (
                        <Brain className="h-3 w-3 text-accent flex-shrink-0" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {task.description && (
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                          {task.priority}
                        </Badge>
                        {task.estimate_hours && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {task.estimate_hours}h
                          </span>
                        )}
                      </div>
                      
                      {/* Quick move buttons */}
                      <div className="flex gap-1">
                        {column.id !== 'completed' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => {
                              const nextStatus = column.id === 'todo' ? 'in_progress' : 
                                              column.id === 'in_progress' ? 'completed' : 'completed';
                              moveTask(task.id, nextStatus);
                            }}
                          >
                            <ChevronRight className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {columnTasks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No {column.title.toLowerCase()} tasks
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};