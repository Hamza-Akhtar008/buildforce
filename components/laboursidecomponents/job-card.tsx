import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
   MapPin,
   Clock,
   Calendar,
   DollarSign,
   Home,
   Utensils,
   Car,
} from "lucide-react";
import type { Job } from "@/types/job";
import { formatPay, formatPostedDate } from "@/lib/job-utils";

interface JobCardProps {
   job: Job;
}

export function JobCard({ job }: JobCardProps) {
   return (
      <Card className="bg-card border-border hover:ring-2 hover:ring-ring transition-all duration-200">
         <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
               <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base lg:text-lg text-foreground line-clamp-2">
                     {job.title}
                  </h3>
                  <p className="text-muted-foreground font-medium text-sm lg:text-base">
                     {job.company}
                  </p>
               </div>
               <div className="text-left sm:text-right">
                  <div className="text-lg lg:text-xl font-bold text-primary flex items-center gap-1">
                     <DollarSign className="h-4 w-4 lg:h-5 lg:w-5" />
                     {formatPay(job)}
                  </div>
               </div>
            </div>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs lg:text-sm text-muted-foreground">
               <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
               </div>
               <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
                  <span className="truncate">
                     {job.duration.charAt(0).toUpperCase() +
                        job.duration.slice(1).replace("-", " ")}
                  </span>
               </div>
               <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
                  <span className="truncate">{job.shift.join(", ")} shift</span>
               </div>
            </div>

            <div className="flex flex-wrap gap-2">
               <Badge
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground text-xs"
               >
                  {job.jobType
                     .replace("-", " ")
                     .replace(/\b\w/g, (l) => l.toUpperCase())}
               </Badge>
               <Badge variant="outline" className="border-border text-xs">
                  {job.experienceLevel.charAt(0).toUpperCase() +
                     job.experienceLevel.slice(1)}
               </Badge>
            </div>

            {/* Benefits Icons */}
            {(job.benefits.accommodation ||
               job.benefits.meals ||
               job.benefits.transport) && (
               <div className="flex flex-wrap gap-2">
                  {job.benefits.accommodation && (
                     <div className="flex items-center gap-1 text-xs text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-md font-medium">
                        <Home className="h-3 w-3" />
                        <span className="hidden sm:inline">Housing</span>
                     </div>
                  )}
                  {job.benefits.meals && (
                     <div className="flex items-center gap-1 text-xs text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-md font-medium">
                        <Utensils className="h-3 w-3" />
                        <span className="hidden sm:inline">Meals</span>
                     </div>
                  )}
                  {job.benefits.transport && (
                     <div className="flex items-center gap-1 text-xs text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-md font-medium">
                        <Car className="h-3 w-3" />
                        <span className="hidden sm:inline">Transport</span>
                     </div>
                  )}
               </div>
            )}

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-2">
               <span className="text-xs lg:text-sm text-muted-foreground">
                  {formatPostedDate(job.postedDate)}
               </span>
               <Link href={`/jobs/${job.id}`} className="w-full sm:w-auto">
                  <Button
                     className="w-full cursor-pointer sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                     size="sm"
                  >
                     View Details
                  </Button>
               </Link>
            </div>
         </CardContent>
      </Card>
   );
}
