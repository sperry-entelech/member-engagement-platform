"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileSpreadsheet } from "lucide-react"

const availableFields = [
  { id: "name", label: "Name", category: "Basic" },
  { id: "email", label: "Email", category: "Basic" },
  { id: "whop_id", label: "Whop ID", category: "Basic" },
  { id: "discord_username", label: "Discord Username", category: "Basic" },
  { id: "join_date", label: "Join Date", category: "Basic" },
  { id: "last_active", label: "Last Active", category: "Activity" },
  { id: "risk_score", label: "Risk Score", category: "Engagement" },
  { id: "risk_level", label: "Risk Level", category: "Engagement" },
  { id: "engagement_score", label: "Engagement Score", category: "Engagement" },
  { id: "total_messages", label: "Total Messages", category: "Activity" },
  { id: "events_attended", label: "Events Attended", category: "Activity" },
  { id: "milestones_completed", label: "Milestones Completed", category: "Progress" },
  { id: "response_rate", label: "Response Rate", category: "Engagement" },
]

export function ExportBuilder() {
  const [selectedFields, setSelectedFields] = useState<string[]>(["name", "email", "risk_score"])
  const [riskFilter, setRiskFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all-time")

  const toggleField = (fieldId: string) => {
    setSelectedFields((prev) => (prev.includes(fieldId) ? prev.filter((id) => id !== fieldId) : [...prev, fieldId]))
  }

  const categories = Array.from(new Set(availableFields.map((f) => f.category)))

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Select Fields to Export</h2>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category} className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">{category}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {availableFields
                    .filter((f) => f.category === category)
                    .map((field) => (
                      <div key={field.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={field.id}
                          checked={selectedFields.includes(field.id)}
                          onCheckedChange={() => toggleField(field.id)}
                        />
                        <Label htmlFor={field.id} className="cursor-pointer text-sm font-normal">
                          {field.label}
                        </Label>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 border-t pt-6">
          <h2 className="text-lg font-semibold">Filters</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Risk Level</Label>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="at-risk">At-Risk Only</SelectItem>
                  <SelectItem value="churning">Churning Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="last-7">Last 7 Days</SelectItem>
                  <SelectItem value="last-30">Last 30 Days</SelectItem>
                  <SelectItem value="last-90">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-6">
          <div className="text-sm text-muted-foreground">
            <FileSpreadsheet className="mr-2 inline h-4 w-4" />
            {selectedFields.length} fields selected
          </div>
          <Button size="lg">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
    </Card>
  )
}
