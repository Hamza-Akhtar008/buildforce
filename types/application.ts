import { UserRole } from "./user";

export interface Application {
   id: string;
   name: string;
   type: UserRole;
   email?: string;
   appliedAt: Date;
   status: "pending" | "approved" | "rejected";
}

export interface CreateApplicationData {
   name: string;
   type: UserRole;
   email?: string;
}
