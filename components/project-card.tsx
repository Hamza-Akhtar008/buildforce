"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, MapPin, Calendar, DollarSign, Clock, Coffee } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    role: string
    location: string
    status: string
    startDate: string
    endDate: string
    hourlyRate: number
    attendanceRecords: Array<{
      date: string
      records: Array<{ type: string; time: string }>
    }>
  }
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
  }
}

function calculateProjectTotals(project: ProjectCardProps["project"]) {
  let totalHours = 0
  const totalDays = project.attendanceRecords.length
  let totalBreakTime = 0

  project.attendanceRecords.forEach((day) => {
    const stats = calculateWorkingHours(day.records)
    totalHours += stats.netHours
    totalBreakTime += stats.breakHours + stats.breakMinutes / 60
  })

  const estimatedEarnings = totalHours * project.hourlyRate
  const avgHoursPerDay = totalDays > 0 ? totalHours / totalDays : 0

  return {
    totalHours: Math.round(totalHours * 100) / 100,
    totalDays,
    totalBreakTime: Math.round(totalBreakTime * 100) / 100,
    estimatedEarnings: Math.round(estimatedEarnings * 100) / 100,
    avgHoursPerDay: Math.round(avgHoursPerDay * 100) / 100,
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "completed":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "paused":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const projectStats = calculateProjectTotals(project)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl">{project.name}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {project.location}
              </div>
              <Badge variant="outline" className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">${projectStats.estimatedEarnings}</div>
            <div className="text-sm text-muted-foreground">Total Earnings</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Project Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">{projectStats.totalHours}h</div>
            <div className="text-xs text-muted-foreground">Total Hours</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{projectStats.totalDays}</div>
            <div className="text-xs text-muted-foreground">Days Worked</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{projectStats.avgHoursPerDay.toFixed(1)}h</div>
            <div className="text-xs text-muted-foreground">Avg/Day</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">${project.hourlyRate}</div>
            <div className="text-xs text-muted-foreground">Hourly Rate</div>
          </div>
        </div>

        {/* Project Details */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="font-medium">{project.role}</span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {formatDate(project.startDate)} - {formatDate(project.endDate)}
            </div>
          </div>
        </div>

        {/* Attendance Records Toggle */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full bg-transparent">
              <span>View Attendance Records ({project.attendanceRecords.length} days)</span>
              {isOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-3 mt-4">
            {project.attendanceRecords.map((dayRecord, index) => {
              const dayStats = calculateWorkingHours(dayRecord.records)
              const isOvertime = dayStats.netHours > 8
              const isShortDay = dayStats.netHours < 7

              return (
                <Card key={index} className="border-l-4 border-l-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">{formatDate(dayRecord.date)}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant={isOvertime ? "default" : isShortDay ? "destructive" : "secondary"}>
                          {dayStats.netHours.toFixed(1)}h
                        </Badge>
                        {isOvertime && (
                          <Badge variant="outline" className="text-green-600">
                            Overtime
                          </Badge>
                        )}
                        {isShortDay && (
                          <Badge variant="outline" className="text-orange-600">
                            Short Day
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Time Records */}
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-sm font-medium mb-1">Work Periods</div>
                        <div className="space-y-1">
                          {dayRecord.records
                            .reduce((pairs, record, i) => {
                              if (record.type === "check-in") {
                                const nextRecord = dayRecord.records[i + 1]
                                if (nextRecord && nextRecord.type === "check-out") {
                                  pairs.push(`${record.time} - ${nextRecord.time}`)
                                }
                              }
                              return pairs
                            }, [] as string[])
                            .map((period, i) => (
                              <div key={i} className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {period}
                              </div>
                            ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-1">Summary</div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div>
                            Work: {dayStats.totalHours}h {dayStats.totalMinutes}m
                          </div>
                          {dayStats.breakHours > 0 || dayStats.breakMinutes > 0 ? (
                            <div className="flex items-center gap-1">
                              <Coffee className="h-3 w-3" />
                              Break: {dayStats.breakHours}h {dayStats.breakMinutes}m
                            </div>
                          ) : null}
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            Earned: ${(dayStats.netHours * project.hourlyRate).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
