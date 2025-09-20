"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { SlidersHorizontal } from "lucide-react"
import { JobFiltersComponent } from "@/components/laboursidecomponents/job-filters"
import type { JobFilters as JobFiltersType } from "@/types/job"

interface MobileFilterSheetProps {
  filters: JobFiltersType
  onFiltersChange: (filters: JobFiltersType) => void
  activeFiltersCount: number
}

export function MobileFilterSheet({ filters, onFiltersChange, activeFiltersCount }: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-80 p-0">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle>Filter Jobs</SheetTitle>
        </SheetHeader>
        <div className="p-6 pt-4 overflow-y-auto max-h-[calc(100vh-120px)]">
          <JobFiltersComponent
            filters={filters}
            onFiltersChange={(newFilters) => {
              onFiltersChange(newFilters)
              setOpen(false)
            }}
            className="border-0 shadow-none bg-transparent p-0"
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
