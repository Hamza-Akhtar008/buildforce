"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
   ArrowLeft,
   Bell,
   CheckCircle,
   AlertTriangle,
   Info,
   XCircle,
   UserPlus,
   FileText,
   Settings,
} from "lucide-react";
import { Notification } from "@/types";
import { NotificationItem } from "@/components/custom/notification-item";
import { isToday, isYesterday, subDays, subHours, subMinutes } from "date-fns";

export default function Notifications() {
   // Dummy notification data
   const notifications: Notification[] = [
      // Today's notifications
      {
         id: "1",
         title: "New User Registration",
         text: "John Doe has registered and is awaiting approval for the system.",
         time: subMinutes(new Date(), 30),
         icon: UserPlus,
         type: "info",
         status: "unread",
         createdAt: new Date(),
         updatedAt: new Date(),
      },
      {
         id: "2",
         title: "Project Completed",
         text: "Downtown Office Complex project has been successfully completed and is ready for final review.",
         time: subHours(new Date(), 2),
         icon: CheckCircle,
         type: "success",
         status: "unread",
         createdAt: new Date(),
         updatedAt: new Date(),
      },
      {
         id: "3",
         title: "Budget Alert",
         text: "Residential Tower A project is approaching 90% of allocated budget. Immediate attention required.",
         time: subHours(new Date(), 4),
         icon: AlertTriangle,
         type: "warning",
         status: "read",
         createdAt: new Date(),
         updatedAt: new Date(),
      },

      // Yesterday's notifications
      {
         id: "4",
         title: "System Maintenance",
         text: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM. System will be temporarily unavailable.",
         time: subDays(new Date(), 1),
         icon: Settings,
         type: "info",
         status: "read",
         createdAt: subDays(new Date(), 1),
         updatedAt: subDays(new Date(), 1),
      },
      {
         id: "5",
         title: "Document Upload Failed",
         text: "Failed to upload project documents for Commercial Plaza. Please try again or contact support.",
         time: subDays(new Date(), 1),
         icon: XCircle,
         type: "error",
         status: "read",
         createdAt: subDays(new Date(), 1),
         updatedAt: subDays(new Date(), 1),
      },

      // Earlier notifications
      {
         id: "6",
         title: "New Project Assigned",
         text: "You have been assigned as project manager for the Shopping Mall Renovation project.",
         time: subDays(new Date(), 3),
         icon: FileText,
         type: "info",
         status: "read",
         createdAt: subDays(new Date(), 3),
         updatedAt: subDays(new Date(), 3),
      },
      {
         id: "7",
         title: "Team Member Added",
         text: "Sarah Wilson has been added to the Engineering team and granted access to project resources.",
         time: subDays(new Date(), 5),
         icon: UserPlus,
         type: "success",
         status: "read",
         createdAt: subDays(new Date(), 5),
         updatedAt: subDays(new Date(), 5),
      },
      {
         id: "8",
         title: "Security Alert",
         text: "Multiple failed login attempts detected from unknown IP address. Account security has been enhanced.",
         time: subDays(new Date(), 7),
         icon: AlertTriangle,
         type: "warning",
         status: "read",
         createdAt: subDays(new Date(), 7),
         updatedAt: subDays(new Date(), 7),
      },
   ];

   // Group notifications by time periods
   const todayNotifications = notifications.filter((n) => isToday(n.time));
   const yesterdayNotifications = notifications.filter((n) =>
      isYesterday(n.time)
   );
   const earlierNotifications = notifications.filter(
      (n) => !isToday(n.time) && !isYesterday(n.time)
   );

   const unreadCount = notifications.filter(
      (n) => n.status === "unread"
   ).length;

   return (
      <div className="min-h-screen py-8">
         <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="text-center">
               <div className="flex items-center justify-center space-x-3 mb-4">
                  <Bell className="h-8 w-8 text-primary" />
                  <h1 className="text-4xl font-bold">Notifications</h1>
                  {unreadCount > 0 && (
                     <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-medium">
                        {unreadCount}
                     </span>
                  )}
               </div>
               <p className="text-muted-foreground text-lg mb-6">
                  Stay updated with the latest system notifications and alerts.
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

            {/* Notifications Content */}
            <div className="space-y-6">
               {/* Today's Notifications */}
               {todayNotifications.length > 0 && (
                  <Card className="shadow-lg">
                     <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                           <span>Today</span>
                           <span className="text-sm font-normal text-muted-foreground">
                              ({todayNotifications.length})
                           </span>
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-2">
                        {todayNotifications.map((notification) => (
                           <NotificationItem
                              key={notification.id}
                              notification={notification}
                           />
                        ))}
                     </CardContent>
                  </Card>
               )}

               {/* Yesterday's Notifications */}
               {yesterdayNotifications.length > 0 && (
                  <Card className="shadow-lg">
                     <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                           <span>Yesterday</span>
                           <span className="text-sm font-normal text-muted-foreground">
                              ({yesterdayNotifications.length})
                           </span>
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-2">
                        {yesterdayNotifications.map((notification) => (
                           <NotificationItem
                              key={notification.id}
                              notification={notification}
                           />
                        ))}
                     </CardContent>
                  </Card>
               )}

               {/* Earlier Notifications */}
               {earlierNotifications.length > 0 && (
                  <Card className="shadow-lg">
                     <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                           <span>Earlier</span>
                           <span className="text-sm font-normal text-muted-foreground">
                              ({earlierNotifications.length})
                           </span>
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-2">
                        {earlierNotifications.map((notification) => (
                           <NotificationItem
                              key={notification.id}
                              notification={notification}
                           />
                        ))}
                     </CardContent>
                  </Card>
               )}

               {/* Empty State */}
               {notifications.length === 0 && (
                  <Card className="shadow-lg">
                     <CardContent className="py-12 text-center">
                        <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                           No notifications
                        </h3>
                        <p className="text-muted-foreground">
                           You're all caught up! New notifications will appear
                           here.
                        </p>
                     </CardContent>
                  </Card>
               )}
            </div>

            {/* Action Buttons */}
            {notifications.length > 0 && (
               <div className="flex gap-4 justify-center pt-6">
                  <Button
                     variant="outline"
                     className="px-8 cursor-pointer hover:bg-muted"
                  >
                     Mark All as Read
                  </Button>
                  <Button
                     variant="outline"
                     className="px-8 cursor-pointer hover:bg-muted"
                  >
                     Clear All
                  </Button>
               </div>
            )}
         </div>
      </div>
   );
}
