"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
   ArrowLeft,
   Plus,
   Building,
   MapPin,
   FileText,
   Upload,
   User,
} from "lucide-react";
import { useState } from "react";
import { ProjectType, CreateProjectData } from "@/types";
import { DatePicker } from "@/components/ui/date-picker";

export default function AddProject() {
   const [formData, setFormData] = useState<CreateProjectData>({
      fullName: "",
      location: "",
      projectType: "local",
      startDate: "",
      endDate: "",
      description: "",
      projectManager: "",
   });

   const [projectImage, setProjectImage] = useState<File | null>(null);
   const [startDate, setStartDate] = useState<Date | undefined>();
   const [endDate, setEndDate] = useState<Date | undefined>();

   const handleInputChange = (
      field: keyof CreateProjectData,
      value: string
   ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
   };

   const handleProjectTypeChange = (value: ProjectType) => {
      setFormData((prev) => ({ ...prev, projectType: value }));
   };

   const handleProjectManagerChange = (value: string) => {
      setFormData((prev) => ({ ...prev, projectManager: value }));
   };

   const handleImageChange = (file: File | null) => {
      setProjectImage(file);
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Update formData with selected dates
      const projectData = {
         ...formData,
         startDate: startDate?.toISOString().split("T")[0] || "",
         endDate: endDate?.toISOString().split("T")[0] || "",
      };
      console.log("Creating project:", projectData);
      console.log("Project image:", projectImage);
      // Handle form submission here
   };

   return (
      <div className="min-h-screen py-8">
         <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="text-center">
               <div className="flex items-center justify-center space-x-3 mb-4">
                  <Plus className="h-8 w-8 text-primary" />
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
                     <ArrowLeft className="h-4 w-4" />
                     <span>Back to Dashboard</span>
                  </Button>
               </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Project Information Card */}
               <Card className="shadow-lg">
                  <CardHeader>
                     <CardTitle className="flex items-center space-x-2">
                        <Building className="h-5 w-5 text-primary" />
                        <span>Project Information</span>
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     {/* Full Name */}
                     <div className="space-y-2">
                        <Label htmlFor="fullName">Project Name</Label>
                        <div className="relative">
                           <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input
                              id="fullName"
                              type="text"
                              placeholder="Enter project name"
                              className="pl-10"
                              value={formData.fullName}
                              onChange={(e) =>
                                 handleInputChange("fullName", e.target.value)
                              }
                              required
                           />
                        </div>
                     </div>

                     {/* Location */}
                     <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                           <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input
                              id="location"
                              type="text"
                              placeholder="Enter project location"
                              className="pl-10"
                              value={formData.location}
                              onChange={(e) =>
                                 handleInputChange("location", e.target.value)
                              }
                              required
                           />
                        </div>
                     </div>

                     {/* Project Type */}
                     <div className="space-y-2">
                        <Label>Project Type</Label>
                        <Select
                           value={formData.projectType}
                           onValueChange={handleProjectTypeChange}
                        >
                           <SelectTrigger>
                              <SelectValue placeholder="Select project type" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="commercial">
                                 Commercial
                              </SelectItem>
                              <SelectItem value="local">Local</SelectItem>
                              <SelectItem value="personal">Personal</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>

                     {/* Date Range */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label>Start Date</Label>
                           <DatePicker
                              date={startDate}
                              onSelect={setStartDate}
                              placeholder="Select start date"
                           />
                        </div>

                        <div className="space-y-2">
                           <Label>End Date</Label>
                           <DatePicker
                              date={endDate}
                              onSelect={setEndDate}
                              placeholder="Select end date"
                           />
                        </div>
                     </div>

                     {/* Project Manager */}
                     <div className="space-y-2">
                        <Label>Project Manager</Label>
                        <Select
                           value={formData.projectManager}
                           onValueChange={handleProjectManagerChange}
                        >
                           <SelectTrigger>
                              <SelectValue placeholder="Select project manager" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="john-doe">John Doe</SelectItem>
                              <SelectItem value="jane-smith">
                                 Jane Smith
                              </SelectItem>
                              <SelectItem value="mike-johnson">
                                 Mike Johnson
                              </SelectItem>
                              <SelectItem value="sarah-wilson">
                                 Sarah Wilson
                              </SelectItem>
                              <SelectItem value="david-brown">
                                 David Brown
                              </SelectItem>
                           </SelectContent>
                        </Select>
                     </div>

                     {/* Project Description */}
                     <div className="space-y-2">
                        <Label htmlFor="description">Project Description</Label>
                        <div className="relative">
                           <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                           <Textarea
                              id="description"
                              placeholder="Enter detailed project description..."
                              className="pl-10 min-h-[120px] resize-none"
                              value={formData.description}
                              onChange={(e) =>
                                 handleInputChange(
                                    "description",
                                    e.target.value
                                 )
                              }
                              required
                           />
                        </div>
                     </div>

                     {/* Project Image */}
                     <div className="space-y-2">
                        <Label htmlFor="projectImage">Project Image</Label>
                        <div className="flex items-center space-x-4">
                           <div className="flex-1">
                              <input
                                 id="projectImage"
                                 type="file"
                                 accept="image/*"
                                 onChange={(e) =>
                                    handleImageChange(
                                       e.target.files?.[0] || null
                                    )
                                 }
                                 className="hidden"
                              />
                              <Button
                                 type="button"
                                 variant="outline"
                                 className="w-full cursor-pointer"
                                 onClick={() =>
                                    document
                                       .getElementById("projectImage")
                                       ?.click()
                                 }
                              >
                                 <Upload className="h-4 w-4 mr-2" />
                                 {projectImage
                                    ? projectImage.name
                                    : "Choose Project Image"}
                              </Button>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Submit Buttons */}
               <div className="flex gap-4 justify-center pt-6">
                  <Button
                     type="submit"
                     size="lg"
                     className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-3 text-lg font-semibold shadow-lg cursor-pointer"
                  >
                     <Plus className="h-5 w-5 mr-3" />
                     Create Project
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
   );
}
