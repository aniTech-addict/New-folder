-- Enable Row Level Security on all tables for proper data protection
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mission_assignments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles table
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON profiles FOR DELETE USING (auth.uid() = id);

-- Create RLS policies for training_records table
CREATE POLICY "training_records_select_own" ON training_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "training_records_insert_own" ON training_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "training_records_update_own" ON training_records FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "training_records_delete_own" ON training_records FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for missions table (commanders can manage their missions)
CREATE POLICY "missions_select_commander" ON missions FOR SELECT USING (auth.uid() = commander_id);
CREATE POLICY "missions_insert_commander" ON missions FOR INSERT WITH CHECK (auth.uid() = commander_id);
CREATE POLICY "missions_update_commander" ON missions FOR UPDATE USING (auth.uid() = commander_id);
CREATE POLICY "missions_delete_commander" ON missions FOR DELETE USING (auth.uid() = commander_id);

-- Create RLS policies for mission_assignments table
CREATE POLICY "mission_assignments_select_own" ON mission_assignments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "mission_assignments_insert_commander" ON mission_assignments FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT commander_id FROM missions WHERE id = mission_id)
);
CREATE POLICY "mission_assignments_update_commander" ON mission_assignments FOR UPDATE USING (
  auth.uid() IN (SELECT commander_id FROM missions WHERE id = mission_id)
);
CREATE POLICY "mission_assignments_delete_commander" ON mission_assignments FOR DELETE USING (
  auth.uid() IN (SELECT commander_id FROM missions WHERE id = mission_id)
);
