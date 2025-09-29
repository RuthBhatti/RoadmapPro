-- Create profiles table for user information
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  first_name text not null,
  last_name text not null,
  email text not null,
  role text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  
  primary key (id)
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create policies for profile access
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Create function to handle new user profile creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, email, role)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.email,
    new.raw_user_meta_data ->> 'role'
  );
  return new;
end;
$$;

-- Create trigger to automatically create profile when user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create function to update timestamps
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for automatic timestamp updates on profiles
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.update_updated_at_column();