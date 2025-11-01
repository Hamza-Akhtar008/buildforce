"use client";

import React from "react";
import { Job } from "@/types/job";

interface JobDetailsProps {
  job: Job | null;
}

export default function JobDetails({ job }: JobDetailsProps) {
  const weekDays = ["SU", "M", "T", "W", "Th", "F", "SA"];

  if (!job) {
    return (
      <div className="flex-1 bg-[#161616] rounded-[42px] ml-5 p-8 flex items-center justify-center text-gray-500 text-lg">
        Select a job to view details
      </div>
    );
  }

  const company = job.project?.owner;
  const project = job.project;

  return (
    <div className="flex-1 bg-[#161616] rounded-[42px] ml-5 overflow-y-auto p-8">
      {/* Job Header */}
      <div className="mb-10">
        <h1 className="mb-2 text-4xl font-semibold">{job.title}</h1>
        <p className="text-gray-400">
          {job.location} - {job.hiringInfo}
        </p>
        <p className="text-sm text-gray-500">
          Posted on {new Date(job.postedOn).toLocaleDateString()}
        </p>
      </div>

      {/* Company & Project Section */}
      {(project || company) && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Company & Project</h2>
          <div className="border border-gray-700 rounded-[22px] p-6 space-y-3 bg-[#1f1f1f]">
            {/* Company Details */}
            {company && (
              <>
                <div className="flex items-center gap-4">
                  {company.logoUrl && (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className="w-14 h-14 rounded-full object-cover border border-gray-700"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-[#CEA134]">{company.name}</h3>
                    <p className="text-gray-500 text-sm">📍 {company.location}</p>
                  </div>
                </div>

                {company.about && (
                  <p className="text-gray-400 text-sm mt-2">{company.about}</p>
                )}

                <div className="border-t border-gray-700 pt-3 mt-3" />
              </>
            )}

            {/* Project Details */}
            {project && (
              <div>
                <h4 className="text-lg font-semibold text-gray-300">
                  Project: <span className="text-[#CEA134]">{project.name}</span>
                </h4>
                <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Duration: {new Date(project.startDate).toLocaleDateString()} →{" "}
                  {new Date(project.endDate).toLocaleDateString()}
                </p>
                {project.location && (
                  <p className="text-gray-500 text-xs mt-1">📍 {project.location}</p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Job Details Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Job Details</h2>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-semibold text-gray-300">Duration</h3>
            <p className="text-gray-400">
              {job.workDuration.charAt(0).toUpperCase() + job.workDuration.slice(1)} duration
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-gray-300">Start Date</h3>
            <p className="text-gray-400">
              Job starts as soon as {new Date(job.startDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-gray-300">Hours</h3>
            <p className="text-gray-400">{job.shiftHours}</p>
            <p className="text-sm text-gray-500">{job.shiftNote}</p>
          </div>
        </div>
      </section>

      {/* Job Schedule Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Job Schedule</h2>
        <div className="flex gap-3 mb-4">
          {weekDays.map((day) => (
            <div
              key={day}
              className={`w-10 h-10 flex items-center justify-center border ${
                job.scheduleDays.includes(day)
                  ? "bg-[#CEA134] text-black border-[#CEA134]"
                  : "border-gray-600 text-gray-400"
              } text-sm font-semibold rounded-md cursor-pointer`}
            >
              {day}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500">{job.shiftHours}</p>
        <p className="text-sm text-gray-500">{job.shiftNote}</p>
      </section>

      {/* Requirements */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Requirements</h2>

        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-gray-300">Experience</h3>
          <div className="flex flex-wrap gap-2">
            {job.experience.map((exp, i) => (
              <span
                key={i}
                className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300"
              >
                {exp}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-gray-300">Licenses</h3>
          <div className="flex flex-wrap gap-2">
            {job.licenses.map((lic, i) => (
              <span
                key={i}
                className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300"
              >
                {lic}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-gray-300">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Benefits</h2>
        <div className="flex flex-wrap gap-3">
          {job.benefits.map((benefit, i) => (
            <span
              key={i}
              className="px-4 py-2 border border-gray-600 rounded-full text-sm text-gray-300"
            >
              {benefit}
            </span>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Description</h2>
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
          <p>{job.description}</p>
        </div>
      </section>

      {/* CTA */}
      <div className="mb-8">
        <button className="w-full bg-[#CEA134] rounded-[12px] text-black font-semibold py-3 text-lg hover:bg-yellow-500 transition-colors">
          Get In Touch
        </button>
      </div>
    </div>
  );
}
