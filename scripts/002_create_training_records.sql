-- Create training records table
create table if not exists public.training_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  training_name text not null,
  training_type text not null,
  start_date date not null,
  end_date date,
  status text not null default 'scheduled',
  completion_score integer,
  instructor text,
  location text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.training_records enable row level security;

-- Create policies for training records
create policy "training_records_select_own"
  on public.training_records for select
  using (auth.uid() = user_id);

create policy "training_records_select_all_authenticated"
  on public.training_records for select
  using (auth.role() = 'authenticated');

create policy "training_records_insert_own"
  on public.training_records for insert
  with check (auth.uid() = user_id);

create policy "training_records_update_own"
  on public.training_records for update
  using (auth.uid() = user_id);

create policy "training_records_delete_own"
  on public.training_records for delete
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists training_records_user_id_idx on public.training_records(user_id);
create index if not exists training_records_status_idx on public.training_records(status);
