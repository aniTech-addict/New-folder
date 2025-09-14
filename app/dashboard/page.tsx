import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardContent } from "@/components/dashboard-content"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", data.user.id)
    .single()

  // Fetch real data from database
  const { data: personnelByRankData } = await supabase
    .from('personnel_analytics')
    .select('*')
    .eq('date_recorded', new Date().toISOString().split('T')[0])
    .order('rank');

  const { data: personnelBySpecializationData } = await supabase
    .from('specialization_analytics')
    .select('*')
    .eq('date_recorded', new Date().toISOString().split('T')[0]);

  const { data: missionReadinessTrendData } = await supabase
    .from('mission_readiness_trends')
    .select('*')
    .order('month_year', { ascending: false })
    .limit(6);

  const { data: geographicalDistributionData } = await supabase
    .from('geographical_distribution')
    .select('*')
    .eq('date_recorded', new Date().toISOString().split('T')[0]);

  // Format data for components (fallback to mock data if no real data exists)
  const personnelByRank = personnelByRankData && personnelByRankData.length > 0 ? personnelByRankData.map(item => ({
    rank: item.rank,
    count: item.count,
    percentage: item.percentage
  })) : [
    { rank: "Air Chief Marshal", count: 1, percentage: 0.05 },
    { rank: "Air Marshal", count: 3, percentage: 0.15 },
    { rank: "Air Vice Marshal", count: 8, percentage: 0.4 },
    { rank: "Air Commodore", count: 15, percentage: 0.75 },
    { rank: "Group Captain", count: 45, percentage: 2.25 },
    { rank: "Wing Commander", count: 120, percentage: 6 },
    { rank: "Squadron Leader", count: 280, percentage: 14 },
    { rank: "Flight Lieutenant", count: 420, percentage: 21 },
    { rank: "Flying Officer", count: 350, percentage: 17.5 },
    { rank: "Master Warrant Officer", count: 180, percentage: 9 },
    { rank: "Warrant Officer", count: 250, percentage: 12.5 },
    { rank: "Sergeant", count: 380, percentage: 19 },
    { rank: "Corporal", count: 450, percentage: 22.5 },
    { rank: "Leading Aircraftman", count: 520, percentage: 26 },
    { rank: "Aircraftman", count: 580, percentage: 29 }
  ];

  const personnelBySpecialization = personnelBySpecializationData && personnelBySpecializationData.length > 0 ? personnelBySpecializationData.map(item => ({
    name: item.specialization,
    value: item.personnel_count,
    color: item.color_code || "#0891b2"
  })) : [
    { name: "Pilot", value: 850, color: "#0891b2" },
    { name: "Navigator", value: 120, color: "#f97316" },
    { name: "Air Traffic Control", value: 180, color: "#dc2626" },
    { name: "Aircraft Maintenance", value: 650, color: "#4b5563" },
    { name: "Electronics", value: 420, color: "#059669" },
    { name: "Armament", value: 280, color: "#7c3aed" },
    { name: "Administration", value: 350, color: "#ea580c" },
    { name: "Logistics", value: 290, color: "#0891b2" },
    { name: "Security", value: 180, color: "#dc2626" }
  ];

  const missionReadinessTrend = missionReadinessTrendData && missionReadinessTrendData.length > 0 ? missionReadinessTrendData.reverse().map(item => ({
    month: new Date(item.month_year).toLocaleDateString('en-US', { month: 'short' }),
    readiness: item.readiness_percentage,
    training: item.training_completion
  })) : [
    { month: "Jan", readiness: 87.5, training: 1250 },
    { month: "Feb", readiness: 89.2, training: 1320 },
    { month: "Mar", readiness: 91.8, training: 1450 },
    { month: "Apr", readiness: 90.3, training: 1380 },
    { month: "May", readiness: 92.7, training: 1520 },
    { month: "Jun", readiness: 94.1, training: 23}
  ];

  const geographicalDistribution = geographicalDistributionData && geographicalDistributionData.length > 0 ? geographicalDistributionData.map(item => ({
    region: item.region,
    personnel: item.personnel_count,
    bases: item.bases_count
  })) : [
    { region: "Western Air Command", personnel: 4500, bases: 12 },
    { region: "Central Air Command", personnel: 3200, bases: 8 },
    { region: "Eastern Air Command", personnel: 2800, bases: 7 },
    { region: "Southern Air Command", personnel: 3600, bases: 9 },
    { region: "South Western Air Command", personnel: 2900, bases: 6 },
    { region: "Training Command", personnel: 1800, bases: 4 }
  ];


  return (
    <DashboardContent
      user={data.user}
      profile={profile}
      personnelByRank={personnelByRank}
      personnelBySpecialization={personnelBySpecialization}
      missionReadinessTrend={missionReadinessTrend}
      geographicalDistribution={geographicalDistribution}
    />
  )
}
