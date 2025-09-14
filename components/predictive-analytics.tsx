"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  BarChart,
  Bar,
  ComposedChart,
} from "recharts"
import { TrendingUp, Brain, Target, Users, Eye, Settings, Play } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function PredictiveAnalytics() {
  const [selectedModel, setSelectedModel] = useState("attrition")
  const [confidenceThreshold, setConfidenceThreshold] = useState([80])
  const [timeHorizon, setTimeHorizon] = useState("12months")
  const [attritionPrediction, setAttritionPrediction] = useState<{ month: string; predicted: number; actual: number | null; confidence: number }[]>([])
  const [careerProgression, setCareerProgression] = useState<{ rank: string; promotionRate: number; avgTime: number; predictedNext: number }[]>([])
  const [trainingDemand, setTrainingDemand] = useState<{ skill: string; current: number; predicted6m: number; predicted1y: number; growth: number }[]>([])
  const [missionReadinessForecast, setMissionReadinessForecast] = useState<{ month: string; overall: number; flying: number; technical: number; ground: number }[]>([])
  const [riskFactors, setRiskFactors] = useState<{ category: string; risk: string; probability: number; impact: string; timeline: string; mitigation: string }[]>([])
  const [scenarioModeling, setScenarioModeling] = useState<{ scenario: string; readiness: number; cost: number; timeline: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use mock data instead of fetching from database
    const attritionData = [
      { month: "Jan 2024", predicted: 2.1, actual: 1.8, confidence: 87 },
      { month: "Feb 2024", predicted: 2.3, actual: 2.1, confidence: 89 },
      { month: "Mar 2024", predicted: 2.8, actual: 2.5, confidence: 91 },
      { month: "Apr 2024", predicted: 2.4, actual: 2.2, confidence: 88 },
      { month: "May 2024", predicted: 2.9, actual: 2.7, confidence: 92 },
      { month: "Jun 2024", predicted: 2.6, actual: null, confidence: 85 }
    ];
    setAttritionPrediction(attritionData);

    const progression = [
      { rank: "Flight Lieutenant", promotionRate: 72, avgTime: 4, predictedNext: 78 },
      { rank: "Squadron Leader", promotionRate: 65, avgTime: 5, predictedNext: 71 },
      { rank: "Wing Commander", promotionRate: 58, avgTime: 6, predictedNext: 64 },
      { rank: "Group Captain", promotionRate: 45, avgTime: 7, predictedNext: 52 },
      { rank: "Air Commodore", promotionRate: 35, avgTime: 8, predictedNext: 41 }
    ];
    setCareerProgression(progression);

    const demand = [
      { skill: "Cyber Security", current: 120, predicted6m: 180, predicted1y: 240, growth: 100 },
      { skill: "AI/ML Engineering", current: 85, predicted6m: 140, predicted1y: 195, growth: 129 },
      { skill: "Drone Operations", current: 95, predicted6m: 135, predicted1y: 175, growth: 84 },
      { skill: "Data Analytics", current: 110, predicted6m: 155, predicted1y: 200, growth: 82 },
      { skill: "Advanced Avionics", current: 130, predicted6m: 170, predicted1y: 210, growth: 62 }
    ];
    setTrainingDemand(demand);

    const readiness = [
      { month: "Current", overall: 89.2, flying: 91.5, technical: 87.8, ground: 88.9 },
      { month: "1M", overall: 90.1, flying: 92.2, technical: 88.5, ground: 89.6 },
      { month: "3M", overall: 91.8, flying: 93.1, technical: 90.2, ground: 91.1 },
      { month: "6M", overall: 93.2, flying: 94.5, technical: 91.8, ground: 92.3 },
      { month: "12M", overall: 94.7, flying: 95.8, technical: 93.4, ground: 94.1 },
    ];
    setMissionReadinessForecast(readiness);

    const risks = [
      {
        category: "Personnel",
        risk: "High Attrition in Cyber Security",
        probability: 78,
        impact: "High",
        timeline: "3-6 months",
        mitigation: "Retention bonuses, career development",
      },
      {
        category: "Training",
        risk: "Insufficient AI/ML Instructors",
        probability: 65,
        impact: "Medium",
        timeline: "6-12 months",
        mitigation: "External partnerships, upskilling",
      },
      {
        category: "Operations",
        risk: "Equipment Modernization Gap",
        probability: 82,
        impact: "High",
        timeline: "12-18 months",
        mitigation: "Accelerated procurement, training",
      },
      {
        category: "Leadership",
        risk: "Leadership Pipeline Shortage",
        probability: 45,
        impact: "Medium",
        timeline: "18-24 months",
        mitigation: "Leadership development programs",
      },
    ];
    setRiskFactors(risks);

    const scenarios = [
      { scenario: "Current Trajectory", readiness: 89.2, cost: 100, timeline: "Baseline" },
      { scenario: "Accelerated Training", readiness: 94.5, cost: 135, timeline: "6 months faster" },
      { scenario: "Budget Constraints", readiness: 85.7, cost: 75, timeline: "12 months slower" },
      { scenario: "Technology Focus", readiness: 92.8, cost: 120, timeline: "3 months faster" },
    ];
    setScenarioModeling(scenarios);

    setLoading(false);
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
            Predictive Analytics
          </h2>
          <p className="text-muted-foreground font-[family-name:var(--font-dm-sans)]">
            AI-powered forecasting and scenario modeling for strategic planning
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <Badge variant="outline">ML Models Active</Badge>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure Models
          </Button>
        </div>
      </div>

      <Tabs defaultValue="forecasting" className="space-y-6">
        <TabsList>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="career">Career Progression</TabsTrigger>
          <TabsTrigger value="training">Training Demand</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Modeling</TabsTrigger>
          <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="forecasting" className="space-y-6">
          {/* Model Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Prediction Controls</CardTitle>
              <CardDescription>Configure predictive models and analysis parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Prediction Model</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="attrition">Attrition Prediction</SelectItem>
                      <SelectItem value="readiness">Mission Readiness</SelectItem>
                      <SelectItem value="performance">Performance Trends</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Time Horizon</Label>
                  <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="12months">12 Months</SelectItem>
                      <SelectItem value="24months">24 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Confidence Threshold: {confidenceThreshold[0]}%</Label>
                  <Slider
                    value={confidenceThreshold}
                    onValueChange={setConfidenceThreshold}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Predictions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Predicted Attrition</CardTitle>
                <TrendingUp className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">2.9%</div>
                <div className="flex items-center gap-1 mt-2">
                  <Badge variant="outline" className="text-xs">
                    85% Confidence
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Next 6 months</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mission Readiness</CardTitle>
                <Target className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">94.7%</div>
                <div className="flex items-center gap-1 mt-2">
                  <Badge variant="outline" className="text-xs">
                    92% Confidence
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">12 months forecast</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Training Demand</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">+67%</div>
                <div className="flex items-center gap-1 mt-2">
                  <Badge variant="outline" className="text-xs">
                    88% Confidence
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Cyber security skills</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leadership Pipeline</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">847</div>
                <div className="flex items-center gap-1 mt-2">
                  <Badge variant="outline" className="text-xs">
                    91% Confidence
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Ready for promotion</p>
              </CardContent>
            </Card>
          </div>

          {/* Attrition Prediction Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Attrition Prediction Model</CardTitle>
              <CardDescription>Historical vs predicted attrition rates with confidence intervals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={attritionPrediction}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="predicted"
                    stroke="#0891b2"
                    fill="#0891b2"
                    fillOpacity={0.3}
                    name="Predicted Attrition %"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="actual"
                    stroke="#dc2626"
                    strokeWidth={2}
                    name="Actual Attrition %"
                  />
                  <Bar yAxisId="right" dataKey="confidence" fill="#f97316" fillOpacity={0.6} name="Confidence %" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Mission Readiness Forecast */}
          <Card>
            <CardHeader>
              <CardTitle>Mission Readiness Forecast</CardTitle>
              <CardDescription>Predicted readiness levels across different branches</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={missionReadinessForecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="overall" stroke="#0891b2" strokeWidth={3} name="Overall" />
                  <Line type="monotone" dataKey="flying" stroke="#f97316" strokeWidth={2} name="Flying Branch" />
                  <Line type="monotone" dataKey="technical" stroke="#dc2626" strokeWidth={2} name="Technical" />
                  <Line type="monotone" dataKey="ground" stroke="#4b5563" strokeWidth={2} name="Ground Duty" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="career" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Career Progression Predictions</CardTitle>
              <CardDescription>AI-powered analysis of promotion patterns and career trajectories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={careerProgression}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rank" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="promotionRate" fill="#0891b2" name="Current Rate %" />
                  <Bar dataKey="predictedNext" fill="#f97316" name="Predicted Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Promotion Timeline Analysis</CardTitle>
                <CardDescription>Average time to promotion by rank</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {careerProgression.map((rank, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{rank.rank}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{rank.avgTime} years avg</Badge>
                        <span className="text-sm">{rank.promotionRate}%</span>
                      </div>
                    </div>
                    <Progress value={rank.promotionRate} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Current: {rank.promotionRate}%</span>
                      <span>Predicted: {rank.predictedNext}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leadership Pipeline Forecast</CardTitle>
                <CardDescription>Predicted leadership availability over time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">234</div>
                    <div className="text-sm text-muted-foreground">Ready for Wing Commander</div>
                    <Badge variant="outline" className="mt-2">
                      Next 12 months
                    </Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">89</div>
                    <div className="text-sm text-muted-foreground">Ready for Group Captain</div>
                    <Badge variant="outline" className="mt-2">
                      Next 18 months
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Leadership Development Programs</span>
                    <Badge variant="secondary">156 enrolled</Badge>
                  </div>
                  <Progress value={78} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Succession Planning Coverage</span>
                    <Badge variant="secondary">89% complete</Badge>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Training Demand Forecasting</CardTitle>
              <CardDescription>
                Predicted training requirements based on operational needs and technology trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={trainingDemand}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="current" fill="#4b5563" name="Current Demand" />
                  <Bar dataKey="predicted6m" fill="#0891b2" name="6 Month Forecast" />
                  <Bar dataKey="predicted1y" fill="#f97316" name="12 Month Forecast" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>High-Growth Skills</CardTitle>
                <CardDescription>Skills with highest predicted demand growth</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {trainingDemand
                  .sort((a, b) => b.growth - a.growth)
                  .slice(0, 3)
                  .map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{skill.skill}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Current: {skill.current}</span>
                          <span>12M: {skill.predicted1y}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive">+{skill.growth}%</Badge>
                        <div className="text-xs text-muted-foreground mt-1">Growth rate</div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training Capacity Planning</CardTitle>
                <CardDescription>Resource requirements for predicted training demand</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-xl font-bold">1,247</div>
                    <div className="text-sm text-muted-foreground">Additional Trainees</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-xl font-bold">89</div>
                    <div className="text-sm text-muted-foreground">New Instructors Needed</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Training Infrastructure</span>
                    <span className="text-sm font-medium">67% Capacity</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Instructor Availability</span>
                    <span className="text-sm font-medium">82% Capacity</span>
                  </div>
                  <Progress value={82} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Equipment Readiness</span>
                    <span className="text-sm font-medium">91% Ready</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Modeling</CardTitle>
              <CardDescription>What-if analysis for different strategic approaches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {scenarioModeling.map((scenario, index) => (
                  <Card key={index} className="relative">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{scenario.scenario}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{scenario.readiness}%</div>
                        <div className="text-xs text-muted-foreground">Mission Readiness</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Cost Impact</span>
                          <span className={scenario.cost > 100 ? "text-destructive" : "text-green-500"}>
                            {scenario.cost}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Timeline</span>
                          <span className="text-muted-foreground">{scenario.timeline}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Play className="h-3 w-3 mr-2" />
                        Run Simulation
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Scenario Comparison</CardTitle>
                <CardDescription>Impact analysis across different scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={scenarioModeling}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="scenario" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="readiness" fill="#0891b2" name="Readiness %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sensitivity Analysis</CardTitle>
                <CardDescription>Key factors affecting scenario outcomes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Budget Allocation</span>
                    <Badge variant="destructive">High Impact</Badge>
                  </div>
                  <Progress value={92} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Training Capacity</span>
                    <Badge variant="default">Medium Impact</Badge>
                  </div>
                  <Progress value={76} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Technology Adoption</span>
                    <Badge variant="secondary">Low Impact</Badge>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Matrix</CardTitle>
              <CardDescription>AI-identified risks with probability and impact analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.map((risk, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{risk.category}</Badge>
                          <Badge
                            variant={
                              risk.probability > 70 ? "destructive" : risk.probability > 50 ? "default" : "secondary"
                            }
                          >
                            {risk.probability}% Probability
                          </Badge>
                          <Badge variant={risk.impact === "High" ? "destructive" : "secondary"}>
                            {risk.impact} Impact
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-2" />
                          Details
                        </Button>
                      </div>
                      <CardTitle className="text-lg">{risk.risk}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Timeline</div>
                          <div className="font-medium">{risk.timeline}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Mitigation Strategy</div>
                          <div className="font-medium">{risk.mitigation}</div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Risk Level</span>
                          <span>{risk.probability}%</span>
                        </div>
                        <Progress value={risk.probability} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Mitigation Timeline</CardTitle>
                <CardDescription>Recommended actions and timelines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-destructive rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Immediate (0-3 months)</span>
                      <Badge variant="destructive">2 Critical</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Address high-probability, high-impact risks</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Short-term (3-12 months)</span>
                      <Badge variant="default">3 Medium</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Implement preventive measures and monitoring</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-secondary rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Long-term (12+ months)</span>
                      <Badge variant="secondary">2 Low</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Strategic planning and capability development</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Monitoring Dashboard</CardTitle>
                <CardDescription>Real-time risk indicators and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-xl font-bold text-destructive">7</div>
                    <div className="text-sm text-muted-foreground">Active Risks</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-xl font-bold text-green-500">12</div>
                    <div className="text-sm text-muted-foreground">Mitigated</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Risk Score</span>
                    <Badge variant="default">Medium</Badge>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mitigation Progress</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
