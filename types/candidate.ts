export interface Candidate {
  id: string
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string

  // Work Authorization
  workAuthorization: string
  requiresVisa: boolean

  // Experience & Skills
  yearsExperience: string
  relevantExperience: string
  skills: string[]
  certificates: string[]

  // Availability
  startDate: string
  availableShifts: string[]
  transportationMethod: string

  // Benefits Preferences
  needsAccommodation: boolean
  needsTransport: boolean
  needsMeals: boolean

  // Additional Information
  coverLetter: string
  additionalInfo: string

  // Application Status
  status: "pending" | "call-for-interview" | "hired" | "rejected"
  appliedDate: string

  // Interview Information
  interviewDate?: string
  interviewTime?: string
  interviewNotes?: string

  // Files
  resumeUrl?: string
  certificateUrls: string[]

  // Job Information
  jobTitle: string
  jobId: string

  // Rating (for hired candidates)
  rating?: number
}
