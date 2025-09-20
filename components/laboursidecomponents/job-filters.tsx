"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Filter } from "lucide-react"
import type { JobFilters } from "@/types/job"

interface JobFiltersProps {
  filters: JobFilters
  onFiltersChange: (filters: JobFilters) => void
  className?: string
}

const skillOptions = [
  "Construction Safety",
  "Material Handling",
  "Basic Tools",
  "Forklift Operation",
  "Warehouse Management",
  "Inventory Control",
  "Basic Electrical",
  "Hand Tools",
  "Safety Protocols",
  "Project Management",
  "Team Leadership",
  "Safety Management",
  "Quality Control",
]

export function JobFiltersComponent({ filters, onFiltersChange, className }: JobFiltersProps) {
  const [payRange, setPayRange] = useState([filters.payMin || 15, filters.payMax || 50])
  const [selectedSkills, setSelectedSkills] = useState<string[]>(filters.skills || [])

  const updateFilters = (updates: Partial<JobFilters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const handleSkillToggle = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill]
    setSelectedSkills(newSkills)
    updateFilters({ skills: newSkills })
  }

  const handlePayRangeChange = (values: number[]) => {
    setPayRange(values)
    updateFilters({ payMin: values[0], payMax: values[1] })
  }

  const clearFilters = () => {
    setPayRange([15, 50])
    setSelectedSkills([])
    onFiltersChange({})
  }

  return (
    <Card className={`bg-sidebar border-sidebar-border ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sidebar-foreground flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sidebar-foreground">
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location Filter */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sidebar-foreground">
            Location
          </Label>
          <Input
            id="location"
            placeholder="Enter city or province"
            value={filters.location || ""}
            onChange={(e) => updateFilters({ location: e.target.value })}
            className="bg-input border-border text-foreground"
          />
        </div>

        {/* Job Type Filter */}
        <div className="space-y-2">
          <Label className="text-sidebar-foreground">Job Type</Label>
          <Select value={filters.jobType || ""} onValueChange={(value) => updateFilters({ jobType: value as any })}>
            <SelectTrigger className="bg-input border-border text-foreground">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="skilled-trade">Skilled Trade</SelectItem>
              <SelectItem value="general-labour">General Labour</SelectItem>
              <SelectItem value="operator">Operator</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Work Duration Filter */}
        <div className="space-y-3">
          <Label className="text-sidebar-foreground">Work Duration</Label>
          <RadioGroup
            value={filters.duration || ""}
            onValueChange={(value) => updateFilters({ duration: value as any })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="short-term" id="short-term" />
              <Label htmlFor="short-term" className="text-sidebar-foreground">
                Short-term
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium" className="text-sidebar-foreground">
                Medium
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="long-term" id="long-term" />
              <Label htmlFor="long-term" className="text-sidebar-foreground">
                Long-term
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="permanent" id="permanent" />
              <Label htmlFor="permanent" className="text-sidebar-foreground">
                Permanent
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Shift / Hours Filter */}
        <div className="space-y-3">
          <Label className="text-sidebar-foreground">Shift / Hours</Label>
          <div className="space-y-2">
            {["day", "night", "flexible"].map((shift) => (
              <div key={shift} className="flex items-center space-x-2">
                <Checkbox
                  id={shift}
                  checked={filters.shift?.includes(shift as any) || false}
                  onCheckedChange={(checked) => {
                    const currentShifts = filters.shift || []
                    const newShifts = checked
                      ? [...currentShifts, shift as any]
                      : currentShifts.filter((s) => s !== shift)
                    updateFilters({ shift: newShifts })
                  }}
                />
                <Label htmlFor={shift} className="text-sidebar-foreground capitalize">
                  {shift}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Pay Range Filter */}
        <div className="space-y-3">
          <Label className="text-sidebar-foreground">Pay Range ($/hour)</Label>
          <div className="px-2">
            <Slider
              value={payRange}
              onValueChange={handlePayRangeChange}
              max={60}
              min={15}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-sidebar-foreground mt-2">
              <span>${payRange[0]}</span>
              <span>${payRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Experience Level Filter */}
        <div className="space-y-2">
          <Label className="text-sidebar-foreground">Experience Level</Label>
          <Select
            value={filters.experienceLevel || ""}
            onValueChange={(value) => updateFilters({ experienceLevel: value as any })}
          >
            <SelectTrigger className="bg-input border-border text-foreground">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Posted Date Filter */}
        <div className="space-y-2">
          <Label className="text-sidebar-foreground">Posted Date</Label>
          <Select
            value={filters.postedWithin || ""}
            onValueChange={(value) => updateFilters({ postedWithin: value as any })}
          >
            <SelectTrigger className="bg-input border-border text-foreground">
              <SelectValue placeholder="Any time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="3-days">Last 3 days</SelectItem>
              <SelectItem value="7-days">Last 7 days</SelectItem>
              <SelectItem value="30-days">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Skills Filter */}
        <div className="space-y-3">
          <Label className="text-sidebar-foreground">Skills / Certificates</Label>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <Badge
                key={skill}
                variant={selectedSkills.includes(skill) ? "default" : "secondary"}
                className={`cursor-pointer transition-colors ${
                  selectedSkills.includes(skill)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                onClick={() => handleSkillToggle(skill)}
              >
                {skill}
                {selectedSkills.includes(skill) && <X className="ml-1 h-3 w-3" />}
              </Badge>
            ))}
          </div>
        </div>

        {/* Extra Options Filter */}
        <div className="space-y-3">
          <Label className="text-sidebar-foreground">Extra Options</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="accommodation"
                checked={filters.accommodation || false}
                onCheckedChange={(checked) => updateFilters({ accommodation: !!checked })}
              />
              <Label htmlFor="accommodation" className="text-sidebar-foreground">
                Accommodation provided
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="meals"
                checked={filters.meals || false}
                onCheckedChange={(checked) => updateFilters({ meals: !!checked })}
              />
              <Label htmlFor="meals" className="text-sidebar-foreground">
                Meals provided
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="transport"
                checked={filters.transport || false}
                onCheckedChange={(checked) => updateFilters({ transport: !!checked })}
              />
              <Label htmlFor="transport" className="text-sidebar-foreground">
                Transport provided
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
