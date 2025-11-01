"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FolderOpen, Search, Plus, Loader2 } from "lucide-react";
import { ProjectStatus } from "@/lib/AdminApi/admin";
import { ProjectItem } from "@/components/custom/project-item";

export default function ProjectManagement() {
   const [searchQuery, setSearchQuery] = useState("");
   const [activeTab, setActiveTab] = useState<"all" | ProjectStatus>("all");
   const [projects, setProjects] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchProjects = async () => {
         setLoading(true);
         const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://192.168.1.20:5000/";
         try {
            const res = await fetch(`${backendUrl}project`);
            const data = await res.json();
            // Map API response with correct fields
            setProjects(
               data.map((p: any) => ({
                  id: String(p.id),
                  name: p.name || "",
                  location: p.location || "",
                  startDate: new Date(p.startDate),
                  description: p.description || "",
                  budget: p.budget || "0",
                  status: p.status || ProjectStatus.DRAFT,
                  createdAt: new Date(p.createdAt),
                  updatedAt: new Date(p.updatedAt),
               }))
            );
         } catch (err) {
            setProjects([]);
         } finally {
            setLoading(false);
         }
      };
      fetchProjects();
   }, []);

   // Filter and search projects
   const filteredProjects = useMemo(() => {
      let filtered = projects;

      if (activeTab !== "all") {
         filtered = filtered.filter((project) => project.status === activeTab);
      }

      if (searchQuery) {
         filtered = filtered.filter((project) =>
            project.name?.toLowerCase().includes(searchQuery.toLowerCase())
         );
      }

      return filtered;
   }, [projects, activeTab, searchQuery]);

   // Get counts for each status
   const statusCounts = {
      all: projects.length,
      open: projects.filter((p) => p.status === ProjectStatus.OPEN).length,
      draft: projects.filter((p) => p.status === ProjectStatus.DRAFT).length,
      closed: projects.filter((p) => p.status === ProjectStatus.CLOSED).length,
      completed: projects.filter((p) => p.status === ProjectStatus.COMPLETED).length,
   };

   return (
      <div className="min-h-screen py-8">
         {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70">
               <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
         )}
         <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
        <div>
  <div className="flex space-x-3 mb-4">
    <FolderOpen className="h-8 w-8 text-primary" />
    <h1 className="text-4xl font-bold">Project Management</h1>
  </div>

  <p className="text-muted-foreground text-lg mb-6">
    Manage and monitor all your construction projects in one place.
  </p>

  <div className="flex items-center">
    {/* Back Button */}
    <Link href="/admin" className="cursor-pointer">
      <Button
        variant="ghost"
        className="text-primary hover:bg-primary/10 flex items-center space-x-2 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Dashboard</span>
      </Button>
    </Link>

    {/* Add Button (pushed to the right) */}
    <Link href="/admin/add-project" className="cursor-pointer ml-auto">
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
                     <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="all" className="cursor-pointer">
                           All ({statusCounts.all})
                        </TabsTrigger>
                        <TabsTrigger value={ProjectStatus.OPEN} className="cursor-pointer">
                           Open ({statusCounts.open})
                        </TabsTrigger>
                        <TabsTrigger value={ProjectStatus.DRAFT} className="cursor-pointer">
                           Draft ({statusCounts.draft})
                        </TabsTrigger>
                        <TabsTrigger value={ProjectStatus.CLOSED} className="cursor-pointer">
                           Closed ({statusCounts.closed})
                        </TabsTrigger>
                        <TabsTrigger value={ProjectStatus.COMPLETED} className="cursor-pointer">
                           Completed ({statusCounts.completed})
                        </TabsTrigger>
                     </TabsList>
                     <TabsContent value={activeTab} className="mt-6">
                        {filteredProjects.length > 0 ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {filteredProjects.map((project) => (
                                 <ProjectItem
                                    key={project.id}
                                    project={project}
                                    onViewDetails={() => {}}
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
