"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FolderOpen, Search, Plus } from "lucide-react";
import { Project, ProjectStatus } from "@/types";
import { ProjectItem } from "@/components/custom/project-item";
import { subDays, subWeeks, subMonths } from "date-fns";

export default function ProjectManagement() {
   const [searchQuery, setSearchQuery] = useState("");
   const [activeTab, setActiveTab] = useState<"all" | ProjectStatus>("all");

   // Dummy projects data
   const projects: Project[] = [
      {
         id: "1",
         name: "Downtown Office Complex",
         location: "New York, NY",
         workerCount: 45,
         startDate: subDays(new Date(), 30),
         status: "active",
         projectType: "commercial",
         endDate: new Date(2024, 11, 15),
         description: "Modern office complex with sustainable features",
         projectManager: "Sarah Wilson",
         createdAt: subDays(new Date(), 45),
         updatedAt: new Date(),
      },
      {
         id: "2",
         name: "Residential Tower A",
         location: "Los Angeles, CA",
         workerCount: 32,
         startDate: subDays(new Date(), 60),
         status: "active",
         projectType: "commercial",
         endDate: new Date(2025, 2, 20),
         description: "Luxury residential tower with amenities",
         projectManager: "Mike Johnson",
         createdAt: subDays(new Date(), 75),
         updatedAt: new Date(),
      },
      {
         id: "3",
         name: "Shopping Mall Renovation",
         location: "Chicago, IL",
         workerCount: 28,
         startDate: subWeeks(new Date(), 2),
         status: "pending",
         projectType: "commercial",
         endDate: new Date(2024, 10, 30),
         description: "Complete renovation of existing shopping mall",
         projectManager: "Emily Davis",
         createdAt: subWeeks(new Date(), 3),
         updatedAt: new Date(),
      },
      {
         id: "4",
         name: "Community Center Build",
         location: "Austin, TX",
         workerCount: 18,
         startDate: subDays(new Date(), 90),
         status: "hold",
         projectType: "local",
         endDate: new Date(2024, 12, 10),
         description: "New community center for local residents",
         projectManager: "David Martinez",
         createdAt: subDays(new Date(), 100),
         updatedAt: new Date(),
      },
      {
         id: "5",
         name: "Bridge Reconstruction",
         location: "Seattle, WA",
         workerCount: 55,
         startDate: subDays(new Date(), 15),
         status: "active",
         projectType: "local",
         endDate: new Date(2025, 1, 15),
         description: "Major bridge reconstruction project",
         projectManager: "Jennifer Taylor",
         createdAt: subDays(new Date(), 25),
         updatedAt: new Date(),
      },
      {
         id: "6",
         name: "School Extension",
         location: "Denver, CO",
         workerCount: 22,
         startDate: subDays(new Date(), 5),
         status: "pending",
         projectType: "local",
         endDate: new Date(2024, 11, 25),
         description: "Extension of existing elementary school",
         projectManager: "Robert Brown",
         createdAt: subDays(new Date(), 10),
         updatedAt: new Date(),
      },
      {
         id: "7",
         name: "Hospital Wing Addition",
         location: "Miami, FL",
         workerCount: 38,
         startDate: subMonths(new Date(), 2),
         status: "active",
         projectType: "commercial",
         endDate: new Date(2025, 3, 30),
         description: "New wing addition to general hospital",
         projectManager: "Lisa Anderson",
         createdAt: subMonths(new Date(), 3),
         updatedAt: new Date(),
      },
      {
         id: "8",
         name: "Warehouse Complex",
         location: "Phoenix, AZ",
         workerCount: 25,
         startDate: subDays(new Date(), 120),
         status: "hold",
         projectType: "commercial",
         endDate: new Date(2024, 10, 15),
         description: "Industrial warehouse and distribution center",
         projectManager: "Mark Thompson",
         createdAt: subDays(new Date(), 130),
         updatedAt: new Date(),
      },
   ];

   // Filter and search projects
   const filteredProjects = useMemo(() => {
      let filtered = projects;

      // Filter by tab
      if (activeTab !== "all") {
         filtered = filtered.filter((project) => project.status === activeTab);
      }

      // Filter by search query
      if (searchQuery) {
         filtered = filtered.filter((project) =>
            project.name.toLowerCase().includes(searchQuery.toLowerCase())
         );
      }

      return filtered;
   }, [projects, activeTab, searchQuery]);

   const handleViewDetails = (id: string) => {
      console.log("Viewing details for project:", id);
      // Here you would navigate to project details page
   };

   // Get counts for each status
   const statusCounts = {
      all: projects.length,
      active: projects.filter((p) => p.status === "active").length,
      pending: projects.filter((p) => p.status === "pending").length,
      hold: projects.filter((p) => p.status === "hold").length,
   };

   return (
      <div className="min-h-screen py-8">
         <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="text-center">
               <div className="flex items-center justify-center space-x-3 mb-4">
                  <FolderOpen className="h-8 w-8 text-primary" />
                  <h1 className="text-4xl font-bold">Project Management</h1>
               </div>
               <p className="text-muted-foreground text-lg mb-6">
                  Manage and monitor all your construction projects in one
                  place.
               </p>

               <div className="flex items-center justify-center space-x-4">
                  <Link href="/admin" className="cursor-pointer">
                     <Button
                        variant="ghost"
                        className="text-primary hover:bg-primary/10 flex items-center space-x-2 cursor-pointer"
                     >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Dashboard</span>
                     </Button>
                  </Link>

                  <Link href="/admin/add-project" className="cursor-pointer">
                     <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2 cursor-pointer">
                        <Plus className="h-4 w-4" />
                        <span>Add New Project</span>
                     </Button>
                  </Link>
               </div>
            </div>

            {/* Projects Section */}
            <Card className="shadow-lg">
               <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                     <FolderOpen className="h-6 w-6 text-primary" />
                     <span>All Projects</span>
                     <span className="text-sm font-normal text-muted-foreground">
                        ({filteredProjects.length})
                     </span>
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-6">
                  {/* Search Bar */}
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input
                        placeholder="Search projects by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 cursor-pointer"
                     />
                  </div>

                  {/* Tabs */}
                  <Tabs
                     value={activeTab}
                     onValueChange={(value) =>
                        setActiveTab(value as "all" | ProjectStatus)
                     }
                  >
                     <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all" className="cursor-pointer">
                           All ({statusCounts.all})
                        </TabsTrigger>
                        <TabsTrigger value="active" className="cursor-pointer">
                           Active ({statusCounts.active})
                        </TabsTrigger>
                        <TabsTrigger value="pending" className="cursor-pointer">
                           Pending ({statusCounts.pending})
                        </TabsTrigger>
                        <TabsTrigger value="hold" className="cursor-pointer">
                           On Hold ({statusCounts.hold})
                        </TabsTrigger>
                     </TabsList>

                     <TabsContent value={activeTab} className="mt-6">
                        {filteredProjects.length > 0 ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {filteredProjects.map((project) => (
                                 <ProjectItem
                                    key={project.id}
                                    project={project}
                                    onViewDetails={handleViewDetails}
                                 />
                              ))}
                           </div>
                        ) : (
                           <div className="text-center py-12">
                              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                              <h3 className="text-lg font-medium mb-2">
                                 No projects found
                              </h3>
                              <p className="text-muted-foreground mb-4">
                                 {searchQuery
                                    ? "Try adjusting your search criteria"
                                    : `No projects match the selected filter (${activeTab})`}
                              </p>
                              {activeTab === "all" && !searchQuery && (
                                 <Link
                                    href="/admin/add-project"
                                    className="cursor-pointer"
                                 >
                                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                                       <Plus className="h-4 w-4 mr-2" />
                                       Create Your First Project
                                    </Button>
                                 </Link>
                              )}
                           </div>
                        )}
                     </TabsContent>
                  </Tabs>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
