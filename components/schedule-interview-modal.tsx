"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { notifyError, notifySuccess } from "@/lib/toast"
import { CalendarCheck, Info, Plus, Trash2 } from "lucide-react"
import { Separator } from "@radix-ui/react-separator"


type Entry = { date: string; timeSlots: string }

export function ScheduleInterviewModal({
  candidateId,
  trigger,
}: {
  candidateId: number
  trigger: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [entries, setEntries] = useState<Entry[]>([{ date: "", timeSlots: "" }])


  const addEntry = () => setEntries((prev) => [...prev, { date: "", timeSlots: "" }])
  const removeEntry = (index: number) => setEntries((prev) => prev.filter((_, i) => i !== index))
  const updateEntry = (index: number, field: keyof Entry, value: string) =>
    setEntries((prev) => prev.map((e, i) => (i === index ? { ...e, [field]: value } : e)))

  const onSubmit = async () => {
    const payload = entries
      .filter((e) => e.date && e.timeSlots)
      .map((e) => ({ date: e.date, timeSlots: e.timeSlots, candidateId }))

    if (payload.length === 0) {
      notifyError( "Add at least one date and time slot.")
      return
    }

    try {
      const res = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: payload }),
      })
      if (!res.ok) throw new Error("Failed to schedule interviews")
        notifySuccess("Your interview slots were posted successfully.")
   //   toast({ title: "Interviews scheduled", description: "Your interview slots were posted successfully." })
      setOpen(false)
    } catch (e: any) {
      notifyError( "Failed to schedule interviews")

     // toast({ title: "Error", description: e?.message || "Failed to schedule interviews", variant: "destructive" })
    }
  }

  return (
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-pretty">Schedule Interview — Candidate #{candidateId}</DialogTitle>
        </DialogHeader>

        <div className="rounded-md bg-muted/30 border text-xs text-muted-foreground px-3 py-2 flex items-center gap-2">
          <Info className="size-4" /> Enter multiple time windows per date, separated by commas (e.g. 09:00-09:30,
          10:00-10:30).
        </div>

        <div className="grid gap-4">
          {entries.map((entry, index) => (
            <div key={index} className="rounded-md border p-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                <div className="grid gap-1">
                  <Label htmlFor={`date-${index}`}>Date</Label>
                  <Input
                    id={`date-${index}`}
                    type="date"
                    value={entry.date}
                    onChange={(e) => updateEntry(index, "date", e.target.value)}
                  />
                </div>
                <div className="grid gap-1 md:col-span-2">
                  <Label htmlFor={`times-${index}`}>Time Slots</Label>
                  <Input
                    id={`times-${index}`}
                    placeholder="e.g. 09:00-09:30, 10:00-10:30"
                    value={entry.timeSlots}
                    onChange={(e) => updateEntry(index, "timeSlots", e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <Button variant="secondary" onClick={() => removeEntry(index)} disabled={entries.length === 1}>
                  <Trash2 className="size-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={addEntry}>
              <Plus className="size-4 mr-2" />
              Add another
            </Button>
          </div>
        </div>

        <Separator />

        <DialogFooter className="mt-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            <CalendarCheck className="size-4 mr-2" />
            Post interview dates
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
