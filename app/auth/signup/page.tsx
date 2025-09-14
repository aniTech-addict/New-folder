"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Shield, Plane } from "lucide-react"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    serviceNumber: "",
    firstName: "",
    lastName: "",
    rank: "",
    specialization: "",
    unit: "",
    command: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/signup-success`,
          data: {
            service_number: formData.serviceNumber,
            first_name: formData.firstName,
            last_name: formData.lastName,
            rank: formData.rank,
            specialization: formData.specialization,
            unit: formData.unit,
            command: formData.command,
          },
        },
      })
      if (error) throw error
      router.push("/auth/signup-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col gap-6">
          {/* IAF Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-cyan-500/20 rounded-full border border-cyan-400/30">
                <Plane className="h-8 w-8 text-cyan-400" />
              </div>
              <Shield className="h-8 w-8 text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Indian Air Force</h1>
              <p className="text-cyan-200">Personnel Registration</p>
            </div>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-white">Create Account</CardTitle>
              <CardDescription className="text-slate-300">Register new personnel in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white border-b border-slate-600 pb-2">
                      Personal Information
                    </h3>
                    <div className="grid gap-2">
                      <Label htmlFor="firstName" className="text-slate-200">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => updateFormData("firstName", e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName" className="text-slate-200">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => updateFormData("lastName", e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-slate-200">
                        Service Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="officer@iaf.gov.in"
                        required
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Service Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white border-b border-slate-600 pb-2">
                      Service Information
                    </h3>
                    <div className="grid gap-2">
                      <Label htmlFor="serviceNumber" className="text-slate-200">
                        Service Number
                      </Label>
                      <Input
                        id="serviceNumber"
                        type="text"
                        required
                        value={formData.serviceNumber}
                        onChange={(e) => updateFormData("serviceNumber", e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="rank" className="text-slate-200">
                        Rank
                      </Label>
                      <Select value={formData.rank} onValueChange={(value) => updateFormData("rank", value)}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select rank" />
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
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="specialization" className="text-slate-200">
                        Specialization
                      </Label>
                      <Select
                        value={formData.specialization}
                        onValueChange={(value) => updateFormData("specialization", value)}
                      >
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select specialization" />
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
                    </div>
                  </div>

                  {/* Unit and Command */}
                  <div className="grid gap-2">
                    <Label htmlFor="unit" className="text-slate-200">
                      Unit
                    </Label>
                    <Input
                      id="unit"
                      type="text"
                      placeholder="e.g., 1 Squadron"
                      required
                      value={formData.unit}
                      onChange={(e) => updateFormData("unit", e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="command" className="text-slate-200">
                      Command
                    </Label>
                    <Select value={formData.command} onValueChange={(value) => updateFormData("command", value)}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select command" />
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
                  </div>

                  {/* Password Fields */}
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-slate-200">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => updateFormData("password", e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword" className="text-slate-200">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-400/30 rounded-md">
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>

                <div className="mt-4 text-center text-sm">
                  <span className="text-slate-300">Already have an account? </span>
                  <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
                    Login here
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
