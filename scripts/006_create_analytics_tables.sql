-- Create analytics tables for real data integration
-- This script creates tables to replace mock data with actual database-driven analytics

-- Personnel analytics aggregations
CREATE TABLE IF NOT EXISTS public.personnel_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_recorded DATE NOT NULL,
  rank TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  percentage DECIMAL(5,2) DEFAULT 0,
  command TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Specialization analytics
CREATE TABLE IF NOT EXISTS public.specialization_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_recorded DATE NOT NULL,
  specialization TEXT NOT NULL,
  personnel_count INTEGER NOT NULL DEFAULT 0,
  color_code TEXT DEFAULT '#0891b2',
  command TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mission readiness trends
CREATE TABLE IF NOT EXISTS public.mission_readiness_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month_year DATE NOT NULL,
  readiness_percentage DECIMAL(5,2) DEFAULT 0,
  training_completion INTEGER DEFAULT 0,
  command TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Geographical distribution
CREATE TABLE IF NOT EXISTS public.geographical_distribution (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_recorded DATE NOT NULL,
  region TEXT NOT NULL,
  personnel_count INTEGER NOT NULL DEFAULT 0,
  bases_count INTEGER DEFAULT 0,
  command_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skill gap analysis
CREATE TABLE IF NOT EXISTS public.skill_gap_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_recorded DATE NOT NULL,
  skill_name TEXT NOT NULL,
  demand_count INTEGER DEFAULT 0,
  supply_count INTEGER DEFAULT 0,
  gap_count INTEGER DEFAULT 0,
  priority_level TEXT DEFAULT 'Medium',
  command TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Security metrics
CREATE TABLE IF NOT EXISTS public.security_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_recorded DATE NOT NULL,
  metric_type TEXT NOT NULL,
  value INTEGER DEFAULT 0,
  severity_level TEXT DEFAULT 'Low',
  command TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT,
  action TEXT NOT NULL,
  classification TEXT DEFAULT 'Unclassified',
  ip_address TEXT,
  user_agent TEXT,
  status TEXT DEFAULT 'Authorized',
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Threat intelligence table
CREATE TABLE IF NOT EXISTS public.threat_intelligence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  threat_type TEXT NOT NULL,
  severity TEXT DEFAULT 'Low',
  detection_count INTEGER DEFAULT 0,
  blocked_count INTEGER DEFAULT 0,
  trend TEXT DEFAULT 'Stable',
  source TEXT,
  last_detected TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compliance status table
CREATE TABLE IF NOT EXISTS public.compliance_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  framework TEXT NOT NULL,
  compliance_percentage DECIMAL(5,2) DEFAULT 0,
  last_audit_date DATE,
  next_audit_date DATE,
  auditor TEXT,
  findings_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Compliant',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.personnel_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialization_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mission_readiness_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.geographical_distribution ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_gap_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threat_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_status ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (read access for authenticated users)
CREATE POLICY "personnel_analytics_select" ON public.personnel_analytics
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "specialization_analytics_select" ON public.specialization_analytics
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "mission_readiness_trends_select" ON public.mission_readiness_trends
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "geographical_distribution_select" ON public.geographical_distribution
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "skill_gap_analysis_select" ON public.skill_gap_analysis
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "security_metrics_select" ON public.security_metrics
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "audit_logs_select" ON public.audit_logs
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "threat_intelligence_select" ON public.threat_intelligence
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "compliance_status_select" ON public.compliance_status
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_personnel_analytics_date ON public.personnel_analytics(date_recorded);
CREATE INDEX IF NOT EXISTS idx_personnel_analytics_rank ON public.personnel_analytics(rank);
CREATE INDEX IF NOT EXISTS idx_specialization_analytics_date ON public.specialization_analytics(date_recorded);
CREATE INDEX IF NOT EXISTS idx_mission_readiness_date ON public.mission_readiness_trends(month_year);
CREATE INDEX IF NOT EXISTS idx_geographical_date ON public.geographical_distribution(date_recorded);
CREATE INDEX IF NOT EXISTS idx_skill_gap_date ON public.skill_gap_analysis(date_recorded);
CREATE INDEX IF NOT EXISTS idx_security_metrics_date ON public.security_metrics(date_recorded);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON public.audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_threat_intelligence_type ON public.threat_intelligence(threat_type);
CREATE INDEX IF NOT EXISTS idx_compliance_framework ON public.compliance_status(framework);

-- Function to update personnel analytics
CREATE OR REPLACE FUNCTION update_personnel_analytics()
RETURNS void AS $$
BEGIN
  -- Clear existing data for today
  DELETE FROM personnel_analytics
  WHERE date_recorded = CURRENT_DATE;

  -- Insert aggregated data
  INSERT INTO personnel_analytics (date_recorded, rank, count, percentage, command)
  SELECT
    CURRENT_DATE,
    rank,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage,
    command
  FROM profiles
  WHERE mission_ready = true
  GROUP BY rank, command
  ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to update specialization analytics
CREATE OR REPLACE FUNCTION update_specialization_analytics()
RETURNS void AS $$
BEGIN
  -- Clear existing data for today
  DELETE FROM specialization_analytics
  WHERE date_recorded = CURRENT_DATE;

  -- Insert aggregated data
  INSERT INTO specialization_analytics (date_recorded, specialization, personnel_count, color_code, command)
  SELECT
    CURRENT_DATE,
    specialization,
    COUNT(*) as personnel_count,
    CASE
      WHEN specialization = 'Pilot' THEN '#0891b2'
      WHEN specialization = 'Navigator' THEN '#f97316'
      WHEN specialization = 'Air Traffic Control' THEN '#dc2626'
      WHEN specialization = 'Aircraft Maintenance' THEN '#4b5563'
      WHEN specialization = 'Electronics' THEN '#059669'
      WHEN specialization = 'Armament' THEN '#7c3aed'
      WHEN specialization = 'Administration' THEN '#ea580c'
      WHEN specialization = 'Logistics' THEN '#0891b2'
      WHEN specialization = 'Security' THEN '#dc2626'
      ELSE '#6b7280'
    END as color_code,
    command
  FROM profiles
  WHERE mission_ready = true AND specialization IS NOT NULL
  GROUP BY specialization, command
  ORDER BY personnel_count DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to update geographical distribution
CREATE OR REPLACE FUNCTION update_geographical_distribution()
RETURNS void AS $$
BEGIN
  -- Clear existing data for today
  DELETE FROM geographical_distribution
  WHERE date_recorded = CURRENT_DATE;

  -- Insert aggregated data by command
  INSERT INTO geographical_distribution (date_recorded, region, personnel_count, bases_count, command_type)
  SELECT
    CURRENT_DATE,
    command as region,
    COUNT(*) as personnel_count,
    CASE
      WHEN command = 'Western Air Command' THEN 12
      WHEN command = 'Central Air Command' THEN 8
      WHEN command = 'Eastern Air Command' THEN 7
      WHEN command = 'Southern Air Command' THEN 9
      WHEN command = 'South Western Air Command' THEN 6
      WHEN command = 'Training Command' THEN 4
      ELSE 1
    END as bases_count,
    'Air Command' as command_type
  FROM profiles
  WHERE mission_ready = true
  GROUP BY command
  ORDER BY personnel_count DESC;
END;
$$ LANGUAGE plpgsql;
