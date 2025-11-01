import axios from "axios";
import { Baseurl } from "../utils";
import { getAuth } from "../auth";

export interface Project {
  id: number;
  name: string;
  location: string;
  description?: string;
}

export interface CreateJobPayload {
  title: string;
  description: string;
  hiringInfo?: string;
  postedOn: string;
  startDate: string;
  workDuration: string;
  shift: string;
  skillLevel: string;
  salary: string;
  location: string;
  fullAddress: string;
  scheduleDays: string[];
  shiftHours: string;
  shiftNote: string;
  experience: string[];
  licenses: string[];
  skills: string[];
  benefits: string[];
  projectId: number;
}

export const GetProjectsByOwner = async (ownerId: number) => {
  try {
    const token = getAuth().access_token;

    const response = await axios.get(Baseurl + `project/owner/${ownerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error;
    } else {
      throw new Error("Fetching projects failed. Please try again.");
    }
  }
};

export const CreateJob = async (payload: CreateJobPayload) => {
  try {
    const token = getAuth().access_token;

    const response = await axios.post(Baseurl + "job", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error;
    } else {
      throw new Error("Creating job failed. Please try again.");
    }
  }
};
