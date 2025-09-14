-- Populate analytics tables with sample data
-- This script inserts sample data into the analytics tables to demonstrate real data integration

-- Insert personnel analytics data
INSERT INTO public.personnel_analytics (date_recorded, rank, count, percentage, command) VALUES
(CURRENT_DATE, 'Air Chief Marshal', 1, 0.05, 'Western Air Command'),
(CURRENT_DATE, 'Air Marshal', 3, 0.15, 'Western Air Command'),
(CURRENT_DATE, 'Air Vice Marshal', 8, 0.4, 'Central Air Command'),
(CURRENT_DATE, 'Air Commodore', 15, 0.75, 'Eastern Air Command'),
(CURRENT_DATE, 'Group Captain', 45, 2.25, 'Southern Air Command'),
(CURRENT_DATE, 'Wing Commander', 120, 6, 'Western Air Command'),
(CURRENT_DATE, 'Squadron Leader', 280, 14, 'Central Air Command'),
(CURRENT_DATE, 'Flight Lieutenant', 420, 21, 'Eastern Air Command'),
(CURRENT_DATE, 'Flying Officer', 350, 17.5, 'Southern Air Command'),
(CURRENT_DATE, 'Master Warrant Officer', 180, 9, 'Western Air Command'),
(CURRENT_DATE, 'Warrant Officer', 250, 12.5, 'Central Air Command'),
(CURRENT_DATE, 'Sergeant', 380, 19, 'Eastern Air Command'),
(CURRENT_DATE, 'Corporal', 450, 22.5, 'Southern Air Command'),
(CURRENT_DATE, 'Leading Aircraftman', 520, 26, 'Western Air Command'),
(CURRENT_DATE, 'Aircraftman', 580, 29, 'Central Air Command');

-- Insert specialization analytics data
INSERT INTO public.specialization_analytics (date_recorded, specialization, personnel_count, color_code, command) VALUES
(CURRENT_DATE, 'Pilot', 850, '#0891b2', 'Western Air Command'),
(CURRENT_DATE, 'Navigator', 120, '#f97316', 'Central Air Command'),
(CURRENT_DATE, 'Air Traffic Control', 180, '#dc2626', 'Eastern Air Command'),
(CURRENT_DATE, 'Aircraft Maintenance', 650, '#4b5563', 'Southern Air Command'),
(CURRENT_DATE, 'Electronics', 420, '#059669', 'Western Air Command'),
(CURRENT_DATE, 'Armament', 280, '#7c3aed', 'Central Air Command'),
(CURRENT_DATE, 'Administration', 350, '#ea580c', 'Eastern Air Command'),
(CURRENT_DATE, 'Logistics', 290, '#0891b2', 'Southern Air Command'),
(CURRENT_DATE, 'Security', 180, '#dc2626', 'Western Air Command');

-- Insert mission readiness trends data
INSERT INTO public.mission_readiness_trends (month_year, readiness_percentage, training_completion, command) VALUES
(CURRENT_DATE - INTERVAL '5 months', 87.5, 1250, 'Western Air Command'),
(CURRENT_DATE - INTERVAL '4 months', 89.2, 1320, 'Central Air Command'),
(CURRENT_DATE - INTERVAL '3 months', 91.8, 1450, 'Eastern Air Command'),
(CURRENT_DATE - INTERVAL '2 months', 90.3, 1380, 'Southern Air Command'),
(CURRENT_DATE - INTERVAL '1 month', 92.7, 1520, 'Western Air Command'),
(CURRENT_DATE, 94.1, 23, 'Central Air Command');

-- Insert geographical distribution data
INSERT INTO public.geographical_distribution (date_recorded, region, personnel_count, bases_count, command_type) VALUES
(CURRENT_DATE, 'Western Air Command', 4500, 12, 'Air Command'),
(CURRENT_DATE, 'Central Air Command', 3200, 8, 'Air Command'),
(CURRENT_DATE, 'Eastern Air Command', 2800, 7, 'Air Command'),
(CURRENT_DATE, 'Southern Air Command', 3600, 9, 'Air Command'),
(CURRENT_DATE, 'South Western Air Command', 2900, 6, 'Air Command'),
(CURRENT_DATE, 'Training Command', 1800, 4, 'Air Command');

