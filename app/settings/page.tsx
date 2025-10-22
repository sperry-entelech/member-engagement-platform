import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { SettingsTabs } from "@/components/settings-tabs"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">

      <DashboardHeader />
      <main className="flex-1 space-y-8 p-6 relative z-10">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage integrations, access control, and platform configuration
          </p>
        </div>

        <Suspense fallback={
          <div className="p-6 simple-card simple-shadow rounded-xl animate-pulse">
            <div className="space-y-4">
              <div className="h-6 bg-muted rounded w-1/4"></div>
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-16 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        }>
          <SettingsTabs />
        </Suspense>
      </main>
    </div>
  )
}
