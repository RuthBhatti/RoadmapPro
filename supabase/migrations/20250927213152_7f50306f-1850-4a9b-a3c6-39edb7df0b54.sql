-- Fix foreign key constraints to allow cascade deletion

-- First, drop the existing foreign key constraints that are causing the issue
ALTER TABLE public.roadmaps DROP CONSTRAINT IF EXISTS roadmaps_owner_fkey;
ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS tasks_roadmap_id_fkey;
ALTER TABLE public.roadmap_members DROP CONSTRAINT IF EXISTS roadmap_members_roadmap_id_fkey;
ALTER TABLE public.roadmap_members DROP CONSTRAINT IF EXISTS roadmap_members_user_id_fkey;

-- Recreate the foreign key constraints with CASCADE DELETE
ALTER TABLE public.roadmaps 
ADD CONSTRAINT roadmaps_owner_fkey 
FOREIGN KEY (owner) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.tasks 
ADD CONSTRAINT tasks_roadmap_id_fkey 
FOREIGN KEY (roadmap_id) REFERENCES public.roadmaps(id) ON DELETE CASCADE;

ALTER TABLE public.roadmap_members 
ADD CONSTRAINT roadmap_members_roadmap_id_fkey 
FOREIGN KEY (roadmap_id) REFERENCES public.roadmaps(id) ON DELETE CASCADE;

ALTER TABLE public.roadmap_members 
ADD CONSTRAINT roadmap_members_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;