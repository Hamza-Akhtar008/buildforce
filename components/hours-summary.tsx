"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Clock, TrendingUp, Target, AlertCircle, CheckCircle2, DollarSign } from "lucide-react"

interface DayData {
  date: string
  project: string
  role: string
  location: string
  records: Array<{ type: string; time: string }>
}

interface SummaryStats {
  totalHours: number
  totalDays: number
  averageHoursPerDay: number
  overtimeHours: number
  undertimeHours: number
  totalBreakTime: number
  projectBreakdown: Array<{ project: string; hours: number; days: number }>
  dailyBreakdown: Array<{ date: string; hours: number; status: string }>
  weeklyTarget: number
  monthlyTarget: number
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
      if (breakTime > 5) breakMinutes += breakTime
    }
  }

  return {
    netHours: totalMinutes / 60,
    breakHours: breakMinutes / 60,
  }
}

function calculateSummaryStats(data: DayData[]): SummaryStats {
  let totalHours = 0
  let totalBreakTime = 0
  let overtimeHours = 0
  let undertimeHours = 0

  const projectBreakdown: Record<string, { hours: number; days: number }> = {}
  const dailyBreakdown = []

  for (const day of data) {
    const stats = calculateWorkingHours(day.records)
    totalHours += stats.netHours
    totalBreakTime += stats.breakHours

    if (stats.netHours > 8) {
      overtimeHours += stats.netHours - 8
    } else if (stats.netHours < 8) {
      undertimeHours += 8 - stats.netHours
    }

    // Project breakdown
    if (!projectBreakdown[day.project]) {
      projectBreakdown[day.project] = { hours: 0, days: 0 }
    }
    projectBreakdown[day.project].hours += stats.netHours
    projectBreakdown[day.project].days += 1

    // Daily breakdown
    const status = stats.netHours > 8 ? "overtime" : stats.netHours < 4 ? "short" : "normal"
    dailyBreakdown.push({
      date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      hours: Number(stats.netHours.toFixed(1)),
      status,
    })
  }

  return {
    totalHours,
    totalDays: data.length,
    averageHoursPerDay: totalHours / data.length,
    overtimeHours,
    undertimeHours,
    totalBreakTime,
    projectBreakdown: Object.entries(projectBreakdown).map(([project, stats]) => ({
      project,
      hours: stats.hours,
      days: stats.days,
    })),
    dailyBreakdown,
    weeklyTarget: 40,
    monthlyTarget: 160,
  }
}

interface HoursSummaryProps {
  data: DayData[]
}

export function HoursSummary({ data }: HoursSummaryProps) {
  const stats = calculateSummaryStats(data)
  const weeklyProgress = (stats.totalHours / stats.weeklyTarget) * 100
  const monthlyProgress = (stats.totalHours / stats.monthlyTarget) * 100

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1"]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <div className="text-sm font-medium">Total Hours</div>
            </div>
            <div className="text-2xl font-bold mt-2">{stats.totalHours.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Avg: {stats.averageHoursPerDay.toFixed(1)}h/day</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-overtime" />
              <div className="text-sm font-medium">Overtime</div>
            </div>
            <div className="text-2xl font-bold mt-2 text-overtime">{stats.overtimeHours.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">
              {((stats.overtimeHours / stats.totalHours) * 100).toFixed(1)}% of total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-success" />
              <div className="text-sm font-medium">Weekly Target</div>
            </div>
            <div className="text-2xl font-bold mt-2">{weeklyProgress.toFixed(0)}%</div>
            <Progress value={weeklyProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <div className="text-sm font-medium">Est. Earnings</div>
            </div>
            <div className="text-2xl font-bold mt-2">${(stats.totalHours * 25).toFixed(0)}</div>
            <div className="text-xs text-muted-foreground">@$25/hour</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Hours Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.dailyBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [`${value}h`, "Hours"]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Bar dataKey="hours" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Current: {stats.totalHours.toFixed(1)}h</span>
                    <span>Target: {stats.weeklyTarget}h</span>
                  </div>
                  <Progress value={weeklyProgress} />
                  <div className="text-xs text-muted-foreground">
                    {weeklyProgress >= 100 ? (
                      <span className="text-success flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Weekly target achieved!
                      </span>
                    ) : (
                      <span>{(stats.weeklyTarget - stats.totalHours).toFixed(1)}h remaining</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Break Time Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Break Time:</span>
                    <span className="font-mono">{stats.totalBreakTime.toFixed(1)}h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Average per Day:</span>
                    <span className="font-mono">{(stats.totalBreakTime / stats.totalDays).toFixed(1)}h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>% of Work Time:</span>
                    <span className="font-mono">{((stats.totalBreakTime / stats.totalHours) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Hours Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={stats.projectBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ project, hours }) => `${project}: ${hours.toFixed(1)}h`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="hours"
                    >
                      {stats.projectBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value.toFixed(1)}h`, "Hours"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.projectBreakdown.map((project, index) => (
                    <div key={project.project} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div>
                          <div className="font-medium text-sm">{project.project}</div>
                          <div className="text-xs text-muted-foreground">
                            {project.days} {project.days === 1 ? "day" : "days"}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{project.hours.toFixed(1)}h</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {stats.averageHoursPerDay >= 8 ? (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                      <span>Consistently meeting daily hour targets</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                      <span>Average daily hours below 8h target</span>
                    </div>
                  )}

                  {stats.overtimeHours > 0 && (
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-overtime mt-0.5" />
                      <span>{stats.overtimeHours.toFixed(1)}h of overtime this period</span>
                    </div>
                  )}

                  {stats.totalBreakTime / stats.totalDays < 0.5 && (
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                      <span>Consider taking more regular breaks</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {weeklyProgress < 100 && (
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="font-medium">Weekly Target</div>
                      <div className="text-muted-foreground">
                        Work {((stats.weeklyTarget - stats.totalHours) / (7 - stats.totalDays)).toFixed(1)}h per day for
                        remaining days to meet weekly target
                      </div>
                    </div>
                  )}

                  {stats.overtimeHours > 5 && (
                    <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                      <div className="font-medium text-warning">High Overtime</div>
                      <div className="text-muted-foreground">
                        Consider work-life balance with {stats.overtimeHours.toFixed(1)}h overtime
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                    <div className="font-medium text-success">Earnings Projection</div>
                    <div className="text-muted-foreground">
                      Monthly estimate: ${((stats.totalHours / stats.totalDays) * 30 * 25).toFixed(0)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
