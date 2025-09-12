"use client";

import { cn } from "@/lib/utils";
import { Application } from "@/types";
import { Button } from "@/components/ui/button";
import { Check, X, User } from "lucide-react";
import { format } from "date-fns";

interface ApplicationItemProps {
   application: Application;
   onApprove: (id: string) => void;
   onReject: (id: string) => void;
   className?: string;
}

export function ApplicationItem({
   application,
   onApprove,
   onReject,
   className,
}: ApplicationItemProps) {
   const { id, name, type, email, appliedAt, status } = application;

   const getRoleBadgeColor = (role: string) => {
      switch (role) {
         case "admin":
            return "bg-red-500/20 text-red-700 border-red-500/30";
         case "worker":
            return "bg-blue-500/20 text-blue-700 border-blue-500/30";
         case "contractor":
            return "bg-green-500/20 text-green-700 border-green-500/30";
         default:
            return "bg-gray-500/20 text-gray-700 border-gray-500/30";
      }
   };

   const getStatusColor = (status: string) => {
      switch (status) {
         case "approved":
            return "text-green-600";
         case "rejected":
            return "text-red-600";
         case "pending":
         default:
            return "text-yellow-600";
      }
   };

   return (
      <div
         className={cn(
            "flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors",
            className
         )}
      >
         {/* Left side - User info */}
         <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
               <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
               </div>
            </div>

            <div className="min-w-0 flex-1">
               <div className="flex items-center space-x-3 mb-1">
                  <h4 className="text-sm font-medium truncate">{name}</h4>
                  <span
                     className={cn(
                        "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border",
                        getRoleBadgeColor(type)
                     )}
                  >
                     {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
               </div>

               <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  {email && <span>{email}</span>}
                  <span>Applied {format(appliedAt, "MMM d, yyyy")}</span>
                  <span className={cn("font-medium", getStatusColor(status))}>
                     {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
               </div>
            </div>
         </div>

         {/* Right side - Action buttons */}
         {status === "pending" && (
            <div className="flex items-center space-x-2">
               <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onApprove(id)}
                  className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 cursor-pointer"
               >
                  <Check className="h-4 w-4 mr-1" />
                  Approve
               </Button>
               <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReject(id)}
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 cursor-pointer"
               >
                  <X className="h-4 w-4 mr-1" />
                  Reject
               </Button>
            </div>
         )}
      </div>
   );
}
