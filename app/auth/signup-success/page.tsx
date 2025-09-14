import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Plane, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
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
              <p className="text-cyan-200">Human Management System</p>
            </div>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-400" />
              </div>
              <CardTitle className="text-xl text-white">Registration Successful!</CardTitle>
              <CardDescription className="text-slate-300">Your account has been created successfully</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-md">
                <p className="text-sm text-green-300">
                  Please check your service email to confirm your account before signing in. The confirmation link will
                  be valid for 24 hours.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-slate-300 text-sm">After confirming your email, you can access:</p>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Personnel dashboard and profile management</li>
                  <li>• Training records and mission assignments</li>
                  <li>• Secure communication channels</li>
                  <li>• System analytics and reporting tools</li>
                </ul>
              </div>

              <div className="pt-4">
                <Link
                  href="/auth/login"
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 text-sm"
                >
                  Return to Login
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-xs text-slate-400">
            <p>Classified System - Authorized Personnel Only</p>
            <p>© 2024 Indian Air Force. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
