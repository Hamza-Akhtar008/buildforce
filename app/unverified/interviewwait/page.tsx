"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, CalendarDays, Clock, ArrowLeft, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FetchInterview } from "@/lib/UserApi/user";
import { useAuth } from "@/contexts/AuthContext";

export default function InterviewConfirmation() {
  const router = useRouter();
 const {auth} = useAuth();
const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
const [selectedTime, setSelectedTime] = useState<string>("");
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchInterview = async () => {
    setLoading(true);
    try {
      const response = await FetchInterview(auth?.id || 0);
      console.log("FetchInterview response:", response);

      if (response && Array.isArray(response) && response.length > 0) {
        const interview = response[0];

        // Parse and set selected date
        if (interview.selectedDate) {
          const parsedDate = new Date(interview.selectedDate);
          setSelectedDate(parsedDate);
          console.log("Parsed selected date:", parsedDate);
        }

        // Parse and set selected time
        if (interview.selectedTimeSlot) {
          setSelectedTime(interview.selectedTimeSlot);
          console.log("Parsed selected time:", interview.selectedTimeSlot);
        }
      } else {
        console.warn("No interview data found for this user.");
      }
    } catch (error) {
      console.error("Error fetching interview data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchInterview();
}, [auth?.id]);

  
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[var(--background)] via-[var(--secondary)] to-[var(--background)] text-foreground relative overflow-hidden">
      
      {/* Animated background */}
      <div className="absolute inset-0 "></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(203,156,44,0.08),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(203,156,44,0.1),transparent_60%)] blur-3xl"></div>
      
      {/* Confirmation Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg"
      >
        <Card className="border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-lg shadow-[var(--glass-shadow)] rounded-2xl text-center p-10 space-y-6">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="p-4 rounded-full bg-[var(--primary)]/20 border border-[var(--glass-border)] backdrop-blur-md">
              <CheckCircle2 className="h-12 w-12 text-[var(--primary)]" />
            </div>
          </motion.div>

          <h1 className="text-3xl font-bold text-[var(--primary)]">Interview Scheduled!</h1>
          <p className="text-muted-foreground text-lg">
            Your interview has been successfully scheduled.
          </p>

          <div className="flex flex-col items-center space-y-4 mt-4">
            <div className="flex items-center space-x-3">
              <CalendarDays className="h-6 w-6 text-[var(--primary)]" />
              <span className="font-semibold text-lg">
                {selectedDate ? selectedDate.toDateString() : "Not Available"}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-6 w-6 text-[var(--primary)]" />
              <span className="font-semibold text-lg">
                {selectedTime ? selectedTime : "Not Available"}
              </span>
            </div>
          </div>

        
        </Card>
      </motion.div>
    </div>
  );
}
