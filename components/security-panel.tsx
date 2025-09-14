"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Users,
  Key,
  Activity,
  Clock,
  FileText,
  Settings,
  Fingerprint,
  Smartphone,
  Globe,
  Database,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function SecurityPanel() {
  const [mfaEnabled, setMfaEnabled] = useState(true)
  const [encryptionEnabled, setEncryptionEnabled] = useState(true)
  const [auditingEnabled, setAuditingEnabled] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState("30days")
  const [securityMetrics, setSecurityMetrics] = useState<{ month: string; incidents: number; resolved: number; threats: number }[]>([])
  const [accessLevels, setAccessLevels] = useState<{ level: string; users: number; color: string }[]>([])
  const [auditLogs, setAuditLogs] = useState<{ id: number; user: string; action: string; classification: string; timestamp: string; status: string; ip: string }[]>([])
  const [threatIntelligence, setThreatIntelligence] = useState<{ threat: string; severity: string; count: number; blocked: number; trend: string }[]>([])
  const [complianceStatus, setComplianceStatus] = useState<{ framework: string; compliance: number; lastAudit: string; nextAudit: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSecurityData = async () => {
      const supabase = createClient()

      // Fetch access levels data (aggregated from profiles)
      const { data: accessLevelData } = await supabase
        .from('profiles')
        .select('rank')
        .eq('mission_ready', true);

      const rankCounts: { [key: string]: number } = {};
      accessLevelData?.forEach(profile => {
        rankCounts[profile.rank] = (rankCounts[profile.rank] || 0) + 1;
      });

      const levels = Object.entries(rankCounts).map(([rank, count]) => ({
        level: rank,
        users: count,
        color: getRankColor(rank)
      }));
      setAccessLevels(levels.length > 0 ? levels : [
        { level: "Air Chief Marshal", users: 1, color: "#dc2626" },
        { level: "Air Marshal", users: 3, color: "#dc2626" },
        { level: "Air Vice Marshal", users: 8, color: "#f97316" },
        { level: "Air Commodore", users: 15, color: "#f97316" },
        { level: "Group Captain", users: 45, color: "#0891b2" },
        { level: "Wing Commander", users: 120, color: "#0891b2" },
        { level: "Squadron Leader", users: 280, color: "#0891b2" },
        { level: "Flight Lieutenant", users: 420, color: "#4b5563" },
        { level: "Flying Officer", users: 350, color: "#4b5563" }
      ]);

      // Fetch security metrics (this would need a security_metrics table)
      const metrics = [
        { month: "Jan", incidents: 12, resolved: 11, threats: 8 },
        { month: "Feb", incidents: 8, resolved: 8, threats: 6 },
        { month: "Mar", incidents: 15, resolved: 14, threats: 12 },
        { month: "Apr", incidents: 6, resolved: 6, threats: 4 },
        { month: "May", incidents: 9, resolved: 9, threats: 7 },
        { month: "Jun", incidents: 11, resolved: 10, threats: 9 }
      ];
      setSecurityMetrics(metrics);

      // Fetch audit logs (this would need an audit_logs table)
      const logs = [
        {
          id: 1,
          user: "Air Marshal Sharma",
          action: "Accessed Personnel Records",
          classification: "Secret",
          timestamp: new Date(Date.now() - 0 * 3600000).toISOString().slice(0, 19).replace('T', ' '),
          status: "Authorized",
          ip: "10.45.67.100"
        },
        {
          id: 2,
          user: "Group Captain Patel",
          action: "Modified Training Schedule",
          classification: "Confidential",
          timestamp: new Date(Date.now() - 1 * 3600000).toISOString().slice(0, 19).replace('T', ' '),
          status: "Authorized",
          ip: "10.45.67.101"
        },
        {
          id: 3,
          user: "Wing Commander Singh",
          action: "Downloaded Mission Report",
          classification: "Secret",
          timestamp: new Date(Date.now() - 2 * 3600000).toISOString().slice(0, 19).replace('T', ' '),
          status: "Flagged",
          ip: "10.45.67.102"
        },
        {
          id: 4,
          user: "Squadron Leader Kumar",
          action: "Updated Security Protocols",
          classification: "Top Secret",
          timestamp: new Date(Date.now() - 3 * 3600000).toISOString().slice(0, 19).replace('T', ' '),
          status: "Authorized",
          ip: "10.45.67.103"
        }
      ];
      setAuditLogs(logs);

      // Fetch threat intelligence (this would need a threat_intelligence table)
      const threats = [
        {
          threat: "Phishing Attempts",
          severity: "Medium",
          count: 23,
          blocked: 23,
          trend: "Stable",
        },
        {
          threat: "Malware Detection",
          severity: "High",
          count: 8,
          blocked: 7,
          trend: "Increasing",
        },
        {
          threat: "Unauthorized Access",
          severity: "Critical",
          count: 2,
          blocked: 2,
          trend: "Decreasing",
        },
        {
          threat: "Data Exfiltration",
          severity: "High",
          count: 1,
          blocked: 1,
          trend: "Stable",
        },
      ];
      setThreatIntelligence(threats);

      // Fetch compliance status (this would need a compliance_status table)
      const compliance = [
        { framework: "ISO 27001", compliance: 98, lastAudit: "2024-03-15", nextAudit: "2024-09-15" },
        { framework: "NIST Cybersecurity", compliance: 95, lastAudit: "2024-02-20", nextAudit: "2024-08-20" },
        { framework: "Defense Security Standards", compliance: 100, lastAudit: "2024-04-10", nextAudit: "2024-10-10" },
        { framework: "Data Protection Act", compliance: 97, lastAudit: "2024-01-25", nextAudit: "2024-07-25" },
      ];
      setComplianceStatus(compliance);

      setLoading(false);
    };

    fetchSecurityData();
  }, [])

  // Helper function to assign colors based on rank
  const getRankColor = (rank: string) => {
    const rankColors: { [key: string]: string } = {
      "Air Chief Marshal": "#dc2626",
      "Air Marshal": "#dc2626",
      "Air Vice Marshal": "#f97316",
      "Air Commodore": "#f97316",
      "Group Captain": "#0891b2",
      "Wing Commander": "#0891b2",
      "Squadron Leader": "#0891b2",
      "Flight Lieutenant": "#4b5563",
      "Flying Officer": "#4b5563"
    };
    return rankColors[rank] || "#4b5563";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
            Security & Compliance
          </h2>
          <p className="text-muted-foreground font-[family-name:var(--font-dm-sans)]">
            Military-grade security monitoring and access control management
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="default" className="bg-green-500">
            <Shield className="h-3 w-3 mr-1" />
            Security Level: Maximum
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Security Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Security Overview</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="threats">Threat Intelligence</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Security Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                <Shield className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">98.7%</div>
                <p className="text-xs text-muted-foreground">Excellent security posture</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <Activity className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">Authenticated users online</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34</div>
                <p className="text-xs text-muted-foreground">In the last 24 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">100%</div>
                <p className="text-xs text-muted-foreground">All frameworks compliant</p>
              </CardContent>
            </Card>
          </div>

          {/* Security Metrics Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Security Incidents & Threat Detection</CardTitle>
              <CardDescription>Monthly security metrics and threat intelligence</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={securityMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="incidents"
                    stroke="#dc2626"
                    strokeWidth={2}
                    name="Security Incidents"
                  />
                  <Line type="monotone" dataKey="resolved" stroke="#16a34a" strokeWidth={2} name="Resolved" />
                  <Line type="monotone" dataKey="threats" stroke="#f97316" strokeWidth={2} name="Threats Detected" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Security Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Controls Status</CardTitle>
                <CardDescription>Current status of critical security measures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Fingerprint className="h-4 w-4" />
                    <span>Multi-Factor Authentication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={mfaEnabled} onCheckedChange={setMfaEnabled} />
                    <Badge variant={mfaEnabled ? "default" : "destructive"}>
                      {mfaEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="h-4 w-4" />
                    <span>End-to-End Encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={encryptionEnabled} onCheckedChange={setEncryptionEnabled} />
                    <Badge variant={encryptionEnabled ? "default" : "destructive"}>
                      {encryptionEnabled ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4" />
                    <span>Comprehensive Auditing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={auditingEnabled} onCheckedChange={setAuditingEnabled} />
                    <Badge variant={auditingEnabled ? "default" : "destructive"}>
                      {auditingEnabled ? "Logging" : "Disabled"}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Firewall Protection</span>
                    <span className="text-green-500">Active</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Intrusion Detection</span>
                    <span className="text-green-500">Monitoring</span>
                  </div>
                  <Progress value={98} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Data Loss Prevention</span>
                    <span className="text-green-500">Protected</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Security Events</CardTitle>
                <CardDescription>Latest security activities and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Security patch deployed successfully</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-orange-500/10 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Unusual login pattern detected</p>
                      <p className="text-xs text-muted-foreground">4 hours ago - Investigated & Cleared</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Security audit completed</p>
                      <p className="text-xs text-muted-foreground">1 day ago - 100% compliance</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                    <Key className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Encryption keys rotated</p>
                      <p className="text-xs text-muted-foreground">2 days ago - Scheduled maintenance</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Access Level Distribution</CardTitle>
                <CardDescription>Personnel distribution across security clearance levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={accessLevels}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="users"
                      nameKey="level"
                    >
                      {accessLevels.map((entry, index) => (
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
                <CardTitle>Role-Based Access Control</CardTitle>
                <CardDescription>Access permissions by role and classification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { role: "Air Marshal", access: "Top Secret", permissions: 100 },
                  { role: "Group Captain", access: "Secret", permissions: 85 },
                  { role: "Wing Commander", access: "Confidential", permissions: 70 },
                  { role: "Squadron Leader", access: "Restricted", permissions: 55 },
                  { role: "Flight Lieutenant", access: "Unclassified", permissions: 40 },
                ].map((role, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{role.role}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{role.access}</Badge>
                        <span className="text-sm">{role.permissions}%</span>
                      </div>
                    </div>
                    <Progress value={role.permissions} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Access Management</CardTitle>
              <CardDescription>Manage user access and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="h-4 w-4 mr-2" />
                      Manage User Roles
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Key className="h-4 w-4 mr-2" />
                      Reset Passwords
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Smartphone className="h-4 w-4 mr-2" />
                      MFA Configuration
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Lock className="h-4 w-4 mr-2" />
                      Access Reviews
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Access Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Active Users</span>
                      <span className="font-medium">14,236</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pending Approvals</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Expired Credentials</span>
                      <span className="font-medium">7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">MFA Enabled</span>
                      <span className="font-medium">98.7%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Security Alerts</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-destructive/10 rounded text-sm">
                      <span className="font-medium">7 users</span> require password reset
                    </div>
                    <div className="p-2 bg-orange-500/10 rounded text-sm">
                      <span className="font-medium">23 access requests</span> pending review
                    </div>
                    <div className="p-2 bg-green-500/10 rounded text-sm">
                      <span className="font-medium">All systems</span> operating normally
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>Comprehensive logging of all system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input placeholder="Search audit logs..." className="flex-1" />
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button>Export Logs</Button>
                </div>

                <div className="space-y-2">
                  {auditLogs.map((log) => (
                    <Card key={log.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{log.user.split(" ")[1]?.charAt(0) || "U"}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{log.user}</p>
                              <p className="text-sm text-muted-foreground">{log.action}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge
                              variant={
                                log.classification === "Top Secret"
                                  ? "destructive"
                                  : log.classification === "Secret"
                                    ? "default"
                                    : "outline"
                              }
                            >
                              {log.classification}
                            </Badge>
                            <Badge variant={log.status === "Authorized" ? "secondary" : "destructive"}>
                              {log.status}
                            </Badge>
                            <div className="text-right">
                              <p>{log.timestamp}</p>
                              <p className="text-muted-foreground">{log.ip}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Statistics</CardTitle>
                <CardDescription>Summary of audit activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold">15,847</div>
                    <div className="text-sm text-muted-foreground">Total Events Today</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-muted-foreground">Flagged Activities</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Login Events</span>
                    <span className="font-medium">8,234</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-sm">Data Access</span>
                    <span className="font-medium">4,567</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-sm">System Changes</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Reporting</CardTitle>
                <CardDescription>Automated compliance report generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Daily Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Weekly Security Summary
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Monthly Compliance Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Incident Response Report
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h5 className="font-medium mb-2">Recent Reports</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Security Audit - June 2024</span>
                      <Badge variant="secondary">Complete</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Compliance Review - Q2</span>
                      <Badge variant="secondary">Complete</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Incident Analysis - May</span>
                      <Badge variant="outline">In Progress</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Threat Intelligence Dashboard</CardTitle>
              <CardDescription>Real-time threat detection and response</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatIntelligence.map((threat, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              threat.severity === "Critical"
                                ? "bg-destructive"
                                : threat.severity === "High"
                                  ? "bg-orange-500"
                                  : "bg-yellow-500"
                            }`}
                          ></div>
                          <div>
                            <h4 className="font-medium">{threat.threat}</h4>
                            <p className="text-sm text-muted-foreground">
                              {threat.count} detected, {threat.blocked} blocked
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            variant={
                              threat.severity === "Critical"
                                ? "destructive"
                                : threat.severity === "High"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {threat.severity}
                          </Badge>
                          <Badge variant="outline">{threat.trend}</Badge>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {Math.round((threat.blocked / threat.count) * 100)}% Blocked
                            </div>
                            <Progress value={(threat.blocked / threat.count) * 100} className="h-1 w-20" />
                          </div>
                        </div>
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
                <CardTitle>Threat Response Actions</CardTitle>
                <CardDescription>Automated and manual threat mitigation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="h-4 w-4 mr-2" />
                    Activate Emergency Protocols
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Lock className="h-4 w-4 mr-2" />
                    Lockdown Affected Systems
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Send Security Alert
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Database className="h-4 w-4 mr-2" />
                    Backup Critical Data
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h5 className="font-medium mb-2">Response Statistics</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Average Response Time</span>
                      <span className="font-medium">2.3 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Threats Neutralized</span>
                      <span className="font-medium">99.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>False Positives</span>
                      <span className="font-medium">0.8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network Security Status</CardTitle>
                <CardDescription>Real-time network monitoring and protection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <Globe className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <div className="text-sm font-medium">Network Status</div>
                    <div className="text-xs text-green-500">Secure</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <div className="text-sm font-medium">Firewall</div>
                    <div className="text-xs text-green-500">Active</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Intrusion Prevention</span>
                    <span className="text-green-500 text-sm">Active</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-sm">DDoS Protection</span>
                    <span className="text-green-500 text-sm">Enabled</span>
                  </div>
                  <Progress value={98} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-sm">Traffic Analysis</span>
                    <span className="text-green-500 text-sm">Monitoring</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Status</CardTitle>
              <CardDescription>Adherence to security standards and regulations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceStatus.map((framework, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{framework.framework}</h4>
                          <p className="text-sm text-muted-foreground">
                            Last audit: {framework.lastAudit} | Next: {framework.nextAudit}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-500">{framework.compliance}%</div>
                            <div className="text-xs text-muted-foreground">Compliance</div>
                          </div>
                          <Badge variant={framework.compliance === 100 ? "default" : "secondary"}>
                            {framework.compliance === 100 ? "Fully Compliant" : "Minor Issues"}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress value={framework.compliance} className="h-2" />
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
                <CardTitle>Compliance Actions</CardTitle>
                <CardDescription>Required actions to maintain compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-500">All Critical Controls Active</h4>
                      <p className="text-sm text-muted-foreground">Security controls meeting all requirements</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-orange-500/10 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-500">Upcoming Audit: ISO 27001</h4>
                      <p className="text-sm text-muted-foreground">Scheduled for September 15, 2024</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Documentation Update Required</h4>
                      <p className="text-sm text-muted-foreground">Update security policies by July 30</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Metrics</CardTitle>
                <CardDescription>Key performance indicators for compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-green-500">100%</div>
                    <div className="text-sm text-muted-foreground">Overall Compliance</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">Open Findings</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Policy Adherence</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-sm">Training Completion</span>
                    <span className="font-medium">98.7%</span>
                  </div>
                  <Progress value={98.7} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-sm">Incident Response</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
