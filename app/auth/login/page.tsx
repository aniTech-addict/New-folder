"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Shield as SimpleShield, Plane as SimplePlane } from "@/components/icons/simple-icons"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
        },
      })
      if (error) throw error
      router.push("/dashboard")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/20 to-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          {/* IAF Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-primary/20 rounded-full border border-primary/30">
                <SimplePlane className="h-8 w-8 text-primary" />
              </div>
              <SimpleShield className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Indian Air Force</h1>
              <p className="text-muted-foreground">Human Management System</p>
            </div>
          </div>

          <Card className="bg-card/80 border-border backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-card-foreground">Secure Login</CardTitle>
              <CardDescription className="text-muted-foreground">Enter your credentials to access the system</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-card-foreground">
                      Service Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="officer@iaf.gov.in"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-card-foreground">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  {error && (
                    <div className="p-3 bg-destructive/20 border border-destructive/30 rounded-md">
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground"
                    disabled={isLoading}
                  >
                    {isLoading ? "Authenticating..." : "Login"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  <span className="text-muted-foreground">Need an account? </span>
                  <Link href="/auth/signup" className="text-primary hover:text-primary/80 underline underline-offset-4">
                    Register here
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="text-center text-xs text-muted-foreground">
            <p>Classified System - Authorized Personnel Only</p>
            <p>© 2024 Indian Air Force. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
