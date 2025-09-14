-- Update RLS policies to allow authenticated users to read all profiles and training records for analytics
-- This script should be run in your Supabase SQL editor

-- Drop existing restrictive policies for profiles
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;

-- Create new policy allowing authenticated users to read all profiles
CREATE POLICY "profiles_select_all_authenticated"
  ON profiles FOR SELECT
  USING (auth.role() = 'authenticated');

-- Keep the other policies for write operations (own profile only)
-- profiles_insert_own, profiles_update_own, profiles_delete_own remain unchanged

-- Drop existing restrictive policies for training_records
DROP POLICY IF EXISTS "training_records_select_own" ON training_records;

-- Create new policy allowing authenticated users to read all training records
CREATE POLICY "training_records_select_all_authenticated"
  ON training_records FOR SELECT
  USING (auth.role() = 'authenticated');

-- Keep the other policies for write operations (own records only)
-- training_records_insert_own, training_records_update_own, training_records_delete_own remain unchanged
