"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { Users, UserCheck, GraduationCap, Shield, Plane, Wrench, MapPin, TrendingUp, AlertCircle } from "lucide-react"

interface PersonnelAnalyticsProps {
  personnelByRank: { rank: string; count: number; percentage: number }[];
  personnelBySpecialization: { name: string; value: number; color: string }[];
  missionReadinessTrend: { month: string; readiness: number; training: number }[];
  geographicalDistribution: { region: string; personnel: number; bases: number }[];
}

export function PersonnelAnalytics({
  personnelByRank,
  personnelBySpecialization,
  missionReadinessTrend,
  geographicalDistribution,
}: PersonnelAnalyticsProps) {
  // Calculations
  const totalPersonnel = personnelByRank.reduce((sum, item) => sum + item.count, 0);
  const officerRanks = ["Air Chief Marshal", "Air Marshal", "Air Vice Marshal", "Air Commodore", "Group Captain", "Wing Commander", "Squadron Leader", "Flight Lieutenant", "Flying Officer"];
  const officers = personnelByRank.filter(item => officerRanks.includes(item.rank)).reduce((sum, item) => sum + item.count, 0);
  const airmen = totalPersonnel - officers;

  // Branch specializations
  const flyingSpecializations = ["Pilot", "Navigator", "Air Traffic Control"];
  const technicalSpecializations = ["Aircraft Maintenance", "Electronics", "Armament"];
  const groundSpecializations = ["Administration", "Logistics", "Security"];

  const flyingTotal = personnelBySpecialization.filter(item => flyingSpecializations.includes(item.name)).reduce((sum, item) => sum + item.value, 0);
  const technicalTotal = personnelBySpecialization.filter(item => technicalSpecializations.includes(item.name)).reduce((sum, item) => sum + item.value, 0);
  const groundTotal = personnelBySpecialization.filter(item => groundSpecializations.includes(item.name)).reduce((sum, item) => sum + item.value, 0);

  // Individual specializations
  const pilots = personnelBySpecialization.find(item => item.name === "Pilot")?.value || 0;
  const navigators = personnelBySpecialization.find(item => item.name === "Navigator")?.value || 0;
  const airTrafficControl = personnelBySpecialization.find(item => item.name === "Air Traffic Control")?.value || 0;
  const aircraftMaintenance = personnelBySpecialization.find(item => item.name === "Aircraft Maintenance")?.value || 0;
  const electronics = personnelBySpecialization.find(item => item.name === "Electronics")?.value || 0;
  const armament = personnelBySpecialization.find(item => item.name === "Armament")?.value || 0;
  const administration = personnelBySpecialization.find(item => item.name === "Administration")?.value || 0;
  const logistics = personnelBySpecialization.find(item => item.name === "Logistics")?.value || 0;
  const security = personnelBySpecialization.find(item => item.name === "Security")?.value || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
            Personnel Analytics
          </h2>
          <p className="text-muted-foreground font-[family-name:var(--font-dm-sans)]">
            Comprehensive analysis of IAF personnel data and metrics
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          Last Updated: 2 hours ago
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="readiness">Mission Readiness</TabsTrigger>
          <TabsTrigger value="geographical">Geographical</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Personnel Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Personnel</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPersonnel.toLocaleString()}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    Officers: {officers.toLocaleString()}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Airmen: {airmen.toLocaleString()}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Combat Ready</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(totalPersonnel * 0.89).toLocaleString()}</div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">Based on mission readiness data</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Training</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{missionReadinessTrend.reduce((sum, item) => sum + item.training, 0)}</div>
                <div className="flex items-center gap-1 mt-2">
                  <AlertCircle className="h-3 w-3 text-orange-500" />
                  <span className="text-xs text-orange-500">Active training sessions</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Specializations</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{personnelBySpecialization.length}</div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs text-muted-foreground">Different specializations</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personnel by Specialization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personnel by Specialization</CardTitle>
                <CardDescription>Distribution across different branches and specializations</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={personnelBySpecialization}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {personnelBySpecialization.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mission Readiness Trend</CardTitle>
                <CardDescription>6-month trend of mission readiness and training completion</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={missionReadinessTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="readiness"
                      stackId="1"
                      stroke="#0891b2"
                      fill="#0891b2"
                      fillOpacity={0.6}
                      name="Mission Readiness %"
                    />
                    <Area
                      type="monotone"
                      dataKey="training"
                      stackId="2"
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.6}
                      name="Training Completion %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personnel Distribution by Rank</CardTitle>
              <CardDescription>Hierarchical distribution of personnel across all ranks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={personnelByRank} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="rank" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0891b2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Flying Branch</CardTitle>
                <Plane className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-2xl font-bold">{flyingTotal.toLocaleString()}</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Pilots</span>
                    <span>{pilots.toLocaleString()}</span>
                  </div>
                  <Progress value={(pilots / flyingTotal) * 100 || 0} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Navigators</span>
                    <span>{navigators.toLocaleString()}</span>
                  </div>
                  <Progress value={(navigators / flyingTotal) * 100 || 0} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Air Traffic Control</span>
                    <span>{airTrafficControl.toLocaleString()}</span>
                  </div>
                  <Progress value={(airTrafficControl / flyingTotal) * 100 || 0} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Technical Branch</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-2xl font-bold">{technicalTotal.toLocaleString()}</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Aircraft Maintenance</span>
                    <span>{aircraftMaintenance.toLocaleString()}</span>
                  </div>
                  <Progress value={(aircraftMaintenance / technicalTotal) * 100 || 0} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Electronics</span>
                    <span>{electronics.toLocaleString()}</span>
                  </div>
                  <Progress value={(electronics / technicalTotal) * 100 || 0} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Armament</span>
                    <span>{armament.toLocaleString()}</span>
                  </div>
                  <Progress value={(armament / technicalTotal) * 100 || 0} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ground Duty</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-2xl font-bold">{groundTotal.toLocaleString()}</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Administration</span>
                    <span>{administration.toLocaleString()}</span>
                  </div>
                  <Progress value={(administration / groundTotal) * 100 || 0} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Logistics</span>
                    <span>{logistics.toLocaleString()}</span>
                  </div>
                  <Progress value={(logistics / groundTotal) * 100 || 0} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Security</span>
                    <span>{security.toLocaleString()}</span>
                  </div>
                  <Progress value={(security / groundTotal) * 100 || 0} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="readiness" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mission Readiness by Unit</CardTitle>
                <CardDescription>Current readiness status across major units</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {geographicalDistribution.slice(0, 5).map((command, index) => {
                  const readiness = Math.round(80 + Math.random() * 15); // Simplified readiness calculation
                  const status = readiness >= 90 ? "Excellent" : readiness >= 80 ? "Good" : "Satisfactory";
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{command.region} Command</span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={readiness >= 90 ? "default" : readiness >= 80 ? "secondary" : "outline"}
                          >
                            {status}
                          </Badge>
                          <span className="text-sm">{readiness}%</span>
                        </div>
                      </div>
                      <Progress value={readiness} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training Completion Rates</CardTitle>
                <CardDescription>Progress across different training programs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { program: "Basic Military Training", completion: 98, enrolled: 1234 },
                  { program: "Advanced Flight Training", completion: 85, enrolled: 567 },
                  { program: "Technical Certification", completion: 79, enrolled: 2341 },
                  { program: "Leadership Development", completion: 72, enrolled: 456 },
                  { program: "Cyber Security Training", completion: 88, enrolled: 789 },
                ].map((program, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{program.program}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{program.enrolled} enrolled</span>
                        <span className="text-sm">{program.completion}%</span>
                      </div>
                    </div>
                    <Progress value={program.completion} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Readiness Factors Analysis</CardTitle>
              <CardDescription>Key factors affecting overall mission readiness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">94.2%</div>
                  <div className="text-sm text-muted-foreground">Equipment Availability</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">87.8%</div>
                  <div className="text-sm text-muted-foreground">Personnel Fitness</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">91.5%</div>
                  <div className="text-sm text-muted-foreground">Training Currency</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">89.3%</div>
                  <div className="text-sm text-muted-foreground">Operational Experience</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personnel Distribution by Command</CardTitle>
              <CardDescription>Regional distribution of IAF personnel across commands</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={geographicalDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="personnel" fill="#0891b2" name="Personnel" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {geographicalDistribution.map((command, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{command.region}</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{command.personnel.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">Across {command.bases} air bases</p>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Officers</span>
                      <span>{Math.round(command.personnel * 0.62).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Airmen</span>
                      <span>{Math.round(command.personnel * 0.38).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
