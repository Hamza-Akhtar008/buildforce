"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import {
   Plus,
   Edit,
   Trash2,
   MapPin,
   Clock,
   Wrench,
   MessageSquare,
   HardHat,
   Building,
   ArrowRight,
} from "lucide-react";

interface Project {
   id: string;
   name: string;
   role: string;
   location: string;
   duration: string;
   tools: string;
   remarks: string;
}

export default function PreInterviewProjectShowcasePage() {
   const router = useRouter();
   const [projects, setProjects] = useState<Project[]>([]);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [editingProject, setEditingProject] = useState<Project | null>(null);
   const [formData, setFormData] = useState({
      name: "",
      role: "",
      location: "",
      duration: "",
      tools: "",
      remarks: "",
   });

   const resetForm = () => {
      setFormData({
         name: "",
         role: "",
         location: "",
         duration: "",
         tools: "",
         remarks: "",
      });
      setEditingProject(null);
   };

   const openAddDialog = () => {
      resetForm();
      setIsDialogOpen(true);
   };

   const openEditDialog = (project: Project) => {
      setFormData({
         name: project.name,
         role: project.role,
         location: project.location,
         duration: project.duration,
         tools: project.tools,
         remarks: project.remarks,
      });
      setEditingProject(project);
      setIsDialogOpen(true);
   };

   const handleProjectSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (
         !formData.name.trim() ||
         !formData.role.trim() ||
         !formData.location.trim() ||
         !formData.duration.trim()
      ) {
         return; // Basic validation
      }

      if (editingProject) {
         // Update existing project
         setProjects((prev) =>
            prev.map((project) =>
               project.id === editingProject.id
                  ? { ...project, ...formData }
                  : project
            )
         );
      } else {
         // Add new project
         const newProject: Project = {
            id: Date.now().toString(),
            ...formData,
         };
         setProjects((prev) => [...prev, newProject]);
      }

      setIsDialogOpen(false);
      resetForm();
   };

   const removeProject = (id: string) => {
      setProjects((prev) => prev.filter((project) => project.id !== id));
   };

   const handleInputChange = (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
   };

   const handleSubmit = () => {
      // Handle final submission
      console.log("Submitted projects:", projects);
      // Navigate to completion page
      router.push("/unverified/select-interview");
   };

   return (
      <div className="min-h-screen py-8 bg-background text-foreground">
         <div className="max-w-4xl mx-auto px-6 space-y-8">
            {/* Header Section */}
            <div className="space-y-6">
               <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                     <Building className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                     <h1 className="text-4xl font-bold">Project Showcase</h1>
                     <p className="text-muted-foreground text-lg">
                        Showcase your previous construction projects and
                        experience
                     </p>
                     <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-md font-medium">
                           Optional
                        </span>
                        <span className="text-sm text-muted-foreground">
                           You can skip this step and submit without adding
                           projects
                        </span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Add Project Button */}
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-bold">Your Projects</h2>

               <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                     <Button
                        onClick={openAddDialog}
                        className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90"
                     >
                        <Plus className="h-4 w-4" />
                        <span>Add Project</span>
                     </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-md">
                     <DialogHeader>
                        <DialogTitle>
                           {editingProject ? "Edit Project" : "Add New Project"}
                        </DialogTitle>
                     </DialogHeader>

                     <form onSubmit={handleProjectSubmit} className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="name">Project Name *</Label>
                           <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) =>
                                 handleInputChange("name", e.target.value)
                              }
                              placeholder="e.g. Office Building Construction"
                              required
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="role">Role *</Label>
                           <Input
                              id="role"
                              value={formData.role}
                              onChange={(e) =>
                                 handleInputChange("role", e.target.value)
                              }
                              placeholder="e.g. Mason, Carpenter, Site Supervisor"
                              required
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="location">Location *</Label>
                           <Input
                              id="location"
                              value={formData.location}
                              onChange={(e) =>
                                 handleInputChange("location", e.target.value)
                              }
                              placeholder="e.g. Dubai, UAE"
                              required
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="duration">Duration *</Label>
                           <Input
                              id="duration"
                              value={formData.duration}
                              onChange={(e) =>
                                 handleInputChange("duration", e.target.value)
                              }
                              placeholder="e.g. 6 months, 1 year"
                              required
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="tools">Tools Used (Optional)</Label>
                           <Input
                              id="tools"
                              value={formData.tools}
                              onChange={(e) =>
                                 handleInputChange("tools", e.target.value)
                              }
                              placeholder="e.g. Hammer, Drill, Crane, etc."
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="remarks">Remarks (Optional)</Label>
                           <Textarea
                              id="remarks"
                              value={formData.remarks}
                              onChange={(e) =>
                                 handleInputChange("remarks", e.target.value)
                              }
                              placeholder="Additional details about the project..."
                              rows={3}
                           />
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                           <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsDialogOpen(false)}
                           >
                              Cancel
                           </Button>
                           <Button
                              type="submit"
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                           >
                              {editingProject
                                 ? "Update Project"
                                 : "Add Project"}
                           </Button>
                        </div>
                     </form>
                  </DialogContent>
               </Dialog>
            </div>

            {/* Projects List */}
            <div className="space-y-6">
               {projects.length === 0 ? (
                  <div className="text-center py-16">
                     <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                        <Building className="h-12 w-12 text-muted-foreground" />
                     </div>
                     <h3 className="text-3xl font-bold text-muted-foreground mb-2">
                        No projects added
                     </h3>
                     <p className="text-muted-foreground text-lg">
                        Start by adding your first construction project to
                        showcase your experience
                     </p>
                  </div>
               ) : (
                  <div className="grid grid-cols-1 gap-6">
                     {projects.map((project) => (
                        <Card
                           key={project.id}
                           className="shadow-md hover:shadow-lg transition-shadow"
                        >
                           <CardHeader>
                              <div className="flex items-start justify-between">
                                 <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                       <HardHat className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                       <CardTitle className="text-xl">
                                          {project.name}
                                       </CardTitle>
                                       <p className="text-sm text-muted-foreground font-medium">
                                          {project.role}
                                       </p>
                                    </div>
                                 </div>

                                 <div className="flex items-center space-x-2">
                                    <Button
                                       variant="ghost"
                                       size="sm"
                                       onClick={() => openEditDialog(project)}
                                       className="text-primary hover:text-primary/80 hover:bg-primary/10"
                                    >
                                       <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                       variant="ghost"
                                       size="sm"
                                       onClick={() => removeProject(project.id)}
                                       className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                       <Trash2 className="h-4 w-4" />
                                    </Button>
                                 </div>
                              </div>
                           </CardHeader>

                           <CardContent className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                       {project.location}
                                    </span>
                                 </div>

                                 <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                       {project.duration}
                                    </span>
                                 </div>
                              </div>

                              {project.tools && (
                                 <div className="flex items-start space-x-2">
                                    <Wrench className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                       <p className="text-sm font-medium">
                                          Tools Used:
                                       </p>
                                       <p className="text-sm text-muted-foreground">
                                          {project.tools}
                                       </p>
                                    </div>
                                 </div>
                              )}

                              {project.remarks && (
                                 <div className="flex items-start space-x-2">
                                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                       <p className="text-sm font-medium">
                                          Remarks:
                                       </p>
                                       <p className="text-sm text-muted-foreground">
                                          {project.remarks}
                                       </p>
                                    </div>
                                 </div>
                              )}
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               )}
            </div>

            {/* Summary */}
            {projects.length > 0 && (
               <div className="text-center pt-8">
                  <p className="text-muted-foreground">
                     Total Projects:{" "}
                     <span className="font-semibold text-primary">
                        {projects.length}
                     </span>
                  </p>
               </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-8 border-t border-border">
               <Button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-3 text-lg"
               >
                  <span>Submit Application</span>
                  <ArrowRight className="h-5 w-5" />
               </Button>
            </div>

            {/* Help Text */}
            <div className="text-center text-sm text-muted-foreground pb-8">
               <p>
                  By submitting, you confirm that all information provided is
                  accurate and complete.
               </p>
            </div>
         </div>
      </div>
   );
}
