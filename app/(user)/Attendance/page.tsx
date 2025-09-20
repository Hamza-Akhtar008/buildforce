"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Clock, User, LayoutGrid, List } from "lucide-react"
import { ProjectDetailView } from "@/components/project-detail-view"

const mockProjectData = [
  {
    id: "project-1",
    name: "Downtown Office Complex",
    role: "Electrician",
    location: "123 Main St, Downtown",
    status: "Active",
    startDate: "2024-01-10",
    endDate: "2024-02-15",
    attendanceRecords: [
      {
        date: "2024-01-15",
        records: [
          { type: "check-in", time: "08:00" },
          { type: "check-out", time: "12:00" },
          { type: "check-in", time: "13:00" },
          { type: "check-out", time: "17:30" },
        ],
      },
      {
        date: "2024-01-12",
        records: [
          { type: "check-in", time: "08:15" },
          { type: "check-out", time: "12:15" },
          { type: "check-in", time: "13:15" },
          { type: "check-out", time: "17:45" },
        ],
      },
      {
        date: "2024-01-11",
        records: [
          { type: "check-in", time: "07:45" },
          { type: "check-out", time: "16:30" },
        ],
      },
    ],
  },
  {
    id: "project-2",
    name: "Residential Building A",
    role: "Plumber",
    location: "456 Oak Ave, Suburbs",
    status: "Active",
    startDate: "2024-01-08",
    endDate: "2024-01-25",
    attendanceRecords: [
      {
        date: "2024-01-14",
        records: [
          { type: "check-in", time: "07:30" },
          { type: "check-out", time: "11:30" },
          { type: "check-in", time: "12:30" },
          { type: "check-out", time: "16:00" },
        ],
      },
      {
        date: "2024-01-10",
        records: [
          { type: "check-in", time: "08:00" },
          { type: "check-out", time: "17:00" },
        ],
      },
    ],
  },
  {
    id: "project-3",
    name: "Shopping Mall Renovation",
    role: "General Labor",
    location: "789 Commerce Blvd, Mall District",
    status: "Completed",
    startDate: "2024-01-05",
    endDate: "2024-01-13",
    attendanceRecords: [
      {
        date: "2024-01-13",
        records: [
          { type: "check-in", time: "09:00" },
          { type: "check-out", time: "18:00" },
        ],
      },
      {
        date: "2024-01-09",
        records: [
          { type: "check-in", time: "08:30" },
          { type: "check-out", time: "12:30" },
          { type: "check-in", time: "13:30" },
          { type: "check-out", time: "17:30" },
        ],
      },
    ],
  },
]

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

function calculateProjectTotals(project: (typeof mockProjectData)[0]) {
  let totalHours = 0
  const totalDays = project.attendanceRecords.length
  let totalBreakTime = 0

  project.attendanceRecords.forEach((day) => {
    const stats = calculateWorkingHours(day.records)
    totalHours += stats.netHours
    totalBreakTime += stats.breakHours + stats.breakMinutes / 60
  })

  const avgHoursPerDay = totalDays > 0 ? totalHours / totalDays : 0

  return {
    totalHours: Math.round(totalHours * 100) / 100,
    totalDays,
    totalBreakTime: Math.round(totalBreakTime * 100) / 100,
    avgHoursPerDay: Math.round(avgHoursPerDay * 100) / 100,
  }
}

