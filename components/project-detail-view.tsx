"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  User,
  Coffee,
  TrendingUp,
  BarChart3,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"

interface Project {
  id: string
  name: string
  role: string
  location: string
  status: string
  startDate: string
  endDate: string
  attendanceRecords: Array<{
    date: string
    records: Array<{ type: string; time: string }>
  }>
}

interface ProjectDetailViewProps {
  project: Project
  onBack: () => void
}

function calculateWorkingHours(records: Array<{ type: string; time: string }>) {
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
  let breakMinutes = 0

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i]
    const checkInTime = new Date(`2024-01-01 ${pair.checkIn}`)
    const checkOutTime = new Date(`2024-01-01 ${pair.checkOut}`)
    const workMinutes = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60)
    totalMinutes += workMinutes

    if (i < pairs.length - 1) {
      const nextCheckIn = new Date(`2024-01-01 ${pairs[i + 1].checkIn}`)
      const breakTime = (nextCheckIn.getTime() - checkOutTime.getTime()) / (1000 * 60)
      breakMinutes += breakTime
    }
  }

  return {
    totalHours: Math.floor(totalMinutes / 60),
    totalMinutes: totalMinutes % 60,
    breakHours: Math.floor(breakMinutes / 60),
    breakMinutes: breakMinutes % 60,
    netHours: totalMinutes / 60,
    workPairs: pairs,
  }
}

