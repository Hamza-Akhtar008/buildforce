import { LucideIcon } from "lucide-react";

export type NotificationStatus = "read" | "unread";
export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
   id: string;
   title: string;
   text: string;
   time: Date;
   icon: LucideIcon;
   type: NotificationType;
   status: NotificationStatus;
   createdAt: Date;
   updatedAt: Date;
}

export interface CreateNotificationData {
   title: string;
   text: string;
   icon: LucideIcon;
   type: NotificationType;
   status?: NotificationStatus;
}
