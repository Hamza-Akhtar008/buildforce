"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type React from "react"
import type { User } from "@/types/user"
import { Eye, Download, FileText, Award as IdCard, BadgeCheck, FolderOpen, User2 } from "lucide-react"

type Props = {
  user: User
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

type FileKey = "resumeUrl" | "idProofUrl" | "certificateUrl" | "portfolioUrl"

const FileIcon = ({ k }: { k: FileKey }) => {
  if (k === "resumeUrl") return <FileText className="size-4" />
  if (k === "idProofUrl") return <IdCard className="size-4" />
  if (k === "certificateUrl") return <BadgeCheck className="size-4" />
  return <FolderOpen className="size-4" />
}

function buildOfficePreview(url: string) {
  // Try Office web viewer for doc(x), pdf falls back to iframe directly
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`
}

function isPdf(url: string) {
  try {
    const u = new URL(url)
    return u.pathname.toLowerCase().endsWith(".pdf")
  } catch {
    return false
  }
}

function isImage(url: string) {
  try {
    const u = new URL(url)
    return /\.(png|jpe?g|gif|webp|svg)$/i.test(u.pathname)
  } catch {
    return false
  }
}

export function LabourProfileModal({ user, trigger, open, onOpenChange }: Props) {
  const profile = user.labourProfile

  // NOTE: helper functions for preview remain in the file but are no longer used
  const controlledProps = typeof open === "boolean" ? { open, onOpenChange } : {}

  return (
   <Dialog {...controlledProps}>
  {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}

  <DialogContent
    className="sm:max-w-2xl p-0 overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl text-white"
  >
    {/* Header */}
    <div className="border-b border-white/20 bg-white/10 px-6 py-5">
      <DialogHeader className="p-0">
        <DialogTitle className="text-lg font-semibold tracking-wide">
          Labour Profile — {user.name}
        </DialogTitle>
      </DialogHeader>

      <div className="mt-3 flex items-start gap-3">
        <div className="size-12 rounded-full bg-white/20 grid place-items-center">
          <User2 className="size-6 text-white/70" />
        </div>
        <div className="flex-1">
          <div className="font-medium leading-tight text-white">{user.name}</div>
          <div className="text-sm text-white/70">{user.email}</div>

          {!!profile?.skills && (
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
                .map((s, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-white/20 text-white backdrop-blur-sm border border-white/10"
                  >
                    {s}
                  </Badge>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Body */}
    <div className="px-6 py-6 space-y-6">
      {!profile ? (
        <div className="text-white/70 text-center py-4 italic">
          No profile submitted yet.
        </div>
      ) : (
        <>
          {/* Info Section */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-white/60 text-xs uppercase tracking-wide">
                Skill Level
              </div>
              <div className="font-medium text-white mt-1">
                {profile.skillLevel || "—"}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-white/60 text-xs uppercase tracking-wide">
                Experience (years)
              </div>
              <div className="font-medium text-white mt-1">
                {profile.experienceRange || "—"}
              </div>
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* Files Section */}
          <div className="space-y-4">
            <div className="font-medium text-white text-base flex items-center gap-2">
              <FolderOpen className="size-4" /> Files
            </div>

            <div className="grid gap-3">
              {(
                [
                  ["resumeUrl", "Resume"],
                  ["idProofUrl", "ID Proof"],
                  ["certificateUrl", "Certificate"],
                  ["portfolioUrl", "Portfolio"],
                ] as [FileKey, string][]
              ).map(([key, label]) => {
                const href = profile[key as FileKey]
                const disabled = !href

                return (
                  <div
                    key={key}
                    className={`flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 transition-all ${
                      disabled
                        ? "opacity-50 pointer-events-none"
                        : "hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileIcon k={key as FileKey} />
                      <span className="text-sm text-white">{label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* View */}
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        disabled={disabled}
                        title="Open in new tab"
                        className="border-white/20 text-white hover:bg-white/20"
                      >
                        <a href={href || "#"} target="_blank" rel="noopener noreferrer">
                          <Eye className="size-4 mr-1.5" />
                          View
                        </a>
                      </Button>

                      {/* Download */}
                      <Button
                        size="sm"
                        variant="secondary"
                        asChild
                        disabled={disabled}
                        title="Download file"
                        className="bg-white/20 text-white hover:bg-white/30 border border-white/10"
                      >
                        <a href={href || "#"} target="_blank" rel="noopener noreferrer" download>
                          <Download className="size-4 mr-1.5" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  </DialogContent>
</Dialog>

  )
}
