export type UserRole = "admin" | "Labour" | "contractor";

export type AccessLevel = "basic" | "advanced";

export type VerificationStatus = "pending" | "submitted" | "interview"|"interview_fixed" |"interviewed"| "verified" | "rejected"

export type LabourProfile = {
  id: number
  resumeUrl: string | null
  idProofUrl: string | null
  certificateUrl: string | null
  portfolioUrl: string | null
  skillLevel: string | null
  experienceRange: string | null
  skills: string | null
}

export interface User  {
  id: number
  name: string
  phone?: string
  email: string
  password?: string
  location?: string
  role: string
  createdAt?: string
  updatedAt?: string
  verificationStatus: VerificationStatus
  labourProfile: LabourProfile | null
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


