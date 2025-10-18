"use client"

import useSWR from "swr"
import { useMemo, useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
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
  CheckCircle2,
  XCircle,
  Clock,
  Inbox,
} from "lucide-react"
import { GetallUsers } from "@/lib/AdminApi/admin"
import { UpdateStatus } from "@/lib/UserApi/user"
import { notifySuccess } from "@/lib/toast"
import { Country, State } from "country-state-city";
import { ScheduleInterviewModal } from "./schedule-interview-modal"
import { LabourProfileModal } from "./labour-profile-modal"

const countyLibrary = require("county")
const fetcher = (url: string) => fetch(url).then((r) => r.json())

const statusColors: Record<VerificationStatus, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "outline",
  submitted: "secondary",
  interview: "default",
  interview_fixed: "default",
  interviewed: "default",
  verified: "default",
  rejected: "destructive",
}

const parseLocation = (location: string) => {
  if (!location) return { state: "", county: "" }
  const parts = location.split(",").map((part) => part.trim())
  return {
    state: parts[1] || "",
    county: parts[2] || "",
  }
}

const exportToCSV = (users: User[]) => {
  if (!users || users.length === 0) {
    alert("No users to export")
    return
  }

  // Define CSV headers
  const headers = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Role",
    "Location",
    "Verification Status",
    "Created At",
    "Updated At",
    "Skill Level",
    "Experience Range",
    "Skills",
    "Resume URL",
    "ID Proof URL",
    "Certificate URL",
    "Portfolio URL",
  ]

  // Map user data to CSV rows
  const rows = users.map((user) => [
    user.id,
    user.name,
    user.email,
    user.phone || "",
    user.role,
    user.location,
    user.verificationStatus,
    user.createdAt,
    user.updatedAt,
    user.labourProfile?.skillLevel || "",
    user.labourProfile?.experienceRange || "",
    user.labourProfile?.skills || "",
    user.labourProfile?.resumeUrl || "",
    user.labourProfile?.idProofUrl || "",
    user.labourProfile?.certificateUrl || "",
    user.labourProfile?.portfolioUrl || "",
  ])

  // Create CSV content
  const csvContent = [
    headers.map((h) => `"${h}"`).join(","),
    ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
  ].join("\n")

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `users-export-${new Date().toISOString().split("T")[0]}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  notifySuccess("Users exported to CSV successfully")
}

export function UsersTable() {
  const { data, error, isLoading } = useSWR<User[]>("/data/users.json", GetallUsers)
  const [statusOverrides, setStatusOverrides] = useState<Record<number, VerificationStatus>>({})
  const [q, setQ] = useState("")
  const [filterStatus, setFilterStatus] = useState<VerificationStatus | "all">("all")
  const [filterState, setFilterState] = useState<string>("all")
  const [filterCounty, setFilterCounty] = useState<string>("all")
  const [availableCounties, setCounties] = useState<string[]>([])

  // 🗺️ Load United States
  const regions = useMemo(() => {
    const usa = Country.getAllCountries().find((r) => r.name === "United States")
    return usa ? [usa] : []
  }, [])

  // 🏛️ Load states of the USA
  const states = useMemo(() => {
    if (!regions.length) return []
    return State.getStatesOfCountry(regions[0].isoCode)
  }, [regions])

  // 🏘️ Fetch counties dynamically when state changes
  const fetchCounties = useCallback(
    async (stateCode: string) => {
      const selectedState = states.find((s) => s.isoCode === stateCode)
      const stateName = selectedState?.name
      if (stateName) {
        const countiesData = countyLibrary.getCountiesByState(stateName) ?? []
        setCounties(countiesData)
      }
    },
    [states]
  )

  useEffect(() => {
    if (filterState && filterState !== "all") {
      fetchCounties(filterState)
    } else {
      setCounties([])
    }
  }, [filterState, fetchCounties])

  // 🧠 Data filtering (unchanged logic)
 const users = useMemo<User[] | undefined>(() => {
  if (!data) return data

  // Apply status overrides
  const merged = data.map((u) => ({
    ...u,
    verificationStatus: statusOverrides[u.id] ?? u.verificationStatus,
  }))

  // ✅ Filter only labour users first
  const labourUsers = merged.filter((u) => u.role?.toLowerCase() === "labour")

  // Apply verification status filter
  const filteredByStatus =
    filterStatus === "all"
      ? labourUsers
      : labourUsers.filter((u) => u.verificationStatus === filterStatus)

  // Apply state filter
  const filteredByState =
    filterState === "all"
      ? filteredByStatus
      : filteredByStatus.filter((u) => {
          const { state } = parseLocation(u.location || "")
          const selectedState = states.find((s) => s.isoCode === filterState)
          return selectedState?.isoCode?.toLowerCase() === state.toLowerCase()
        })

  // Apply county filter
  const filteredByCounty =
    filterCounty === "all"
      ? filteredByState
      : filteredByState.filter((u) => {
          const { county } = parseLocation(u.location || "")
          return county?.toLowerCase() === filterCounty.toLowerCase()
        })

  // Apply search filter
  const searched = q
    ? filteredByCounty.filter(
        (u) =>
          u.name?.toLowerCase().includes(q.toLowerCase()) ||
          u.email?.toLowerCase().includes(q.toLowerCase()) ||
          String(u.id).includes(q)
      )
    : filteredByCounty

  // Sort by latest update time
  return [...searched].sort(
    (a, b) =>
      new Date(b.updatedAt || "").getTime() - new Date(a.updatedAt || "").getTime()
  )
}, [data, statusOverrides, q, filterStatus, filterState, filterCounty, states])

  const setStatus = async (id: number, status: VerificationStatus) => { setStatusOverrides((prev) => ({ ...prev, [id]: status })) 
  const response = await UpdateStatus(id, status) 
  if (response) { const user = users?.find((u) => u.id === id) 
    const displayName = `user?.name ?? User ${ id }`
   notifySuccess(`${ displayName } marked as ${ status }`)
   } }
  return (
    <div className="rounded-lg border">
      {/* Toolbar */}
      <div
        className="
          flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between
          backdrop-blur-md bg-white/10 border border-white/20
          rounded-xl shadow-md
          transition-all duration-300
          hover:bg-white/20
        "
      >
        <div className="flex items-center gap-2 w-full sm:w-1/2">
          <User2 className="size-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, email, or ID"
            className="bg-white/5 backdrop-blur-sm border border-white/20 focus:bg-white/10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />

          {/* Status Filter */}
          <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
            <SelectTrigger
              className="
                h-8 w-[140px]
                bg-white/5 backdrop-blur-sm border border-white/20
                focus:ring-2 focus:ring-white/30
              "
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          {/* State Filter */}
          <Select value={filterState} onValueChange={setFilterState}>
            <SelectTrigger
              className="
                h-8 w-[140px]
                bg-white/5 backdrop-blur-sm border border-white/20
                focus:ring-2 focus:ring-white/30
              "
            >
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state.name} value={state.isoCode}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* County Filter - Only visible when state is selected */}
          {filterState !== "all" && (
            <Select value={filterCounty} onValueChange={setFilterCounty}>
              <SelectTrigger
                className="
                  h-8 w-[140px]
                  bg-white/5 backdrop-blur-sm border border-white/20
                  focus:ring-2 focus:ring-white/30
                  animate-in fade-in duration-200
                "
              >
                <SelectValue placeholder="County" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Counties</SelectItem>
                {availableCounties.map((county) => (
                  <SelectItem key={county} value={county}>
                    {county}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Button
            onClick={() => exportToCSV(users || [])}
            size="sm"
            variant="outline"
            className="h-8 gap-2 border-white/20 text-white/90 hover:bg-white/20 bg-transparent"
            title="Export users to CSV"
          >
            <Download className="size-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md mt-4">
        <table className="w-full text-sm text-left text-white/90">
          <thead className="bg-white/20 text-white uppercase text-xs tracking-wider">
            <tr className="[&>th]:px-4 [&>th]:py-3">
              <th className="w-[60px]">ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Address</th>
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
                (status === "submitted" || status === "interview" || status === "verified" ||status=="interview_fixed"|| status === "rejected")
              const canSchedule = status === "submitted"

              const resume = user.labourProfile?.resumeUrl
              const idProof = user.labourProfile?.idProofUrl
              const cert = user.labourProfile?.certificateUrl
              const portfolio = user.labourProfile?.portfolioUrl

              const statusIcon =
                status === "pending" ? (
                  <Clock className="size-4 text-yellow-400" />
                ) : status === "submitted" ? (
                  <Inbox className="size-4 text-blue-400" />
                ) : status === "interview" ? (
                  <CalendarClock className="size-4 text-indigo-400" />
                ): status === "interview_fixed" ? (
                  <CalendarClock className="size-4 text-indigo-400" />
                ) : status === "verified" ? (
                  <CheckCircle2 className="size-4 text-emerald-400" />
                ) : (
                  <XCircle className="size-4 text-rose-400" />
                )

              return (
                <tr key={user.id} className="border-t border-white/10 hover:bg-white/10 transition-colors duration-150">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-full bg-white/10 grid place-items-center">
                        <User2 className="size-4 text-white/70" />
                      </div>
                      <div className="leading-tight">
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-xs text-white/60">{user.phone || "—"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 truncate max-w-[220px]">
                      <Mail className="size-3.5 text-white/60" />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/80">{user.role}</td>
                  <td className="px-4 py-3 text-white/80">{user.location}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {statusIcon}
                      <Badge variant={statusColors[status]} className="capitalize bg-white/20 text-white">
                        {status}
                      </Badge>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <LabourProfileModal
                  user={user}
                  trigger={
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!canViewProfile}
                      title="Open profile"
                      className="border-white/20 text-white/90 hover:bg-white/20"
                    >
                      <Eye className="size-4" />
                    </Button>
                  }
                />

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setStatus(user.id, "verified")}
                        title="Approve"
                        className="text-emerald-400 hover:bg-emerald-400/20"
                      >
                        <CheckCircle2 className="size-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setStatus(user.id, "rejected")}
                        title="Reject"
                        className="text-rose-400 hover:bg-rose-400/20"
                      >
                        <XCircle className="size-4" />
                      </Button>

                      {canSchedule && (
                  <ScheduleInterviewModal
                    candidateId={user.id}
                    trigger={
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-indigo-400 hover:bg-indigo-400/20"
                        title="Schedule interview"
                      >
                        <CalendarClock className="size-4" />
                      </Button>
                    }
                  />
                )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                          >
                            <FolderOpen className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white/10 backdrop-blur-md border border-white/20"
                        >
                          {[
                            { label: "Resume", icon: FileText, url: resume },
                            { label: "ID Proof", icon: IdCard, url: idProof },
                            { label: "Certificate", icon: BadgeCheck, url: cert },
                            { label: "Portfolio", icon: Download, url: portfolio },
                          ].map(({ label, icon: Icon, url }) => (
                            <DropdownMenuItem asChild key={label}>
                              <a
                                href={url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className={
                                  !url ? "pointer-events-none opacity-50" : "text-white hover:text-emerald-300"
                                }
                              >
                                <Icon className="size-4 mr-2" />
                                {label}
                              </a>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              )
            })}

            {!users?.length && (
              <tr>
                <td className="px-4 py-6 text-white/60 text-center" colSpan={7}>
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
