"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, Timer, Coffee } from "lucide-react"
import { BreakAnalysis } from "./break-analysis"


interface AttendanceRecord {
  type: string
  time: string
}

interface AttendanceData {
  date: string
  project: string
  role: string
  location: string
  records: AttendanceRecord[]
}

interface WorkStats {
  totalHours: number
  totalMinutes: number
  breakHours: number
  breakMinutes: number
  netHours: number
  workPeriods: Array<{
    checkIn: string
    checkOut: string
    duration: number
  }>
  breakPeriods: Array<{
    start: string
    end: string
    duration: number
  }>
}

function calculateWorkingHours(records: AttendanceRecord[]): WorkStats {
  const pairs = []
  let checkIn = null

  for (const record of records) {
    if (record.type === "check-in") {
      checkIn = record.time
    } else if (record.type === "check-out" && checkIn) {
      pairs.push({ checkIn, checkOut: record.time })
      checkIn = null
    }
  }

  let totalMinutes = 0
  const workPeriods = []
  const breakPeriods = []

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i]
    const checkInTime = new Date(`2024-01-01 ${pair.checkIn}`)
    const checkOutTime = new Date(`2024-01-01 ${pair.checkOut}`)
    const workMinutes = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60)
    totalMinutes += workMinutes

    workPeriods.push({
      checkIn: pair.checkIn,
      checkOut: pair.checkOut,
      duration: workMinutes / 60,
    })

    if (i < pairs.length - 1) {
      const nextCheckIn = new Date(`2024-01-01 ${pairs[i + 1].checkIn}`)
      const breakTime = (nextCheckIn.getTime() - checkOutTime.getTime()) / (1000 * 60)

      // Only count as break if it's more than 5 minutes (to avoid calculation errors)
      if (breakTime > 5) {
        breakPeriods.push({
          start: pair.checkOut,
          end: pairs[i + 1].checkIn,
          duration: breakTime / 60,
        })
      }
    }
  }

  const totalBreakMinutes = breakPeriods.reduce((sum, period) => sum + period.duration * 60, 0)

  return {
    totalHours: Math.floor(totalMinutes / 60),
    totalMinutes: totalMinutes % 60,
    breakHours: Math.floor(totalBreakMinutes / 60),
    breakMinutes: totalBreakMinutes % 60,
    netHours: totalMinutes / 60,
    workPeriods,
    breakPeriods,
  }
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":")
  const hour = Number.parseInt(hours)
  const ampm = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export function AttendanceCard({ data }: { data: AttendanceData }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const workStats = calculateWorkingHours(data.records)

  const getHoursStatus = (hours: number) => {
    if (hours > 8) return "overtime"
    if (hours < 4) return "short"
    return "normal"
  }

  const status = getHoursStatus(workStats.netHours)
  const totalBreakTime = workStats.breakPeriods.reduce((sum, period) => sum + period.duration, 0)

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg">
                {new Date(data.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{data.project}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={status === "overtime" ? "destructive" : status === "short" ? "secondary" : "default"}
              className={status === "overtime" ? "bg-overtime text-overtime-foreground" : ""}
            >
              {workStats.netHours.toFixed(1)}h
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <Badge variant="outline">{data.role}</Badge>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span className="text-pretty">{data.location}</span>
          </div>
          {workStats.breakPeriods.length > 0 && (
            <div className="flex items-center gap-1">
              <Coffee className="h-4 w-4" />
              <span>
                {Math.floor(totalBreakTime)}h {Math.round((totalBreakTime % 1) * 60)}m breaks
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-6">
            {/* Work Periods */}
            <div>
              <h4 className="font-medium flex items-center gap-2 mb-3">
                <Timer className="h-4 w-4" />
                Work Periods
              </h4>
              <div className="space-y-2">
                {workStats.workPeriods.map((period, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-sm">
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {formatTime(period.checkIn)}
                        </span>
                        <span className="text-muted-foreground mx-2">→</span>
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          {formatTime(period.checkOut)}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary">{period.duration.toFixed(1)}h</Badge>
                  </div>
                ))}
              </div>
            </div>

            <BreakAnalysis breakPeriods={workStats.breakPeriods} totalBreakTime={totalBreakTime} />

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Work Time:</span>
                    <span className="font-mono font-medium">
                      {workStats.totalHours}h {workStats.totalMinutes}m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Break Time:</span>
                    <span className="font-mono">
                      {workStats.breakHours}h {workStats.breakMinutes}m
                    </span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Net Working Hours:</span>
                    <span
                      className={`font-mono ${
                        status === "overtime" ? "text-overtime" : status === "short" ? "text-warning" : "text-success"
                      }`}
                    >
                      {workStats.netHours.toFixed(1)}h
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Status</h4>
                <div className="space-y-2">
                  {status === "overtime" && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-overtime rounded-full"></div>
                      <span className="text-overtime">Overtime ({(workStats.netHours - 8).toFixed(1)}h extra)</span>
                    </div>
                  )}
                  {status === "short" && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span className="text-warning">Short day ({(8 - workStats.netHours).toFixed(1)}h under)</span>
                    </div>
                  )}
                  {status === "normal" && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-success">Standard workday</span>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {workStats.workPeriods.length} work {workStats.workPeriods.length === 1 ? "period" : "periods"}
                    {workStats.breakPeriods.length > 0 &&
                      `, ${workStats.breakPeriods.length} break ${workStats.breakPeriods.length === 1 ? "period" : "periods"}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
