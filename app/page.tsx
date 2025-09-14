import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Plane, Users, Target, Award, BarChart3 } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is authenticated, redirect to dashboard
  if (user) {
    redirect("/dashboard")
  }

  // Show landing page for unauthenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-full border border-cyan-400/30">
                <Plane className="h-6 w-6 text-cyan-400" />
              </div>
              <Shield className="h-6 w-6 text-orange-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Indian Air Force</h1>
                <p className="text-sm text-cyan-200">Human Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                asChild
                variant="outline"
                className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 bg-transparent"
              >
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              >
                <Link href="/auth/signup">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              AI-Powered Personnel
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Management System
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Centralize personnel data, optimize workforce allocation, and enable predictive analytics for strategic
              decision-making across the Indian Air Force.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-slate-800/50 border-slate-700 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="p-3 bg-cyan-500/20 rounded-full w-fit border border-cyan-400/30">
                <Users className="h-6 w-6 text-cyan-400" />
              </div>
              <CardTitle className="text-white">Personnel Analytics</CardTitle>
              <CardDescription className="text-slate-300">
                Comprehensive insights into personnel distribution, specializations, and readiness across all commands.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="p-3 bg-orange-500/20 rounded-full w-fit border border-orange-400/30">
                <Target className="h-6 w-6 text-orange-400" />
              </div>
              <CardTitle className="text-white">Workforce Optimization</CardTitle>
              <CardDescription className="text-slate-300">
                AI-driven recommendations for optimal personnel allocation and skill gap analysis.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="p-3 bg-green-500/20 rounded-full w-fit border border-green-400/30">
                <Award className="h-6 w-6 text-green-400" />
              </div>
              <CardTitle className="text-white">Training Management</CardTitle>
              <CardDescription className="text-slate-300">
                Track training progress, schedule programs, and predict future training needs.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="p-3 bg-blue-500/20 rounded-full w-fit border border-blue-400/30">
                <BarChart3 className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-white">Predictive Analytics</CardTitle>
              <CardDescription className="text-slate-300">
                Forecast attrition rates, mission readiness, and career progression patterns.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="p-3 bg-purple-500/20 rounded-full w-fit border border-purple-400/30">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle className="text-white">Security & Compliance</CardTitle>
              <CardDescription className="text-slate-300">
                Military-grade security with comprehensive audit trails and access controls.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="p-3 bg-red-500/20 rounded-full w-fit border border-red-400/30">
                <Plane className="h-6 w-6 text-red-400" />
              </div>
              <CardTitle className="text-white">Mission Integration</CardTitle>
              <CardDescription className="text-slate-300">
                Seamless integration with mission planning and operational readiness systems.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-700/50 text-center">
          <p className="text-slate-400 text-sm">Classified System - Authorized Personnel Only</p>
          <p className="text-slate-500 text-xs mt-2">© 2024 Indian Air Force. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}
