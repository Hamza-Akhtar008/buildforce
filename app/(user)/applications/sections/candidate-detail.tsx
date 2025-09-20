"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Mail,
  Phone,
  FileText,
  Download,
  User,
  Briefcase,
  Star,
  Home,
  Car,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react"
import type { Candidate } from "@/types/candidate"

interface CandidateDetailProps {
  candidate: Candidate
  onBack: () => void
  onScheduleInterview?: (candidateId: string) => void
  InterviewScheduler?: React.ComponentType<{ candidateId: string; candidateName: string }>
}

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  if (status === "hired") return "default"
  if (status === "pending") return "secondary"
  if (status === "rejected") return "destructive"
  if (status === "call-for-interview") return "outline"
  return "outline"
}

function getWorkAuthLabel(auth: string): string {
  const labels: Record<string, string> = {
    citizen: "Canadian Citizen",
    "permanent-resident": "Permanent Resident",
    "work-permit": "Work Permit Holder",
    "student-permit": "Student Permit",
    other: "Other",
  }
  return labels[auth] || auth
}

function getTransportLabel(transport: string): string {
  const labels: Record<string, string> = {
    "own-vehicle": "Own Vehicle",
    "public-transport": "Public Transportation",
    "company-transport": "Company Transportation",
    carpool: "Carpool",
    other: "Other",
  }
  return labels[transport] || transport
}

export default function CandidateDetail({
  candidate,
  onBack,
  onScheduleInterview,
  InterviewScheduler,
}: CandidateDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {candidate.firstName} {candidate.lastName}
          </h1>
          <p className="text-muted-foreground">{candidate.jobTitle}</p>
        </div>
        <div className="ml-auto">
          <Badge variant={getStatusVariant(candidate.status)} className="text-sm">
            {candidate.status === "call-for-interview" ? "Call for Interview" : candidate.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Email:</span>
                  <span className="text-primary">{candidate.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Phone:</span>
                  <span>{candidate.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Address:</span>
                  <span>{candidate.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Location:</span>
                  <span>
                    {candidate.city}, {candidate.province} {candidate.postalCode}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Applied:</span>
                  <span>{candidate.appliedDate}</span>
                </div>
                {candidate.rating && (
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Rating:</span>
                    <span className="text-primary">{candidate.rating}/5.0</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Work Authorization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Work Authorization</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Status:</span>
                  <Badge variant="secondary">{getWorkAuthLabel(candidate.workAuthorization)}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Requires Visa:</span>
                  {candidate.requiresVisa ? (
                    <XCircle className="h-4 w-4 text-destructive" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  <span>{candidate.requiresVisa ? "Yes" : "No"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience & Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Experience & Skills</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Years of Experience: {candidate.yearsExperience}</span>
                </h4>
                <p className="text-muted-foreground">{candidate.relevantExperience}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              {candidate.certificates.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Certificates</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate.certificates.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Availability & Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Availability & Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Start Date:</span>
                  <p className="text-muted-foreground">{candidate.startDate}</p>
                </div>
                <div>
                  <span className="font-medium">Available Shifts:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {candidate.availableShifts.map((shift, index) => (
                      <Badge key={index} variant="outline" className="text-xs capitalize">
                        {shift}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Transportation:</span>
                  <span>{getTransportLabel(candidate.transportationMethod)}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Benefits & Accommodation Needs</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Housing:</span>
                    {candidate.needsAccommodation ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Transport:</span>
                    {candidate.needsTransport ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Meals:</span>
                    {candidate.needsMeals ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cover Letter & Additional Info */}
          {(candidate.coverLetter || candidate.additionalInfo) && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidate.coverLetter && (
                  <div>
                    <h4 className="font-semibold mb-2">Cover Letter</h4>
                    <p className="text-muted-foreground">{candidate.coverLetter}</p>
                  </div>
                )}
                {candidate.additionalInfo && (
                  <>
                    {candidate.coverLetter && <Separator />}
                    <div>
                      <h4 className="font-semibold mb-2">Additional Notes</h4>
                      <p className="text-muted-foreground">{candidate.additionalInfo}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {candidate.status === "call-for-interview" && InterviewScheduler && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
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
              )}

              <Button variant="outline" className="w-full bg-transparent">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>

              <Button variant="outline" className="w-full bg-transparent">
                <Phone className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>

           
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {candidate.resumeUrl && (
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  <span>Resume</span>
                  <Download className="h-4 w-4" />
                </Button>
              )}
              {candidate.certificateUrls.map((cert, index) => (
                <Button key={index} variant="outline" className="w-full justify-between bg-transparent">
                  <span>Certificate {index + 1}</span>
                  <Download className="h-4 w-4" />
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Application Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-medium">Application Submitted</span>
                </div>
                <p className="text-xs text-muted-foreground ml-4">{candidate.appliedDate}</p>
              </div>

              {candidate.status !== "pending" && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-medium">Application Reviewed</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-4">June 20, 2025</p>
                </div>
              )}

              {candidate.status === "call-for-interview" && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="font-medium">Interview Scheduled</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-4">
                    {candidate.interviewDate && candidate.interviewTime
                      ? `${candidate.interviewDate} at ${candidate.interviewTime}`
                      : "Pending"}
                  </p>
                </div>
              )}

              {candidate.status === "hired" && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Hired</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-4">June 25, 2025</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
