'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Users, BarChart3, Shield, TrendingUp, Heart } from "lucide-react"

export default function LoginPage() {
  const handleSignIn = () => {
    window.location.href = '/api/oauth/init?next=/dashboard'
  }

  const handleDemoMode = () => {
    window.location.href = '/demo'
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">

      <div className="flex min-h-screen items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-card border-2 border-foreground simple-shadow smooth-transition">
              <Users className="h-12 w-12 text-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Community Core
            </h1>
            <p className="text-muted-foreground text-lg">
              Track, engage, and retain your community members
            </p>
          </div>

          {/* Main Card */}
          <Card className="w-full p-10 simple-card simple-shadow smooth-transition">
            <div className="space-y-8">
              {/* Features */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center group">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-card border-2 border-foreground smooth-transition group-hover:bg-secondary">
                    <BarChart3 className="h-6 w-6 text-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Analytics</p>
                </div>
                <div className="text-center group">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-card border-2 border-foreground smooth-transition group-hover:bg-secondary">
                    <TrendingUp className="h-6 w-6 text-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                </div>
                <div className="text-center group">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-card border-2 border-foreground smooth-transition group-hover:bg-secondary">
                    <Heart className="h-6 w-6 text-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Retention</p>
                </div>
              </div>

              {/* Sign In Button */}
              <Button 
                className="w-full h-14 text-lg font-semibold bg-foreground text-background hover:bg-secondary hover:text-foreground border-2 border-foreground smooth-transition simple-shadow" 
                size="lg" 
                onClick={handleSignIn}
              >
                <Zap className="mr-3 h-6 w-6" />
                Sign in with Whop
              </Button>

              {/* Demo Mode Button */}
              <Button 
                className="w-full h-12 text-lg font-semibold bg-transparent text-foreground hover:bg-accent hover:text-foreground border-2 border-foreground smooth-transition" 
                size="lg" 
                onClick={handleDemoMode}
              >
                View Demo Dashboard
              </Button>

              {/* Footer */}
              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  By signing in, you agree to our{' '}
                  <a href="#" className="text-foreground hover:text-muted-foreground underline smooth-transition">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-foreground hover:text-muted-foreground underline smooth-transition">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </Card>

          {/* Bottom Info */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full simple-card smooth-transition">
              <div className="w-2 h-2 rounded-full bg-foreground"></div>
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