-- Insert skill gap analysis data
INSERT INTO public.skill_gap_analysis (date_recorded, skill_name, demand_count, supply_count, gap_count, priority_level, command) VALUES
(CURRENT_DATE, 'Cyber Security', 240, 120, 120, 'Critical', 'Western Air Command'),
(CURRENT_DATE, 'AI/ML Engineering', 195, 85, 110, 'Critical', 'Central Air Command'),
(CURRENT_DATE, 'Drone Operations', 175, 95, 80, 'High', 'Eastern Air Command'),
(CURRENT_DATE, 'Data Analytics', 200, 110, 90, 'High', 'Southern Air Command'),
(CURRENT_DATE, 'Advanced Avionics', 210, 130, 80, 'High', 'Western Air Command'),
(CURRENT_DATE, 'Aircraft Maintenance', 650, 650, 0, 'Medium', 'Central Air Command'),
(CURRENT_DATE, 'Pilot Training', 850, 850, 0, 'Medium', 'Eastern Air Command'),
(CURRENT_DATE, 'Logistics', 290, 320, -30, 'Surplus', 'Southern Air Command');

-- Insert security metrics data
INSERT INTO public.security_metrics (date_recorded, metric_type, value, severity_level, command) VALUES
(CURRENT_DATE, 'Security Incidents', 12, 'Medium', 'Western Air Command'),
(CURRENT_DATE, 'Resolved Incidents', 11, 'Low', 'Central Air Command'),
(CURRENT_DATE, 'Threats Detected', 8, 'High', 'Eastern Air Command'),
(CURRENT_DATE, 'Active Sessions', 1247, 'Low', 'Southern Air Command'),
(CURRENT_DATE, 'Threats Blocked', 34, 'Medium', 'Western Air Command');

-- Insert audit logs data
INSERT INTO public.audit_logs (user_name, action, classification, ip_address, status) VALUES
('Air Marshal Sharma', 'Accessed Personnel Records', 'Secret', '10.45.67.100', 'Authorized'),
('Group Captain Patel', 'Modified Training Schedule', 'Confidential', '10.45.67.101', 'Authorized'),
('Wing Commander Singh', 'Downloaded Mission Report', 'Secret', '10.45.67.102', 'Flagged'),
('Squadron Leader Kumar', 'Updated Security Protocols', 'Top Secret', '10.45.67.103', 'Authorized');

-- Insert threat intelligence data
INSERT INTO public.threat_intelligence (threat_type, severity, detection_count, blocked_count, trend, source) VALUES
('Phishing Attempts', 'Medium', 23, 23, 'Stable', 'Email Gateway'),
('Malware Detection', 'High', 8, 7, 'Increasing', 'Endpoint Protection'),
('Unauthorized Access', 'Critical', 2, 2, 'Decreasing', 'Network IDS'),
('Data Exfiltration', 'High', 1, 1, 'Stable', 'DLP System');

-- Insert compliance status data
INSERT INTO public.compliance_status (framework, compliance_percentage, last_audit_date, next_audit_date, status) VALUES
('ISO 27001', 98, CURRENT_DATE - INTERVAL '3 months', CURRENT_DATE + INTERVAL '3 months', 'Compliant'),
('NIST Cybersecurity', 95, CURRENT_DATE - INTERVAL '2 months', CURRENT_DATE + INTERVAL '4 months', 'Compliant'),
('Defense Security Standards', 100, CURRENT_DATE - INTERVAL '4 months', CURRENT_DATE + INTERVAL '2 months', 'Compliant'),
('Data Protection Act', 97, CURRENT_DATE - INTERVAL '1 month', CURRENT_DATE + INTERVAL '5 months', 'Compliant');

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to all analytics tables
CREATE TRIGGER update_personnel_analytics_updated_at
    BEFORE UPDATE ON public.personnel_analytics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_specialization_analytics_updated_at
    BEFORE UPDATE ON public.specialization_analytics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mission_readiness_trends_updated_at
    BEFORE UPDATE ON public.mission_readiness_trends
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_geographical_distribution_updated_at
    BEFORE UPDATE ON public.geographical_distribution
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skill_gap_analysis_updated_at
    BEFORE UPDATE ON public.skill_gap_analysis
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_security_metrics_updated_at
    BEFORE UPDATE ON public.security_metrics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_threat_intelligence_updated_at
    BEFORE UPDATE ON public.threat_intelligence
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_status_updated_at
    BEFORE UPDATE ON public.compliance_status
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
