"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, HardHat, ArrowRight, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SelectInterviewPage() {
   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      undefined
   );
   const [selectedTime, setSelectedTime] = useState<string>("");
   const router = useRouter();
   const availableTimes = ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];

   const handleDateSelect = (date: Date | undefined) => {
      setSelectedDate(date);
      // Clear selected time when date changes
      setSelectedTime("");
   };

   const handleTimeSelect = (time: string) => {
      setSelectedTime(time);
   };

   const handleConfirmInterview = () => {
      if (selectedDate && selectedTime) {
         router.push("/Dashboard");
         console.log("Confirmed interview:", {
            date: selectedDate,
            time: selectedTime,
         });
         // Handle final confirmation and navigation
      }
   };

   const formatSelectedDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
         weekday: "long",
         year: "numeric",
         month: "long",
         day: "numeric",
      });
   };

   // Disable past dates
   const disabledDays = {
      before: new Date(),
   };

   return (
      <div className="min-h-screen py-8 bg-background text-foreground">
         <div className="max-w-6xl mx-auto px-6 space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
               <div className="flex items-center justify-center space-x-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                     <HardHat className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                     <h1 className="text-3xl font-bold">
                        Schedule Your Interview
                     </h1>
                     <p className="text-muted-foreground text-lg">
                        Select your preferred date and time
                     </p>
                  </div>
               </div>
            </div>

            {/* Main Selection Card */}
            <Card className="shadow-lg border-0">
               <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                     {/* Date Selection Section */}
                     <div className="space-y-6">
                        <div className="text-center pb-4 border-b border-border">
                           <div className="flex items-center justify-center space-x-2 mb-3">
                              <CalendarDays className="h-6 w-6 text-primary" />
                              <h2 className="text-xl font-semibold">
                                 Choose Date
                              </h2>
                           </div>
                           <p className="text-sm text-muted-foreground">
                              Select an available interview date
                           </p>
                        </div>

                        {/* Calendar Component */}
                        <div className="flex justify-center">
                           <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleDateSelect}
                              disabled={disabledDays}
                              className="rounded-lg border border-border shadow-sm bg-card"
                              // captionLayout="dropdown"
                              classNames={{
                                 months:
                                    "flex flex-col  space-y-4 sm:space-x-4 sm:space-y-0",
                                 month: "space-y-4",
                                 caption:
                                    "flex justify-center pt-1 relative items-center w-full",
                                 caption_label: "text-lg font-medium",
                                 nav: "space-x-1 flex items-center w-full",
                                 nav_button:
                                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md border border-border",
                                 nav_button_previous: "absolute left-1",
                                 nav_button_next: "absolute right-1",
                                 table: "w-full border-collapse space-y-1",
                                 head_row: "flex w-full justify-between",
                                 head_cell:
                                    "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                                 row: "flex w-full mt-2",
                                 cell: "h-9 w-9 text-center text-sm p-0 relative",
                                 day: "h-9 w-9 p-0 font-normal hover:bg-accent hover:text-accent-foreground rounded-md transition-colors",
                                 day_selected:
                                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground font-semibold shadow-sm",
                                 day_today:
                                    "bg-blue-100 text-blue-800 border border-blue-200 font-medium",
                                 day_outside:
                                    "text-muted-foreground opacity-50",
                                 day_disabled:
                                    "text-muted-foreground opacity-50 cursor-not-allowed",
                                 day_hidden: "invisible",
                              }}
                           />
                        </div>
                     </div>

                     {/* Time Selection Section */}
                     <div className="space-y-6">
                        <div className="text-center pb-4 border-b border-border">
                           <div className="flex items-center justify-center space-x-2 mb-3">
                              <Clock className="h-6 w-6 text-primary" />
                              <h2 className="text-xl font-semibold">
                                 Choose Time
                              </h2>
                           </div>
                           <p className="text-sm text-muted-foreground">
                              {selectedDate
                                 ? "Pick your preferred time slot"
                                 : "Select a date first"}
                           </p>
                        </div>

                        {/* Time Slots Grid */}
                        <div className="grid grid-cols-2 gap-4">
                           {availableTimes.map((time) => (
                              <Button
                                 key={time}
                                 variant={
                                    selectedTime === time
                                       ? "default"
                                       : "outline"
                                 }
                                 disabled={!selectedDate}
                                 className={`h-20 text-base font-medium transition-all duration-200 ${
                                    selectedTime === time
                                       ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary shadow-lg scale-105"
                                       : selectedDate
                                       ? "border-border hover:border-primary/50 hover:bg-primary/5 hover:scale-102"
                                       : "opacity-40 cursor-not-allowed"
                                 }`}
                                 onClick={() => handleTimeSelect(time)}
                              >
                                 <div className="flex flex-col items-center space-y-2">
                                    <Clock className="h-5 w-5" />
                                    <span className="font-semibold">
                                       {time}
                                    </span>
                                 </div>
                              </Button>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Single Centered Selection Badge */}
                  {(selectedDate || selectedTime) && (
                     <div className="mt-8 pt-6 border-t border-border">
                        <div className="flex justify-center">
                           <div className="bg-primary/5 border border-primary/20 rounded-lg px-6 py-4 max-w-md w-full">
                              <div className="text-center space-y-2">
                                 <div className="flex items-center justify-center space-x-2 mb-3"></div>

                                 <div className="space-y-2">
                                    {selectedDate && (
                                       <div>
                                          <p className="text-lg font-semibold text-primary">
                                             {formatSelectedDate(selectedDate)}
                                          </p>
                                       </div>
                                    )}

                                    {selectedTime && (
                                       <div>
                                          <p className="text-xl font-bold text-primary">
                                             {selectedTime}
                                          </p>
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
               </CardContent>
            </Card>

            {/* Action Button */}
            {selectedDate && selectedTime && (
               <div className="text-center">
                  <Button
                     onClick={handleConfirmInterview}
                     size="lg"
                     className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                     <span>Confirm Interview</span>
                     <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
               </div>
            )}

            {/* Help Text */}
            <div className="text-center text-sm text-muted-foreground border-t border-border pt-6">
               <p>
                  Need help? Contact our support team at{" "}
                  <a
                     href="mailto:support@buildforce.com"
                     className="text-primary hover:underline font-medium"
                  >
                     support@buildforce.com
                  </a>
               </p>
            </div>
         </div>
      </div>
   );
}
