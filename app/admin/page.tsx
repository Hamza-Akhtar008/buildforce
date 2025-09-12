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
   Users,
   Settings,
   Bell,
} from "lucide-react";
import { Application, UserRole } from "@/types";
import { ApplicationItem } from "@/components/custom/application-item";
import { subDays, subHours, subMinutes, formatDistanceToNow } from "date-fns";

export default function AdminDashboard() {
   const [searchQuery, setSearchQuery] = useState("");
   const [activeTab, setActiveTab] = useState<"all" | UserRole>("all");

   // Dummy applications data
   const applications: Application[] = [
      {
         id: "1",
         name: "John Smith",
         type: "worker",
         email: "john.smith@email.com",
         appliedAt: subHours(new Date(), 2),
         status: "pending",
      },
      {
         id: "2",
         name: "Sarah Johnson",
         type: "contractor",
         email: "sarah.johnson@email.com",
         appliedAt: subHours(new Date(), 5),
         status: "pending",
      },
      {
         id: "3",
         name: "Mike Wilson",
         type: "admin",
         email: "mike.wilson@email.com",
         appliedAt: subDays(new Date(), 1),
         status: "approved",
      },
      {
         id: "4",
         name: "Emily Davis",
         type: "worker",
         email: "emily.davis@email.com",
         appliedAt: subDays(new Date(), 1),
         status: "pending",
      },
      {
         id: "5",
         name: "Robert Brown",
         type: "contractor",
         email: "robert.brown@email.com",
         appliedAt: subDays(new Date(), 2),
         status: "rejected",
      },
      {
         id: "6",
         name: "Lisa Anderson",
         type: "worker",
         email: "lisa.anderson@email.com",
         appliedAt: subDays(new Date(), 2),
         status: "pending",
      },
      {
         id: "7",
         name: "David Martinez",
         type: "admin",
         email: "david.martinez@email.com",
         appliedAt: subDays(new Date(), 3),
         status: "pending",
      },
      {
         id: "8",
         name: "Jennifer Taylor",
         type: "contractor",
         email: "jennifer.taylor@email.com",
         appliedAt: subDays(new Date(), 4),
         status: "approved",
      },
   ];

   // Filter and search applications
   const filteredApplications = useMemo(() => {
      let filtered = applications;

      // Only show pending applications
      filtered = filtered.filter((app) => app.status === "pending");

      // Filter by tab
      if (activeTab !== "all") {
         filtered = filtered.filter((app) => app.type === activeTab);
      }

      // Filter by search query
      if (searchQuery) {
         filtered = filtered.filter(
            (app) =>
               app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               app.email?.toLowerCase().includes(searchQuery.toLowerCase())
         );
      }

      // Show only first 5 items
      return filtered.slice(0, 5);
   }, [applications, activeTab, searchQuery]);

   const handleApprove = (id: string) => {
      console.log("Approving application:", id);
      // Here you would update the application status
   };

   const handleReject = (id: string) => {
      console.log("Rejecting application:", id);
      // Here you would update the application status
   };

   return (
      <div className="min-h-screen py-8">
         <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="text-center">
               <div className="flex items-center justify-center space-x-3 mb-4">
                  <Home className="h-8 w-8 text-primary" />
                  <h1 className="text-4xl font-bold">Admin Dashboard</h1>
               </div>
               <p className="text-muted-foreground text-lg">
                  Welcome to the Build Force Admin Dashboard
               </p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <Card className="p-6 shadow-lg">
                  <div className="space-y-2">
                     <h3 className="text-sm font-medium text-muted-foreground">
                        Total Users
                     </h3>
                     <div className="text-2xl font-bold">1,247</div>
                     <p className="text-sm text-primary">+23 this week</p>
                  </div>
               </Card>

               <Card className="p-6 shadow-lg">
                  <div className="space-y-2">
                     <h3 className="text-sm font-medium text-muted-foreground">
                        Active Today
                     </h3>
                     <div className="text-2xl font-bold">89</div>
                     <p className="text-sm text-muted-foreground">
                        Across (12) locations
                     </p>
                  </div>
               </Card>

               <Card className="p-6 shadow-lg">
                  <div className="space-y-2">
                     <h3 className="text-sm font-medium text-muted-foreground">
                        Pending Approvals
                     </h3>
                     <div className="text-2xl font-bold">5</div>
                     <p className="text-sm text-destructive">
                        Requires attention
                     </p>
                  </div>
               </Card>

               <Card className="p-6 shadow-lg">
                  <div className="space-y-2">
                     <h3 className="text-sm font-medium text-muted-foreground">
                        Today
                     </h3>
                     <div className="text-2xl font-bold text-primary">
                        Active
                     </div>
                     <p className="text-sm text-muted-foreground">
                        All documents approved
                     </p>
                  </div>
               </Card>
            </div>

            {/* Recent Applications */}
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
                        setActiveTab(value as "all" | UserRole)
                     }
                  >
                     <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all" className="cursor-pointer">
                           All
                        </TabsTrigger>
                        <TabsTrigger value="worker" className="cursor-pointer">
                           Worker
                        </TabsTrigger>
                        <TabsTrigger
                           value="contractor"
                           className="cursor-pointer"
                        >
                           Contractor
                        </TabsTrigger>
                     </TabsList>

                     <TabsContent value={activeTab} className="mt-6">
                        <div className="space-y-3">
                           {filteredApplications.length > 0 ? (
                              <>
                                 {filteredApplications.map((application) => (
                                    <ApplicationItem
                                       key={application.id}
                                       application={application}
                                       onApprove={handleApprove}
                                       onReject={handleReject}
                                    />
                                 ))}

                                 {/* View All Users Button */}
                                 <div className="pt-4 text-center">
                                    <Button
                                       variant="outline"
                                       className="px-8 cursor-pointer hover:bg-muted"
                                    >
                                       View All Users
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

            {/* Recent Activity */}
            <Card className="shadow-lg">
               <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                     <Activity className="h-6 w-6 text-primary" />
                     <span>Recent Activity</span>
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     {/* Activity Item 1 */}
                     <div className="flex items-start space-x-4 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                        <div className="flex-shrink-0 mt-1">
                           <Bell className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-sm font-medium mb-1">
                              New project assignment notification sent
                           </h4>
                           <p className="text-sm text-muted-foreground mb-2">
                              Downtown Office Complex project has been assigned
                              to Sarah Wilson and team members have been
                              notified.
                           </p>
                           <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(subMinutes(new Date(), 5), {
                                 addSuffix: true,
                              })}
                           </span>
                        </div>
                     </div>

                     {/* Activity Item 2 */}
                     <div className="flex items-start space-x-4 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                        <div className="flex-shrink-0 mt-1">
                           <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-sm font-medium mb-1">
                              User application approved
                           </h4>
                           <p className="text-sm text-muted-foreground mb-2">
                              Mike Wilson's admin application has been approved
                              and access has been granted to the system.
                           </p>
                           <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(subMinutes(new Date(), 15), {
                                 addSuffix: true,
                              })}
                           </span>
                        </div>
                     </div>

                     {/* Activity Item 3 */}
                     <div className="flex items-start space-x-4 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                        <div className="flex-shrink-0 mt-1">
                           <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-sm font-medium mb-1">
                              Budget threshold alert triggered
                           </h4>
                           <p className="text-sm text-muted-foreground mb-2">
                              Residential Tower A project has reached 85% of
                              allocated budget. Review recommended.
                           </p>
                           <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(subMinutes(new Date(), 32), {
                                 addSuffix: true,
                              })}
                           </span>
                        </div>
                     </div>

                     {/* Activity Item 4 */}
                     <div className="flex items-start space-x-4 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                        <div className="flex-shrink-0 mt-1">
                           <FileText className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-sm font-medium mb-1">
                              Project documentation updated
                           </h4>
                           <p className="text-sm text-muted-foreground mb-2">
                              Shopping Mall Renovation project files have been
                              updated with latest architectural plans.
                           </p>
                           <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(subHours(new Date(), 1), {
                                 addSuffix: true,
                              })}
                           </span>
                        </div>
                     </div>

                     {/* Activity Item 5 */}
                     <div className="flex items-start space-x-4 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                        <div className="flex-shrink-0 mt-1">
                           <Users className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-sm font-medium mb-1">
                              Team member added to project
                           </h4>
                           <p className="text-sm text-muted-foreground mb-2">
                              Jennifer Taylor has been added to the Commercial
                              Plaza project team as a contractor.
                           </p>
                           <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(subHours(new Date(), 2), {
                                 addSuffix: true,
                              })}
                           </span>
                        </div>
                     </div>

                     {/* Activity Item 6 */}
                     <div className="flex items-start space-x-4 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                        <div className="flex-shrink-0 mt-1">
                           <Settings className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-sm font-medium mb-1">
                              System maintenance completed
                           </h4>
                           <p className="text-sm text-muted-foreground mb-2">
                              Scheduled database optimization and security
                              updates have been successfully completed.
                           </p>
                           <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(subHours(new Date(), 3), {
                                 addSuffix: true,
                              })}
                           </span>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
