"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar, Building } from "lucide-react";
import { useState } from "react";

const applications = [
   {
      id: 1,
      type: "Labor Application",
      status: "Approved",
      date: "June 10, 2025",
      project: "Downtown Tower",
      location: "New York, US",
   },
   {
      id: 2,
      type: "Contractors Application",
      status: "Pending",
      date: "June 15, 2025",
      project: "Downtown Tower",
      location: "New York, US",
   },
   {
      id: 3,
      type: "Sub Contractor Application",
      status: "Rejected",
      date: "May 13, 2025",
      project: "Downtown Tower",
      location: "New York, US",
   },
];

const statusList = [
   { value: "all", label: "All" },
   { value: "approved", label: "Approved" },
   { value: "pending", label: "Pending" },
   { value: "rejected", label: "Rejected" },
];

function getStatusVariant(
   status: string
): "default" | "secondary" | "destructive" | "outline" {
   if (status === "Approved") return "default";
   if (status === "Pending") return "secondary";
   if (status === "Rejected") return "destructive";
   return "outline";
}

export default function TabsSection() {
   const [search, setSearch] = useState("");

   function filteredApps(tab: string) {
      let filtered = applications;
      if (tab !== "all") {
         filtered = filtered.filter((app) => app.status.toLowerCase() === tab);
      }
      if (search.trim()) {
         filtered = filtered.filter(
            (app) =>
               app.type.toLowerCase().includes(search.toLowerCase()) ||
               app.project.toLowerCase().includes(search.toLowerCase()) ||
               app.location.toLowerCase().includes(search.toLowerCase())
         );
      }
      return filtered;
   }

   return (
      <Card className="shadow-lg">
         <CardContent className="p-6">
            <Tabs defaultValue="all" className="w-full">
               {/* Search Bar */}
               <div className="mb-6 space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="search">Search Applications</Label>
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                           id="search"
                           type="text"
                           placeholder="Search applications..."
                           className="pl-10"
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                        />
                     </div>
                  </div>

                  <TabsList className="grid w-full grid-cols-4">
                     {statusList.map((tab) => (
                        <TabsTrigger
                           key={tab.value}
                           value={tab.value}
                           className="font-medium"
                        >
                           {tab.label}
                        </TabsTrigger>
                     ))}
                  </TabsList>
               </div>
               {/* Tab Contents */}
               {statusList.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value}>
                     <div className="space-y-4">
                        {filteredApps(tab.value).length === 0 ? (
                           <div className="text-muted-foreground text-center py-12">
                              <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                              <p className="text-lg">No applications found.</p>
                           </div>
                        ) : (
                           filteredApps(tab.value).map((app) => (
                              <Card
                                 key={app.id}
                                 className="shadow-sm hover:shadow-md transition-shadow"
                              >
                                 <CardContent className="p-6">
                                    <div className="flex flex-col space-y-4">
                                       {/* Header */}
                                       <div className="flex justify-between items-start">
                                          <div className="space-y-1">
                                             <h3 className="text-lg font-semibold">
                                                {app.type}
                                             </h3>
                                             <div className="flex items-center text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                Submitted on {app.date}
                                             </div>
                                          </div>
                                          <Badge
                                             variant={getStatusVariant(
                                                app.status
                                             )}
                                          >
                                             {app.status}
                                          </Badge>
                                       </div>

                                       {/* Project Details */}
                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                          <div className="flex items-center">
                                             <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                                             <span className="font-medium">
                                                Project:
                                             </span>
                                             <span className="ml-1">
                                                {app.project}
                                             </span>
                                          </div>
                                          <div className="flex items-center">
                                             <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                             <span className="font-medium">
                                                Location:
                                             </span>
                                             <span className="ml-1">
                                                {app.location}
                                             </span>
                                          </div>
                                       </div>

                                       {/* Action Button */}
                                       <Button
                                          variant="outline"
                                          className="w-full mt-4"
                                       >
                                          View Details
                                       </Button>
                                    </div>
                                 </CardContent>
                              </Card>
                           ))
                        )}
                     </div>
                  </TabsContent>
               ))}
            </Tabs>
         </CardContent>
      </Card>
   );
}