function ProjectSelectionCard({ project, onSelect }: { project: (typeof mockProjectData)[0]; onSelect: () => void }) {
  const stats = calculateProjectTotals(project)

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onSelect}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              {project.role}
            </div>
          </div>
          <Badge variant={project.status === "Active" ? "default" : "secondary"}>{project.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {project.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-3 border-t">
            <div className="text-center">
              <div className="text-lg font-semibold text-primary">{stats.totalHours}h</div>
              <div className="text-xs text-muted-foreground">Total Hours</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{stats.totalDays}</div>
              <div className="text-xs text-muted-foreground">Days Worked</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{stats.avgHoursPerDay.toFixed(1)}h</div>
              <div className="text-xs text-muted-foreground">Avg/Day</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DailyAttendanceCards() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProject, setSelectedProject] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("")

  // Sample data converted from existing mock data
  const attendanceData = mockProjectData.flatMap((project) =>
    project.attendanceRecords.map((record) => ({
      id: `${project.id}-${record.date}`,
      date: record.date,
      projectName: project.name,
      location: project.location,
      records: record.records,
      role: project.role,
    })),
  )

  const ITEMS_PER_PAGE = 6

  // Get unique projects for filter
  const projects = [...new Set(attendanceData.map((item) => item.projectName))]

  // Filter data based on selected filters
  const filteredData = attendanceData.filter((item) => {
    const projectMatch = selectedProject === "all" || item.projectName === selectedProject
    const dateMatch = !dateFilter || item.date.includes(dateFilter)
    return projectMatch && dateMatch
  })

  // Paginate filtered data
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
        >
          <option value="all">All Projects</option>
          {projects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>

        <input
          type="month"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          placeholder="Filter by date"
        />
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {paginatedData.length} of {filteredData.length} records
        </span>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Attendance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedData.map((record) => {
          const workingHours = calculateWorkingHours(record.records)

          return (
            <Card key={record.id} className="border-border/50 hover:border-border transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold text-foreground">{record.projectName}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {record.location}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      {record.role}
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {workingHours.netHours.toFixed(1)}h
                  </Badge>
                </div>

                <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(record.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Clock in/out history */}
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Clock History</div>
                  <div className="space-y-1">
                    {record.records.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Clock className={`h-3 w-3 ${entry.type === "check-in" ? "text-green-400" : "text-red-400"}`} />
                        <span className="capitalize">{entry.type.replace("-", " ")}</span>
                        <span className="font-medium">{entry.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hours Summary */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Working Hours</div>
                    <div className="text-lg font-bold text-foreground">{workingHours.netHours.toFixed(1)}h</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Break Time</div>
                    <div className="text-lg font-bold text-foreground">
                      {workingHours.breakHours}h {workingHours.breakMinutes}m
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* No Results */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">No attendance records found for the selected filters.</div>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedProject("all")
              setDateFilter("")
              setCurrentPage(1)
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default function AttendancePage() {
  const [selectedProject, setSelectedProject] = useState<(typeof mockProjectData)[0] | null>(null)
  const [currentView, setCurrentView] = useState<"projects" | "daily">("daily")

  const overallStats = mockProjectData.reduce(
    (acc, project) => {
      const projectStats = calculateProjectTotals(project)
      acc.totalHours += projectStats.totalHours
      acc.totalDays += projectStats.totalDays
      return acc
    },
    { totalHours: 0, totalDays: 0 },
  )

  const activeProjects = mockProjectData.filter((p) => p.status === "Active")
  const completedProjects = mockProjectData.filter((p) => p.status === "Completed")

  if (selectedProject) {
    return <ProjectDetailView project={selectedProject} onBack={() => setSelectedProject(null)} />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-balance mb-2">
              {currentView === "projects" ? "My Projects" : "Daily Attendance Records"}
            </h1>
            <p className="text-muted-foreground">
              {currentView === "projects"
                ? "Select a project to view detailed attendance records"
                : "Track your daily work history across all projects"}
            </p>
          </div>

          <div className="flex gap-2">
            
            <Button
              variant={currentView === "daily" ? "default" : "outline"}
              onClick={() => setCurrentView("daily")}
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              Daily Cards
            </Button>
          </div>
        </div>

        {currentView === "projects" ? (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Overall Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{overallStats.totalHours.toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground">Total Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{overallStats.totalDays}</div>
                    <div className="text-sm text-muted-foreground">Days Worked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{mockProjectData.length}</div>
                    <div className="text-sm text-muted-foreground">Total Projects</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {activeProjects.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-500" />
                    Active Projects ({activeProjects.length})
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {activeProjects.map((project) => (
                      <ProjectSelectionCard
                        key={project.id}
                        project={project}
                        onSelect={() => setSelectedProject(project)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {completedProjects.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    Completed Projects ({completedProjects.length})
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {completedProjects.map((project) => (
                      <ProjectSelectionCard
                        key={project.id}
                        project={project}
                        onSelect={() => setSelectedProject(project)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <DailyAttendanceCards />
        )}
      </div>
    </div>
  )
}
