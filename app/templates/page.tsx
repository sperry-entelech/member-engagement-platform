import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TemplateList } from "@/components/template-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TemplatesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Message Templates</h1>
            <p className="text-muted-foreground">
              Create reusable templates for Discord, Email, and Whop notifications
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="discord">Discord</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="whop">Whop Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Suspense fallback={<div>Loading templates...</div>}>
              <TemplateList filter="all" />
            </Suspense>
          </TabsContent>

          <TabsContent value="discord" className="space-y-4">
            <Suspense fallback={<div>Loading templates...</div>}>
              <TemplateList filter="discord" />
            </Suspense>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <Suspense fallback={<div>Loading templates...</div>}>
              <TemplateList filter="email" />
            </Suspense>
          </TabsContent>

          <TabsContent value="whop" className="space-y-4">
            <Suspense fallback={<div>Loading templates...</div>}>
              <TemplateList filter="whop" />
            </Suspense>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
