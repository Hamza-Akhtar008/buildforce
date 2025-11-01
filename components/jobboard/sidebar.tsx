"use client";

import { useState, useMemo } from "react";
import { Job } from "@/types/job";

interface SidebarProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
}

export default function Sidebar({ jobs = [], onSelectJob }: SidebarProps) {
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [minPay, setMinPay] = useState<number | "">("");

  // Calculate job duration in months based on project start/end
  const calculateProjectDuration = (start?: string, end?: string): number | null => {
    if (!start || !end) return null;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate.getTime() - startDate.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24 * 30)); // months
  };

  // Filtered jobs memoized
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const projectDuration = calculateProjectDuration(
        job.project?.startDate,
        job.project?.endDate
      );

      // Duration filter
      if (selectedDuration) {
        if (selectedDuration === "1-2" && (!projectDuration || projectDuration > 2)) return false;
        if (selectedDuration === "3-6" && (!projectDuration || projectDuration < 3 || projectDuration > 6)) return false;
        if (selectedDuration === "6+" && (!projectDuration || projectDuration <= 6)) return false;
      }

      // Pay filter
      if (minPay && job.salary) {
        const numericSalary = parseInt(job.salary.replace(/\D/g, ""), 10);
        if (numericSalary < (minPay as number)) return false;
      }

      return true;
    });
  }, [jobs, selectedDuration, minPay]);

  return (
    <div className="max-w-2xl bg-[#161616] rounded-[42px] py-20 px-4 max-h-[1200px] overflow-y-auto">
      <h2 className="mb-8 text-xl font-semibold">Search Jobs</h2>

      {/* Project Duration */}
      <div className="mb-8">
        <label className="mb-4 block text-sm font-semibold text-gray-300">
          Estimated project duration
        </label>
        <div className="space-y-3">
          {["1-2", "3-6", "6+"].map((dur) => (
            <label key={dur} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="duration"
                value={dur}
                checked={selectedDuration === dur}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="accent-yellow-600"
              />
              <span className="text-sm">
                {dur === "1-2" ? "1–2 months" : dur === "3-6" ? "3–6 months" : "6+ months"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Minimum Pay Rate */}
      <div className="mb-8">
        <label className="mb-2 block text-sm font-semibold text-gray-300">
          Minimum pay rate
        </label>
        <input
          type="number"
          placeholder="$"
          value={minPay}
          onChange={(e) => setMinPay(e.target.value ? Number(e.target.value) : "")}
          className="w-[100px] bg-[#2F2F2F] rounded-[99px] border border-gray-700 px-3 py-2 text-sm text-gray-400 placeholder-gray-600"
        />
      </div>

      {/* Region and County (static for now) */}
      <div className="mb-8 flex gap-2">
        <select className="flex-1 bg-[#2F2F2F] rounded-[99px] border border-gray-700 px-2 py-2 text-sm text-gray-300">
          <option>Region</option>
        </select>
        <select className="flex-1 bg-[#2F2F2F] rounded-[99px] border border-gray-700 px-2 py-2 text-sm text-gray-300">
          <option>County</option>
        </select>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500 text-sm">No jobs found</p>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => onSelectJob(job)}
              className="border border-gray-700 bg-[#2F2F2F] rounded-[22px] p-3 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <h4 className="mb-2 text-sm font-semibold text-[#CEA134]">
                {job.title}
              </h4>
              <div className="space-y-1 text-xs text-gray-400">
                <p>{job.location || "Location unavailable"}</p>
                <p>{job.salary || "Pay not specified"}</p>
                <p>{job.skillLevel || "Experience required"}</p>
                {job.project && (
                  <p className="text-[10px] text-gray-500">
                    {calculateProjectDuration(
                      job.project.startDate,
                      job.project.endDate
                    ) ?? "?"}{" "}
                    months project
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
