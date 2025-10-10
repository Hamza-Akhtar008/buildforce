"use client"

import { useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"

function buildEmbedUrl(url: string) {
  const lower = url.toLowerCase()
  const isDoc = lower.endsWith(".doc") || lower.endsWith(".docx")
  // Use Office viewer for Word docs; otherwise try direct embed (PDF, etc.)
  if (isDoc) {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`
  }
  return url
}

export function DocumentViewer({
  label,
  url,
}: {
  label: string
  url: string
}) {
  const isValid = /^https?:\/\//i.test(url)
  const embedUrl = useMemo(() => (isValid ? buildEmbedUrl(url) : ""), [isValid, url])

  if (!isValid) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary text-primary-foreground hover:opacity-90">
          View in app
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-pretty">{label}</DialogTitle>
        </DialogHeader>
        <div className="rounded-md border">
          <AspectRatio ratio={16 / 10}>
            {/* Using iframe to embed the document viewer */}
            <iframe
              title={`${label} preview`}
              src={embedUrl}
              className="h-full w-full rounded-md"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </AspectRatio>
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button asChild variant="secondary" size="sm">
            <a href={url} target="_blank" rel="noreferrer noopener" aria-label={`Open ${label} in new tab`}>
              Open in new tab
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
