export interface Job {
  // 🏷️ Basic Information
  id?: number
  title: string
  location: string
  hiringInfo?: string
  postedOn: string // ISO date (e.g., "2025-10-30")

  // 🧾 Job Details
  duration: string
  startDate: string // ISO date (e.g., "2025-11-10")
  hours: string
  hourNote?: string

  // 🗓️ Job Schedule
  scheduleDays: string[] // e.g. ["M", "T", "W", "Th", "F"]
  shiftHours: string
  shiftNote: string

  // 📍 Location
  fullAddress?: string // e.g. "Houston, TX 77070 US"

  // 🧰 Requirements
  experience: string[] // e.g. ["Commercial"]
  licenses: string[] // e.g. ["TDLR - Apprentice Electrician"]
  skills: string[] // e.g. ["Bending Conduit", "Rough In", ...]

  // 🎁 Benefits
  benefits: string[] // e.g. ["Flexible Schedule", "Health Insurance"]

  // 🧾 Description (full text including all sections)
  description: string // full job description (paragraphs + bullet points in one string)

  // ✅ Meta
  companyName?: string
  active?: boolean
  createdAt?: string
  updatedAt?: string
}