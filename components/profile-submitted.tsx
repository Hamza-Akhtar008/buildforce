import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { DocumentViewer } from "./document-viewer"

type Profile = {
  id?: number
  resumeUrl?: string
  idProofUrl?: string
  certificateUrl?: string
  portfolioUrl?: string
  skillLevel?: string
  experienceRange?: string
}

function DocRow({
  label,
  url,
}: {
  label: string
  url?: string
}) {
  const isValid = !!url && /^https?:\/\//i.test(url)
  return (
    <div className="flex items-center justify-between gap-4 py-3 m-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      {isValid ? (
        <div className="flex items-center gap-2">
          {url ? <DocumentViewer label={label} url={url} /> : null}
          <Button asChild size="sm" variant="secondary" className="shrink-0">
            <a href={url} target="_blank" rel="noreferrer noopener" aria-label={`Open ${label}`}>
              Open
            </a>
          </Button>
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">Not provided</span>
      )}
    </div>
  )
}

export default function ProfileSubmitted({ profile }: { profile: Profile }) {
  const level = profile.skillLevel?.toString() ?? "N/A"
  const years = profile.experienceRange ? `${profile.experienceRange} years` : "N/A"
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-balance">Your profile has been submitted</CardTitle>
        <CardDescription className="text-pretty">
          Please wait while we verify your information. We’ll notify you once the review is complete.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <section aria-labelledby="profile-summary" className="grid gap-3">
          <h2 id="profile-summary" className="sr-only">
            Profile summary
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              className={cn("bg-secondary text-secondary-foreground")}
              aria-label={`Profile ID ${profile.id ?? "N/A"}`}
            >
              ID: {profile.id ?? "N/A"}
            </Badge>
            <Badge className={cn("bg-accent text-accent-foreground")} aria-label={`Skill level ${level}`}>
              {level}
            </Badge>
            <Badge className={cn("bg-primary text-primary-foreground")} aria-label={`Experience ${years}`}>
              {years}
            </Badge>
          </div>
        </section>

        <section aria-labelledby="uploaded-documents" className="grid gap-1">
          <h2 id="uploaded-documents" className="text-sm font-medium">
            Uploaded documents
          </h2>
          <div className="divide-y divide-border rounded-md border">
            <DocRow label="Resume" url={profile.resumeUrl} />
            <DocRow label="ID Proof" url={profile.idProofUrl} />
            <DocRow label="Certificate" url={profile.certificateUrl} />
            <DocRow label="Portfolio" url={profile.portfolioUrl} />
          </div>
        </section>

        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm underline underline-offset-4 text-muted-foreground">
            Go back home
          </Link>
          <Button className="bg-primary text-primary-foreground hover:opacity-90">Done</Button>
        </div>
      </CardContent>
    </Card>
  )
}
