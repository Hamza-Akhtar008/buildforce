"use client"

import type React from "react"
import { useState } from "react"
import { format, isBefore, startOfDay } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CalendarCheck, Info, Plus, X, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { notifyError, notifySuccess } from "@/lib/toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { ScheduleInterview } from "@/lib/AdminApi/admin"

export function ScheduleInterviewModal({
  candidateId,
  trigger,
}: {
  candidateId: number
  trigger?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [dates, setDates] = useState<Date[]>([])
  const [times, setTimes] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")

  // ---- DATE HANDLER ----
  const addDate = () => {
    if (!selectedDate) return notifyError("Select a valid date first.")
    if (isBefore(startOfDay(selectedDate), startOfDay(new Date())))
      return notifyError("You cannot select past dates or today.")

    const exists = dates.some((d) => d.toDateString() === selectedDate.toDateString())
    if (exists) return notifyError("This date is already added.")

    setDates([...dates, selectedDate])
    setSelectedDate(undefined)
  }

  const removeDate = (d: Date) => setDates((prev) => prev.filter((x) => x.getTime() !== d.getTime()))

  // ---- TIME HANDLER ----
  const addTime = () => {
    if (!selectedTime) return notifyError("Select a time first.")
    if (times.length >= 4) return notifyError("You can only add up to 4 time slots.")
    if (times.includes(selectedTime)) return notifyError("This time slot already exists.")
    setTimes([...times, selectedTime])
    setSelectedTime("")
  }

  const removeTime = (t: string) => setTimes((prev) => prev.filter((x) => x !== t))

  // ---- SUBMIT ----
const onSubmit = async () => {
  if (dates.length === 0 || times.length === 0)
    return notifyError("Add at least one date and one time slot.");

  const formattedDates = dates.map((d) => d.toISOString().split("T")[0]);

  const payload = {
    candidateId: candidateId,
    date: formattedDates.join(","), // "2025-10-12,2025-10-13"
    timeSlots: times.join(","), // "10:00,14:30,16:00"
  };
console.log("Scheduling interview with payload:", payload);
  try {
    const res = await ScheduleInterview(payload);
    notifySuccess("Your interview availability was posted successfully.");

    setDates([]);
    setTimes([]);
    setOpen(false);
  } catch {
    notifyError("Failed to schedule interviews.");
  }
};


  return (
   <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    {trigger ?? (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Schedule interview"
        title="Schedule interview"
        className="hover:bg-white/20 hover:backdrop-blur-md transition-all"
      >
        <CalendarCheck className="size-4" />
      </Button>
    )}
  </DialogTrigger>

  <DialogContent
    className="
      sm:max-w-xl 
      rounded-2xl 
      border border-white/20 
      bg-white/10 
      backdrop-blur-2xl 
      shadow-2xl 
      text-white 
      p-0 
      overflow-hidden
      transition-all duration-300
    "
  >
    {/* HEADER */}
    <div className="border-b border-white/20 bg-white/10 px-6 py-5">
      <DialogHeader className="p-0">
        <DialogTitle className="text-lg font-semibold tracking-wide">
          Schedule Interview — Candidate #{candidateId}
        </DialogTitle>
      </DialogHeader>
      <p className="mt-2 text-sm text-white/70 flex items-center gap-2">
        <Info className="size-4" />
        Select multiple upcoming dates and up to four global time slots.
      </p>
    </div>

    {/* BODY */}
    <div className="px-6 py-6 space-y-6">
      {/* --- DATE SECTION --- */}
      <div className="space-y-2">
        <Label className="text-white/80 text-sm font-medium">Select Date(s)</Label>

        <div className="flex flex-wrap gap-3 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[180px] justify-start text-left font-normal border-white/20 bg-white/10 hover:bg-white/20 text-white"
              >
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="p-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl"
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) =>
                  isBefore(startOfDay(date), startOfDay(new Date())) ||
                  date.toDateString() === new Date().toDateString()
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="secondary"
            onClick={addDate}
            className="bg-white/20 border-white/20 hover:bg-white/30 text-white"
          >
            <Plus className="size-4 mr-2" />
            Add Date
          </Button>
        </div>

        {dates.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {dates.map((d) => (
              <span
                key={d.toISOString()}
                className="inline-flex items-center rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white/90"
              >
                {format(d, "PPP")}
                <button
                  aria-label="Remove date"
                  className="ml-2 text-white/70 hover:text-white"
                  onClick={() => removeDate(d)}
                >
                  <X className="size-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <Separator className="bg-white/20" />

      {/* --- TIME SECTION --- */}
      <div className="space-y-2">
        <Label className="text-white/80 text-sm font-medium">
          Add Global Time Slots (max 4)
        </Label>

        <div className="flex flex-wrap items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[140px] justify-start font-normal border-white/20 bg-white/10 hover:bg-white/20 text-white"
              >
                {selectedTime ? selectedTime : "Pick time"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl"
            >
              <Input
                type="time"
                step={900}
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-white/10 border-white/20 text-white"
              />
              <Button
                onClick={addTime}
                className="mt-3 w-full bg-white/20 text-white hover:bg-white/30 border-white/20"
                disabled={times.length >= 4}
              >
                <Clock className="size-4 mr-2" />
                Add Time
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        {times.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {times.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white/90"
              >
                {t}
                <button
                  aria-label="Remove time"
                  className="ml-2 text-white/70 hover:text-white"
                  onClick={() => removeTime(t)}
                >
                  <X className="size-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* FOOTER */}
    <div className="border-t border-white/20 bg-white/10 px-6 py-4 flex justify-end gap-3">
      <Button
        variant="secondary"
        onClick={() => setOpen(false)}
        className="bg-white/10 text-white hover:bg-white/20 border-white/20"
      >
        Cancel
      </Button>
      <Button
        onClick={onSubmit}
        className="bg-white/20 text-white hover:bg-white/30 border border-white/20"
      >
        <CalendarCheck className="size-4 mr-2" />
        Post Availability
      </Button>
    </div>
  </DialogContent>
</Dialog>

  )
}
