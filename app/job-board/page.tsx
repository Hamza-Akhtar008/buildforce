"use client";

import { useEffect, useState } from "react";
import Header from "@/components/landingPage/header";
import Footer from "@/components/landingPage/footer";
import Sidebar from "@/components/jobboard/sidebar";
import JobDetails from "@/components/jobboard/job-details";
import { Job } from "@/types/job";
import { GetallJobs } from "@/lib/PublicApi/publicapi";


export default function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job|null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await GetallJobs();
        console.log("Jobs fetched:", res);
        setJobs(res);
      
      } catch (err) {
        console.error("Failed to load jobs:", err);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="bg-[#222222] py-10 px-25 flex flex-col gap-8">
      <Header />
      <div className="flex">
        <Sidebar jobs={jobs} onSelectJob={setSelectedJob} />
        <JobDetails job={selectedJob} />
      </div>
      <Footer />
    </div>
  );
}
