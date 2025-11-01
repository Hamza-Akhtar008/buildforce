"use client";

import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import { toast, Toaster } from "sonner";
import { CalendarIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CreateProject, ProjectStatus } from "@/lib/AdminApi/admin";

export default function AddProject() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    budget: "",
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

    const ownerId = Number(localStorage.getItem("ownerId"));
    const submitData = {
      ...formData,
      startDate: formData.startDate.split("T")[0],
      endDate: formData.endDate.split("T")[0],
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
        endDate: "",
        description: "",
        budget: "",
      });
      console.log("Project created:", res);
    } catch (err) {
      toast.error("Error creating project");
      console.error("Error creating project:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex space-x-3 mb-4">
              <h1 className="text-4xl font-bold">Add New Project</h1>
            </div>
            <p className="text-muted-foreground text-lg mb-6">
              Create a new project with all the necessary details and specifications.
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

          {/* Form */}
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
                  onChange={(e) => handleInputChange("name", e.target.value)}
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
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  required
                />
              </div>

              {/* Dates Section (side by side on large screens) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Date */}
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!formData.startDate && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate
                          ? format(new Date(formData.startDate), "PPP")
                          : "Pick a start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          formData.startDate
                            ? new Date(formData.startDate)
                            : undefined
                        }
                        onSelect={(date) => {
                          if (!date) return;
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);

                          if (date < today) {
                            toast.error("Start date cannot be in the past");
                            return;
                          }

                          handleInputChange("startDate", date.toISOString());

                          // Reset end date if it’s before new start date
                          if (
                            formData.endDate &&
                            new Date(formData.endDate) <= date
                          ) {
                            handleInputChange("endDate", "");
                          }
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!formData.endDate && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate
                          ? format(new Date(formData.endDate), "PPP")
                          : "Pick an end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          formData.endDate
                            ? new Date(formData.endDate)
                            : undefined
                        }
                        onSelect={(date) => {
                          if (!date) return;

                          if (
                            formData.startDate &&
                            date <= new Date(formData.startDate)
                          ) {
                            toast.error("End date must be after start date");
                            return;
                          }

                          handleInputChange("endDate", date.toISOString());
                        }}
                        disabled={(date) =>
                          formData.startDate
                            ? date <= new Date(formData.startDate)
                            : false
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Enter project description"
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
                  placeholder="Enter project budget"
                  value={formData.budget}
                  onChange={(e) =>
                    handleInputChange("budget", e.target.value)
                  }
                  required
                />
              </div>
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
