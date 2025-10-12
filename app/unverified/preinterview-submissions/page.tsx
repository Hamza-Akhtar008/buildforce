"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Upload, FileText, Award as IdCard, Award, Briefcase, CheckCircle, X, HardHat } from "lucide-react"
import { RegisterProfile } from "@/lib/UserApi/user"
import { notifyError, notifySuccess } from "@/lib/toast"
import { useAuth } from "@/contexts/AuthContext"

interface FileUpload {
  id: string
  title: string
  description: string
  icon: React.ElementType
  required: boolean
  file: File | null
  acceptedTypes: string
}

export default function PreInterviewSubmissionsPage() {
  const router = useRouter()
  const {auth}=useAuth();
  const [uploads, setUploads] = useState<FileUpload[]>([
    {
      id: "resume",
      title: "Resume/CV",
      description: "Upload your current resume or curriculum vitae",
      icon: FileText,
      required: true,
      file: null,
      acceptedTypes: ".pdf,.doc,.docx",
    },
    {
      id: "idProof",
      title: "ID Proof",
      description: "Upload a government-issued ID (Aadhaar, PAN, etc.)",
      icon: IdCard,
      required: false,
      file: null,
      acceptedTypes: ".pdf,.jpg,.jpeg,.png",
    },
    {
      id: "certificate",
      title: "Certificates",
      description: "Upload relevant professional certificates or training documents",
      icon: Award,
      required: false,
      file: null,
      acceptedTypes: ".pdf,.jpg,.jpeg,.png",
    },
    {
      id: "portfolio",
      title: "Portfolio",
      description: "Upload your work portfolio or project samples",
      icon: Briefcase,
      required: false,
      file: null,
      acceptedTypes: ".pdf,.jpg,.jpeg,.png,.zip",
    },
  ])

  const [selections, setSelections] = useState<{
    trades: string[]
    skillLevel: string
    experienceRange: string
  }>({ trades: [], skillLevel: "", experienceRange: "" })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("preinterviewSelections")
      if (raw) {
        const s = JSON.parse(raw) as {
          trades?: string[]
          skillLevel?: string
          experienceRange?: string
        }
        setSelections({
          trades: s.trades || [],
          skillLevel: s.skillLevel || "",
          experienceRange: s.experienceRange || "",
        })
        console.log("[v0] Loaded selections on submissions page:", s)
      }
    } catch (err) {
      console.log("[v0] Failed to load selections:", (err as Error).message)
    }
  }, [])

  const handleFileUpload = (uploadId: string, file: File | null) => {
    setUploads((prev) => prev.map((upload) => (upload.id === uploadId ? { ...upload, file } : upload)))
  }

  const removeFile = (uploadId: string) => {
    handleFileUpload(uploadId, null)
  }

  const canContinue = () => {
    const requiredUploads = uploads.filter((upload) => upload.required)
    return requiredUploads.every((upload) => upload.file !== null)
  }

const handleContinue = async () => {
  if (!canContinue() || isSubmitting) return

  try {
    setIsSubmitting(true)
    setError(null)

    const form = new FormData()

    // Attach user ID if available
    form.append("id", String(auth?.id)) // Ensure ID is a string

    // Attach the skill-related fields
    form.append("skillLevel", selections.skillLevel || "")
    form.append("experienceRange", selections.experienceRange || "")
   // form.append("verificationStatus", "pending") // Hardcoded value as per the requirement
    form.append("skills", JSON.stringify(selections.trades)) // Assuming trades is an array of skill IDs

    // Attach documents
    for (const u of uploads) {
      if (u.file) {
        // Assuming each file is uploaded correctly
        if (u.id === "resume") {
          form.append("resume", u.file, u.file.name)
        } else if (u.id === "idProof") {
          form.append("idProof", u.file, u.file.name)
        } else if (u.id === "certificate") {
          form.append("certificate", u.file, u.file.name)
        } else if (u.id === "portfolio") {
          form.append("portfolio", u.file, u.file.name)
        }
      }
    }

    // Log formData entries for debugging
    console.log("[v0] Submitting multipart form:")
    for (const [k, v] of form.entries()) {
      if (v instanceof File) {
        console.log(`[v0] file: ${k} -> ${v.name} (${v.size} bytes)`)
      } else {
        console.log(`[v0] field: ${k} -> ${v}`)
      }
    }

    // Send form data
    const res = await RegisterProfile(form)
    if (res) {
      notifySuccess("Profile Created Successfully")
      router.push("/unverified/document-submitted")
    } else {
      notifyError("Profile Creation Failed")
    }
  } catch (err) {
    const msg = (err as Error).message
    setError(msg)
    console.log("[v0] Submission error:", msg)
  } finally {
    setIsSubmitting(false)
  }
}


  return (
    <div className="min-h-screen py-8 bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <HardHat className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Document Submission</h1>
              <p className="text-muted-foreground text-lg">Upload your required documents to proceed</p>
            </div>
          </div>
        </div>

        {/* Welcome Card */}
        <Card className="shadow-lg border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Welcome to BuildForce</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground text-lg leading-relaxed">
              We're excited to have you join our construction workforce platform. To complete your registration and move
              forward with the interview process, please upload the required documents below. This helps us verify your
              identity and qualifications to ensure the best opportunities for you.
            </p>
          </CardContent>
        </Card>

        {/* File Upload Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Required Documents</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {uploads.map((upload) => {
              const IconComponent = upload.icon

              return (
                <Card key={upload.id} className="shadow-md">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <span>{upload.title}</span>
                          {upload.required && <span className="text-red-500 text-sm">*</span>}
                          {!upload.required && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">Optional</span>
                          )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{upload.description}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {upload.file ? (
                      <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">{upload.file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(upload.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(upload.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Label htmlFor={upload.id} className="cursor-pointer">
                          <div className="flex items-center justify-center p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors">
                            <div className="text-center">
                              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm font-medium">Click to upload {upload.title}</p>
                              <p className="text-xs text-muted-foreground">
                                Accepted formats: {upload.acceptedTypes.replace(/\./g, "").toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </Label>
                        <Input
                          id={upload.id}
                          type="file"
                          accept={upload.acceptedTypes}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null
                            handleFileUpload(upload.id, file)
                          }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center pt-8">
          <Button
            onClick={handleContinue}
            disabled={!canContinue() || isSubmitting}
            className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 px-8 py-3 text-lg"
          >
            <span>{isSubmitting ? "Submitting..." : "Continue to Next Step"}</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Error Message */}
        {error && <p className="text-center text-sm text-red-600">{error}</p>}

        {/* Help Text */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Having trouble uploading files? Contact our support team at{" "}
            <a href="mailto:support@buildforce.com" className="text-primary hover:underline">
              support@buildforce.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
