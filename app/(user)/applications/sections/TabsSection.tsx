"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, MapPin, Calendar, Building, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import CandidateDetail from "./candidate-detail"
import type { Candidate } from "@/types/candidate"

const candidates: Candidate[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "Toronto",
    province: "ON",
    postalCode: "M5V 3A8",
    workAuthorization: "citizen",
    requiresVisa: false,
    yearsExperience: "6-10",
    relevantExperience:
      "8 years in construction management with expertise in residential and commercial projects. Led teams of 15+ workers on multiple high-profile developments.",
    skills: ["Project Management", "Safety Protocols", "Blueprint Reading", "Team Leadership", "Quality Control"],
    certificates: ["OSHA 30", "First Aid/CPR", "Forklift Operation"],
    startDate: "2025-07-01",
    availableShifts: ["day", "flexible"],
    transportationMethod: "own-vehicle",
    needsAccommodation: false,
    needsTransport: false,
    needsMeals: true,
    coverLetter: "I am excited to bring my construction management experience to your team...",
    additionalInfo: "Available for overtime and weekend work when needed.",
    status: "hired",
    appliedDate: "2025-06-10",
    resumeUrl: "/documents/john-smith-resume.pdf",
    certificateUrls: ["/documents/john-smith-osha.pdf", "/documents/john-smith-cpr.pdf"],
    jobTitle: "Construction Manager",
    jobId: "CM-001",
    rating: 4.8,
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Avenue",
    city: "Vancouver",
    province: "BC",
    postalCode: "V6B 1A1",
    workAuthorization: "permanent-resident",
    requiresVisa: false,
    yearsExperience: "2-5",
    relevantExperience:
      "4 years in electrical work with focus on residential wiring and commercial installations. Certified electrician with clean safety record.",
    skills: ["Electrical Wiring", "Circuit Installation", "Safety Protocols", "Blueprint Reading", "Troubleshooting"],
    certificates: ["Electrical License", "WHMIS", "Fall Protection"],
    startDate: "2025-06-25",
    availableShifts: ["day", "night"],
    transportationMethod: "public-transport",
    needsAccommodation: false,
    needsTransport: true,
    needsMeals: false,
    coverLetter: "As a certified electrician, I am eager to contribute to your electrical projects...",
    additionalInfo: "Willing to work on emergency calls and have own tools.",
    status: "call-for-interview",
    appliedDate: "2025-06-15",
    resumeUrl: "/documents/sarah-johnson-resume.pdf",
    certificateUrls: ["/documents/sarah-johnson-license.pdf"],
    jobTitle: "Electrician",
    jobId: "EL-002",
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Davis",
    email: "mike.davis@email.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine Street",
    city: "Calgary",
    province: "AB",
    postalCode: "T2P 1J9",
    workAuthorization: "work-permit",
    requiresVisa: true,
    yearsExperience: "0-1",
    relevantExperience:
      "1 year as general laborer with experience in demolition, site cleanup, and basic construction tasks. Eager to learn and advance in the construction industry.",
    skills: ["Physical Labor", "Site Cleanup", "Basic Tools", "Safety Awareness"],
    certificates: ["WHMIS"],
    startDate: "2025-07-15",
    availableShifts: ["day", "night", "flexible"],
    transportationMethod: "company-transport",
    needsAccommodation: true,
    needsTransport: true,
    needsMeals: true,
    coverLetter: "I am a hardworking individual looking to build a career in construction...",
    additionalInfo: "New to Canada, very motivated to learn and grow with the company.",
    status: "rejected",
    appliedDate: "2025-05-13",
    resumeUrl: "/documents/mike-davis-resume.pdf",
    certificateUrls: ["/documents/mike-davis-whmis.pdf"],
    jobTitle: "General Laborer",
    jobId: "GL-003",
    rating: 3.2,
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Chen",
    email: "emily.chen@email.com",
    phone: "+1 (555) 456-7890",
    address: "321 Maple Drive",
    city: "Montreal",
    province: "QC",
    postalCode: "H3A 0G4",
    workAuthorization: "citizen",
    requiresVisa: false,
    yearsExperience: "2-5",
    relevantExperience:
      "3 years in plumbing with residential and light commercial experience. Skilled in pipe installation, repair, and maintenance work.",
    skills: ["Plumbing Installation", "Pipe Repair", "Water Systems", "Drain Cleaning", "Emergency Repairs"],
    certificates: ["Plumbing License", "Gas Fitting", "Backflow Prevention"],
    startDate: "2025-06-30",
    availableShifts: ["day"],
    transportationMethod: "own-vehicle",
    needsAccommodation: false,
    needsTransport: false,
    needsMeals: false,
    coverLetter: "With my plumbing expertise and commitment to quality work...",
    additionalInfo: "Available for emergency calls and have fully equipped service vehicle.",
    status: "pending",
    appliedDate: "2025-06-18",
    resumeUrl: "/documents/emily-chen-resume.pdf",
    certificateUrls: ["/documents/emily-chen-license.pdf", "/documents/emily-chen-gas.pdf"],
    jobTitle: "Plumber",
    jobId: "PL-004",
    rating: 4.3,
  },
]

