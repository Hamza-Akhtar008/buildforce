import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Star,
  Home,
  Utensils,
  Car,
  Phone,
  Heart,
  Share2,
  Building2,
  Users,
  CreditCard,
  Timer,
} from "lucide-react"
import { mockJobs } from "@/lib/mock-data"
import { formatPay, formatPostedDate } from "@/lib/job-utils"

interface JobDetailsPageProps {
  params: {
    id: string
  }
}

export default function JobDetailsPage({ params }: JobDetailsPageProps) {
  const job = mockJobs.find((j) => j.id === params.id)

  if (!job) {
    notFound()
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-chart-2 text-chart-2" : "text-muted-foreground"}`}
      />
    ))
  }

  return (
    <div className="bg-background pb-20 lg:pb-0">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Job Header Summary */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3 lg:pb-4">
                <div className="flex flex-col gap-3 lg:gap-4">
                  <div className="flex-1">
                    <h1 className="text-xl lg:text-2xl font-bold text-foreground text-balance">{job.title}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-base lg:text-lg font-medium text-foreground">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xl lg:text-2xl font-bold text-primary flex items-center gap-1">
                      <DollarSign className="h-5 w-5" />
                      {formatPay(job)}
                    </div>
                    <div className="text-sm text-muted-foreground">{formatPostedDate(job.postedDate)}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.duration.charAt(0).toUpperCase() + job.duration.slice(1).replace("-", " ")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Starts {new Date(job.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className="h-4 w-4" />
                    {job.shift.join(", ")} shift
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{job.description}</p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2 text-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {requirement}
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Skills & Certificates</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-secondary text-secondary-foreground">
                        {skill}
                      </Badge>
                    ))}
                    {job.certificates.map((cert) => (
                      <Badge key={cert} variant="outline" className="border-border">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      job.benefits.accommodation
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Home className={`h-5 w-5 ${job.benefits.accommodation ? "text-accent" : ""}`} />
                    <span className="font-medium">Accommodation</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      job.benefits.meals ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Utensils className={`h-5 w-5 ${job.benefits.meals ? "text-accent" : ""}`} />
                    <span className="font-medium">Meals</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      job.benefits.transport
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Car className={`h-5 w-5 ${job.benefits.transport ? "text-accent" : ""}`} />
                    <span className="font-medium">Transport</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Profile */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">About {job.company}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">{job.company_profile.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Company Rating:</span>
                    <div className="flex items-center gap-1">
                      {renderStars(job.company_profile.rating)}
                      <span className="text-sm font-medium text-foreground ml-1">{job.company_profile.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {job.company_profile.activeJobs} active jobs
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Practical Info */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Practical Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">Working Hours</span>
                    </div>
                    <p className="text-muted-foreground ml-6">{job.practical_info.workingHours}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">Payment Frequency</span>
                    </div>
                    <p className="text-muted-foreground ml-6 capitalize">
                      {job.practical_info.paymentFrequency.replace("-", " ")}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">Payment Method</span>
                    </div>
                    <p className="text-muted-foreground ml-6 capitalize">
                      {job.practical_info.paymentMethod.replace("-", " ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:space-y-6">
            {/* Action Buttons */}
            <Card className="bg-card border-border">
              <CardContent className="p-4 lg:p-6 space-y-3">
                <Link href={`/jobs/${job.id}/apply`}>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                    Apply Now
                  </Button>
                </Link>
                <Button variant="secondary" className="w-full bg-secondary text-secondary-foreground" size="lg">
                  <Heart className="h-4 w-4 mr-2" />
                  Save Job
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-ring text-foreground hover:bg-accent bg-transparent"
                  size="lg"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Employer
                </Button>
                <Button variant="ghost" className="w-full text-muted-foreground" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Job
                </Button>
              </CardContent>
            </Card>

            {/* Job Summary */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Job Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Job Type:</span>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    {job.jobType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="text-foreground capitalize">{job.experienceLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Work Type:</span>
                  <span className="text-foreground capitalize">{job.workType.replace("-", " ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="text-foreground capitalize">{job.duration.replace("-", " ")}</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockJobs
                  .filter((j) => j.id !== job.id && j.jobType === job.jobType)
                  .slice(0, 3)
                  .map((similarJob) => (
                    <Link key={similarJob.id} href={`/jobs/${similarJob.id}`}>
                      <div className="p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                        <h4 className="font-medium text-foreground text-sm">{similarJob.title}</h4>
                        <p className="text-xs text-muted-foreground">{similarJob.company}</p>
                        <p className="text-xs text-primary font-medium mt-1">{formatPay(similarJob)}</p>
                      </div>
                    </Link>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{job.title}</p>
            <p className="text-sm text-primary font-bold">{formatPay(job)}</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">Apply Now</Button>
        </div>
      </div>
    </div>
  )
}
