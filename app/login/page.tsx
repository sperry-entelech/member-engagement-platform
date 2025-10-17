'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const handleSignIn = () => {
    signIn('whop', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <span className="text-2xl font-bold text-primary-foreground">ME</span>
          </div>
          <h1 className="mb-2 text-2xl font-bold">Member Engagement Platform</h1>
          <p className="text-muted-foreground">Track, engage, and retain your community members</p>
        </div>

        <div className="space-y-4">
          <Button className="w-full" size="lg" onClick={handleSignIn}>
            <Zap className="mr-2 h-5 w-5" />
            Sign in with Whop
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </Card>
    </div>
  )
}