const statusList = [
  { value: "all", label: "All" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
  { value: "pending", label: "Pending" },
  { value: "call-for-interview", label: "Call for Interview" },
]

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  if (status === "hired") return "default"
  if (status === "pending") return "secondary"
  if (status === "rejected") return "destructive"
  if (status === "call-for-interview") return "outline"
  return "outline"
}

function InterviewScheduler({ candidateId, candidateName }: { candidateId: string; candidateName: string }) {
  const [selectedDate, setSelectedDate] = useState<number | null>(5)
  const [selectedTime, setSelectedTime] = useState<string>("11:00 AM")
  const [currentMonth, setCurrentMonth] = useState("March 2025")

  const timeSlots = ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"]

  // Sample calendar days for March 2025
  const calendarDays = [
    { day: 23, disabled: true },
    { day: 24, disabled: false },
    { day: 25, disabled: false },
    { day: 26, disabled: false },
    { day: 27, disabled: false },
    { day: 28, disabled: false },
    { day: 1, disabled: true },
    { day: 2, disabled: false },
    { day: 3, disabled: false },
    { day: 4, disabled: false },
    { day: 5, disabled: false },
    { day: 6, disabled: false },
    { day: 7, disabled: false },
    { day: 8, disabled: false },
    { day: 9, disabled: false },
    { day: 10, disabled: false },
    { day: 11, disabled: false },
    { day: 12, disabled: false },
    { day: 13, disabled: false },
    { day: 14, disabled: false },
    { day: 15, disabled: false },
    { day: 16, disabled: false },
    { day: 17, disabled: false },
    { day: 18, disabled: false },
    { day: 19, disabled: false },
    { day: 20, disabled: false },
    { day: 21, disabled: false },
    { day: 22, disabled: false },
  ]

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Su"]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Schedule Your Interview</h2>
        <p className="text-muted-foreground">Choose an available time slot for {candidateName}</p>
      </div>

      {/* Step 1: Select Date */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-primary">Step 1: Select Date</h3>
        </div>

        <div className="bg-card border rounded-lg p-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button className="p-1 hover:bg-muted rounded">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h4 className="text-lg font-semibold text-primary">{currentMonth}</h4>
            <button className="p-1 hover:bg-muted rounded">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => (
              <button
                key={index}
                onClick={() => !date.disabled && setSelectedDate(date.day)}
                disabled={date.disabled}
                className={`
                           p-2 text-sm rounded transition-colors
                           ${date.disabled ? "text-muted-foreground cursor-not-allowed" : "text-foreground hover:bg-muted"}
                           ${selectedDate === date.day ? "bg-primary text-primary-foreground font-semibold" : ""}
                        `}
              >
                {date.day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step 2: Select Time */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-primary">Step 2: Select Time</h3>
        </div>

        <div className="space-y-3">
          {timeSlots.map((time) => (
            <label key={time} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="time"
                value={time}
                checked={selectedTime === time}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="sr-only"
              />
              <div
                className={`
                        flex-1 p-3 rounded-lg border transition-colors
                        ${
                          selectedTime === time
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card border-border hover:border-muted-foreground"
                        }
                     `}
              >
                {time}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Selected Interview Time */}
      {selectedDate && selectedTime && (
        <div className="bg-card border rounded-lg p-4">
          <h4 className="text-primary font-semibold mb-2">Selected Interview Time:</h4>
          <p className="text-lg">
            <span className="text-primary">March {selectedDate}, 2025 - </span>
            <span className="text-primary">{selectedTime}</span>
          </p>
          <p className="text-muted-foreground text-sm mt-1">Confirmation will be sent via email/text</p>
        </div>
      )}

      {/* Confirm Button */}
      <Button className="w-full">Confirm & Continue</Button>
    </div>
  )
}

export default function HiringTabs() {
  const [search, setSearch] = useState("")
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

  function filteredCandidates(tab: string) {
    let filtered = candidates
    if (tab !== "all") {
      filtered = filtered.filter((candidate) => candidate.status === tab)
    }
    if (search.trim()) {
      filtered = filtered.filter(
        (candidate) =>
          `${candidate.firstName} ${candidate.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
          candidate.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
          candidate.city.toLowerCase().includes(search.toLowerCase()) ||
          candidate.skills.some((skill:string) => skill.toLowerCase().includes(search.toLowerCase())),
      )
    }
    return filtered
  }

  const handleBackToList = () => {
    setSelectedCandidate(null)
  }

  const handleViewDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
  }

  if (selectedCandidate) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <CandidateDetail
            candidate={selectedCandidate}
            onBack={handleBackToList}
            InterviewScheduler={InterviewScheduler}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <Tabs defaultValue="all" className="w-full">
          {/* Search Bar */}
          <div className="mb-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Candidates</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search candidates..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <TabsList className="grid w-full grid-cols-5">
              {statusList.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="font-medium text-xs sm:text-sm">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Contents */}
          {statusList.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="space-y-4">
                {tab.value === "call-for-interview" ? (
                  <div className="space-y-6">
                    {filteredCandidates(tab.value).map((candidate) => (
                      <Card key={candidate.id} className="shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col space-y-4">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <h3 className="text-lg font-semibold">
                                  {candidate.firstName} {candidate.lastName}
                                </h3>
                                <p className="text-muted-foreground">{candidate.jobTitle}</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Applied on {candidate.appliedDate}
                                </div>
                              </div>
                              <Badge variant={getStatusVariant(candidate.status)}>
                                {candidate.status === "call-for-interview" ? "Call for Interview" : candidate.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="font-medium">Experience:</span>
                                <span className="ml-1">{candidate.yearsExperience}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="font-medium">Location:</span>
                                <span className="ml-1">
                                  {candidate.city}, {candidate.province}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2 mt-4">
                              <Button
                                variant="outline"
                                className="flex-1 bg-transparent"
                                onClick={() => handleViewDetails(candidate)}
                              >
                                View Details
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="flex-1">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Schedule Interview
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Schedule Interview - {candidate.firstName} {candidate.lastName}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <InterviewScheduler
                                    candidateId={candidate.id}
                                    candidateName={`${candidate.firstName} ${candidate.lastName}`}
                                  />
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {filteredCandidates(tab.value).length === 0 ? (
                      <div className="text-muted-foreground text-center py-12">
                        <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-lg">No candidates found.</p>
                      </div>
                    ) : (
                      filteredCandidates(tab.value).map((candidate) => (
                        <Card key={candidate.id} className="shadow-sm hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex flex-col space-y-4">
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <h3 className="text-lg font-semibold">
                                    {candidate.firstName} {candidate.lastName}
                                  </h3>
                                  <p className="text-muted-foreground">{candidate.jobTitle}</p>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    Applied on {candidate.appliedDate}
                                  </div>
                                </div>
                                <Badge variant={getStatusVariant(candidate.status)}>
                                  {candidate.status === "call-for-interview" ? "Call for Interview" : candidate.status}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center">
                                  <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span className="font-medium">Experience:</span>
                                  <span className="ml-1">{candidate.yearsExperience}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span className="font-medium">Location:</span>
                                  <span className="ml-1">
                                    {candidate.city}, {candidate.province}
                                  </span>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                className="w-full mt-4 bg-transparent"
                                onClick={() => handleViewDetails(candidate)}
                              >
                                View Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
