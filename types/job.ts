export interface Job {
  id: string
  title: string
  company: string
  location: string
  payMin: number
  payMax: number
  payType: "hourly" | "daily" | "weekly" | "monthly" | "annual"
  duration: "short-term" | "medium" | "long-term" | "permanent"
  jobType: "skilled-trade" | "general-labour" | "operator" | "supervisor"
  shift: ("day" | "night" | "flexible")[]
  workType: "full-time" | "part-time"
  experienceLevel: "entry" | "intermediate" | "expert"
  postedDate: string
  startDate: string
  description: string
  requirements: string[]
  skills: string[]
  certificates: string[]
  benefits: {
    accommodation: boolean
    meals: boolean
    transport: boolean
  }
  company_profile: {
    description: string
    rating: number
    activeJobs: number
  }
  practical_info: {
    workingHours: string
    paymentFrequency: "weekly" | "bi-weekly" | "monthly"
    paymentMethod: "bank-transfer" | "cash" | "check"
  }
}

export interface JobFilters {
  location?: string
  jobType?: Job["jobType"]
  duration?: Job["duration"]
  shift?: Job["shift"]
  payMin?: number
  payMax?: number
  experienceLevel?: Job["experienceLevel"]
  postedWithin?: "today" | "3-days" | "7-days" | "30-days"
  skills?: string[]
  accommodation?: boolean
  meals?: boolean
  transport?: boolean
}
