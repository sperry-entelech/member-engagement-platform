'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Users, BarChart3, Shield } from "lucide-react"

export default function LoginPage() {
  const handleSignIn = () => {
    window.location.href = '/api/oauth/init?next=/dashboard'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Member Engagement Platform
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Track, engage, and retain your community members
            </p>
          </div>

          {/* Main Card */}
          <Card className="w-full p-8 shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <div className="space-y-6">
              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                    <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Analytics</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                    <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Members</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                    <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Security</p>
                </div>
              </div>

              {/* Sign In Button */}
              <Button 
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200" 
                size="lg" 
                onClick={handleSignIn}
              >
                <Zap className="mr-3 h-6 w-6" />
                Sign in with Whop
              </Button>

              {/* Footer */}
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By signing in, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </Card>

          {/* Bottom Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Powered by Whop • Secure OAuth Authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
