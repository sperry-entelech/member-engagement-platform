import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { EngagementFunnel } from "@/components/engagement-funnel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Track engagement metrics and member retention</p>
          </div>
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Suspense fallback={<div>Loading analytics...</div>}>
          <AnalyticsCharts />
        </Suspense>

        <Suspense fallback={<div>Loading funnel...</div>}>
          <EngagementFunnel />
        </Suspense>
      </main>
    </div>
  )
}
