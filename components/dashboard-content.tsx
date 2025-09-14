"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import {
  Users,
  Shield,
  TrendingUp,
  AlertTriangle,
  Target,
  Activity,
  UserCheck,
  Clock,
  Award,
  BarChart3,
  LogOut,
  Plane,
} from "@/components/icons/simple-icons"
import { PersonnelAnalytics } from "@/components/personnel-analytics"
import { WorkforceOptimization } from "@/components/workforce-optimization"
import { PredictiveAnalytics } from "@/components/predictive-analytics"
import { SecurityPanel } from "@/components/security-panel"
import { AIQueryInterface } from "@/components/ai-query-interface"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"

interface DashboardContentProps {
  user: User
  profile: any;
  personnelByRank: { rank: string; count: number; percentage: number }[];
  personnelBySpecialization: { name: string; value: number; color: string }[];
  missionReadinessTrend: { month: string; readiness: number; training: number }[];
  geographicalDistribution: { region: string; personnel: number; bases: number }[];
}

export function DashboardContent({
  user,
  profile,
  personnelByRank,
  personnelBySpecialization,
  missionReadinessTrend,
  geographicalDistribution,
}: DashboardContentProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b 4">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-full border border-cyan-400/30">
                  <Plane className="h-6 w-6 text-cyan-400" />
                </div>
                <Shield className="h-6 w-6 text-orange-400" />
                <div>
                  <h1 className="text-xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">
                    IAF Human Management System
                  </h1>
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-dm-sans)]">
                    AI-Powered Personnel Analytics & Optimization
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {profile?.rank || "User"} {profile?.first_name || user.email?.split("@")[0]}{" "}
                  {profile?.last_name || ""}
                </p>
                <p className="text-xs text-muted-foreground">{profile?.service_number || "No Service Number"}</p>
              </div>
              <Badge variant="outline" className="text-green-400 border-green-400/30 bg-green-400/10">
                <Activity className="h-3 w-3 mr-1" />
                Online
              </Badge>
              <Avatar>
                <AvatarFallback className="bg-cyan-600 text-white">
                  {profile?.first_name?.[0] || user.email?.[0]?.toUpperCase() || "U"}
                  {profile?.last_name?.[0] || ""}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-red-400/30 text-red-400 hover:bg-red-400/10 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {!profile && (
          <Card className="bg-yellow-500/10 border-yellow-400/30 mb-6">
            <CardHeader>
              <CardTitle className="text-yellow-400">Profile Setup Required</CardTitle>
              <CardDescription className="text-yellow-200">
                Complete your profile to access all system features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="bg-yellow-600 hover:bg-yellow-700">
                <Link href="/profile">Complete Profile Setup</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-card border-border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Overview
            </TabsTrigger>
            <TabsTrigger value="personnel" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Personnel Analytics
            </TabsTrigger>
            <TabsTrigger value="workforce" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Workforce Optimization
            </TabsTrigger>
            <TabsTrigger value="predictive" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Predictive Analytics
            </TabsTrigger>
            <TabsTrigger value="ai-query" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              AI Query
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Total Personnel</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{personnelByRank.reduce((sum, item) => sum + item.count, 0).toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Active personnel count</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Mission Ready</CardTitle>
                  <Target className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">
                    {missionReadinessTrend.length > 0
                      ? Math.round(missionReadinessTrend[missionReadinessTrend.length - 1].readiness)
                      : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">Based on training completion</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Training Progress</CardTitle>
                  <Award className="h-4 w-4 text-chart-3" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-3">
                    {missionReadinessTrend.length > 0
                      ? Math.round(missionReadinessTrend[missionReadinessTrend.length - 1].training)
                      : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">Completed training sessions</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Active Commands</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{geographicalDistribution.length}</div>
                  <p className="text-xs text-muted-foreground">Geographical commands</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-card border-border shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Activity className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Frequently used operations and system controls
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-gradient-to-br from-cyan-500/10 to-cyan-500/20 border-cyan-400/30 hover:bg-cyan-500/25 transition-all duration-200 text-cyan-300"
                    asChild
                  >
                    <Link href="/data-entry">
                      <UserCheck className="h-6 w-6 text-cyan-400" />
                      <span className="text-cyan-300 font-medium">Add Personnel</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-gradient-to-br from-orange-500/10 to-orange-500/20 border-orange-400/30 hover:bg-orange-500/25 transition-all duration-200 text-orange-300"
                    asChild
                  >
                    <Link href="/profile">
                      <UserCheck className="h-6 w-6 text-cyan-400" />
                      <span className="text-cyan-300 font-medium">My Profile</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-gradient-to-br from-green-500/10 to-green-500/20 border-green-400/30 hover:bg-green-500/25 transition-all duration-200 text-green-300"
                    asChild
                  >
                    <Link href="/generate-report">
                      <BarChart3 className="h-6 w-6 text-orange-400" />
                      <span className="text-orange-300 font-medium">Generate Report</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-gradient-to-br from-blue-500/10 to-blue-500/20 border-blue-400/30 hover:bg-blue-500/25 transition-all duration-200 text-blue-300"
                    asChild
                  >
                    <Link href="/schedule-training">
                      <Clock className="h-6 w-6 text-green-400" />
                      <span className="text-green-300 font-medium">Schedule Training</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-gradient-to-br from-purple-500/10 to-purple-500/20 border-purple-400/30 hover:bg-purple-500/25 transition-all duration-200 text-purple-300"
                    asChild
                  >
                    <Link href="/view-analytics">
                      <TrendingUp className="h-6 w-6 text-blue-400" />
                      <span className="text-blue-300 font-medium">View Analytics</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">System Health</CardTitle>
                  <CardDescription className="text-muted-foreground">Real-time system performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Database Performance</span>
                      <span>98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>AI Model Accuracy</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Security Status</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Recent Activities</CardTitle>
                  <CardDescription className="text-muted-foreground">Latest system operations and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">Personnel data sync completed</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">Training schedule updated</p>
                        <p className="text-xs text-muted-foreground">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-chart-4 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">Security audit completed</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="personnel">
            <PersonnelAnalytics
              personnelByRank={personnelByRank}
              personnelBySpecialization={personnelBySpecialization}
              missionReadinessTrend={missionReadinessTrend}
              geographicalDistribution={geographicalDistribution}
            />
          </TabsContent>

          <TabsContent value="workforce">
            <WorkforceOptimization />
          </TabsContent>

          <TabsContent value="predictive">
            <PredictiveAnalytics />
          </TabsContent>

          <TabsContent value="ai-query">
            <AIQueryInterface />
          </TabsContent>

          <TabsContent value="security">
            <SecurityPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
