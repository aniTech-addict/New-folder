-- Create profiles table for IAF personnel
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  service_number text unique not null,
  rank text not null,
  first_name text not null,
  last_name text not null,
  specialization text,
  unit text,
  command text,
  base_location text,
  phone text,
  emergency_contact text,
  date_of_birth date,
  date_of_joining date,
  security_clearance text,
  mission_ready boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies for profiles
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_select_all_authenticated"
  on public.profiles for select
  using (auth.role() = 'authenticated');

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);

-- Create index for service number lookups
create index if not exists profiles_service_number_idx on public.profiles(service_number);
create index if not exists profiles_rank_idx on public.profiles(rank);
create index if not exists profiles_unit_idx on public.profiles(unit);
