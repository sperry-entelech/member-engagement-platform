"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Mail, UserPlus, Workflow, FileDown, AlertTriangle } from "lucide-react"

export function MemberActions({ memberId }: { memberId: string }) {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start bg-transparent">
          <MessageSquare className="mr-2 h-4 w-4" />
          Send Discord Message
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent">
          <Mail className="mr-2 h-4 w-4" />
          Send Email
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent">
          <Workflow className="mr-2 h-4 w-4" />
          Add to Workflow
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent">
          <UserPlus className="mr-2 h-4 w-4" />
          Assign Milestone
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent">
          <FileDown className="mr-2 h-4 w-4" />
          Export Data
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Flag for Review
        </Button>
      </div>
    </Card>
  )
}
