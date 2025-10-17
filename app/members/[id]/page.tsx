import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { MemberProfileHeader } from "@/components/member-profile-header"
import { MemberStats } from "@/components/member-stats"
import { MemberTimeline } from "@/components/member-timeline"
import { MemberActions } from "@/components/member-actions"

export default function MemberProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-6">
        <Suspense fallback={<div>Loading profile...</div>}>
          <MemberProfileHeader memberId={params.id} />
        </Suspense>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Suspense fallback={<div>Loading timeline...</div>}>
              <MemberTimeline memberId={params.id} />
            </Suspense>
          </div>

          <div className="space-y-6">
            <Suspense fallback={<div>Loading stats...</div>}>
              <MemberStats memberId={params.id} />
            </Suspense>
            <MemberActions memberId={params.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
