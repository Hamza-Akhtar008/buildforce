import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { mockJobs } from "@/lib/mock-data"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPay } from "@/lib/job-utils"
import { JobApplicationForm } from "@/components/laboursidecomponents/job-application-form"

interface JobApplicationPageProps {
  params: {
    id: string
  }
}

export default function JobApplicationPage({ params }: JobApplicationPageProps) {
  const job = mockJobs.find((j) => j.id === params.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link
            href={`/jobs/${job.id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Job Details
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Job Summary Card */}
          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl lg:text-2xl text-foreground">{job.title}</CardTitle>
                  <p className="text-lg text-muted-foreground mt-1">{job.company}</p>
                  <p className="text-sm text-muted-foreground">{job.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{formatPay(job)}</div>
                  <Badge variant="secondary" className="mt-2">
                    {job.jobType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Application Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Apply for this Position</CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below to submit your application. All fields marked with * are required.
              </p>
            </CardHeader>
            <CardContent>
              <JobApplicationForm job={job} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
