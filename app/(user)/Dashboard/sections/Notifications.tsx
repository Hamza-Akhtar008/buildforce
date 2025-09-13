import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bell, Clock, DollarSign, Shield } from "lucide-react";

const notifications = [
   {
      title: "Break Schedule Changed",
      subtitle: "Lunch break moved to 1:00 PM today",
      time: "10 min ago",
      icon: Clock,
   },
   {
      title: "Payment Processed",
      subtitle: "Your weekly payments had been processed",
      time: "Yesterday",
      icon: DollarSign,
   },
   {
      title: "Safety",
      subtitle: "New safety guidelines for scaffolding",
      time: "2 days ago",
      icon: Shield,
   },
];

export default function Notifications() {
   return (
      <Card className="shadow-lg">
         <CardHeader>
            <CardTitle className="flex items-center space-x-2">
               <Bell className="h-5 w-5 text-primary" />
               <span>Notifications</span>
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-4">
               {notifications.map((note, idx) => {
                  const IconComponent = note.icon;
                  return (
                     <div
                        key={idx}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                     >
                        <div className="flex-shrink-0 mt-1">
                           <IconComponent className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="space-y-1">
                              <p className="font-medium text-sm">
                                 {note.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 {note.subtitle}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                 {note.time}
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
