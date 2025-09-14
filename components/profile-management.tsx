"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Shield, Plane, Award, Target, Calendar, MapPin, Mail, Edit, Save, X, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface ProfileManagementProps {
  user: SupabaseUser
  profile: any
  trainingRecords: any[]
  missionAssignments: any[]
}

export function ProfileManagement({ user, profile, trainingRecords, missionAssignments }: ProfileManagementProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    rank: profile?.rank || "",
    specialization: profile?.specialization || "",
    unit: profile?.unit || "",
    command: profile?.command || "",
    base_location: profile?.base_location || "",
    phone: profile?.phone || "",
    emergency_contact: profile?.emergency_contact || "",
    security_clearance: profile?.security_clearance || "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSave = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("profiles").update(formData).eq("user_id", user.id)

      if (error) throw error

      setIsEditing(false)
      router.refresh()
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      rank: profile?.rank || "",
      specialization: profile?.specialization || "",
      unit: profile?.unit || "",
      command: profile?.command || "",
      base_location: profile?.base_location || "",
      phone: profile?.phone || "",
      emergency_contact: profile?.emergency_contact || "",
      security_clearance: profile?.security_clearance || "",
    })
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-400/30"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-400/30"
      case "scheduled":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
      case "active":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-400/30"
      case "planned":
        return "bg-purple-500/20 text-purple-400 border-purple-400/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-400/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      case "medium":
        return "bg-orange-500/20 text-orange-400 border-orange-400/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-400/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-400/30"
    }
  }

  return (
    <div className="min-h-screen c from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-full border border-cyan-400/30">
                  <User className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Profile Management</h1>
                  <p className="text-sm text-cyan-200">Manage your personnel information</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="bg-cyan-600 text-white text-2xl">
                    {profile?.first_name?.[0]}
                    {profile?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">
                  {profile?.rank} {profile?.first_name} {profile?.last_name}
                </CardTitle>
                <CardDescription className="text-slate-300">{profile?.service_number}</CardDescription>
                <div className="flex justify-center mt-4">
                  <Badge
                    className={
                      profile?.mission_ready
                        ? "bg-green-500/20 text-green-400 border-green-400/30"
                        : "bg-red-500/20 text-red-400 border-red-400/30"
                    }
                  >
                    {profile?.mission_ready ? "Mission Ready" : "Not Mission Ready"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <Shield className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm">{profile?.specialization}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Plane className="h-4 w-4 text-orange-400" />
                  <span className="text-sm">{profile?.unit}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="h-4 w-4 text-green-400" />
                  <span className="text-sm">{profile?.command}</span>
                </div>
                {profile?.base_location && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">{profile?.base_location}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">{user.email}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
                >
                  Personal Info
                </TabsTrigger>
                <TabsTrigger
                  value="training"
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
                >
                  Training Records
                </TabsTrigger>
                <TabsTrigger
                  value="missions"
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
                >
                  Mission History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Personal Information</CardTitle>
                    <CardDescription className="text-slate-300">
                      Manage your personal and service details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-200">First Name</Label>
                        {isEditing ? (
                          <Input
                            value={formData.first_name}
                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        ) : (
                          <p className="text-slate-300 p-2">{profile?.first_name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-200">Last Name</Label>
                        {isEditing ? (
                          <Input
                            value={formData.last_name}
                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        ) : (
                          <p className="text-slate-300 p-2">{profile?.last_name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-200">Rank</Label>
                        {isEditing ? (
                          <Select
                            value={formData.rank}
                            onValueChange={(value) => setFormData({ ...formData, rank: value })}
                          >
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              <SelectItem value="Air Chief Marshal">Air Chief Marshal</SelectItem>
                              <SelectItem value="Air Marshal">Air Marshal</SelectItem>
                              <SelectItem value="Air Vice Marshal">Air Vice Marshal</SelectItem>
                              <SelectItem value="Air Commodore">Air Commodore</SelectItem>
                              <SelectItem value="Group Captain">Group Captain</SelectItem>
                              <SelectItem value="Wing Commander">Wing Commander</SelectItem>
                              <SelectItem value="Squadron Leader">Squadron Leader</SelectItem>
                              <SelectItem value="Flight Lieutenant">Flight Lieutenant</SelectItem>
                              <SelectItem value="Flying Officer">Flying Officer</SelectItem>
                              <SelectItem value="Pilot Officer">Pilot Officer</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-slate-300 p-2">{profile?.rank}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-200">Specialization</Label>
                        {isEditing ? (
                          <Select
                            value={formData.specialization}
                            onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                          >
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              <SelectItem value="Fighter Pilot">Fighter Pilot</SelectItem>
                              <SelectItem value="Transport Pilot">Transport Pilot</SelectItem>
                              <SelectItem value="Helicopter Pilot">Helicopter Pilot</SelectItem>
                              <SelectItem value="Air Traffic Control">Air Traffic Control</SelectItem>
                              <SelectItem value="Radar Operations">Radar Operations</SelectItem>
                              <SelectItem value="Aircraft Maintenance">Aircraft Maintenance</SelectItem>
                              <SelectItem value="Intelligence">Intelligence</SelectItem>
                              <SelectItem value="Logistics">Logistics</SelectItem>
                              <SelectItem value="Medical">Medical</SelectItem>
                              <SelectItem value="Administration">Administration</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-slate-300 p-2">{profile?.specialization}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-200">Unit</Label>
                        {isEditing ? (
                          <Input
                            value={formData.unit}
                            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        ) : (
                          <p className="text-slate-300 p-2">{profile?.unit}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-200">Command</Label>
                        {isEditing ? (
                          <Select
                            value={formData.command}
                            onValueChange={(value) => setFormData({ ...formData, command: value })}
                          >
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              <SelectItem value="Central Air Command">Central Air Command</SelectItem>
                              <SelectItem value="Western Air Command">Western Air Command</SelectItem>
                              <SelectItem value="Eastern Air Command">Eastern Air Command</SelectItem>
                              <SelectItem value="Southern Air Command">Southern Air Command</SelectItem>
                              <SelectItem value="South Western Air Command">South Western Air Command</SelectItem>
                              <SelectItem value="Training Command">Training Command</SelectItem>
                              <SelectItem value="Maintenance Command">Maintenance Command</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-slate-300 p-2">{profile?.command}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-200">Base Location</Label>
                        {isEditing ? (
                          <Input
                            value={formData.base_location}
                            onChange={(e) => setFormData({ ...formData, base_location: e.target.value })}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        ) : (
                          <p className="text-slate-300 p-2">{profile?.base_location || "Not specified"}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-200">Phone</Label>
                        {isEditing ? (
                          <Input
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        ) : (
                          <p className="text-slate-300 p-2">{profile?.phone || "Not specified"}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-200">Emergency Contact</Label>
                        {isEditing ? (
                          <Input
                            value={formData.emergency_contact}
                            onChange={(e) => setFormData({ ...formData, emergency_contact: e.target.value })}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        ) : (
                          <p className="text-slate-300 p-2">{profile?.emergency_contact || "Not specified"}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-200">Security Clearance</Label>
                        {isEditing ? (
                          <Select
                            value={formData.security_clearance}
                            onValueChange={(value) => setFormData({ ...formData, security_clearance: value })}
                          >
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              <SelectItem value="Confidential">Confidential</SelectItem>
                              <SelectItem value="Secret">Secret</SelectItem>
                              <SelectItem value="Top Secret">Top Secret</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-slate-300 p-2">{profile?.security_clearance || "Not specified"}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="training">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Training Records</CardTitle>
                    <CardDescription className="text-slate-300">Your training history and progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {trainingRecords.length > 0 ? (
                      <div className="space-y-4">
                        {trainingRecords.map((record) => (
                          <div key={record.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2">
                                <h4 className="font-semibold text-white">{record.training_name}</h4>
                                <p className="text-sm text-slate-300">{record.training_type}</p>
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(record.start_date).toLocaleDateString()}
                                  </span>
                                  {record.end_date && <span>to {new Date(record.end_date).toLocaleDateString()}</span>}
                                  {record.instructor && <span>Instructor: {record.instructor}</span>}
                                </div>
                                {record.notes && <p className="text-sm text-slate-400">{record.notes}</p>}
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                                {record.completion_score && (
                                  <span className="text-sm text-slate-300">Score: {record.completion_score}%</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Award className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                        <p className="text-slate-400">No training records found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="missions">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Mission History</CardTitle>
                    <CardDescription className="text-slate-300">Your mission assignments and roles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {missionAssignments.length > 0 ? (
                      <div className="space-y-4">
                        {missionAssignments.map((assignment) => (
                          <div key={assignment.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2">
                                <h4 className="font-semibold text-white">{assignment.missions.mission_name}</h4>
                                <p className="text-sm text-slate-300">{assignment.missions.mission_type}</p>
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(assignment.missions.start_date).toLocaleDateString()}
                                  </span>
                                  {assignment.missions.end_date && (
                                    <span>to {new Date(assignment.missions.end_date).toLocaleDateString()}</span>
                                  )}
                                  <span>Role: {assignment.role}</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge className={getStatusColor(assignment.missions.status)}>
                                  {assignment.missions.status}
                                </Badge>
                                <Badge className={getPriorityColor(assignment.missions.priority)}>
                                  {assignment.missions.priority} Priority
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Target className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                        <p className="text-slate-400">No mission assignments found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
