import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Clock, CheckCircle, Building } from "lucide-react";

const activities = [
   {
      title: "Clock In",
      subtitle: "Downtown Tower",
      time: "Today, 08:00 AM",
      icon: Clock,
   },
   {
      title: "Document Approved",
      subtitle: "ID Verification",
      time: "Yesterday",
      icon: CheckCircle,
   },
   {
      title: "Clock Out",
      subtitle: "Downtown Tower",
      time: "Yesterday, 05:30 PM",
      icon: Clock,
   },
];

export default function Activity() {
   return (
      <Card className="shadow-lg">
         <CardHeader>
            <CardTitle className="flex items-center space-x-2">
               <Building className="h-5 w-5 text-primary" />
               <span>Recent Activity</span>
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-4">
               {activities.map((activity, idx) => {
                  const IconComponent = activity.icon;
                  return (
                     <div
                        key={idx}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                     >
                        <div className="flex-shrink-0 mt-1">
                           <IconComponent className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex justify-between items-start">
                              <div>
                                 <p className="font-medium text-sm">
                                    {activity.title}
                                 </p>
                                 <p className="text-sm text-muted-foreground">
                                    {activity.subtitle}
                                 </p>
                              </div>
                              <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                 {activity.time}
                              </p>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </CardContent>
      </Card>
   );
}
