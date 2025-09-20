"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coffee, AlertTriangle, CheckCircle } from "lucide-react"

interface BreakPeriod {
  start: string
  end: string
  duration: number
}

interface BreakAnalysisProps {
  breakPeriods: BreakPeriod[]
  totalBreakTime: number
}

export function BreakAnalysis({ breakPeriods, totalBreakTime }: BreakAnalysisProps) {
  const getBreakStatus = (duration: number) => {
    if (duration < 0.25) return { status: "short", color: "text-warning", icon: AlertTriangle }
    if (duration > 2) return { status: "long", color: "text-warning", icon: AlertTriangle }
    return { status: "normal", color: "text-success", icon: CheckCircle }
  }

  const formatDuration = (hours: number) => {
    const totalMinutes = Math.round(hours * 60)
    const h = Math.floor(totalMinutes / 60)
    const m = totalMinutes % 60

    if (h === 0) return `${m}m`
    if (m === 0) return `${h}h`
    return `${h}h ${m}m`
  }

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  if (breakPeriods.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Coffee className="h-4 w-4" />
            Break Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">
            <Coffee className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No breaks taken during this shift</p>
            <p className="text-sm">Consider taking regular breaks for better productivity</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Coffee className="h-4 w-4" />
          Break Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Break Summary */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <div className="font-medium">Total Break Time</div>
              <div className="text-sm text-muted-foreground">
                {breakPeriods.length} break {breakPeriods.length === 1 ? "period" : "periods"}
              </div>
            </div>
            <Badge variant="outline" className="text-base">
              {formatDuration(totalBreakTime)}
            </Badge>
          </div>

          {/* Individual Breaks */}
          <div className="space-y-2">
            {breakPeriods.map((period, index) => {
              const breakStatus = getBreakStatus(period.duration)
              const StatusIcon = breakStatus.icon

              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`h-4 w-4 ${breakStatus.color}`} />
                    <div>
                      <div className="text-sm font-medium">Break {index + 1}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatTime(period.start)} - {formatTime(period.end)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className={`${
                        breakStatus.status === "short"
                          ? "border-warning text-warning"
                          : breakStatus.status === "long"
                            ? "border-warning text-warning"
                            : "border-success text-success"
                      }`}
                    >
                      {formatDuration(period.duration)}
                    </Badge>
                    {breakStatus.status !== "normal" && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {breakStatus.status === "short" ? "Short break" : "Extended break"}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Break Recommendations */}
          <div className="mt-4 p-3 bg-muted/20 rounded-lg">
            <div className="text-sm font-medium mb-2">Break Recommendations</div>
            <div className="text-xs text-muted-foreground space-y-1">
              {totalBreakTime < 0.5 && <p>• Consider taking longer breaks to maintain productivity</p>}
              {totalBreakTime > 3 && <p>• Extended break time may impact total working hours</p>}
              {breakPeriods.some((p) => p.duration > 2) && (
                <p>• Some breaks exceed 2 hours - verify if this includes lunch</p>
              )}
              {breakPeriods.length === 0 && <p>• Regular breaks every 2-3 hours are recommended</p>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
