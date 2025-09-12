import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Checkin(){

  return (
    <div className="flex flex-row gap-6 mt-6">
      {/* Card 1 */}
      <Card className="bg-gray-900 text-yellow-50 flex-1 min-w-[260px]">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="text-yellow-200 text-sm">Today, May 15, 2025</div>
              <div className="text-yellow-100 text-xs">Prject: Downtown Twoer</div>
            </div>
            <div className="text-yellow-300 text-sm text-right">
              08:45 AM<br />
              <span className="text-gray-300">New York</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded flex items-center gap-2">
              <span>🕒</span> Clock In
            </button>
            <button className="bg-gray-800 text-yellow-400 font-bold py-2 px-4 rounded flex items-center gap-2 border border-gray-600">
              <span>🕒</span> Clock Out
            </button>
          </div>
        </CardContent>
      </Card>
      {/* Card 2 */}
      <Card className="bg-gray-900 text-yellow-50 flex-1 min-w-[180px]">
        <CardHeader>
          <CardTitle className="text-yellow-200 text-lg">This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-400">38.5h</div>
          <div className="flex items-center gap-2 text-xs mt-2">
            <span className="text-yellow-300">●</span> Hours Worked
          </div>
        </CardContent>
      </Card>
      {/* Card 3 */}
      <Card className="bg-gray-900 text-yellow-50 flex-1 min-w-[180px]">
        <CardHeader>
          <CardTitle className="text-yellow-200 text-lg">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-green-400">Active</div>
          <div className="flex items-center gap-2 text-xs mt-2">
            <span className="text-yellow-300">●</span> All Documents Approved
          </div>
        </CardContent>
      </Card>
    </div>
  );
}