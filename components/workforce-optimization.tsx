"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  ArrowRight,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function WorkforceOptimization() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [selectedUnit, setSelectedUnit] = useState("all")
  const [skillGapAnalysis, setSkillGapAnalysis] = useState<{ skill: string; demand: number; supply: number; gap: number; priority: string }[]>([])
  const [workforceEfficiency, setWorkforceEfficiency] = useState<{ unit: string; efficiency: number; utilization: number; satisfaction: number }[]>([])
  const [optimizationRecommendations, setOptimizationRecommendations] = useState<{ id: number; type: string; priority: string; title: string; description: string; impact: string; timeline: string; resources: string; status: string }[]>([])
  const [deploymentOptimization, setDeploymentOptimization] = useState<{ base: string; current: number; optimal: number; variance: number; status: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkforceData = async () => {
      const supabase = createClient()

      // Fetch skill gap analysis data
      const { data: skillGapData } = await supabase
        .from('skill_gap_analysis')
        .select('*')
        .eq('date_recorded', new Date().toISOString().split('T')[0])
        .order('gap_count', { ascending: false });

      const skillGaps = skillGapData && skillGapData.length > 0 ? skillGapData.map(item => ({
        skill: item.skill_name,
        demand: item.demand_count,
        supply: item.supply_count,
        gap: item.gap_count,
        priority: item.priority_level
      })) : [
        { skill: "Cyber Security", demand: 240, supply: 120, gap: 120, priority: "Critical" },
        { skill: "AI/ML Engineering", demand: 195, supply: 85, gap: 110, priority: "Critical" },
        { skill: "Drone Operations", demand: 175, supply: 95, gap: 80, priority: "High" },
        { skill: "Data Analytics", demand: 200, supply: 110, gap: 90, priority: "High" },
        { skill: "Advanced Avionics", demand: 210, supply: 130, gap: 80, priority: "High" },
        { skill: "Aircraft Maintenance", demand: 650, supply: 650, gap: 0, priority: "Medium" },
        { skill: "Pilot Training", demand: 850, supply: 850, gap: 0, priority: "Medium" },
        { skill: "Logistics", demand: 290, supply: 320, gap: -30, priority: "Surplus" }
      ];
      setSkillGapAnalysis(skillGaps);

      // Fetch workforce efficiency data (this would need a new table)
      const efficiency = [
        { unit: "Western Air Command", efficiency: 89, utilization: 87, satisfaction: 91 },
        { unit: "Central Air Command", efficiency: 85, utilization: 82, satisfaction: 88 },
        { unit: "Eastern Air Command", efficiency: 87, utilization: 85, satisfaction: 89 },
        { unit: "Southern Air Command", efficiency: 91, utilization: 89, satisfaction: 93 },
        { unit: "South Western Air Command", efficiency: 86, utilization: 84, satisfaction: 87 },
        { unit: "Training Command", efficiency: 88, utilization: 86, satisfaction: 90 }
      ];
      setWorkforceEfficiency(efficiency);

      // Fetch deployment optimization data (this would need a new table)
      const deployment = [
        { base: "Ambala Air Base", current: 1200, optimal: 1100, variance: 100, status: "Slightly Under" },
        { base: "Jodhpur Air Base", current: 950, optimal: 950, variance: 0, status: "Optimal" },
        { base: "Gwalior Air Base", current: 1100, optimal: 1200, variance: -100, status: "Overstaffed" },
        { base: "Kalaikunda Air Base", current: 800, optimal: 950, variance: -150, status: "Understaffed" },
        { base: "Tezpur Air Base", current: 750, optimal: 800, variance: -50, status: "Slightly Under" },
        { base: "Pune Air Base", current: 1300, optimal: 1250, variance: 50, status: "Slightly Over" }
      ];
      setDeploymentOptimization(deployment);

      // Fetch optimization recommendations (this would need a new table)
      const recommendations = [
        {
          id: 1,
          type: "Skill Development",
          priority: "Critical",
          title: "Cyber Security Training Program",
          description: "Implement intensive cyber security training for personnel to address critical skill gap",
          impact: "High",
          timeline: "3-6 months",
          resources: "₹2.5 Cr",
          status: "Pending Approval",
        },
        {
          id: 2,
          type: "Reallocation",
          priority: "High",
          title: "Personnel Redistribution",
          description: "Reallocate personnel to high-demand roles based on current data",
          impact: "Medium",
          timeline: "1-2 months",
          resources: "₹50 L",
          status: "In Progress",
        },
        {
          id: 3,
          type: "Cross-Training",
          priority: "Medium",
          title: "Multi-Skill Development Initiative",
          description: "Cross-train personnel in emerging technologies",
          impact: "Medium",
          timeline: "6-12 months",
          resources: "₹1.8 Cr",
          status: "Planning",
        },
      ];
      setOptimizationRecommendations(recommendations);

      setLoading(false);
    };

    fetchWorkforceData();
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
            Workforce Optimization
          </h2>
          <p className="text-muted-foreground font-[family-name:var(--font-dm-sans)]">
            AI-driven insights for optimal personnel allocation and skill development
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Analysis
          </Button>
        </div>
      </div>

      <Tabs defaultValue="skills" className="space-y-6">
        <TabsList>
          <TabsTrigger value="skills">Skill Gap Analysis</TabsTrigger>
          <TabsTrigger value="efficiency">Workforce Efficiency</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="deployment">Deployment Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-6">
          {/* Skill Gap Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Skill Gaps</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">8</div>
                <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Training Programs</CardTitle>
                <Target className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Active skill development programs</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Optimization Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.3%</div>
                <p className="text-xs text-muted-foreground">+5.2% from last quarter</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Personnel in Training</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,456</div>
                <p className="text-xs text-muted-foreground">Across all skill programs</p>
              </CardContent>
            </Card>
          </div>

          {/* Skill Gap Analysis Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Skill Gap Analysis</CardTitle>
              <CardDescription>Current demand vs supply analysis for critical skills</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={skillGapAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="demand" fill="#0891b2" name="Demand" />
                  <Bar dataKey="supply" fill="#f97316" name="Current Supply" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Skill Gap Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Skill Gap Assessment</CardTitle>
              <CardDescription>Priority-based skill gap analysis with actionable insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillGapAnalysis.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{skill.skill}</h4>
                        <Badge
                          variant={
                            skill.priority === "Critical"
                              ? "destructive"
                              : skill.priority === "High"
                                ? "default"
                                : skill.priority === "Surplus"
                                  ? "secondary"
                                  : "outline"
                          }
                        >
                          {skill.priority}
                        </Badge>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Demand: </span>
                          <span className="font-medium">{skill.demand}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Supply: </span>
                          <span className="font-medium">{skill.supply}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Gap: </span>
                          <span className={`font-medium ${skill.gap > 0 ? "text-destructive" : "text-green-500"}`}>
                            {skill.gap > 0 ? "+" : ""}
                            {skill.gap}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workforce Efficiency Metrics</CardTitle>
              <CardDescription>Multi-dimensional analysis of workforce performance across units</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={workforceEfficiency}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="unit" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Efficiency" dataKey="efficiency" stroke="#0891b2" fill="#0891b2" fillOpacity={0.3} />
                  <Radar name="Utilization" dataKey="utilization" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
                  <Radar name="Satisfaction" dataKey="satisfaction" stroke="#dc2626" fill="#dc2626" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Unit Performance Comparison</CardTitle>
                <CardDescription>Efficiency metrics across different units</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {workforceEfficiency.map((unit, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{unit.unit}</span>
                      <Badge variant="outline">{unit.efficiency}% Efficient</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Efficiency</span>
                        <span>{unit.efficiency}%</span>
                      </div>
                      <Progress value={unit.efficiency} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Utilization</span>
                        <span>{unit.utilization}%</span>
                      </div>
                      <Progress value={unit.utilization} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Satisfaction</span>
                        <span>{unit.satisfaction}%</span>
                      </div>
                      <Progress value={unit.satisfaction} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Opportunities</CardTitle>
                <CardDescription>AI-identified areas for improvement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <h4 className="font-medium text-destructive">Critical: Training Command D</h4>
                    <p className="text-sm text-muted-foreground">
                      Low utilization rate (78%) suggests resource underutilization. Recommend workload redistribution.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-orange-500/10 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-500">Medium: Transport Wing B</h4>
                    <p className="text-sm text-muted-foreground">
                      High utilization (92%) but lower satisfaction (85%). Consider workload balancing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-500">Excellent: Fighter Squadron A</h4>
                    <p className="text-sm text-muted-foreground">
                      Optimal balance across all metrics. Use as benchmark for other units.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">AI-Generated Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Machine learning-powered suggestions for workforce optimization
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {optimizationRecommendations.map((rec) => (
              <Card key={rec.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          rec.priority === "Critical"
                            ? "destructive"
                            : rec.priority === "High"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {rec.priority}
                      </Badge>
                      <Badge variant="outline">{rec.type}</Badge>
                      <Badge
                        variant={
                          rec.status === "Pending Approval"
                            ? "outline"
                            : rec.status === "In Progress"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {rec.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">{rec.status === "Pending Approval" ? "Approve" : "Update"}</Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Impact: </span>
                      <span className="font-medium">{rec.impact}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Timeline: </span>
                      <span className="font-medium">{rec.timeline}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Resources: </span>
                      <span className="font-medium">{rec.resources}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ROI: </span>
                      <span className="font-medium text-green-500">+23%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Implementation Roadmap</CardTitle>
              <CardDescription>Suggested timeline for implementing optimization recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-destructive rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Phase 1: Critical Skills (0-3 months)</span>
                      <span className="text-sm text-muted-foreground">₹3.0 Cr</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Address cyber security and AI/ML skill gaps through intensive training programs
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Phase 2: Reallocation (3-6 months)</span>
                      <span className="text-sm text-muted-foreground">₹1.2 Cr</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Redistribute personnel and optimize deployment across units
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-accent rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Phase 3: Long-term Development (6-12 months)</span>
                      <span className="text-sm text-muted-foreground">₹2.5 Cr</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Implement cross-training and advanced skill development programs
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Optimization Analysis</CardTitle>
              <CardDescription>Current vs optimal personnel distribution across air bases</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deploymentOptimization}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="base" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="current" fill="#0891b2" name="Current Personnel" />
                  <Bar dataKey="optimal" fill="#f97316" name="Optimal Personnel" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Base-wise Analysis</CardTitle>
                <CardDescription>Detailed staffing analysis for each air base</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {deploymentOptimization.map((base, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{base.base}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Current: {base.current}</span>
                        <span>Optimal: {base.optimal}</span>
                        <span
                          className={`font-medium ${
                            base.variance > 0
                              ? "text-destructive"
                              : base.variance < 0
                                ? "text-orange-500"
                                : "text-green-500"
                          }`}
                        >
                          {base.variance > 0 ? "+" : ""}
                          {base.variance}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        base.status === "Understaffed"
                          ? "destructive"
                          : base.status === "Overstaffed" || base.status === "Slightly Over"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {base.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Actions</CardTitle>
                <CardDescription>Recommended personnel movements for optimal deployment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg">
                  <Zap className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Transfer 140 personnel</h4>
                    <p className="text-sm text-muted-foreground">From Gwalior to Ambala Air Base</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        Timeline: 2-3 weeks
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Cost: ₹45 L
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                  <Target className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium">Recruit 150 personnel</h4>
                    <p className="text-sm text-muted-foreground">For Kalaikunda Air Base specialization</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        Timeline: 3-4 months
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Cost: ₹1.2 Cr
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Maintain current levels</h4>
                    <p className="text-sm text-muted-foreground">Jodhpur Air Base is optimally staffed</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        Status: Optimal
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
