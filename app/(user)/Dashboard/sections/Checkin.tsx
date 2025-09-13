import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Building, Timer } from "lucide-react";

export default function Checkin() {
   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Clock In/Out Card */}
         <Card className="shadow-lg md:col-span-2">
            <CardHeader>
               <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Time Tracking</span>
               </CardTitle>
               <div className="flex justify-between items-center">
                  <div className="space-y-1">
                     <div className="text-sm text-muted-foreground">
                        Today, May 15, 2025
                     </div>
                     <div className="text-xs text-muted-foreground flex items-center">
                        <Building className="h-3 w-3 mr-1" />
                        Project: Downtown Tower
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-lg font-semibold">08:45 AM</div>
                     <div className="text-xs text-muted-foreground flex items-center justify-end">
                        <MapPin className="h-3 w-3 mr-1" />
                        New York
                     </div>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <div className="flex gap-4">
                  <Button size="lg" className="flex-1">
                     <Clock className="h-4 w-4 mr-2" />
                     Clock In
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                     <Clock className="h-4 w-4 mr-2" />
                     Clock Out
                  </Button>
               </div>
            </CardContent>
         </Card>

         {/* Hours This Week Card */}
         <Card className="shadow-lg">
            <CardHeader>
               <CardTitle className="flex items-center space-x-2 text-lg">
                  <Timer className="h-5 w-5 text-primary" />
                  <span>This Week</span>
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-bold text-primary">38.5h</div>
               <div className="flex items-center gap-2 text-sm mt-2 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Hours Worked
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
