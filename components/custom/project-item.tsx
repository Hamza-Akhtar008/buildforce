"use client";

import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { MapPin, Calendar, FileText, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface ProjectItemProps {
   project: Project;
   onViewDetails: (id: string) => void;
   className?: string;
}

export function ProjectItem({
   project,
   onViewDetails,
   className,
}: ProjectItemProps) {
   const { name, location, startDate, status } = project;

   const statusText = String(status).toLowerCase();
   const statusStyles = {
      draft:      { dot: "bg-slate-500",   chip: "bg-slate-600 text-white border-transparent" },
      open:       { dot: "bg-green-500",   chip: "bg-green-600 text-white border-transparent" },
      closed:     { dot: "bg-red-500",     chip: "bg-red-600 text-white border-transparent" },
      completed:  { dot: "bg-blue-500",    chip: "bg-blue-600 text-white border-transparent" },
      default:    { dot: "bg-gray-500",    chip: "bg-gray-600 text-white border-transparent" },
   } as const;

   const styles = (statusStyles as any)[statusText] || statusStyles.default;

   return (
      <div
         className={cn(
            "bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow",
            className
         )}
      >
         {/* Header */}
         <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
               <h3 className="text-lg font-semibold mb-2">{name}</h3>
               <div className="flex items-center space-x-1 mb-2">
                  <div className={cn("w-2 h-2 rounded-full", styles.dot)} />
                  <span
                     className={cn(
                        "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border",
                        styles.chip
                     )}
                  >
                     {statusText.charAt(0).toUpperCase() + statusText.slice(1)}
                  </span>
               </div>
            </div>
         </div>

         {/* Project Details */}
         <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
               <MapPin className="h-4 w-4" />
               <span>{location || "No location"}</span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
               <Calendar className="h-4 w-4" />
               <span>Started {format(new Date(startDate), "MMM d, yyyy")}</span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
               <FileText className="h-4 w-4" />
               <span>{project.description || "No description"}</span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
               <DollarSign className="h-4 w-4" />
               <span>
                  {typeof project.budget === 'string' && project.budget 
                    ? `$${parseFloat(project.budget).toFixed(2)}` 
                    : '$0.00'
                  }
               </span>
            </div>
         </div>
      </div>
   );
}
