-- Fix function search path mutable issue - drop trigger first, then function
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- Recreate function with proper search_path
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
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

-- Recreate trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Also fix the update_updated_at_column function
drop trigger if exists update_profiles_updated_at on public.profiles;
drop function if exists public.update_updated_at_column();

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Recreate trigger
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.update_updated_at_column();