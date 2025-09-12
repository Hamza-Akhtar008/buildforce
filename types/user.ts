export type UserRole = "admin" | "worker" | "contractor";

export type AccessLevel = "basic" | "advanced";

export interface User {
   id: string;
   fullName: string;
   email: string;
   phoneNumber: string;
   role: UserRole;
   location: string;
   accessLevel: AccessLevel;
   tempPassword?: string;
   createdAt: Date;
   updatedAt: Date;
}

export interface CreateUserData {
   fullName: string;
   email: string;
   phoneNumber: string;
   role: UserRole;
   location: string;
   accessLevel: AccessLevel;
   tempPassword: string;
}
