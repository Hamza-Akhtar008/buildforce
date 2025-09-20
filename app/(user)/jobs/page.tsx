"use client"

import { useState, useMemo } from "react"



import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Grid, List } from "lucide-react"

import type { JobFilters as JobFiltersType } from "@/types/job"
import { JobCard } from "@/components/laboursidecomponents/job-card"
import { JobFiltersComponent } from "@/components/laboursidecomponents/job-filters"
import { MobileFilterSheet } from "@/components/laboursidecomponents/mobile-filter-sheet"
import { mockJobs } from "@/lib/mock-data"
import { filterJobs } from "@/lib/job-utils"


export default function JobListingPage() {
  const [filters, setFilters] = useState<JobFiltersType>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredJobs = useMemo(() => {
    let jobs = filterJobs(mockJobs, filters)

    // Apply search query
    if (searchQuery.trim()) {
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    return jobs
  }, [filters, searchQuery])

  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value)) return value.length > 0
    return value !== undefined && value !== ""
  }).length

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className=" bg-background border-b border-border">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="text-center space-y-4">
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground text-balance">
              Find Your Next Construction & Trade Job
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover opportunities in construction, trades, and labour across Canada. Connect with quality employers
              and advance your career.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mt-6 lg:mt-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 lg:h-5 lg:w-5" />
                <Input
                  placeholder="Search jobs, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 lg:pl-12 h-11 lg:h-12 text-base lg:text-lg bg-input border-border text-foreground"
                />
              </div>
              {/* Mobile Filter Sheet */}
              <div className="sm:hidden">
                <MobileFilterSheet
                  filters={filters}
                  onFiltersChange={setFilters}
                  activeFiltersCount={activeFiltersCount}
                />
              </div>
              {/* Desktop Filter Button */}
              <Button
                variant="outline"
                onClick={() => {}} // Desktop filters are always visible
                className="hidden sm:flex items-center gap-2 h-11 lg:h-12 px-4 lg:px-6"
              >
                Filters Active: {activeFiltersCount}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="flex gap-6">
       

          {/* Job Listings */}
          <main className="flex-1">
            <div className="mb-4 lg:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-muted-foreground text-sm lg:text-base">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="flex-1 sm:flex-none"
                >
                  <Grid className="h-4 w-4 mr-2 sm:mr-0" />
                  <span className="sm:hidden">Grid</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="flex-1 sm:flex-none"
                >
                  <List className="h-4 w-4 mr-2 sm:mr-0" />
                  <span className="sm:hidden">List</span>
                </Button>
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No jobs match your current filters.</p>
                <p className="text-muted-foreground mt-2">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6" : "space-y-4"
                }
              >
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </main>

             <aside className="hidden lg:block w-80 flex-shrink-0">
            <JobFiltersComponent filters={filters} onFiltersChange={setFilters} className=" top-24" />
          </aside>
        </div>
      </div>
    </div>
  )
}
