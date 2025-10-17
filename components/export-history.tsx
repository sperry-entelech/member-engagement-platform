"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Clock } from "lucide-react"
import useSWR from "swr"

interface ExportRecord {
  id: string
  name: string
  createdAt: string
  recordCount: number
  fileSize: string
}

const fetcher = async (): Promise<ExportRecord[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    {
      id: "1",
      name: "At-Risk Members Export",
      createdAt: "2024-04-15T10:30:00Z",
      recordCount: 234,
      fileSize: "45 KB",
    },
    {
      id: "2",
      name: "All Members Full Export",
      createdAt: "2024-04-14T15:20:00Z",
      recordCount: 1247,
      fileSize: "182 KB",
    },
    {
      id: "3",
      name: "Active Members Export",
      createdAt: "2024-04-12T09:15:00Z",
      recordCount: 892,
      fileSize: "128 KB",
    },
  ]
}

export function ExportHistory() {
  const { data: exports } = useSWR<ExportRecord[]>("/api/exports/history", fetcher)

  if (!exports) return null

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold">Recent Exports</h2>
      <div className="space-y-3">
        {exports.map((exp) => (
          <div key={exp.id} className="space-y-2 rounded-lg border p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{exp.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {new Date(exp.createdAt).toLocaleDateString()}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{exp.recordCount} records</span>
              <span>•</span>
              <span>{exp.fileSize}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
