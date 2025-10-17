import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { SettingsTabs } from "@/components/settings-tabs"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage integrations, access control, and platform configuration</p>
        </div>

        <Suspense fallback={<div>Loading settings...</div>}>
          <SettingsTabs />
        </Suspense>
      </main>
    </div>
  )
}
