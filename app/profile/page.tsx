import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProfileManagement } from "@/components/profile-management"

export default async function ProfilePage() {
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

  const { data: trainingRecords, error: trainingError } = await supabase
    .from("training_records")
    .select("*")
    .eq("user_id", data.user.id)
    .order("start_date", { ascending: false })

  const { data: missionAssignments, error: missionError } = await supabase
    .from("mission_assignments")
    .select(`
      *,
      missions (
        mission_name,
        mission_type,
        start_date,
        end_date,
        status,
        priority
      )
    `)
    .eq("user_id", data.user.id)
    .order("assigned_at", { ascending: false })

  // Handle errors gracefully by providing empty arrays as fallbacks
  return (
    <ProfileManagement
      user={data.user}
      profile={profile}
      trainingRecords={trainingRecords || []}
      missionAssignments={missionAssignments || []}
    />
  )
}
