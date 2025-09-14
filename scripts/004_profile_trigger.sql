-- Create function to handle new user profile creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id, 
    service_number, 
    rank, 
    first_name, 
    last_name,
    specialization,
    unit,
    command
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'service_number', 'TEMP-' || substr(new.id::text, 1, 8)),
    coalesce(new.raw_user_meta_data ->> 'rank', 'Airman'),
    coalesce(new.raw_user_meta_data ->> 'first_name', 'Unknown'),
    coalesce(new.raw_user_meta_data ->> 'last_name', 'User'),
    coalesce(new.raw_user_meta_data ->> 'specialization', 'General'),
    coalesce(new.raw_user_meta_data ->> 'unit', 'Unassigned'),
    coalesce(new.raw_user_meta_data ->> 'command', 'Central Air Command')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create trigger for new user profile creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
