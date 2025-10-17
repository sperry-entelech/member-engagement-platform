import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { ExportBuilder } from "@/components/export-builder"
import { ExportHistory } from "@/components/export-history"

export default function ExportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Custom Export</h1>
          <p className="text-muted-foreground">Build custom CSV exports with selected fields and filters</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense fallback={<div>Loading export builder...</div>}>
              <ExportBuilder />
            </Suspense>
          </div>

          <div>
            <Suspense fallback={<div>Loading history...</div>}>
              <ExportHistory />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
