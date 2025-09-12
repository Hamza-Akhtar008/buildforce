"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   ArrowLeft,
   UserPlus,
   User,
   Mail,
   Phone,
   MapPin,
   Shield,
   Lock,
   Upload,
   FileImage,
} from "lucide-react";
import { useState } from "react";
import { UserRole, AccessLevel, CreateUserData } from "@/types";

export default function AddUser() {
   const [formData, setFormData] = useState<CreateUserData>({
      fullName: "",
      email: "",
      phoneNumber: "",
      role: "worker",
      location: "",
      accessLevel: "basic",
      tempPassword: "",
   });

   const [documents, setDocuments] = useState({
      driverLicenseFront: null as File | null,
      driverLicenseBack: null as File | null,
      socialSecurityCard: null as File | null,
   });

   const handleInputChange = (field: keyof CreateUserData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
   };

   const handleRoleChange = (value: UserRole) => {
      setFormData((prev) => ({ ...prev, role: value }));
   };

   const handleAccessLevelChange = (value: AccessLevel) => {
      setFormData((prev) => ({ ...prev, accessLevel: value }));
   };

   const handleFileChange = (
      field: keyof typeof documents,
      file: File | null
   ) => {
      setDocuments((prev) => ({ ...prev, [field]: file }));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Creating user:", formData);
      console.log("Documents:", documents);
      // Handle form submission here
   };

   return (
      <div className="min-h-screen py-8">
         <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="text-center">
               <div className="flex items-center justify-center space-x-3 mb-4">
                  <UserPlus className="h-8 w-8 text-primary" />
                  <h1 className="text-4xl font-bold">Add New User</h1>
               </div>
               <p className="text-muted-foreground text-lg mb-6">
                  Create a new user account with the appropriate role and access
                  level.
               </p>

               <Link href="/admin" className="cursor-pointer">
                  <Button
                     variant="ghost"
                     className="text-primary hover:bg-primary/10 flex items-center space-x-2 cursor-pointer"
                  >
                     <ArrowLeft className="h-4 w-4" />
                     <span>Back to Dashboard</span>
                  </Button>
               </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Card 1: Basic Information */}
               <Card className="shadow-lg">
                  <CardHeader>
                     <CardTitle className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-primary" />
                        <span>Basic Information</span>
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     {/* Full Name */}
                     <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                           <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input
                              id="fullName"
                              type="text"
                              placeholder="Enter full name"
                              className="pl-10"
                              value={formData.fullName}
                              onChange={(e) =>
                                 handleInputChange("fullName", e.target.value)
                              }
                              required
                           />
                        </div>
                     </div>

                     {/* Email Address */}
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input
                              id="email"
                              type="email"
                              placeholder="Enter email address"
                              className="pl-10"
                              value={formData.email}
                              onChange={(e) =>
                                 handleInputChange("email", e.target.value)
                              }
                              required
                           />
                        </div>
                     </div>

                     {/* Phone Number */}
                     <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <div className="relative">
                           <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input
                              id="phoneNumber"
                              type="tel"
                              placeholder="Enter phone number"
                              className="pl-10"
                              value={formData.phoneNumber}
                              onChange={(e) =>
                                 handleInputChange(
                                    "phoneNumber",
                                    e.target.value
                                 )
                              }
                              required
                           />
                        </div>
                     </div>

                     {/* Role */}
                     <div className="space-y-2">
                        <Label>Role</Label>
                        <Select
                           value={formData.role}
                           onValueChange={handleRoleChange}
                        >
                           <SelectTrigger>
                              <SelectValue placeholder="Select user role" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="worker">Worker</SelectItem>
                              <SelectItem value="contractor">
                                 Contractor
                              </SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </CardContent>
               </Card>

               {/* Card 2: Access & Security */}
               <Card className="shadow-lg">
                  <CardHeader>
                     <CardTitle className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <span>Access & Security</span>
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     {/* Location */}
                     <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                           <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input
                              id="location"
                              type="text"
                              placeholder="Enter location"
                              className="pl-10"
                              value={formData.location}
                              onChange={(e) =>
                                 handleInputChange("location", e.target.value)
                              }
                              required
                           />
                        </div>
                     </div>

                     {/* Access Level */}
                     <div className="space-y-2">
                        <Label>Access Level</Label>
                        <Select
                           value={formData.accessLevel}
                           onValueChange={handleAccessLevelChange}
                        >
                           <SelectTrigger>
                              <SelectValue placeholder="Select access level" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="basic">Basic</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>

                     {/* Temporary Password */}
                     <div className="space-y-2">
                        <Label htmlFor="tempPassword">Temporary Password</Label>
                        <div className="relative">
                           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input
                              id="tempPassword"
                              type="password"
                              placeholder="Enter temporary password"
                              className="pl-10"
                              value={formData.tempPassword}
                              onChange={(e) =>
                                 handleInputChange(
                                    "tempPassword",
                                    e.target.value
                                 )
                              }
                              required
                           />
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Card 3: Documents Upload */}
               <Card className="shadow-lg">
                  <CardHeader>
                     <CardTitle className="flex items-center space-x-2">
                        <FileImage className="h-5 w-5 text-primary" />
                        <span>Documents Upload</span>
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     {/* Driver's License (Front) */}
                     <div className="space-y-2">
                        <Label htmlFor="driverLicenseFront">
                           Driver's License (Front)
                        </Label>
                        <div className="flex items-center space-x-4">
                           <div className="flex-1">
                              <input
                                 id="driverLicenseFront"
                                 type="file"
                                 accept="image/*"
                                 onChange={(e) =>
                                    handleFileChange(
                                       "driverLicenseFront",
                                       e.target.files?.[0] || null
                                    )
                                 }
                                 className="hidden"
                              />
                              <Button
                                 type="button"
                                 variant="outline"
                                 className="w-full cursor-pointer"
                                 onClick={() =>
                                    document
                                       .getElementById("driverLicenseFront")
                                       ?.click()
                                 }
                              >
                                 <Upload className="h-4 w-4 mr-2" />
                                 {documents.driverLicenseFront
                                    ? documents.driverLicenseFront.name
                                    : "Choose Image"}
                              </Button>
                           </div>
                        </div>
                     </div>

                     {/* Driver's License (Back) */}
                     <div className="space-y-2">
                        <Label htmlFor="driverLicenseBack">
                           Driver's License (Back)
                        </Label>
                        <div className="flex items-center space-x-4">
                           <div className="flex-1">
                              <input
                                 id="driverLicenseBack"
                                 type="file"
                                 accept="image/*"
                                 onChange={(e) =>
                                    handleFileChange(
                                       "driverLicenseBack",
                                       e.target.files?.[0] || null
                                    )
                                 }
                                 className="hidden"
                              />
                              <Button
                                 type="button"
                                 variant="outline"
                                 className="w-full cursor-pointer"
                                 onClick={() =>
                                    document
                                       .getElementById("driverLicenseBack")
                                       ?.click()
                                 }
                              >
                                 <Upload className="h-4 w-4 mr-2" />
                                 {documents.driverLicenseBack
                                    ? documents.driverLicenseBack.name
                                    : "Choose Image"}
                              </Button>
                           </div>
                        </div>
                     </div>

                     {/* Social Security Card */}
                     <div className="space-y-2">
                        <Label htmlFor="socialSecurityCard">
                           Social Security Card
                        </Label>
                        <div className="flex items-center space-x-4">
                           <div className="flex-1">
                              <input
                                 id="socialSecurityCard"
                                 type="file"
                                 accept="image/*"
                                 onChange={(e) =>
                                    handleFileChange(
                                       "socialSecurityCard",
                                       e.target.files?.[0] || null
                                    )
                                 }
                                 className="hidden"
                              />
                              <Button
                                 type="button"
                                 variant="outline"
                                 className="w-full cursor-pointer"
                                 onClick={() =>
                                    document
                                       .getElementById("socialSecurityCard")
                                       ?.click()
                                 }
                              >
                                 <Upload className="h-4 w-4 mr-2" />
                                 {documents.socialSecurityCard
                                    ? documents.socialSecurityCard.name
                                    : "Choose Image"}
                              </Button>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Submit Buttons */}
               <div className="flex gap-4 justify-center pt-6">
                  <Button
                     type="submit"
                     size="lg"
                     className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-3 text-lg font-semibold shadow-lg cursor-pointer"
                  >
                     <UserPlus className="h-5 w-5 mr-3" />
                     Create User
                  </Button>
                  <Button
                     type="button"
                     variant="outline"
                     size="lg"
                     className="px-12 py-3 text-lg cursor-pointer hover:bg-muted"
                  >
                     Cancel
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
}
