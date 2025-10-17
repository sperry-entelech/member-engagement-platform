import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { WorkflowBuilder } from "@/components/workflow-builder"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function WorkflowBuilderPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/workflows">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Workflow Builder</h1>
              <p className="text-sm text-muted-foreground">Create automated engagement sequences</p>
            </div>
          </div>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Workflow
          </Button>
        </div>

        <Suspense fallback={<div>Loading workflow...</div>}>
          <WorkflowBuilder workflowId={params.id} />
        </Suspense>
      </main>
    </div>
  )
}
