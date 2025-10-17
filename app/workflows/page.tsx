import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { WorkflowList } from "@/components/workflow-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function WorkflowsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Automated Workflows</h1>
            <p className="text-muted-foreground">Create automated nudge sequences and engagement campaigns</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Workflow
          </Button>
        </div>

        <Suspense fallback={<div>Loading workflows...</div>}>
          <WorkflowList />
        </Suspense>
      </main>
    </div>
  )
}
