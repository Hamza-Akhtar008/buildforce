"use client";

import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Calendar, Eye } from "lucide-react";
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
   const { id, name, location, workerCount, startDate, status } = project;

   const getStatusColor = (status: string) => {
      switch (status) {
         case "active":
            return "bg-green-500/20 text-green-700 border-green-500/30";
         case "pending":
            return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
         case "hold":
            return "bg-red-500/20 text-red-700 border-red-500/30";
         default:
            return "bg-gray-500/20 text-gray-700 border-gray-500/30";
      }
   };

   const getStatusDot = (status: string) => {
      switch (status) {
         case "active":
            return "bg-green-500";
         case "pending":
            return "bg-yellow-500";
         case "hold":
            return "bg-red-500";
         default:
            return "bg-gray-500";
      }
   };

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
                  <div
                     className={cn(
                        "w-2 h-2 rounded-full",
                        getStatusDot(status)
                     )}
                  ></div>
                  <span
                     className={cn(
                        "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border",
                        getStatusColor(status)
                     )}
                  >
                     {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
               </div>
            </div>
         </div>

         {/* Project Details */}
         <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
               <MapPin className="h-4 w-4" />
               <span>{location}</span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
               <Users className="h-4 w-4" />
               <span>
                  {workerCount} {workerCount === 1 ? "worker" : "workers"}
               </span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
               <Calendar className="h-4 w-4" />
               <span>Started {format(startDate, "MMM d, yyyy")}</span>
            </div>
         </div>

         {/* View Details Button */}
         <div className="pt-4 border-t">
            <Button
               onClick={() => onViewDetails(id)}
               variant="outline"
               className="w-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
               <Eye className="h-4 w-4 mr-2" />
               View Details
            </Button>
         </div>
      </div>
   );
}
