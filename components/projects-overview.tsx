"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Calendar, Users } from "lucide-react"

interface Project {
  name: string
  role?: string
  location: string
  daysWorked: number
  totalHours: number
  lastWorked: string
}

interface ProjectsOverviewProps {
  projects: Project[]
}

export function ProjectsOverview({ projects }: ProjectsOverviewProps) {
  // Group projects by month for better organization
  const groupedProjects = projects.reduce(
    (acc, project) => {
      const date = new Date(project.lastWorked)
      const monthKey = date.toLocaleDateString("en-US", { year: "numeric", month: "long" })

      if (!acc[monthKey]) {
        acc[monthKey] = []
      }
      acc[monthKey].push(project)
      return acc
    },
    {} as Record<string, Project[]>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Projects Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedProjects).map(([month, monthProjects]) => (
            <div key={month}>
              <h3 className="text-lg font-semibold mb-3 text-muted-foreground">{month}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {monthProjects.map((project, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-balance leading-tight">{project.name}</h4>
                        <Badge variant="outline" className="ml-2 shrink-0">
                          {project.totalHours.toFixed(1)}h
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        {project.role && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{project.role}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-pretty">{project.location}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {project.daysWorked} {project.daysWorked === 1 ? "day" : "days"} worked
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Last worked: {new Date(project.lastWorked).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
