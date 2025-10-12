"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, HardHat, ArrowRight, Clock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FetchInterview, SelectInterviewDate } from "@/lib/UserApi/user";
import { useAuth } from "@/contexts/AuthContext";
import { notifyError, notifySuccess } from "@/lib/toast";

export default function SelectInterviewPage() {
  const { auth } = useAuth();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [interviewid , setInterviewid] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterview = async () => {
      setLoading(true);
      try {
        const response = await FetchInterview(auth?.id || 0);

        if (response && typeof response === "object") {
          // Parse available dates (comma-separated string)
          console.log("FetchInterview response:", response);
          setInterviewid(response[0].id || null);
          const dateStrings = (response[0].date || "")
            .split(",")
            .map((d: string) => d.trim())
            
console.log("Fetched date strings:", dateStrings);
          const parsedDates = dateStrings.map((d: string) => {
            const [day, month, year] = d.split("-");
            return new Date(`${year}-${month}-${day}`);
          });

          // Parse available time slots
          const parsedTimes = (response[0].timeSlots || "")
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean);

          setAvailableDates(parsedDates);
          setAvailableTimes(parsedTimes);
        }
      } catch (error) {
        console.error("Error fetching interview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [auth?.id]);

  const isDateSelectable = (date: Date) =>
    availableDates.some((d) => d.toDateString() === date.toDateString());

  const handleConfirmInterview = async() => {
    if (selectedDate && selectedTime) {
     console.log("Selected Date:", selectedDate);
      console.log("Selected Time:", selectedTime);
      const response =   await SelectInterviewDate(interviewid || 0, selectedDate.toDateString(), selectedTime);
      if(response) {
      notifySuccess("Interview scheduled successfully!");
      router.push("/unverified/interviewwait");
      }
      else

        {
          notifyError("Failed to schedule interview. Please try again.");
        }
    }
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground text-lg font-medium">
          Loading interview data...
        </p>
      </div>
    );
  }

  return (
 <div className="min-h-screen py-12  text-foreground relative overflow-hidden">

      {/* 🌟 Animated Background */}
      <div className="absolute inset-0 animate-glassflow  "></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(203,156,44,0.08),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(203,156,44,0.1),transparent_60%)] blur-3xl"></div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-6 space-y-10 z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-[var(--primary)]/20 rounded-xl backdrop-blur-md border border-[var(--glass-border)] shadow-md">
              <HardHat className="h-8 w-8 text-[var(--primary)]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Schedule Your Interview</h1>
              <p className="text-muted-foreground text-lg">
                Select your preferred date and time
              </p>
            </div>
          </div>
        </div>

        {/* Glass Card */}
        <Card className="border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-lg shadow-[var(--glass-shadow)] hover:shadow-xl hover:shadow-[var(--glass-highlight)] transition-all duration-300 rounded-2xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Date Picker */}
              <div className="space-y-6">
                <div className="text-center pb-4 border-b border-[var(--glass-border)]">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <CalendarDays className="h-6 w-6 text-[var(--primary)]" />
                    <h2 className="text-xl font-semibold">Choose Date</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select an available interview date
                  </p>
                </div>

                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate!}
                    onSelect={(date) => {
                      if (date && isDateSelectable(date)) {
                        setSelectedDate(date);
                        setSelectedTime("");
                      }
                    }}
                    disabled={(date) => !isDateSelectable(date)}
                    className="rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-sm backdrop-blur-md"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-6">
                <div className="text-center pb-4 border-b border-[var(--glass-border)]">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Clock className="h-6 w-6 text-[var(--primary)]" />
                    <h2 className="text-xl font-semibold">Choose Time</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select a time slot for your interview
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {availableTimes.length > 0 ? (
                    availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={`h-20 text-base font-medium backdrop-blur-md transition-all duration-200 ${
                          selectedTime === time
                            ? "bg-[var(--primary)]/90 text-[var(--primary-foreground)] border-[var(--primary)] shadow-lg scale-105"
                            : "bg-[var(--glass-bg)] text-foreground border-[var(--glass-border)] hover:bg-[var(--primary)]/10"
                        }`}
                        onClick={() => setSelectedTime(time)}
                        disabled={!selectedDate}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Clock className="h-5 w-5" />
                          <span className="font-semibold">{time}</span>
                        </div>
                      </Button>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center col-span-2">
                      No time slots available.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Selected Info */}
            {(selectedDate || selectedTime) && (
              <div className="mt-8 pt-6 border-t border-[var(--glass-border)]">
                <div className="flex justify-center">
                  <div className="bg-[var(--primary)]/10 border border-[var(--glass-border)] rounded-lg px-6 py-4 max-w-md w-full backdrop-blur-md shadow-md">
                    <div className="text-center space-y-2">
                      {selectedDate && (
                        <p className="text-lg font-semibold text-[var(--primary)]">
                          {formatDate(selectedDate)}
                        </p>
                      )}
                      {selectedTime && (
                        <p className="text-xl font-bold text-[var(--primary)]">
                          {selectedTime}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Confirm Button */}
        {selectedDate && selectedTime && (
          <div className="text-center">
            <Button
              onClick={handleConfirmInterview}
              size="lg"
              className="bg-[var(--primary)]/90 text-[var(--primary-foreground)] border border-[var(--glass-border)] backdrop-blur-md hover:bg-[var(--primary)] hover:shadow-lg hover:shadow-[var(--glass-highlight)] px-12 py-4 text-lg font-semibold transition-all duration-300"
            >
              <span>Confirm Interview</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
      </div>

  );
}
