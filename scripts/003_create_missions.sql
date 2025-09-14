-- Create missions table
create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  mission_name text not null,
  mission_type text not null,
  description text,
  start_date timestamp with time zone not null,
  end_date timestamp with time zone,
  status text not null default 'planned',
  priority text not null default 'medium',
  location text,
  commander_id uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create mission assignments table
create table if not exists public.mission_assignments (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  role text not null,
  assigned_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(mission_id, user_id)
);

-- Enable RLS
alter table public.missions enable row level security;
alter table public.mission_assignments enable row level security;

-- Create policies for missions (viewable by all authenticated users)
create policy "missions_select_authenticated"
  on public.missions for select
  using (auth.role() = 'authenticated');

create policy "missions_insert_authenticated"
  on public.missions for insert
  with check (auth.role() = 'authenticated');

create policy "missions_update_authenticated"
  on public.missions for update
  using (auth.role() = 'authenticated');

-- Create policies for mission assignments
create policy "mission_assignments_select_own"
  on public.mission_assignments for select
  using (auth.uid() = user_id);

create policy "mission_assignments_insert_authenticated"
  on public.mission_assignments for insert
  with check (auth.role() = 'authenticated');

create policy "mission_assignments_update_authenticated"
  on public.mission_assignments for update
  using (auth.role() = 'authenticated');

-- Create indexes
create index if not exists missions_status_idx on public.missions(status);
create index if not exists missions_start_date_idx on public.missions(start_date);
create index if not exists mission_assignments_mission_id_idx on public.mission_assignments(mission_id);
create index if not exists mission_assignments_user_id_idx on public.mission_assignments(user_id);
