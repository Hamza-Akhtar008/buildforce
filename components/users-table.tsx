"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LabourProfileModal } from "./labour-profile-modal"
import { ScheduleInterviewModal } from "./schedule-interview-modal"
import type { User, VerificationStatus } from "@/types/user"
import {
  Eye,
  Download,
  FileText,
  Award as IdCard,
  BadgeCheck,
  FolderOpen,
  Filter,
  CalendarClock,
  User2,
  Mail,
} from "lucide-react"
import { GetallUsers } from "@/lib/AdminApi/admin"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const statusColors: Record<VerificationStatus, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "outline",
  submitted: "secondary",
  interview: "default",
  approved: "default",
  rejected: "destructive",
}

export function UsersTable() {
  const { data, error, isLoading } = useSWR<User[]>("/data/users.json", GetallUsers)
  const [statusOverrides, setStatusOverrides] = useState<Record<number, VerificationStatus>>({})
  const [q, setQ] = useState("")
  const [filterStatus, setFilterStatus] = useState<VerificationStatus | "all">("all")

  const users = useMemo<User[] | undefined>(() => {
    if (!data) return data
    const merged = data.map((u) => ({
      ...u,
      verificationStatus: statusOverrides[u.id] ?? u.verificationStatus,
    }))
    const filtered = filterStatus === "all" ? merged : merged.filter((u) => u.verificationStatus === filterStatus)
    const searched = q
      ? filtered.filter(
          (u) =>
            u.name.toLowerCase().includes(q.toLowerCase()) ||
            u.email.toLowerCase().includes(q.toLowerCase()) ||
            String(u.id).includes(q),
        )
      : filtered
    return searched
  }, [data, statusOverrides, q, filterStatus])

  if (isLoading) return <div className="text-muted-foreground">Loading users…</div>
  if (error) return <div className="text-destructive">Error loading users.</div>

  const setStatus = (id: number, status: VerificationStatus) =>
    setStatusOverrides((prev) => ({ ...prev, [id]: status }))

  return (
    <div className="rounded-lg border">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 w-full sm:w-1/2">
          <User2 className="size-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, email, or ID" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">pending</SelectItem>
              <SelectItem value="submitted">submitted</SelectItem>
              <SelectItem value="interview">interview</SelectItem>
              <SelectItem value="approved">approved</SelectItem>
              <SelectItem value="rejected">rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60">
            <tr className="[&>th]:px-4 [&>th]:py-3 text-left">
              <th>ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="w-[360px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              const status = user.verificationStatus as VerificationStatus
              const hasProfile = !!user.labourProfile
              const canViewProfile =
                hasProfile &&
                (status === "submitted" || status === "interview" || status === "approved" || status === "rejected")
              const canSchedule = status === "submitted"

              const resume = user.labourProfile?.resumeUrl
              const idProof = user.labourProfile?.idProofUrl
              const cert = user.labourProfile?.certificateUrl
              const portfolio = user.labourProfile?.portfolioUrl

              return (
                <tr key={user.id} className="border-t align-top">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-full bg-secondary grid place-items-center">
                        <User2 className="size-4 text-muted-foreground" />
                      </div>
                      <div className="leading-tight">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.phone || "—"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Mail className="size-3.5 text-muted-foreground" />
                      <span className="truncate max-w-[220px]">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={statusColors[status]} className="capitalize">
                        {status}
                      </Badge>
                      <Select value={status} onValueChange={(v) => setStatus(user.id, v as VerificationStatus)}>
                        <SelectTrigger className="h-8 w-[150px]">
                          <SelectValue placeholder="Set status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">pending</SelectItem>
                          <SelectItem value="submitted">submitted</SelectItem>
                          <SelectItem value="interview">interview</SelectItem>
                          <SelectItem value="approved">approved</SelectItem>
                          <SelectItem value="rejected">rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <TooltipProvider>
                      <div className="flex flex-wrap items-center gap-2">
                        <LabourProfileModal
                          user={user}
                          trigger={
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="sm" variant="outline" disabled={!canViewProfile}>
                                  <Eye className="size-4 mr-2" />
                                  View profile
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Open profile with file preview</TooltipContent>
                            </Tooltip>
                          }
                        />

                        {canSchedule ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <ScheduleInterviewModal
                                  candidateId={user.id}
                                  trigger={
                                    <Button size="sm">
                                      <CalendarClock className="size-4 mr-2" />
                                      Schedule
                                    </Button>
                                  }
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>Schedule interview dates and time slots</TooltipContent>
                          </Tooltip>
                        ) : null}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="secondary">
                              <FolderOpen className="size-4 mr-2" />
                              Downloads
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <a
                                href={resume || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className={!resume ? "pointer-events-none opacity-50" : ""}
                              >
                                <FileText className="size-4 mr-2" />
                                Resume
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a
                                href={idProof || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className={!idProof ? "pointer-events-none opacity-50" : ""}
                              >
                                <IdCard className="size-4 mr-2" />
                                ID Proof
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a
                                href={cert || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className={!cert ? "pointer-events-none opacity-50" : ""}
                              >
                                <BadgeCheck className="size-4 mr-2" />
                                Certificate
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a
                                href={portfolio || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className={!portfolio ? "pointer-events-none opacity-50" : ""}
                              >
                                <Download className="size-4 mr-2" />
                                Portfolio
                              </a>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TooltipProvider>
                  </td>
                </tr>
              )
            })}

            {!users?.length && (
              <tr>
                <td className="px-4 py-6 text-muted-foreground" colSpan={6}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
