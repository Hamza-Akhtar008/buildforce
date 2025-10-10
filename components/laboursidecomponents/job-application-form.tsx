"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import type { Job } from "@/types/job";

interface JobApplicationFormProps {
   job: Job;
}

interface ApplicationData {
   // Personal Information
   firstName: string;
   lastName: string;
   email: string;
   phone: string;
   address: string;
   city: string;
   province: string;
   postalCode: string;

   // Work Authorization
   workAuthorization: string;
   requiresVisa: boolean;

   // Experience & Skills
   yearsExperience: string;
   relevantExperience: string;
   skills: string[];
   certificates: string[];

   // Availability
   startDate: string;
   availableShifts: string[];
   transportationMethod: string;

   // Benefits Preferences
   needsAccommodation: boolean;
   needsTransport: boolean;
   needsMeals: boolean;

   // Additional Information
   coverLetter: string;
   additionalInfo: string;

   // Files
   resume: File | null;
   certificates_files: File[];

   // Agreements
   agreeToTerms: boolean;
   agreeToBackground: boolean;
}

export function JobApplicationForm({ job }: JobApplicationFormProps) {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [formData, setFormData] = useState<ApplicationData>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      workAuthorization: "",
      requiresVisa: false,
      yearsExperience: "",
      relevantExperience: "",
      skills: [],
      certificates: [],
      startDate: "",
      availableShifts: [],
      transportationMethod: "",
      needsAccommodation: false,
      needsTransport: false,
      needsMeals: false,
      coverLetter: "",
      additionalInfo: "",
      resume: null,
      certificates_files: [],
      agreeToTerms: false,
      agreeToBackground: false,
   });

   const handleInputChange = (field: keyof ApplicationData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
   };

   const handleSkillToggle = (skill: string) => {
      setFormData((prev) => ({
         ...prev,
         skills: prev.skills.includes(skill)
            ? prev.skills.filter((s) => s !== skill)
            : [...prev.skills, skill],
      }));
   };

   const handleShiftToggle = (shift: string) => {
      setFormData((prev) => ({
         ...prev,
         availableShifts: prev.availableShifts.includes(shift)
            ? prev.availableShifts.filter((s) => s !== shift)
            : [...prev.availableShifts, shift],
      }));
   };

   const handleFileUpload = (
      field: "resume" | "certificates_files",
      file: File
   ) => {
      if (field === "resume") {
         setFormData((prev) => ({ ...prev, resume: file }));
      } else {
         setFormData((prev) => ({
            ...prev,
            certificates_files: [...prev.certificates_files, file],
         }));
      }
   };

   const removeFile = (
      field: "resume" | "certificates_files",
      index?: number
   ) => {
      if (field === "resume") {
         setFormData((prev) => ({ ...prev, resume: null }));
      } else if (index !== undefined) {
         setFormData((prev) => ({
            ...prev,
            certificates_files: prev.certificates_files.filter(
               (_, i) => i !== index
            ),
         }));
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitting(false);
      setIsSubmitted(true);
   };

   if (isSubmitted) {
      return (
         <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
               Application Submitted!
            </h2>
            <p className="text-muted-foreground mb-6">
               Thank you for applying to {job.title} at {job.company}. We'll
               review your application and get back to you within 2-3 business
               days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
               <Button variant="outline" onClick={() => window.history.back()}>
                  Back to Job
               </Button>
               <Button onClick={() => (window.location.href = "/")}>
                  Browse More Jobs
               </Button>
            </div>
         </div>
      );
   }

   return (
      <form onSubmit={handleSubmit} className="space-y-8">
         {/* Personal Information */}
         <Card>
            <CardHeader>
               <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <Label htmlFor="firstName">First Name *</Label>
                     <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                           handleInputChange("firstName", e.target.value)
                        }
                        required
                        className="mt-2"
                     />
                  </div>
                  <div>
                     <Label htmlFor="lastName">Last Name *</Label>
                     <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                           handleInputChange("lastName", e.target.value)
                        }
                        required
                        className="mt-2"
                     />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <Label htmlFor="email">Email Address *</Label>
                     <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                           handleInputChange("email", e.target.value)
                        }
                        required
                        className="mt-2"
                     />
                  </div>
                  <div>
                     <Label htmlFor="phone">Phone Number *</Label>
                     <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                           handleInputChange("phone", e.target.value)
                        }
                        required
                        className="mt-2"
                     />
                  </div>
               </div>

               <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                     id="address"
                     value={formData.address}
                     onChange={(e) =>
                        handleInputChange("address", e.target.value)
                     }
                     required
                     className="mt-2"
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                     <Label htmlFor="city">City *</Label>
                     <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                           handleInputChange("city", e.target.value)
                        }
                        required
                        className="mt-2"
                     />
                  </div>
                  <div>
                     <Label htmlFor="province">Province *</Label>
                     <Select
                        value={formData.province}
                        onValueChange={(value) =>
                           handleInputChange("province", value)
                        }
                     >
                        <SelectTrigger className="mt-2">
                           <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="AB">Alberta</SelectItem>
                           <SelectItem value="BC">British Columbia</SelectItem>
                           <SelectItem value="MB">Manitoba</SelectItem>
                           <SelectItem value="NB">New Brunswick</SelectItem>
                           <SelectItem value="NL">
                              Newfoundland and Labrador
                           </SelectItem>
                           <SelectItem value="NS">Nova Scotia</SelectItem>
                           <SelectItem value="ON">Ontario</SelectItem>
                           <SelectItem value="PE">
                              Prince Edward Island
                           </SelectItem>
                           <SelectItem value="QC">Quebec</SelectItem>
                           <SelectItem value="SK">Saskatchewan</SelectItem>
                           <SelectItem value="NT">
                              Northwest Territories
                           </SelectItem>
                           <SelectItem value="NU">Nunavut</SelectItem>
                           <SelectItem value="YT">Yukon</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div>
                     <Label htmlFor="postalCode">Postal Code *</Label>
                     <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) =>
                           handleInputChange("postalCode", e.target.value)
                        }
                        placeholder="A1A 1A1"
                        required
                        className="mt-2"
                     />
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Work Authorization */}
         <Card>
            <CardHeader>
               <CardTitle className="text-lg">Work Authorization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                  <Label htmlFor="workAuth">Work Authorization Status *</Label>
                  <Select
                     value={formData.workAuthorization}
                     onValueChange={(value) =>
                        handleInputChange("workAuthorization", value)
                     }
                  >
                     <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your work authorization" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="citizen">
                           Canadian Citizen
                        </SelectItem>
                        <SelectItem value="permanent-resident">
                           Permanent Resident
                        </SelectItem>
                        <SelectItem value="work-permit">
                           Work Permit Holder
                        </SelectItem>
                        <SelectItem value="student-permit">
                           Student Permit
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <div className="flex items-center space-x-2">
                  <Checkbox
                     id="requiresVisa"
                     checked={formData.requiresVisa}
                     onCheckedChange={(checked) =>
                        handleInputChange("requiresVisa", checked)
                     }
                  />
                  <Label htmlFor="requiresVisa">
                     I require visa sponsorship
                  </Label>
               </div>
            </CardContent>
         </Card>

         {/* Experience & Skills */}
         <Card>
            <CardHeader>
               <CardTitle className="text-lg">Experience & Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                  <Label htmlFor="yearsExp">
                     Years of Experience in Construction/Labour *
                  </Label>
                  <Select
                     value={formData.yearsExperience}
                     onValueChange={(value) =>
                        handleInputChange("yearsExperience", value)
                     }
                  >
                     <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select experience level" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="0-1">
                           0-1 years (Entry Level)
                        </SelectItem>
                        <SelectItem value="2-5">2-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="15+">15+ years</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <div>
                  <Label htmlFor="relevantExp">Relevant Experience *</Label>
                  <Textarea
                     id="relevantExp"
                     value={formData.relevantExperience}
                     onChange={(e) =>
                        handleInputChange("relevantExperience", e.target.value)
                     }
                     placeholder="Describe your relevant work experience, previous roles, and key accomplishments..."
                     rows={4}
                     required
                     className="mt-2"
                  />
               </div>

               <div>
                  <Label>Skills (Select all that apply)</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                     {job.skills.map((skill) => (
                        <Badge
                           key={skill}
                           variant={
                              formData.skills.includes(skill)
                                 ? "default"
                                 : "outline"
                           }
                           className="cursor-pointer"
                           onClick={() => handleSkillToggle(skill)}
                        >
                           {skill}
                        </Badge>
                     ))}
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Availability */}
         <Card>
            <CardHeader>
               <CardTitle className="text-lg">Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                  <Label htmlFor="startDate">Earliest Start Date *</Label>
                  <Input
                     id="startDate"
                     type="date"
                     value={formData.startDate}
                     onChange={(e) =>
                        handleInputChange("startDate", e.target.value)
                     }
                     required
                     className="mt-2"
                  />
               </div>

               <div>
                  <Label>Available Shifts (Select all that apply) *</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                     {["Day", "Night", "Flexible"].map((shift) => (
                        <Badge
                           key={shift}
                           variant={
                              formData.availableShifts.includes(
                                 shift.toLowerCase()
                              )
                                 ? "default"
                                 : "outline"
                           }
                           className="cursor-pointer"
                           onClick={() =>
                              handleShiftToggle(shift.toLowerCase())
                           }
                        >
                           {shift}
                        </Badge>
                     ))}
                  </div>
               </div>

               <div>
                  <Label htmlFor="transport">Transportation Method *</Label>
                  <Select
                     value={formData.transportationMethod}
                     onValueChange={(value) =>
                        handleInputChange("transportationMethod", value)
                     }
                  >
                     <SelectTrigger className="mt-2">
                        <SelectValue placeholder="How will you get to work?" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="own-vehicle">Own Vehicle</SelectItem>
                        <SelectItem value="public-transport">
                           Public Transportation
                        </SelectItem>
                        <SelectItem value="company-transport">
                           Company Transportation
                        </SelectItem>
                        <SelectItem value="carpool">Carpool</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </CardContent>
         </Card>

         {/* Benefits Preferences */}
         <Card>
            <CardHeader>
               <CardTitle className="text-lg">
                  Benefits & Accommodation
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="needsAccommodation"
                        checked={formData.needsAccommodation}
                        onCheckedChange={(checked) =>
                           handleInputChange("needsAccommodation", checked)
                        }
                     />
                     <Label htmlFor="needsAccommodation">
                        I need accommodation/housing assistance
                     </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="needsTransport"
                        checked={formData.needsTransport}
                        onCheckedChange={(checked) =>
                           handleInputChange("needsTransport", checked)
                        }
                     />
                     <Label htmlFor="needsTransport">
                        I need transportation assistance
                     </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="needsMeals"
                        checked={formData.needsMeals}
                        onCheckedChange={(checked) =>
                           handleInputChange("needsMeals", checked)
                        }
                     />
                     <Label htmlFor="needsMeals">
                        I would like meal provisions
                     </Label>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* File Uploads */}
         <Card>
            <CardHeader>
               <CardTitle className="text-lg">Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                  <Label>Resume/CV *</Label>
                  <div className="mt-2">
                     {formData.resume ? (
                        <div className="flex items-center justify-between p-3 border border-border rounded-md">
                           <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span className="text-sm">
                                 {formData.resume.name}
                              </span>
                           </div>
                           <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile("resume")}
                           >
                              <X className="h-4 w-4" />
                           </Button>
                        </div>
                     ) : (
                        <div className="border-2 border-dashed border-border rounded-md p-6 text-center">
                           <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                           <p className="text-sm text-muted-foreground mb-2">
                              Upload your resume
                           </p>
                           <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                 const file = e.target.files?.[0];
                                 if (file) handleFileUpload("resume", file);
                              }}
                              className="hidden"
                              id="resume-upload"
                           />
                           <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                 document
                                    .getElementById("resume-upload")
                                    ?.click()
                              }
                           >
                              Choose File
                           </Button>
                        </div>
                     )}
                  </div>
               </div>

               <div>
                  <Label>Certificates (Optional)</Label>
                  <div className="mt-2 space-y-2">
                     {formData.certificates_files.map((file, index) => (
                        <div
                           key={index}
                           className="flex items-center justify-between p-3 border border-border rounded-md"
                        >
                           <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span className="text-sm">{file.name}</span>
                           </div>
                           <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                 removeFile("certificates_files", index)
                              }
                           >
                              <X className="h-4 w-4" />
                           </Button>
                        </div>
                     ))}
                     <div className="border-2 border-dashed border-border rounded-md p-4 text-center">
                        <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                        <input
                           type="file"
                           accept=".pdf,.jpg,.jpeg,.png"
                           onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file)
                                 handleFileUpload("certificates_files", file);
                           }}
                           className="hidden"
                           id="cert-upload"
                        />
                        <Button
                           type="button"
                           variant="outline"
                           size="sm"
                           onClick={() =>
                              document.getElementById("cert-upload")?.click()
                           }
                        >
                           Add Certificate
                        </Button>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Additional Information */}
         <Card>
            <CardHeader>
               <CardTitle className="text-lg">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                  <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                  <Textarea
                     id="coverLetter"
                     value={formData.coverLetter}
                     onChange={(e) =>
                        handleInputChange("coverLetter", e.target.value)
                     }
                     placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                     rows={4}
                     className="mt-2"
                  />
               </div>

               <div>
                  <Label htmlFor="additionalInfo">
                     Additional Information (Optional)
                  </Label>
                  <Textarea
                     id="additionalInfo"
                     value={formData.additionalInfo}
                     onChange={(e) =>
                        handleInputChange("additionalInfo", e.target.value)
                     }
                     placeholder="Any additional information you'd like to share..."
                     rows={3}
                     className="mt-2"
                  />
               </div>
            </CardContent>
         </Card>

         {/* Agreements */}
         <Card>
            <CardHeader>
               <CardTitle className="text-lg">Agreements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-start space-x-2">
                  <Checkbox
                     id="agreeTerms"
                     checked={formData.agreeToTerms}
                     onCheckedChange={(checked) =>
                        handleInputChange("agreeToTerms", checked)
                     }
                     required
                  />
                  <Label
                     htmlFor="agreeTerms"
                     className="text-sm leading-relaxed"
                  >
                     I agree to the Terms of Service and Privacy Policy. I
                     understand that my information will be shared with the
                     employer for this application. *
                  </Label>
               </div>

               <div className="flex items-start space-x-2">
                  <Checkbox
                     id="agreeBackground"
                     checked={formData.agreeToBackground}
                     onCheckedChange={(checked) =>
                        handleInputChange("agreeToBackground", checked)
                     }
                     required
                  />
                  <Label
                     htmlFor="agreeBackground"
                     className="text-sm leading-relaxed"
                  >
                     I consent to background checks and reference verification
                     as required by the employer. *
                  </Label>
               </div>
            </CardContent>
         </Card>

         {/* Submit Button */}
         <div className="flex justify-end">
            <Button
               type="submit"
               size="lg"
               disabled={
                  isSubmitting ||
                  !formData.agreeToTerms ||
                  !formData.agreeToBackground
               }
               className="px-8"
            >
               {isSubmitting
                  ? "Submitting Application..."
                  : "Submit Application"}
            </Button>
         </div>
      </form>
   );
}
