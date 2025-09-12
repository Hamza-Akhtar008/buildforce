import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const activities=[
      {
    title: "Clock In",
    subtitle: "Downtown Tower",
    time: "Today, 08:00 AM",
    color: "text-yellow-300",
  },
  {
    title: "Document Approved",
    subtitle: "ID Verification",
    time: "Yesterday",
    color: "text-yellow-400",
  },
  {
    title: "Clock Out",
    subtitle: "Downtown Tower",
    time: "Yesterday, 05:30 PM",
    color: "text-yellow-300",
  },
];

export default function Activity(){
    return (
    <div>
      <h1 className="text-2xl text-yellow-300 font-bold mb-4">Recent Activity</h1>
      <div className="flex flex-col gap-4">
        {activities.map((activity, idx) => (
          <Card key={idx} className="bg-gray-800 w-2xl">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className={`text-lg font-semibold ${activity.color}`}>{activity.title}</CardTitle>
                  <div className="text-gray-200 text-sm">{activity.subtitle}</div>
                </div>
                <div className="text-yellow-200 text-sm text-right">{activity.time}</div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

     