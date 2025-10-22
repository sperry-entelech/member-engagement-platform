import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { EngagementFunnel } from "@/components/engagement-funnel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">

      <DashboardHeader />
      <main className="flex-1 space-y-8 p-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Analytics
            </h1>
            <p className="text-muted-foreground text-lg">
              Track engagement metrics and member retention
            </p>
          </div>
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px] simple-card border-0 bg-accent/20 text-foreground smooth-transition hover:bg-accent/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="simple-card">
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Suspense fallback={
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-6 simple-card simple-shadow rounded-xl animate-pulse">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-32 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        }>
          <AnalyticsCharts />
        </Suspense>

        <Suspense fallback={
          <div className="p-6 simple-card simple-shadow rounded-xl animate-pulse">
            <div className="space-y-4">
              <div className="h-6 bg-muted rounded w-1/4"></div>
              <div className="h-48 bg-muted rounded"></div>
            </div>
          </div>
        }>
          <EngagementFunnel />
        </Suspense>
      </main>
    </div>
  )
}
