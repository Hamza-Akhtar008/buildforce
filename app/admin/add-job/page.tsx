"use client";
import React, { useState, useEffect } from "react";
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
import { CreateJob, CreateJobPayload, GetProjectsByOwner, Project } from "@/lib/JobApi/job";
import { notifyError, notifySuccess } from "@/lib/toast";
import { WorkDuration, Shift, SkillLevel } from "@/lib/JobApi/enums";

const page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [selectedProject, setSelectedProject] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [hiringInfo, setHiringInfo] = useState("");
  const [location, setLocation] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [shift, setShift] = useState("");
  const [workDuration, setWorkDuration] = useState("");
  const [scheduleDays, setScheduleDays] = useState("");
  const [shiftHours, setShiftHours] = useState("");
  const [shiftNote, setShiftNote] = useState("");
  const [tags, setTags] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [experience, setExperience] = useState("");
  const [benefits, setBenefits] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      // Get ownerId from localStorage
      const userData = localStorage.getItem("auth");
      if (!userData) {
        notifyError("Please login first");
        return;
      }
      
      const parsed = JSON.parse(userData);
      const ownerId = parsed.id;
      
      const projectsData = await GetProjectsByOwner(ownerId);
      setProjects(projectsData);
    } catch (error: any) {
      console.error("Error fetching projects:", error);
      notifyError("Failed to load projects");
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!jobTitle || !location || !selectedProject || !description) {
      notifyError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    try {
      // Get current date for postedOn
      const today = new Date().toISOString().split('T')[0];
      
      // Prepare the payload according to the API schema
      const payload: CreateJobPayload = {
        title: jobTitle,
        description: description,
        hiringInfo: hiringInfo || "Hiring",
        postedOn: today,
        startDate: today, // You can add a date picker for this
        workDuration: workDuration || WorkDuration.Medium,
        shift: shift || Shift.Day,
        skillLevel: skillLevel || SkillLevel.Beginner,
        salary: salary || "$25/hr",
        location: location,
        fullAddress: fullAddress || location,
        scheduleDays: scheduleDays ? scheduleDays.split(",").map(d => d.trim()) : ["M", "T", "W", "Th", "F"],
        shiftHours: shiftHours || "6am - 4pm",
        shiftNote: shiftNote || "Times are subject to change",
        experience: experience ? experience.split(",").map(e => e.trim()) : [],
        licenses: requirements ? requirements.split(",").map(r => r.trim()) : [],
        skills: tags ? tags.split(",").map(t => t.trim()) : [],
        benefits: benefits ? benefits.split(",").map(b => b.trim()) : [],
        projectId: parseInt(selectedProject),
      };

      const response = await CreateJob(payload);
      notifySuccess("Job created successfully!");
      
      // Reset form
      setJobTitle("");
      setHiringInfo("");
      setLocation("");
      setFullAddress("");
      setSelectedProject("");
      setSkillLevel("");
      setShift("");
      setWorkDuration("");
      setScheduleDays("");
      setShiftHours("");
      setShiftNote("");
      setTags("");
      setSalary("");
      setDescription("");
      setRequirements("");
      setExperience("");
      setBenefits("");
      
    } catch (error: any) {
      console.error("Error creating job:", error);
      const errorMessage = error.response?.data?.message || "Failed to create job. Please try again.";
      notifyError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
            <Select value={selectedProject} onValueChange={setSelectedProject} disabled={loadingProjects}>
              <SelectTrigger className="bg-[#232323] border border-[#444] text-white mb-4 w-full">
                <SelectValue placeholder={loadingProjects ? "Loading projects..." : "Select Project"} />
              </SelectTrigger>
              <SelectContent>
                {projects.map((proj) => (
                  <SelectItem key={proj.id} value={proj.id.toString()}>
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
              
              <label
                htmlFor="hiringInfo"
                className="block text-sm font-medium text-white mb-1"
              >
                Hiring Info
              </label>
              <Input
                id="hiringInfo"
                name="hiringInfo"
                className="bg-[#232323] border border-[#444] text-white placeholder:text-[#aaa] w-full"
                placeholder="e.g. Hiring 10 workers"
                value={hiringInfo}
                onChange={(e) => setHiringInfo(e.target.value)}
              />

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
                      placeholder="e.g. Houston, TX 77070"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#aaa]" />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="fullAddress"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Full Address
                  </label>
                  <Input
                    id="fullAddress"
                    name="fullAddress"
                    className="bg-[#232323] border border-[#444] text-white placeholder:text-[#aaa] w-full"
                    placeholder="e.g. 123 Industrial Rd, Houston, TX 77070"
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="w-full">
                  <label
                    htmlFor="skillLevel"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Skill Level
                  </label>
                  <Select value={skillLevel} onValueChange={setSkillLevel}>
                    <SelectTrigger
                      id="skillLevel"
                      className="bg-[#232323] border border-[#444] text-white w-full"
                      name="skillLevel"
                    >
                      <SelectValue placeholder="Skill Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={SkillLevel.Beginner}>Beginner</SelectItem>
                      <SelectItem value={SkillLevel.Intermediate}>Intermediate</SelectItem>
                      <SelectItem value={SkillLevel.Expert}>Expert</SelectItem>
                      <SelectItem value={SkillLevel.NeedTraining}>Need Training</SelectItem>
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
                  <Select value={shift} onValueChange={setShift}>
                    <SelectTrigger
                      id="shift"
                      className="bg-[#232323] border border-[#444] text-white w-full"
                      name="shift"
                    >
                      <SelectValue placeholder="Shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Shift.Day}>Day Shift</SelectItem>
                      <SelectItem value={Shift.Night}>Night Shift</SelectItem>
                      <SelectItem value={Shift.Both}>Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="workDuration"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Work Duration
                  </label>
                  <Select value={workDuration} onValueChange={setWorkDuration}>
                    <SelectTrigger
                      id="workDuration"
                      className="bg-[#232323] border border-[#444] text-white w-full"
                      name="workDuration"
                    >
                      <SelectValue placeholder="Work Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={WorkDuration.ShortTerm}>Short Term (1-3 months)</SelectItem>
                      <SelectItem value={WorkDuration.Medium}>Medium (3-6 months)</SelectItem>
                      <SelectItem value={WorkDuration.LongTerm}>Long Term (6+ months)</SelectItem>
                      <SelectItem value={WorkDuration.Permanent}>Permanent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="w-full">
                  <label
                    htmlFor="scheduleDays"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Schedule Days
                  </label>
                  <Input
                    id="scheduleDays"
                    name="scheduleDays"
                    className="bg-[#232323] border border-[#444] text-white placeholder:text-[#aaa] w-full"
                    placeholder="e.g. M, T, W, Th, F"
                    value={scheduleDays}
                    onChange={(e) => setScheduleDays(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="shiftHours"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Shift Hours
                  </label>
                  <Input
                    id="shiftHours"
                    name="shiftHours"
                    className="bg-[#232323] border border-[#444] text-white placeholder:text-[#aaa] w-full"
                    placeholder="e.g. 6am - 4pm"
                    value={shiftHours}
                    onChange={(e) => setShiftHours(e.target.value)}
                  />
                </div>
              </div>

              <label
                htmlFor="shiftNote"
                className="block text-sm font-medium text-white mb-1"
              >
                Shift Note
              </label>
              <Input
                id="shiftNote"
                name="shiftNote"
                className="bg-[#232323] border border-[#444] text-white placeholder:text-[#aaa] w-full"
                placeholder="e.g. Times are subject to change"
                value={shiftNote}
                onChange={(e) => setShiftNote(e.target.value)}
              />

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="w-full">
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Skills (comma separated)
                  </label>
                  <Input
                    id="tags"
                    name="tags"
                    className="bg-[#232323] border border-[#444] text-white placeholder:text-[#aaa] w-full"
                    placeholder="e.g. Bending Conduit, Rough In"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-white mb-1"
                  >
                    Experience (comma separated)
                  </label>
                  <Input
                    id="experience"
                    name="experience"
                    className="bg-[#232323] border border-[#444] text-white placeholder:text-[#aaa] w-full"
                    placeholder="e.g. Commercial, Residential"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
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
                Licenses (comma separated)
              </label>
              <textarea
                id="requirements"
                name="requirements"
                className="bg-[#3d3d3d] border border-[#444] text-white placeholder:text-[#aaa] w-full rounded-md p-2 min-h-[60px] resize-y"
                placeholder="e.g. TDLR - Apprentice Electrician, CPR Certified"
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
                <Button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-primary text-black font-semibold px-6 py-2 rounded hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Posting..." : "Post Job"}
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
