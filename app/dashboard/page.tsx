import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsCards } from "@/components/metrics-cards"
import { MemberTable } from "@/components/member-table"
import { DashboardFilters } from "@/components/dashboard-filters"
import { ProtectedPage } from "@/components/protected-page"

export default function DashboardPage() {
  return (
    <ProtectedPage>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <main className="flex-1 space-y-6 p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Monitor member engagement and identify at-risk members</p>
          </div>

          <Suspense fallback={<div>Loading metrics...</div>}>
            <MetricsCards />
          </Suspense>

          <div className="space-y-4">
            <DashboardFilters />
            <Suspense fallback={<div>Loading members...</div>}>
              <MemberTable />
            </Suspense>
          </div>
        </main>
      </div>
    </ProtectedPage>
  )
}
