'use client'
import React, { useRef, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, Briefcase, Award, Globe, FileText, Lock, Star } from "lucide-react";
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
    { id: 1, title: "Experience Section", icon: Briefcase, link: "/profile/experience" },
    { id: 2, title: "Skill Section", icon: Star, link: "/profile/skills" },
    { id: 3, title: "Languages", icon: Globe, link: "/profile/languages" },
    { id: 4, title: "Licenses and Certificates", icon: Award, link: "/profile/certificates" },
    { id: 5, title: "Update Password", icon: Lock, link: "/profile/password" }
  ];

  const handleCardClick = (cardTitle: string) => {
    console.log(`Navigate to: ${cardTitle}`);
    // You can add navigation logic here later
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Container with proper max width and centering */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="flex items-center mb-8 px-2">
          <ArrowLeft className="h-5 w-5 text-primary mr-2 cursor-pointer" />
          <div>
            <h2 className="text-2xl font-bold text-primary">My Profile</h2>
            <p className="text-muted-foreground text-base">View And Edit Your Information</p>
          </div>
        </div>

        {/* Main Content - Single Column Layout */}
        <div className="flex flex-col gap-8">
          {/* Profile Form Card */}
          <div className="w-full lg:max-w-2xl mx-auto">
            <Card className="bg-card shadow-lg rounded-xl">
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
                      style={{ display: 'none' }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      type="button"
                      onClick={handlePhotoClick}
                      className="absolute left-1/2 -bottom-4 -translate-x-1/2 flex items-center gap-2 px-3 py-1 text-xs bg-background border border-muted text-muted-foreground hover:bg-muted"
                    >
                      <Camera className="h-4 w-4 mr-1" /> Change Photo
                    </Button>
                  </div>
                  
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-primary">Jhone Doe</h3>
                    <span className="block text-base text-muted-foreground mt-1">Labor - Carpenter</span>
                  </div>
                </div>

                {/* Form Fields in Better Layout */}
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                      <Input placeholder="Enter your full name" className="bg-background border border-muted text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Phone Number</label>
                      <Input placeholder="Enter your phone number" className="bg-background border border-muted text-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
                      <Input placeholder="Enter your email address" className="bg-background border border-muted text-foreground" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Trade</label>
                      <Input placeholder="Enter your trade" className="bg-background border border-muted text-foreground" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Location</label>
                    <Input placeholder="Enter your location" className="bg-background border border-muted text-foreground" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Bio</label>
                    <textarea
                      placeholder="Tell us about yourself"
                      className="w-full bg-background border border-muted text-foreground rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={6}
                    />
                  </div>

                  <Button className="w-full mt-4 bg-primary hover:bg-chart-2 text-primary-foreground font-semibold py-2 rounded shadow flex items-center justify-center gap-2">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Cards Below Profile Card */}
          <div className="w-full max-w-2xl mx-auto flex-shrink-0">
            <div className="mt-2">
              <h3 className="text-lg font-semibold text-primary mb-4 px-2">Quick Access</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {navigationCards.map((card) => {
                  const IconComponent = card.icon;
                  const isHovered = hoveredCard === card.id;
                  return (
                    <Link href={card.link} key={card.id} className="block">
                      <Card
                        className={`cursor-pointer transition-all duration-200 border-none shadow-lg rounded-xl flex items-center justify-center h-32 ${
                          isHovered ? 'bg-primary' : 'bg-card'
                        }`}
                        onMouseEnter={() => setHoveredCard(card.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <CardContent className="flex items-center justify-center h-full p-6">
                          <IconComponent 
                            className={`mr-3 h-7 w-7 ${
                              isHovered ? 'text-primary-foreground' : 'text-primary'
                            }`} 
                          />
                          <span 
                            className={`font-semibold text-base text-center whitespace-nowrap ${
                              isHovered ? 'text-primary-foreground' : 'text-foreground'
                            }`}
                          >
                            {card.title}
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;