import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Sparkles, Plus, X, Users, Brain, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface TeamMember {
  name: string;
  email: string;
  skills: string[];
  role: string;
  load_factor: number;
}

export default function CreateRoadmap() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [timeline, setTimeline] = useState("");
  const [priority, setPriority] = useState("medium");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingTasks, setIsGeneratingTasks] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // New team member form
  const [newMember, setNewMember] = useState<TeamMember>({
    name: "",
    email: "",
    skills: [],
    role: "",
    load_factor: 1.0
  });
  const [newSkill, setNewSkill] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();

  // ... keep existing useEffect for authentication ...

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Team member management functions
  const addSkill = () => {
    if (newSkill.trim() && !newMember.skills.includes(newSkill.trim())) {
      setNewMember(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setNewMember(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addTeamMember = () => {
    if (newMember.name && newMember.email && newMember.role) {
      setTeamMembers(prev => [...prev, { ...newMember }]);
      setNewMember({
        name: "",
        email: "",
        skills: [],
        role: "",
        load_factor: 1.0
      });
    }
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateRoadmapWithAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      // Step 1: Create the roadmap
      const { data: roadmapData, error: roadmapError } = await supabase
        .from("roadmaps")
        .insert([
          {
            title,
            description,
            visibility,
            owner: user.id,
          }
        ])
        .select()
        .single();

      if (roadmapError) throw roadmapError;

      // Step 2: Add team members to database
      if (teamMembers.length > 0) {
        const membersToInsert = teamMembers.map(member => ({
          roadmap_id: roadmapData.id,
          user_id: user.id, // For now, associate with current user
          role: member.role,
          skills: member.skills,
          load_factor: member.load_factor
        }));

        const { error: membersError } = await supabase
          .from("roadmap_members")
          .insert(membersToInsert);

        if (membersError) {
          console.error("Error adding team members:", membersError);
          // Don't fail the whole process for this
        }
      }

      if (teamMembers.length > 0) {
        // Step 3: Generate AI tasks
        setIsGeneratingTasks(true);
        
        try {
          const { data: functionResponse, error: functionError } = await supabase.functions.invoke(
            'generate-roadmap-tasks',
            {
              body: {
                roadmapId: roadmapData.id,
                projectTitle: title,
                projectDescription: description,
                teamMembers: teamMembers,
                timeline: timeline,
                priority: priority
              }
            }
          );

          if (functionError) {
            console.error("AI generation error:", functionError);
            toast({
              title: "Roadmap created, but AI generation failed",
              description: "You can manually add tasks to your roadmap.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "AI-Powered Roadmap Created! 🚀",
              description: `Successfully generated ${functionResponse.tasks_created} tasks with intelligent assignments.`,
            });
          }
        } catch (aiError) {
          console.error("AI generation error:", aiError);
          toast({
            title: "Roadmap created",
            description: "AI task generation is temporarily unavailable. You can add tasks manually.",
          });
        }
      } else {
        toast({
          title: "Roadmap created!",
          description: "Your new roadmap has been created successfully.",
        });
      }

      navigate(`/roadmap/${roadmapData.id}`);
    } catch (error: any) {
      toast({
        title: "Failed to create roadmap",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsGeneratingTasks(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Create AI-Powered Roadmap</h1>
              <p className="text-sm text-muted-foreground">Define your project and team for intelligent task generation</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Project Details</span>
            </div>
            <div className="w-8 h-0.5 bg-muted-foreground"></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Team & AI Setup</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleCreateRoadmapWithAI} className="space-y-6">
          {/* Step 1: Project Details */}
          {currentStep === 1 && (
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Project Information
                </CardTitle>
                <CardDescription>
                  Tell us about your project goals and requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium text-foreground">
                    Project Title *
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g., HR Compensation System Redesign"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-foreground">
                    Project Description *
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project goals, scope, deliverables, and key requirements. The more detail you provide, the better AI can generate relevant tasks..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="timeline" className="text-sm font-medium text-foreground">
                      Timeline
                    </label>
                    <Select value={timeline} onValueChange={setTimeline}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                        <SelectItem value="1 month">1 month</SelectItem>
                        <SelectItem value="2-3 months">2-3 months</SelectItem>
                        <SelectItem value="6 months">6 months</SelectItem>
                        <SelectItem value="1 year">1 year or more</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="priority" className="text-sm font-medium text-foreground">
                      Priority Level
                    </label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="visibility" className="text-sm font-medium text-foreground">
                      Visibility
                    </label>
                    <Select value={visibility} onValueChange={setVisibility}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="link">Link sharing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    disabled={!title.trim() || !description.trim()}
                    className="bg-gradient-primary hover:shadow-glow transition-smooth"
                  >
                    Next: Setup Team
                    <Users className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Team Management & AI Generation */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Team Members Section */}
              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Team Members
                  </CardTitle>
                  <CardDescription>
                    Add your team members for intelligent task assignments (Optional)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add Team Member Form */}
                  <div className="border border-dashed border-border rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Name</label>
                        <Input
                          placeholder="Team member name"
                          value={newMember.name}
                          onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Email</label>
                        <Input
                          type="email"
                          placeholder="email@company.com"
                          value={newMember.email}
                          onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Role</label>
                        <Select value={newMember.role} onValueChange={(value) => setNewMember(prev => ({ ...prev, role: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Project Manager">Project Manager</SelectItem>
                            <SelectItem value="Developer">Developer</SelectItem>
                            <SelectItem value="Designer">Designer</SelectItem>
                            <SelectItem value="Analyst">Analyst</SelectItem>
                            <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                            <SelectItem value="DevOps">DevOps</SelectItem>
                            <SelectItem value="Product Owner">Product Owner</SelectItem>
                            <SelectItem value="Technical Writer">Technical Writer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Load Factor</label>
                    <Select value={newMember.load_factor.toString()} onValueChange={(value) => setNewMember(prev => ({ ...prev, load_factor: parseFloat(value) }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select load factor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.25">25% (Part-time)</SelectItem>
                        <SelectItem value="0.5">50% (Half-time)</SelectItem>
                        <SelectItem value="1.0">100% (Full-time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Skills</label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill (e.g., React, Python, UI/UX)"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        />
                        <Button type="button" onClick={addSkill} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newMember.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeSkill(skill)}>
                            {skill} <X className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      type="button" 
                      onClick={addTeamMember}
                      disabled={!newMember.name || !newMember.email || !newMember.role}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Team Member
                    </Button>
                  </div>

                  {/* Current Team Members */}
                  {teamMembers.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Team Members ({teamMembers.length})</h4>
                      {teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div>
                                <p className="font-medium text-foreground">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.email} • {member.role}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {member.skills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="outline" className="text-xs">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTeamMember(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1"
                >
                  Back to Project Details
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !title.trim() || !description.trim()}
                  className="flex-1 bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  {isLoading || isGeneratingTasks ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      {isGeneratingTasks ? 'AI Generating Tasks...' : 'Creating Roadmap...'}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      {teamMembers.length > 0 ? 'Create with AI' : 'Create Roadmap'}
                    </div>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}