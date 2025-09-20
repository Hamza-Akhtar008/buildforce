import { JobFilters } from "@/types/job"
import { Job } from "@/types/job"


export function formatPay(job: Job): string {
  const min = job.payMin
  const max = job.payMax
  const type = job.payType

  if (min === max) {
    return `$${min}/${type}`
  }
  return `$${min}-${max}/${type}`
}

export function formatPostedDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return "Posted today"
  if (diffDays <= 3) return `Posted ${diffDays} days ago`
  if (diffDays <= 7) return "Posted this week"
  if (diffDays <= 30) return "Posted this month"
  return "Posted over a month ago"
}

export function filterJobs(jobs: Job[], filters: JobFilters): Job[] {
  return jobs.filter((job) => {
    // Location filter
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }

    // Job type filter
    if (filters.jobType && job.jobType !== filters.jobType) {
      return false
    }

    // Duration filter
    if (filters.duration && job.duration !== filters.duration) {
      return false
    }

    // Shift filter
    if (filters.shift && filters.shift.length > 0) {
      const hasMatchingShift = filters.shift.some((shift) => job.shift.includes(shift))
      if (!hasMatchingShift) return false
    }

    // Pay range filter
    if (filters.payMin && job.payMax < filters.payMin) {
      return false
    }
    if (filters.payMax && job.payMin > filters.payMax) {
      return false
    }

    // Experience level filter
    if (filters.experienceLevel && job.experienceLevel !== filters.experienceLevel) {
      return false
    }

    // Posted date filter
    if (filters.postedWithin) {
      const jobDate = new Date(job.postedDate)
      const now = new Date()
      const diffDays = Math.ceil((now.getTime() - jobDate.getTime()) / (1000 * 60 * 60 * 24))

      switch (filters.postedWithin) {
        case "today":
          if (diffDays > 1) return false
          break
        case "3-days":
          if (diffDays > 3) return false
          break
        case "7-days":
          if (diffDays > 7) return false
          break
        case "30-days":
          if (diffDays > 30) return false
          break
      }
    }

    // Skills filter
    if (filters.skills && filters.skills.length > 0) {
      const hasMatchingSkill = filters.skills.some((skill) =>
        job.skills.some((jobSkill) => jobSkill.toLowerCase().includes(skill.toLowerCase())),
      )
      if (!hasMatchingSkill) return false
    }

    // Benefits filters
    if (filters.accommodation && !job.benefits.accommodation) return false
    if (filters.meals && !job.benefits.meals) return false
    if (filters.transport && !job.benefits.transport) return false

    return true
  })
}
