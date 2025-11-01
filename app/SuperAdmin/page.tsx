"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   Home,
   UserPlus,
   Search,
   Activity,
   CheckCircle,
   AlertTriangle,
   FileText,
   Settings,
   Bell,
} from "lucide-react";
import { Application, UserRole } from "@/types";
import { ApplicationItem } from "@/components/custom/application-item";
import { subDays, subHours, subMinutes, formatDistanceToNow } from "date-fns";

export default function AdminDashboard() {
   const [searchQuery, setSearchQuery] = useState("");
   const [activeTab, setActiveTab] = useState<"all" | "fulltime" | "contract">("all");

   // Dummy job applications data
   const jobApplications = [
      {
         id: "1",
         candidateName: "John Smith",
         position: "Senior Frontend Developer",
         email: "john.smith@email.com",
         appliedAt: subHours(new Date(), 2),
         status: "pending",
         experience: "5 years",
         salary: "$90,000 - $120,000"
      },
      {
         id: "2",
         candidateName: "Sarah Johnson",
         position: "Project Manager",
         email: "sarah.j@email.com",
         appliedAt: subHours(new Date(), 5),
         status: "interviewing",
         experience: "8 years",
         salary: "$100,000 - $130,000"
      },
      {
         id: "3",
         candidateName: "Mike Wilson",
         position: "Admin",
         email: "mike.wilson@email.com",
         appliedAt: subDays(new Date(), 1),
         status: "approved",
         experience: "10 years",
         salary: "$110,000 - $140,000"
      },
      {
         id: "4",
         candidateName: "Emily Davis",
         position: "Senior Frontend Developer",
         email: "emily.davis@email.com",
         appliedAt: subDays(new Date(), 1),
         status: "pending",
         experience: "6 years",
         salary: "$95,000 - $125,000"
      },
      {
         id: "5",
         candidateName: "Robert Brown",
         position: "Contractor",
         email: "robert.brown@email.com",
         appliedAt: subDays(new Date(), 2),
         status: "rejected",
         experience: "4 years",
         salary: "$80,000 - $100,000"
      },
      {
         id: "6",
         candidateName: "Lisa Anderson",
         position: "Worker",
         email: "lisa.anderson@email.com",
         appliedAt: subDays(new Date(), 2),
         status: "pending",
         experience: "3 years",
         salary: "$70,000 - $90,000"
      },
      {
         id: "7",
         candidateName: "David Martinez",
         position: "Admin",
         email: "david.martinez@email.com",
         appliedAt: subDays(new Date(), 3),
         status: "pending",
         experience: "8 years",
         salary: "$100,000 - $130,000"
      },
      {
         id: "8",
         candidateName: "Jennifer Taylor",
         position: "Contractor",
         email: "jennifer.taylor@email.com",
         appliedAt: subDays(new Date(), 4),
         status: "approved",
         experience: "5 years",
         salary: "$90,000 - $120,000"
      },
   ];

   // Filter and search applications
   const filteredApplications = useMemo(() => {
      let filtered = jobApplications;

      // Only show pending applications
      filtered = filtered.filter((app) => app.status === "pending");

      // Filter by tab
      if (activeTab !== "all") {
         filtered = filtered.filter((app) =>
            activeTab === "fulltime"
               ? app.position.toLowerCase().includes("full")
               : app.position.toLowerCase().includes("contract")
         );
      }

      // Filter by search query
      if (searchQuery) {
         filtered = filtered.filter(
            (app) =>
               app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               app.email?.toLowerCase().includes(searchQuery.toLowerCase())
         );
      }

      // Show only first 5 items
      return filtered.slice(0, 5);
   }, [jobApplications, activeTab, searchQuery]);

   const handleApprove = (id: string) => {
      console.log("Approving application:", id);
      // Here you would update the application status
   };

   const handleReject = (id: string) => {
      console.log("Rejecting application:", id);
      // Here you would update the application status
   };

   // Overview Cards Section
   const overviewCards = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <Card className="p-6 shadow-lg">
            <div className="space-y-2">
               <h3 className="text-sm font-medium text-muted-foreground">
                  Active Job Posts
               </h3>
               <div className="text-2xl font-bold">15</div>
               <p className="text-sm text-primary">+3 new this week</p>
            </div>
         </Card>

         <Card className="p-6 shadow-lg">
            <div className="space-y-2">
               <h3 className="text-sm font-medium text-muted-foreground">
                  Total Applications
               </h3>
               <div className="text-2xl font-bold">127</div>
               <p className="text-sm text-muted-foreground">
                  Past 30 days
               </p>
            </div>
         </Card>

         <Card className="p-6 shadow-lg">
            <div className="space-y-2">
               <h3 className="text-sm font-medium text-muted-foreground">
                  Interviews Scheduled
               </h3>
               <div className="text-2xl font-bold">8</div>
               <p className="text-sm text-destructive">
                  This week
               </p>
            </div>
         </Card>

         <Card className="p-6 shadow-lg">
            <div className="space-y-2">
               <h3 className="text-sm font-medium text-muted-foreground">
                  Positions Filled
               </h3>
               <div className="text-2xl font-bold">6</div>
               <p className="text-sm text-green-600">
                  This month
               </p>
            </div>
         </Card>
      </div>
   );

   // Recent Applications Section
   const recentApplications = (
      <Card className="shadow-lg">
         <CardHeader>
            <CardTitle className="flex items-center space-x-2">
               <UserPlus className="h-6 w-6 text-primary" />
               <span>Recent Applications</span>
            </CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <Input
                  placeholder="Search applications by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 cursor-pointer"
               />
            </div>

            {/* Tabs */}
            <Tabs
               value={activeTab}
               onValueChange={(value) =>
                  setActiveTab(value as "all" | "fulltime" | "contract")
               }
            >
               <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all" className="cursor-pointer">
                     All
                  </TabsTrigger>
                  <TabsTrigger value="fulltime" className="cursor-pointer">
                     Fulltime
                  </TabsTrigger>
                  <TabsTrigger value="contract" className="cursor-pointer">
                     Contract
                  </TabsTrigger>
               </TabsList>

               <TabsContent value={activeTab} className="mt-6">
                  <div className="space-y-3">
                     {filteredApplications.length > 0 ? (
                        <>
                           {filteredApplications.map((application) => (
                              <Card key={application.id} className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between">
                                 <div>
                                    <div className="font-medium">{application.candidateName}</div>
                                    <div className="text-sm text-muted-foreground">{application.position}</div>
                                    <div className="text-xs text-muted-foreground">
                                       Applied {formatDistanceToNow(application.appliedAt, { addSuffix: true })}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                       Experience: {application.experience} | Salary: {application.salary}
                                    </div>
                                 </div>
                                 <div className="flex flex-col gap-2 mt-4 md:mt-0 md:items-end">
                                    <Button variant="outline" size="sm" className="w-full md:w-auto">
                                       View Detail
                                    </Button>
                                 </div>
                              </Card>
                           ))}

                           {/* View All Button */}
                           <div className="pt-4 text-center">
                              <Button
                                 variant="outline"
                                 className="px-8 cursor-pointer hover:bg-muted"
                              >
                                 View All
                              </Button>
                           </div>
                        </>
                     ) : (
                        <div className="text-center py-8">
                           <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                           <h3 className="text-lg font-medium mb-2">
                              No pending applications found
                           </h3>
                           <p className="text-muted-foreground">
                              {searchQuery
                                 ? "Try adjusting your search criteria"
                                 : "No pending applications match the selected filter"}
                           </p>
                        </div>
                     )}
                  </div>
               </TabsContent>
            </Tabs>
         </CardContent>
      </Card>
   );

   // Recent Activity Feed
   const activityFeed = (
      <Card className="shadow-lg">
         <CardHeader>
            <CardTitle className="flex items-center space-x-2">
               <Activity className="h-6 w-6 text-primary" />
               <span>Hiring Activity</span>
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-4">
               <div className="flex items-start space-x-4 p-3 rounded-lg border bg-card">
                  <div className="flex-shrink-0 mt-1">
                     <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                     <h4 className="text-sm font-medium">New candidate accepted offer</h4>
                     <p className="text-sm text-muted-foreground">
                        Sarah Johnson accepted the Project Manager position
                     </p>
                     <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(subHours(new Date(), 2), { addSuffix: true })}
                     </span>
                  </div>
               </div>

               {/* Add more activity items */}
            </div>
         </CardContent>
      </Card>
   );

   return (
      <div className="min-h-screen mx-auto py-8">
         <div className="max-w-6xl mx-auto space-y-8">
            {overviewCards}
            {recentApplications}
            {activityFeed}
         </div>
      </div>
   );
}
