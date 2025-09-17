import Checkin from "./sections/Checkin";
import Activity from "./sections/Activity";
import Notifications from "./sections/Notifications";
import { LayoutDashboard } from "lucide-react";

export default function Dashboard() {
   return (
     <div className="min-h-screen mx-auto py-8">
         <div className="max-w-6xl mx-auto space-y-8">
    {/* Header Section */}
    <div>
      <div className="flex space-x-3 mb-4">
        <LayoutDashboard className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>
      <p className="text-muted-foreground text-lg mb-6">
        Track your work progress and stay updated with notifications.
      </p>
    </div>

    {/* Checkin Row */}
    <Checkin />

    {/* Recent Activity and notifications */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Activity />
      <Notifications />
    </div>
  </div>
</div>

   );
}
