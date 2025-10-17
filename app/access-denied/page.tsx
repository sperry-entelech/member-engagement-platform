import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AccessDeniedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <Shield className="h-8 w-8 text-destructive" />
        </div>

        <h1 className="mb-2 text-2xl font-bold">Access Denied</h1>
        <p className="mb-6 text-muted-foreground">
          You need an active membership to access this platform. Please check your Whop membership status or contact
          support.
        </p>

        <div className="space-y-2">
          <Button className="w-full" asChild>
            <Link href="https://whop.com">Check Membership Status</Link>
          </Button>
          <Button variant="outline" className="w-full bg-transparent" asChild>
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
