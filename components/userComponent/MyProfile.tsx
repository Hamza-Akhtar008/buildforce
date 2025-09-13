"use client";
import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
   ArrowLeft,
   Camera,
   Briefcase,
   Award,
   Globe,
   FileText,
   Lock,
   Star,
} from "lucide-react";
import Link from "next/link";

const MyProfile = () => {
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [hoveredCard, setHoveredCard] = useState<number | null>(null);

   const handlePhotoClick = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click();
      }
   };

   const navigationCards = [
      {
         id: 1,
         title: "Experience Section",
         icon: Briefcase,
         link: "/profile/experience",
      },
      { id: 2, title: "Skill Section", icon: Star, link: "/profile/skills" },
      { id: 3, title: "Languages", icon: Globe, link: "/profile/languages" },
      {
         id: 4,
         title: "Licenses and Certificates",
         icon: Award,
         link: "/profile/certificates",
      },
      {
         id: 5,
         title: "Update Password",
         icon: Lock,
         link: "/profile/password",
      },
   ];

   const handleCardClick = (cardTitle: string) => {
      console.log(`Navigate to: ${cardTitle}`);
      // You can add navigation logic here later
   };

   return (
      <div className="min-h-screen py-8">
         <div className="max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div>
               <div className="flex space-x-3 mb-4">
                  <Star className="h-8 w-8 text-primary" />
                  <h1 className="text-4xl font-bold">My Profile</h1>
               </div>
               <p className="text-muted-foreground text-lg mb-6">
                  View and edit your personal information and preferences.
               </p>
            </div>

            {/* Profile Form Card */}
            <Card className="shadow-lg">
               <CardContent className="p-8">
                  {/* Profile Header with Avatar and Info */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                     <div className="relative flex-shrink-0">
                        <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center text-5xl font-bold text-muted-foreground">
                           <span>👤</span>
                        </div>
                        <input
                           type="file"
                           accept="image/*"
                           ref={fileInputRef}
                           style={{ display: "none" }}
                        />
                        <Button
                           size="sm"
                           variant="outline"
                           type="button"
                           onClick={handlePhotoClick}
                           className="absolute left-1/2 -bottom-4 -translate-x-1/2 flex items-center gap-2 px-3 py-1 text-xs"
                        >
                           <Camera className="h-4 w-4 mr-1" />
                           Change Photo
                        </Button>
                     </div>

                     <div className="text-center sm:text-left">
                        <h3 className="text-xl font-semibold">Jhone Doe</h3>
                        <span className="block text-base text-muted-foreground mt-1">
                           Labor - Carpenter
                        </span>
                     </div>
                  </div>

                  {/* Form Fields in Better Layout */}
                  <div className="space-y-5">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                           <label className="block text-sm font-medium text-muted-foreground mb-1">
                              Full Name
                           </label>
                           <Input placeholder="Enter your full name" />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-muted-foreground mb-1">
                              Phone Number
                           </label>
                           <Input placeholder="Enter your phone number" />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                           <label className="block text-sm font-medium text-muted-foreground mb-1">
                              Email Address
                           </label>
                           <Input placeholder="Enter your email address" />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-muted-foreground mb-1">
                              Trade
                           </label>
                           <Input placeholder="Enter your trade" />
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                           Location
                        </label>
                        <Input placeholder="Enter your location" />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                           Bio
                        </label>
                        <textarea
                           placeholder="Tell us about yourself"
                           className="w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none rounded-md"
                           rows={6}
                        />
                     </div>

                     <Button size="lg" className="w-full mt-4">
                        <FileText className="h-4 w-4 mr-2" />
                        Edit Profile
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default MyProfile;
