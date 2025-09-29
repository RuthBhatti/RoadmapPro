import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TeamMember {
  name: string;
  email: string;
  skills: string[];
  role: string;
  load_factor: number;
}

interface TaskRequest {
  roadmapId: string;
  projectTitle: string;
  projectDescription: string;
  teamMembers: TeamMember[];
  timeline?: string;
  priority?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting Gemini task generation...');
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not found in environment variables');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { roadmapId, projectTitle, projectDescription, teamMembers, timeline, priority }: TaskRequest = await req.json();
    
    console.log(`Generating tasks for roadmap: ${roadmapId}`);
    console.log(`Project: ${projectTitle}`);
    console.log(`Team members: ${teamMembers.length}`);

    // Create detailed prompt for Gemini
    const teamSkillsInfo = teamMembers.map(member => 
      `- ${member.name} (${member.role}): Skills: [${member.skills.join(', ')}], Load Factor: ${member.load_factor}`
    ).join('\n');

    const prompt = `
You are an expert project manager and task planner. Analyze the following project and create a comprehensive task breakdown with intelligent assignments.

PROJECT DETAILS:
Title: ${projectTitle}
Description: ${projectDescription}
Timeline: ${timeline || 'Not specified'}
Priority: ${priority || 'Medium'}

TEAM MEMBERS:
${teamSkillsInfo}

REQUIREMENTS:
1. Break down the project into 8-15 specific, actionable tasks
2. Consider task dependencies and logical sequencing
3. Assign tasks to team members based on their skills and load factors
4. Estimate realistic hours for each task (consider complexity and team member experience)
5. Set appropriate priorities (high, medium, low)
6. Identify which tasks can run in parallel vs sequential

Return a JSON response with this exact structure:
{
  "tasks": [
    {
      "title": "Task title",
      "description": "Detailed task description",
      "assignee_email": "team_member@email.com",
      "estimated_hours": 8,
      "priority": "high|medium|low",
      "skills_required": ["skill1", "skill2"],
      "depends_on_title": "Previous task title or null",
      "order_index": 1,
      "reasoning": "Why this task is assigned to this person"
    }
  ],
  "project_insights": {
    "total_estimated_hours": 120,
    "critical_path_tasks": ["Task 1", "Task 2"],
    "parallel_opportunities": ["Task 3", "Task 4"],
    "risks": ["Potential bottleneck in Task 5"],
    "recommendations": ["Consider additional resources for Task 6"]
  }
}

Be thorough but practical. Focus on real-world implementation and consider the team's skill distribution.
`;

    // Call Gemini API
    console.log('Calling Gemini API...');
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096,
        }
      })
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${geminiResponse.status} - ${errorText}`);
    }

    const geminiData = await geminiResponse.json();
    console.log('Gemini response received');

    const generatedContent = geminiData.candidates[0].content.parts[0].text;
    console.log('Generated content:', generatedContent);

    // Parse the JSON response from Gemini
    let aiResponse;
    try {
      // Extract JSON from the response (in case there's markdown formatting)
      const jsonMatch = generatedContent.match(/```json\n?(.*?)\n?```/s) || generatedContent.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : generatedContent;
      aiResponse = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      throw new Error('Failed to parse AI response as JSON');
    }

    // Get team member IDs from database
    const teamMemberEmails = teamMembers.map(tm => tm.email);
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email')
      .in('email', teamMemberEmails);

    if (profilesError) {
      console.error('Error fetching team member profiles:', profilesError);
      throw new Error('Failed to fetch team member profiles');
    }

    const emailToIdMap = new Map(profiles?.map(p => [p.email, p.id]) || []);

    // Create tasks in database
    const tasksToInsert = [];
    const taskTitleToIdMap = new Map();

    // First pass: create tasks without dependencies
    for (let i = 0; i < aiResponse.tasks.length; i++) {
      const task = aiResponse.tasks[i];
      const taskId = crypto.randomUUID();
      taskTitleToIdMap.set(task.title, taskId);
      
      tasksToInsert.push({
        id: taskId,
        roadmap_id: roadmapId,
        title: task.title,
        description: task.description || '',
        assignee_id: emailToIdMap.get(task.assignee_email) || null,
        estimate_hours: task.estimated_hours,
        priority: task.priority,
        order_idx: task.order_index || i,
        status: 'todo',
        ai_generated: true,
        generated_at: new Date().toISOString(),
        depends_on: null // Will be set in second pass
      });
    }

    // Insert tasks first
    const { data: insertedTasks, error: tasksError } = await supabase
      .from('tasks')
      .insert(tasksToInsert)
      .select();

    if (tasksError) {
      console.error('Error inserting tasks:', tasksError);
      throw new Error('Failed to insert tasks into database');
    }

    // Second pass: update dependencies
    for (const task of aiResponse.tasks) {
      if (task.depends_on_title && taskTitleToIdMap.has(task.depends_on_title)) {
        const taskId = taskTitleToIdMap.get(task.title);
        const dependsOnId = taskTitleToIdMap.get(task.depends_on_title);
        
        await supabase
          .from('tasks')
          .update({ depends_on: dependsOnId })
          .eq('id', taskId);
      }
    }

    console.log(`Successfully created ${tasksToInsert.length} tasks`);

    return new Response(JSON.stringify({
      success: true,
      tasks_created: tasksToInsert.length,
      project_insights: aiResponse.project_insights,
      message: 'AI-powered roadmap tasks generated successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-roadmap-tasks function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: 'Check the function logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});