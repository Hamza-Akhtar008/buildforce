"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const projects = [
  { id: "1", name: "Ecommerce Website" },
  { id: "2", name: "Construction Labourer" },
  { id: "3", name: "Real Estate Portal" },
  { id: "4", name: "Healthcare App" },
  { id: "5", name: "Smart City Infrastructure" },
];

const page = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState("");
  const [shift, setShift] = useState("");
  const [tags, setTags] = useState("");
  const [meals, setMeals] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 lg:px-0 flex justify-center">
      <div className="w-full max-w-2xl lg:max-w-6xl my-8">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[#f5c242] text-2xl font-bold">+</span>
            <span className="text-2xl md:text-3xl font-bold text-white">
              Create New Job
            </span>
          </div>
          <p className="text-[#bdbdbd] mt-2 text-base">
            Create a new job with all the necessary details and specifications.
          </p>
          <div className="mt-4">
            <a
              href="/admin"
              className="inline-flex items-center gap-2 text-[#f5c242] text-base font-medium px-4 py-2 rounded transition
                hover:bg-primary hover:text-black"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mr-1"
              >
                <path
                  d="M15 4l-7 7 7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Dashboard
            </a>
          </div>
        </div>
        <Card className="w-full text-white border border-[#444]">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-semibold mb-2">
              Job Information
            </CardTitle>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="bg-[#232323] border border-[#444] text-white mb-4 w-full">
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((proj) => (
                  <SelectItem key={proj.id} value={proj.name}>
                    {proj.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium text-white mb-1"
              >
                Job Title
              </label>
              <Input
                id="jobTitle"
                name="jobTitle"
                className="bg-[#232323] border border-[#444] text-white placeholder:text-[#aaa] w-full"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              {/* <label htmlFor="company" className="block text-sm font-medium text-white mb-1">Company Name</label>
              <Input
                id="company"
                name="company"
                className="bg-[#232323] border border-[#444] text-white placeholder:text-[#aaa] w-full"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              /> */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="w-full">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Location
                  </label>
                  <div className="relative">
                    <Input
                      id="location"
                      name="location"
                      className="bg-[#232323] border border-[#444] text-white placeholder:text-[#aaa] w-full pl-10"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#aaa]" />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="level"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Level
                  </label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger
                      id="level"
                      className="bg-[#232323] border border-[#444] text-white w-full"
                      name="level"
                    >
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                      <SelectItem value="Lead">Lead</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="shift"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Shift
                  </label>
                  <Input
                    id="shift"
                    name="shift"
                    className="bg-[#232323] border border-[#444] text-white placeholder:text-[#aaa] w-full"
                    placeholder="Shift (e.g. day shift)"
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="w-full">
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Tags
                  </label>
                  <Input
                    id="tags"
                    name="tags"
                    className="bg-[#232323] border border-[#444] text-white placeholder:text-[#aaa] w-full"
                    placeholder="Tags (e.g. General Labour, Entry)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
                {/* ...existing code... */}
              </div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-white mb-1"
              >
                Salary
              </label>
              <Input
                id="salary"
                name="salary"
                className="bg-[#232323] border border-[#444] text-white font-bold text-lg placeholder:text-[#aaa] w-full placeholder:text-base sm:placeholder:text-base md:placeholder:text-base"
                placeholder="Salary (e.g. $22-28/hourly)"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
              <label
                htmlFor="description"
                className="block text-sm font-medium text-white mb-1"
              >
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                className="bg-[#3d3d3d] border border-[#444] text-white placeholder:text-[#aaa] w-full rounded-md p-2 min-h-[80px] resize-y"
                placeholder="Job Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label
                htmlFor="requirements"
                className="block text-sm font-medium text-white mb-1"
              >
                Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                className="bg-[#3d3d3d] border border-[#444] text-white placeholder:text-[#aaa] w-full rounded-md p-2 min-h-[60px] resize-y"
                placeholder="Requirements (comma separated)"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
              />
              <label
                htmlFor="benefits"
                className="block text-sm font-medium text-white mb-1"
              >
                Benefits
              </label>
              <textarea
                id="benefits"
                name="benefits"
                className="bg-[#3d3d3d] border border-[#444] text-white placeholder:text-[#aaa] w-full rounded-md p-2 min-h-[60px] resize-y"
                placeholder="Benefits (comma separated)"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
              />
              <div className="flex justify-end mt-6">
                <Button className="bg-primary  text-black font-semibold px-6 py-2 rounded hover:scale-105 transition">
                  Post Job
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