function DayAttendanceCard({
  dayRecord,
}: { dayRecord: { date: string; records: Array<{ type: string; time: string }> } }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const stats = calculateWorkingHours(dayRecord.records)

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (hours: number) => {
    if (hours >= 9) return "text-orange-500"
    if (hours < 7) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <Card className="mb-4">
      <CardHeader
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{formatDate(dayRecord.date)}</CardTitle>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className={getStatusColor(stats.netHours)}>
                  {stats.totalHours}h {stats.totalMinutes}m
                </span>
              </span>
              {stats.breakHours > 0 || stats.breakMinutes > 0 ? (
                <span className="flex items-center gap-1">
                  <Coffee className="h-4 w-4" />
                  {stats.breakHours}h {stats.breakMinutes}m break
                </span>
              ) : null}
            </div>
          </div>
          <Badge variant={stats.netHours >= 8 ? "default" : stats.netHours >= 7 ? "secondary" : "outline"}>
            {stats.netHours >= 9 ? "Overtime" : stats.netHours >= 7 ? "Full Day" : "Short Day"}
          </Badge>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Clock In/Out History</h4>
              <div className="space-y-2">
                {dayRecord.records.map((record, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded">
                    <span className="capitalize font-medium">{record.type.replace("-", " ")}</span>
                    <span className="font-mono text-sm">{record.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {stats.workPairs.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Work Periods</h4>
                <div className="space-y-2">
                  {stats.workPairs.map((pair, index) => {
                    const checkInTime = new Date(`2024-01-01 ${pair.checkIn}`)
                    const checkOutTime = new Date(`2024-01-01 ${pair.checkOut}`)
                    const duration = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60)
                    const hours = Math.floor(duration / 60)
                    const minutes = Math.floor(duration % 60)

                    return (
                      <div key={index} className="flex items-center justify-between py-2 px-3 bg-primary/5 rounded">
                        <span className="text-sm">
                          {pair.checkIn} - {pair.checkOut}
                        </span>
                        <span className="text-sm font-medium">
                          {hours}h {minutes}m
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function EnhancedBreakAnalysis({ project }: { project: Project }) {
  const breakData = project.attendanceRecords.map((day) => {
    const stats = calculateWorkingHours(day.records)
    return {
      date: day.date,
      breakTime: stats.breakHours + stats.breakMinutes / 60,
      workTime: stats.netHours,
    }
  })

  const totalBreakTime = breakData.reduce((sum, day) => sum + day.breakTime, 0)
  const avgBreakTime = breakData.length > 0 ? totalBreakTime / breakData.length : 0
  const longestBreak = Math.max(...breakData.map((d) => d.breakTime))
  const shortestBreak = Math.min(...breakData.filter((d) => d.breakTime > 0).map((d) => d.breakTime))

  const getBreakRecommendation = () => {
    if (avgBreakTime < 0.5)
      return { type: "warning", message: "Consider taking longer breaks to maintain productivity and well-being." }
    if (avgBreakTime > 1.5)
      return {
        type: "info",
        message: "Break time is above average. Consider optimizing break duration for better efficiency.",
      }
    return { type: "success", message: "Break time is within healthy range. Good work-life balance!" }
  }

  const recommendation = getBreakRecommendation()

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coffee className="h-5 w-5" />
          Break Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{Math.round(totalBreakTime * 100) / 100}h</div>
              <div className="text-sm text-muted-foreground">Total Break Time</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold">{Math.round(avgBreakTime * 60)}m</div>
              <div className="text-sm text-muted-foreground">Average Break/Day</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold">{Math.round(longestBreak * 60)}m</div>
              <div className="text-sm text-muted-foreground">Longest Break</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold">
                {shortestBreak === Number.POSITIVE_INFINITY ? 0 : Math.round(shortestBreak * 60)}m
              </div>
              <div className="text-sm text-muted-foreground">Shortest Break</div>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg border-l-4 ${
              recommendation.type === "success"
                ? "bg-green-50 border-green-500 dark:bg-green-950/20"
                : recommendation.type === "warning"
                  ? "bg-yellow-50 border-yellow-500 dark:bg-yellow-950/20"
                  : "bg-blue-50 border-blue-500 dark:bg-blue-950/20"
            }`}
          >
            <div className="flex items-start gap-3">
              {recommendation.type === "success" ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              ) : recommendation.type === "warning" ? (
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              )}
              <div>
                <h4 className="font-medium mb-1">Break Pattern Analysis</h4>
                <p className="text-sm text-muted-foreground">{recommendation.message}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Daily Break Patterns</h4>
            <div className="space-y-2">
              {breakData.slice(0, 7).map((day, index) => {
                const breakPercentage = day.breakTime > 0 ? Math.min((day.breakTime / 2) * 100, 100) : 0
                return (
                  <div key={day.date} className="flex items-center gap-3">
                    <div className="w-20 text-sm text-muted-foreground">
                      {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                    <div className="flex-1 bg-muted/30 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-orange-500 transition-all duration-300"
                        style={{ width: `${breakPercentage}%` }}
                      />
                    </div>
                    <div className="w-16 text-sm font-medium text-right">{Math.round(day.breakTime * 60)}m</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function HoursSummary({ project }: { project: Project }) {
  const weeklyData = project.attendanceRecords.reduce((weeks: any[], record) => {
    const date = new Date(record.date)
    const weekStart = new Date(date)
    weekStart.setDate(date.getDate() - date.getDay())
    const weekKey = weekStart.toISOString().split("T")[0]

    const stats = calculateWorkingHours(record.records)
    const existingWeek = weeks.find((w) => w.weekStart === weekKey)

    if (existingWeek) {
      existingWeek.totalHours += stats.netHours
      existingWeek.days += 1
    } else {
      weeks.push({
        weekStart: weekKey,
        totalHours: stats.netHours,
        days: 1,
      })
    }

    return weeks
  }, [])

  const totalHours = project.attendanceRecords.reduce((sum, day) => {
    const stats = calculateWorkingHours(day.records)
    return sum + stats.netHours
  }, 0)

  const overtimeDays = project.attendanceRecords.filter((day) => {
    const stats = calculateWorkingHours(day.records)
    return stats.netHours >= 9
  }).length

  const shortDays = project.attendanceRecords.filter((day) => {
    const stats = calculateWorkingHours(day.records)
    return stats.netHours < 7
  }).length

  const regularDays = project.attendanceRecords.length - overtimeDays - shortDays

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Hours Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600">{regularDays}</div>
              <div className="text-sm text-muted-foreground">Regular Days</div>
              <div className="text-xs text-muted-foreground">(7-9 hours)</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="text-2xl font-bold text-orange-600">{overtimeDays}</div>
              <div className="text-sm text-muted-foreground">Overtime Days</div>
              <div className="text-xs text-muted-foreground">(9+ hours)</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="text-2xl font-bold text-yellow-600">{shortDays}</div>
              <div className="text-sm text-muted-foreground">Short Days</div>
              <div className="text-xs text-muted-foreground">(&lt;7 hours)</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-bold text-primary">{Math.round(totalHours * 100) / 100}h</div>
              <div className="text-sm text-muted-foreground">Total Hours</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Weekly Hours Breakdown</h4>
            <div className="space-y-3">
              {weeklyData.slice(-4).map((week, index) => {
                const avgHours = week.totalHours / week.days
                const maxHours = 45 // Max expected hours per week
                const percentage = Math.min((week.totalHours / maxHours) * 100, 100)

                return (
                  <div key={week.weekStart} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Week of{" "}
                        {new Date(week.weekStart).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      <span className="font-medium">
                        {Math.round(week.totalHours * 100) / 100}h ({week.days} days)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-muted/30 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            week.totalHours >= 40
                              ? "bg-green-500"
                              : week.totalHours >= 30
                                ? "bg-blue-500"
                                : "bg-yellow-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground w-16 text-right">
                        {Math.round(avgHours * 10) / 10}h/day
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProjectDetailView({ project, onBack }: ProjectDetailViewProps) {
  // Calculate project totals
  let totalHours = 0
  let totalBreakTime = 0
  const totalDays = project.attendanceRecords.length

  project.attendanceRecords.forEach((day) => {
    const stats = calculateWorkingHours(day.records)
    totalHours += stats.netHours
    totalBreakTime += stats.breakHours + stats.breakMinutes / 60
  })

  const avgHoursPerDay = totalDays > 0 ? totalHours / totalDays : 0
  const avgBreakPerDay = totalDays > 0 ? totalBreakTime / totalDays : 0

  // Sort attendance records by date (newest first)
  const sortedRecords = [...project.attendanceRecords].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 -ml-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance mb-2">{project.name}</h1>
              <div className="space-y-1 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {project.role}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {project.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <Badge variant={project.status === "Active" ? "default" : "secondary"} className="text-sm">
              {project.status}
            </Badge>
          </div>
        </div>

        {/* Project Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{Math.round(totalHours * 100) / 100}h</div>
                <div className="text-sm text-muted-foreground">Total Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalDays}</div>
                <div className="text-sm text-muted-foreground">Days Worked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round(avgHoursPerDay * 100) / 100}h</div>
                <div className="text-sm text-muted-foreground">Avg Hours/Day</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round(avgBreakPerDay * 60)}m</div>
                <div className="text-sm text-muted-foreground">Avg Break/Day</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <HoursSummary project={project} />
        <EnhancedBreakAnalysis project={project} />

        {/* Daily Attendance Records */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Daily Attendance Records</h2>
          {sortedRecords.map((dayRecord) => (
            <DayAttendanceCard key={dayRecord.date} dayRecord={dayRecord} />
          ))}
        </div>
      </div>
    </div>
  )
}
