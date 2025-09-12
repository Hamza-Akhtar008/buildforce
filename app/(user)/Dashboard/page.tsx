import Checkin from "./sections/Checkin";
import Activity from "./sections/Activity";
import Notifications from "./sections/Notifications";

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 p-6">
      
        {/* Checkin Row */}
          <Checkin/>


		{/* Recent Activity and notifications */}
		<div className="flex flex-row gap-6 mt-6 space-x-6 justify-between item-center">
			<Activity/>
			<Notifications/>
		</div>

		
      </main>
    </div>
  );
}