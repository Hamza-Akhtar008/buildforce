import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bell } from "lucide-react";

const notifications = [
  {
    title: "Break Schedule Changed",
    subtitle: "Lunch break moved to 1:00 PM today",
    time: "10 min ago",
  },
  {
    title: "Payment Processed",
    subtitle: "Your weekly payments had been processed",
    time: "Yesterday",
  },
  {
    title: "Safety",
    subtitle: "New safety guidelines for scaffolding",
    time: "2 days ago",
  },
];

export default function Notifications() {
  return (
    <div>
      <h1 className="text-2xl text-yellow-300 font-bold mb-4">Notifications</h1>
      <Card className="bg-gray-800 w-2xl">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-4">
            {notifications.map((note, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Bell className="text-yellow-500 w-5 h-5 mt-1" />
                <div>
                  <CardTitle className="text-yellow-500 text-base font-semibold">{note.title}</CardTitle>
                  <div className="text-yellow-50 text-sm">{note.subtitle}</div>
                  <div className="text-gray-300 text-xs mt-1">{note.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}