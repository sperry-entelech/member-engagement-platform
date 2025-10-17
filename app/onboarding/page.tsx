import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { MilestoneList } from "@/components/milestone-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Onboarding Milestones</h1>
            <p className="text-muted-foreground">Create gamified milestones to guide new members</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Milestone
          </Button>
        </div>

        <Suspense fallback={<div>Loading milestones...</div>}>
          <MilestoneList />
        </Suspense>
      </main>
    </div>
  )
}
