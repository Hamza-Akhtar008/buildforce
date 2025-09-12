'use client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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

function getStatusColor(status: string) {
  if (status === "Approved") return "bg-yellow-500 text-black";
  if (status === "Pending") return "bg-yellow-700 text-yellow-100";
  if (status === "Rejected") return "bg-gray-700 text-yellow-100";
  return "bg-gray-600 text-white";
}

export default function TabsSection() {
  const [search, setSearch] = useState("");

  function filteredApps(tab: string) {
    let filtered = applications;
    if (tab !== "all") {
      filtered = filtered.filter(app => app.status.toLowerCase() === tab);
    }
    if (search.trim()) {
      filtered = filtered.filter(app =>
        app.type.toLowerCase().includes(search.toLowerCase()) ||
        app.project.toLowerCase().includes(search.toLowerCase()) ||
        app.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      {/* Search Bar */}
      <div className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Search applications...."
          className="bg-gray-900 border border-gray-600 rounded px-4 py-2 text-yellow-100 focus:outline-none"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <TabsList className="flex gap-2 mt-6 w-full">
            {statusList.map(tab => (
                <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="
                    px-4 py-2 rounded-full font-semibold
                    bg-gray-800 text-white
                    data-[state=active]:bg-yellow-500
                    data-[state=active]:text-black
                    shadow
                    transition
                "
                >
                {tab.label}
                </TabsTrigger>
            ))}
        </TabsList>
      </div>
      {/* Tab Contents */}
      {statusList.map(tab => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="flex flex-col gap-4">
            {filteredApps(tab.value).length === 0 ? (
              <div className="text-gray-400 text-center py-8">No applications found.</div>
            ) : (
              filteredApps(tab.value).map(app => (
                <div
                  key={app.id}
                  className="bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-lg font-bold text-yellow-300">{app.type}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="text-gray-300 text-sm mb-1">
                    Submitted on {app.date}
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <div>
                      <span className="font-semibold text-yellow-200">Project</span>: {app.project}
                    </div>
                    <div>
                      <span className="font-semibold text-yellow-200">Location</span>: {app.location}
                    </div>
                  </div>
                  <button className="w-full border border-yellow-700 rounded py-2 text-yellow-300 font-semibold hover:bg-yellow-900 transition">
                    View Details
                  </button>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}