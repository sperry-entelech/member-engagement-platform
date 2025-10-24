import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsCards } from "@/components/metrics-cards"
import { MemberTable } from "@/components/member-table"
import { DashboardFilters } from "@/components/dashboard-filters"

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      <DashboardHeader />
      <main className="flex-1 space-y-8 p-6 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Monitor member engagement and identify at-risk members
              </p>
            </div>
            <div className="bg-card border border-foreground px-4 py-2 rounded-lg">
              <p className="text-sm text-foreground font-medium">DEMO MODE</p>
            </div>
          </div>
        </div>

        <Suspense fallback={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-6 simple-card simple-shadow rounded-xl animate-pulse">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        }>
          <MetricsCards />
        </Suspense>

        <div className="space-y-6">
          <DashboardFilters />
          <Suspense fallback={
            <div className="rounded-xl simple-card simple-shadow p-6 animate-pulse">
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded w-1/4"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-muted rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          }>
            <MemberTable />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
