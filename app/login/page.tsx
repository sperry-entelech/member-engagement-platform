'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Users, BarChart3, Shield } from "lucide-react"

export default function LoginPage() {
  const handleSignIn = () => {
    window.location.href = '/api/oauth/init?next=/dashboard'
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="flex min-h-screen items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 border-2 border-blue-500/50 glow-blue smooth-transition shadow-xl">
              <Users className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Member Engagement Platform
            </h1>
            <p className="text-muted-foreground text-lg">
              Track, engage, and retain your community members
            </p>
          </div>

          {/* Main Card */}
          <Card className="w-full p-10 bg-card/90 backdrop-blur-xl border-2 border-white/10 vibrant-border smooth-transition hover:glow-purple shadow-2xl">
            <div className="space-y-8">
              {/* Features */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center group">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 border-2 border-blue-500/50 smooth-transition group-hover:glow-blue group-hover:bg-blue-600/30">
                    <BarChart3 className="h-6 w-6 text-blue-400 group-hover:text-blue-300" />
                  </div>
                  <p className="text-sm text-muted-foreground">Analytics</p>
                </div>
                <div className="text-center group">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600/20 border-2 border-green-500/50 smooth-transition group-hover:glow-green group-hover:bg-green-600/30">
                    <Users className="h-6 w-6 text-green-400 group-hover:text-green-300" />
                  </div>
                  <p className="text-sm text-muted-foreground">Members</p>
                </div>
                <div className="text-center group">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20 border-2 border-purple-500/50 smooth-transition group-hover:glow-purple group-hover:bg-purple-600/30">
                    <Shield className="h-6 w-6 text-purple-400 group-hover:text-purple-300" />
                  </div>
                  <p className="text-sm text-muted-foreground">Security</p>
                </div>
              </div>

              {/* Sign In Button */}
              <Button 
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-2 border-blue-500/50 hover:border-blue-400/70 smooth-transition shadow-lg hover:shadow-xl glow-blue hover:glow-purple" 
                size="lg" 
                onClick={handleSignIn}
              >
                <Zap className="mr-3 h-6 w-6" />
                Sign in with Whop
              </Button>

              {/* Footer */}
              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  By signing in, you agree to our{' '}
                  <a href="#" className="text-white hover:text-blue-400 underline smooth-transition">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-white hover:text-blue-400 underline smooth-transition">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </Card>

          {/* Bottom Info */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full vibrant-border-pink smooth-transition">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-sm text-muted-foreground">
                Powered by Whop • Secure OAuth Authentication
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
