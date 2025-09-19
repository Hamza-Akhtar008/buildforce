"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   CheckCircle,
   Clock,
   Mail,
   Phone,
   FileText,
   HardHat,
   Home,
} from "lucide-react";

export default function PreInterviewSubmissionsCompletePage() {
   return (
      <div className="min-h-screen py-8 bg-background text-foreground">
         <div className="max-w-4xl mx-auto px-6 space-y-8">
            {/* Header Section */}
            <div className="space-y-6">
               <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                     <HardHat className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                     <h1 className="text-4xl font-bold">Submission Complete</h1>
                     <p className="text-muted-foreground text-lg">
                        Your pre-interview documents have been successfully
                        submitted
                     </p>
                  </div>
               </div>
            </div>

            {/* Success Card */}
            <Card className="shadow-lg  bg-card">
               <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                     <div className="p-4 bg-green-100 rounded-full">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                     </div>
                  </div>
                  <CardTitle className="text-3xl text-green-800">
                     Documents Submitted Successfully!
                  </CardTitle>
               </CardHeader>
               <CardContent className="text-center space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                     Thank you for submitting your documents to BuildForce. Your
                     application has been received and is now under review by
                     our team.
                  </p>

                  <div className="bg-background rounded-lg p-6 space-y-4">
                     <h3 className="text-xl font-semibold flex items-center justify-center space-x-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span>What Happens Next?</span>
                     </h3>

                     <div className="space-y-4 text-left max-w-2xl mx-auto">
                        <div className="flex items-start space-x-3">
                           <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                              1
                           </div>
                           <div>
                              <p className="font-medium">Document Review</p>
                              <p className="text-sm text-muted-foreground">
                                 Our team will review your submitted documents
                                 and project portfolio
                              </p>
                           </div>
                        </div>

                        <div className="flex items-start space-x-3">
                           <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                              2
                           </div>
                           <div>
                              <p className="font-medium">
                                 Interview Scheduling
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 If selected, we'll contact you within 3-5
                                 business days to schedule your interview
                              </p>
                           </div>
                        </div>

                        <div className="flex items-start space-x-3">
                           <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                              3
                           </div>
                           <div>
                              <p className="font-medium">Interview Process</p>
                              <p className="text-sm text-muted-foreground">
                                 Complete the interview process and await final
                                 selection results
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-md">
               <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                     <Mail className="h-5 w-5 text-primary" />
                     <span>Need Help or Have Questions?</span>
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                     If you have any questions about your application or the
                     interview process, please don't hesitate to contact us:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                           <p className="font-medium">Email Support</p>
                           <a
                              href="mailto:support@buildforce.com"
                              className="text-sm text-primary hover:underline"
                           >
                              support@buildforce.com
                           </a>
                        </div>
                     </div>

                     <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                           <p className="font-medium">Phone Support</p>
                           <a
                              href="tel:+1234567890"
                              className="text-sm text-primary hover:underline"
                           >
                              +1 (234) 567-8900
                           </a>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 pt-8">
               <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                  onClick={() => window.print()}
               >
                  <FileText className="h-4 w-4" />
                  <span>Print Confirmation</span>
               </Button>

               <Button
                  className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => (window.location.href = "/")}
               >
                  <Home className="h-4 w-4" />
                  <span>Return to Home</span>
               </Button>
            </div>

            {/* Footer Message */}
            <div className="text-center text-sm text-muted-foreground border-t border-border pt-8">
               <p>
                  <strong>Application Reference:</strong> BF-
                  {new Date().getFullYear()}-
                  {Math.random().toString(36).substr(2, 9).toUpperCase()}
               </p>
               <p className="mt-2">
                  Please save this reference number for your records. You may
                  need it for future correspondence.
               </p>
            </div>
         </div>
      </div>
   );
}
