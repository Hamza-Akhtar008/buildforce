"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type React from "react"
import type { User } from "@/types/user"
import { Eye, Download, FileText, Award as IdCard, BadgeCheck, FolderOpen, User2 } from "lucide-react"
import { useEffect, useMemo, useState } from "react" // add state for tabs and effects

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

  const availableKeys = useMemo(
    () => (["resumeUrl", "idProofUrl", "certificateUrl", "portfolioUrl"] as FileKey[]).filter((k) => !!profile?.[k]),
    [profile],
  )
  const [activeTab, setActiveTab] = useState<FileKey | undefined>(availableKeys[0])

  useEffect(() => {
    // reset when modal reopens or profile changes
    setActiveTab(availableKeys[0])
  }, [availableKeys, open])

  const controlledProps = typeof open === "boolean" ? { open, onOpenChange } : {}

  return (
    <Dialog {...controlledProps}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-pretty">Labour Profile — {user.name}</DialogTitle>
        </DialogHeader>

        {!profile ? (
          <div className="text-muted-foreground">No profile submitted yet.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-5">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-secondary grid place-items-center">
                  <User2 className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium leading-tight">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Skill Level</div>
                  <div>{profile.skillLevel || "—"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Experience (years)</div>
                  <div>{profile.experienceRange || "—"}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-muted-foreground mb-1">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills
                      ? profile.skills
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                          .map((s, i) => (
                            <Badge key={i} variant="secondary">
                              {s}
                            </Badge>
                          ))
                      : "—"}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="font-medium">Files</div>
                <div className="grid gap-2">
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
                        className={`flex items-center justify-between rounded-md border px-3 py-2 ${
                          disabled ? "opacity-50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <FileIcon k={key as FileKey} />
                          <span className="text-sm">{label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={disabled}
                            title="View in preview"
                            onClick={() => setActiveTab(key as FileKey)}
                          >
                            <Eye className="size-4 mr-1.5" />
                            View
                          </Button>
                          {/* download remains as anchor */}
                          <Button size="sm" variant="secondary" asChild disabled={disabled} title="Download file">
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
            </div>

            {/* Right: preview */}
            <div className="md:col-span-3">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as FileKey)}>
                <TabsList className="mb-3">
                  {profile.resumeUrl ? <TabsTrigger value="resumeUrl">Resume</TabsTrigger> : null}
                  {profile.idProofUrl ? <TabsTrigger value="idProofUrl">ID Proof</TabsTrigger> : null}
                  {profile.certificateUrl ? <TabsTrigger value="certificateUrl">Certificate</TabsTrigger> : null}
                  {profile.portfolioUrl ? <TabsTrigger value="portfolioUrl">Portfolio</TabsTrigger> : null}
                </TabsList>

                {(["resumeUrl", "idProofUrl", "certificateUrl", "portfolioUrl"] as FileKey[]).map((k) => {
                  const url = profile[k]
                  if (!url) return null
                  const pdf = isPdf(url)
                  const image = isImage(url)
                  const office = buildOfficePreview(url)
                  return (
                    <TabsContent key={k} value={k} className="border rounded-md overflow-hidden">
                      <ScrollArea className="h-[420px]">
                        <div className="bg-muted/20">
                          {image ? (
                            <img
                              src={url || "/placeholder.svg"}
                              alt={`${k} preview`}
                              className="w-full h-auto object-contain"
                            />
                          ) : pdf ? (
                            <iframe
                              src={url}
                              className="w-full h-[420px]"
                              title={`${k} preview`}
                              aria-label={`${k} preview`}
                            />
                          ) : (
                            <iframe
                              src={office}
                              className="w-full h-[420px]"
                              title={`${k} preview`}
                              aria-label={`${k} preview`}
                            />
                          )}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  )
                })}
              </Tabs>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
