"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CreateProject, ProjectStatus } from "@/lib/AdminApi/admin";
import { toast, Toaster } from "sonner";
import { Loader2 } from "lucide-react";

export default function AddProject() {
   const [formData, setFormData] = useState({
      name: "",
      location: "",
      startDate: "",
      description: "",
      budget: "",
      // status field removed
   });
   const [loading, setLoading] = useState(false);

   const handleInputChange = (
      field: keyof typeof formData,
      value: string
   ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      const ownerId = Number(localStorage.getItem("ownerId")); // get from localStorage
      const submitData = {
         ...formData,
         budget: Number(formData.budget),
         ownerId,
         status: ProjectStatus.DRAFT,
      };
      try {
         const res = await CreateProject(submitData);
         toast.success("Project created successfully");
         setFormData({
            name: "",
            location: "",
            startDate: "",
            description: "",
            budget: "",
         });
         console.log("Project created:", res);
         // Optionally show success message or redirect
      } catch (err) {
         toast.error("Error creating project");
         console.error("Error creating project:", err);
         // Optionally show error message
      } finally {
         setLoading(false);
      }
   };

   return (
      <>
         <Toaster position="top-right" richColors />
         <div className="min-h-screen py-8">
            <div className="max-w-6xl mx-auto space-y-8">
               {/* Header Section */}
               <div>
                  <div className="flex space-x-3 mb-4">
                     <h1 className="text-4xl font-bold">Add New Project</h1>
                  </div>
                  <p className="text-muted-foreground text-lg mb-6">
                     Create a new project with all the necessary details and
                     specifications.
                  </p>

                  <Link href="/admin" className="cursor-pointer">
                     <Button
                        variant="ghost"
                        className="text-primary hover:bg-primary/10 flex items-center space-x-2 cursor-pointer"
                     >
                        <span>Back to Dashboard</span>
                     </Button>
                  </Link>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-6 shadow-lg p-6 rounded-lg bg-card">
                     {/* Name */}
                     <div className="space-y-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                           id="name"
                           type="text"
                           placeholder="Enter project name"
                           value={formData.name}
                           onChange={(e) =>
                              handleInputChange("name", e.target.value)
                           }
                           required
                        />
                     </div>
                     {/* Location */}
                     <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                           id="location"
                           type="text"
                           placeholder="Enter project location"
                           value={formData.location}
                           onChange={(e) =>
                              handleInputChange("location", e.target.value)
                           }
                           required
                        />
                     </div>
                     {/* Start Date */}
                     <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                           id="startDate"
                           type="date"
                           value={formData.startDate}
                           onChange={(e) =>
                              handleInputChange("startDate", e.target.value)
                           }
                           required
                        />
                     </div>
                     {/* Description */}
                     <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                           id="description"
                           type="text"
                           placeholder="Enter description"
                           value={formData.description}
                           onChange={(e) =>
                              handleInputChange("description", e.target.value)
                           }
                           required
                        />
                     </div>
                     {/* Budget */}
                     <div className="space-y-2">
                        <Label htmlFor="budget">Budget</Label>
                        <Input
                           id="budget"
                           type="number"
                           placeholder="Enter budget"
                           value={formData.budget}
                           onChange={(e) =>
                              handleInputChange("budget", e.target.value)
                           }
                           required
                        />
                     </div>
                     {/* Status */}
                     {/* status input removed */}
                  </div>
                  {/* Submit Buttons */}
                  <div className="flex gap-4 justify-center pt-6">
                     <Button
                        type="submit"
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-3 text-lg font-semibold shadow-lg cursor-pointer flex items-center justify-center"
                        disabled={loading}
                     >
                        {loading ? (
                           <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Creating...
                           </>
                        ) : (
                           "Create Project"
                        )}
                     </Button>
                     <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="px-12 py-3 text-lg cursor-pointer hover:bg-muted"
                     >
                        Cancel
                     </Button>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}
