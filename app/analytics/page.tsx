import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { EngagementFunnel } from "@/components/engagement-funnel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 rounded-full bg-gradient-to-r from-green-500/5 to-blue-500/5 blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-xl animate-pulse delay-500"></div>
      </div>

      <DashboardHeader />
      <main className="flex-1 space-y-8 p-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Analytics
            </h1>
            <p className="text-muted-foreground text-lg">
              Track engagement metrics and member retention
            </p>
          </div>
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px] glass-card border-0 bg-accent/20 text-foreground smooth-transition hover:bg-accent/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card vibrant-border">
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
              <div key={i} className="p-6 glass-card vibrant-border rounded-xl animate-pulse">
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
          <div className="p-6 glass-card vibrant-border-pink rounded-xl animate-pulse">
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
