"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, User } from "lucide-react";
import { ProjectDetailView } from "@/components/project-detail-view";

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
];

function calculateWorkingHours(records: Array<{ type: string; time: string }>) {
   const pairs = [];
   let checkIn = null;

   for (const record of records) {
      if (record.type === "check-in") {
         checkIn = record.time;
      } else if (record.type === "check-out" && checkIn) {
         pairs.push({ checkIn, checkOut: record.time });
         checkIn = null;
      }
   }

   let totalMinutes = 0;
   let breakMinutes = 0;

   for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      const checkInTime = new Date(`2024-01-01 ${pair.checkIn}`);
      const checkOutTime = new Date(`2024-01-01 ${pair.checkOut}`);
      const workMinutes =
         (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60);
      totalMinutes += workMinutes;

      if (i < pairs.length - 1) {
         const nextCheckIn = new Date(`2024-01-01 ${pairs[i + 1].checkIn}`);
         const breakTime =
            (nextCheckIn.getTime() - checkOutTime.getTime()) / (1000 * 60);
         breakMinutes += breakTime;
      }
   }

   return {
      totalHours: Math.floor(totalMinutes / 60),
      totalMinutes: totalMinutes % 60,
      breakHours: Math.floor(breakMinutes / 60),
      breakMinutes: breakMinutes % 60,
      netHours: totalMinutes / 60,
   };
}

function calculateProjectTotals(project: (typeof mockProjectData)[0]) {
   let totalHours = 0;
   const totalDays = project.attendanceRecords.length;
   let totalBreakTime = 0;

   project.attendanceRecords.forEach((day) => {
      const stats = calculateWorkingHours(day.records);
      totalHours += stats.netHours;
      totalBreakTime += stats.breakHours + stats.breakMinutes / 60;
   });

   const avgHoursPerDay = totalDays > 0 ? totalHours / totalDays : 0;

   return {
      totalHours: Math.round(totalHours * 100) / 100,
      totalDays,
      totalBreakTime: Math.round(totalBreakTime * 100) / 100,
      avgHoursPerDay: Math.round(avgHoursPerDay * 100) / 100,
   };
}

function ProjectSelectionCard({
   project,
   onSelect,
}: {
   project: (typeof mockProjectData)[0];
   onSelect: () => void;
}) {
   const stats = calculateProjectTotals(project);

   return (
      <Card
         className="cursor-pointer group transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02] hover:border-primary/20 hover:-translate-y-1"
         onClick={onSelect}
      >
         <CardHeader>
            <div className="flex items-start justify-between">
               <div className="space-y-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                     {project.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                     <User className="h-4 w-4 group-hover:text-primary transition-colors duration-300" />
                     {project.role}
                  </div>
               </div>
               <Badge
                  variant={
                     project.status === "Active" ? "default" : "secondary"
                  }
                  className="group-hover:scale-105 transition-transform duration-300"
               >
                  {project.status}
               </Badge>
            </div>
         </CardHeader>
         <CardContent>
            <div className="space-y-3">
               <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  <MapPin className="h-4 w-4 group-hover:text-primary transition-colors duration-300" />
                  {project.location}
               </div>
               <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  <Calendar className="h-4 w-4 group-hover:text-primary transition-colors duration-300" />
                  {new Date(project.startDate).toLocaleDateString()} -{" "}
                  {new Date(project.endDate).toLocaleDateString()}
               </div>

               <div className="grid grid-cols-3 gap-4 pt-3 border-t group-hover:border-primary/20 transition-colors duration-300">
                  <div className="text-center group-hover:scale-105 transition-transform duration-300">
                     <div className="text-lg font-semibold text-primary group-hover:text-primary/90">
                        {stats.totalHours}h
                     </div>
                     <div className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        Total Hours
                     </div>
                  </div>
                  <div className="text-center group-hover:scale-105 transition-transform duration-300">
                     <div className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                        {stats.totalDays}
                     </div>
                     <div className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        Days Worked
                     </div>
                  </div>
                  <div className="text-center group-hover:scale-105 transition-transform duration-300">
                     <div className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                        {stats.avgHoursPerDay.toFixed(1)}h
                     </div>
                     <div className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        Avg/Day
                     </div>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}

export default function AttendancePage() {
   const [selectedProject, setSelectedProject] = useState<
      (typeof mockProjectData)[0] | null
   >(null);

   const overallStats = mockProjectData.reduce(
      (acc, project) => {
         const projectStats = calculateProjectTotals(project);
         acc.totalHours += projectStats.totalHours;
         acc.totalDays += projectStats.totalDays;
         return acc;
      },
      { totalHours: 0, totalDays: 0 }
   );

   const activeProjects = mockProjectData.filter((p) => p.status === "Active");
   const completedProjects = mockProjectData.filter(
      (p) => p.status === "Completed"
   );

   if (selectedProject) {
      return (
         <ProjectDetailView
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
         />
      );
   }

   return (
      <div className="min-h-screen bg-background">
         <div className="container mx-auto px-4 py-6 max-w-6xl">
            <div className="mb-6">
               <h1 className="text-3xl font-bold text-balance mb-2">
                  My Projects
               </h1>
               <p className="text-muted-foreground">
                  Select a project to view detailed attendance records
               </p>
            </div>

            <Card className="mb-6">
               <CardHeader>
                  <CardTitle>Overall Summary</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                           {overallStats.totalHours.toFixed(1)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                           Total Hours
                        </div>
                     </div>
                     <div className="text-center">
                        <div className="text-2xl font-bold">
                           {overallStats.totalDays}
                        </div>
                        <div className="text-sm text-muted-foreground">
                           Days Worked
                        </div>
                     </div>
                     <div className="text-center">
                        <div className="text-2xl font-bold text-success">
                           {mockProjectData.length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                           Total Projects
                        </div>
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
         </div>
      </div>
   );
}
