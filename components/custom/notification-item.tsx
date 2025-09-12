"use client";

import { cn } from "@/lib/utils";
import { Notification } from "@/types";
import { format, isToday, isYesterday } from "date-fns";

interface NotificationItemProps {
   notification: Notification;
   className?: string;
}

export function NotificationItem({
   notification,
   className,
}: NotificationItemProps) {
   const { title, text, time, icon: Icon, type, status } = notification;

   const getTypeColor = (type: string) => {
      switch (type) {
         case "success":
            return "text-green-500";
         case "warning":
            return "text-yellow-500";
         case "error":
            return "text-red-500";
         case "info":
         default:
            return "text-blue-500";
      }
   };

   const getTimeDisplay = (date: Date) => {
      if (isToday(date)) {
         return format(date, "h:mm a");
      } else if (isYesterday(date)) {
         return format(date, "h:mm a");
      } else {
         return format(date, "MMM d, h:mm a");
      }
   };

   return (
      <div
         className={cn(
            "flex items-start space-x-4 p-4 rounded-lg border transition-colors hover:bg-muted/50",
            status === "unread" && "bg-muted/30 border-primary/20",
            className
         )}
      >
         {/* Icon */}
         <div className="flex-shrink-0 mt-1">
            <Icon className={cn("h-5 w-5", getTypeColor(type))} />
         </div>

         {/* Content */}
         <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
               <h4
                  className={cn(
                     "text-sm font-medium truncate",
                     status === "unread" && "font-semibold"
                  )}
               >
                  {title}
               </h4>
               <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                  {getTimeDisplay(time)}
               </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{text}</p>
         </div>

         {/* Unread indicator */}
         {status === "unread" && (
            <div className="flex-shrink-0 mt-2">
               <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
         )}
      </div>
   );
}
