import axios from "axios";
import { Baseurl } from "../utils";
import { getAuth } from "../auth";

export const GetallUsers = async () => {
  try {
    const token = getAuth().access_token;

    const response = await axios.get(Baseurl + "user", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ attach token
      },
    });

    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error; // preserve full error response (status, data, etc.)
    } else {
      throw new Error("Fetching users failed. Please try again.");
    }
  }
};


export const ScheduleInterview = async (payload:any) => {
  try {
    const token = getAuth().access_token;

    const response = await axios.post(Baseurl + "interview",payload, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ attach token
      },
    });

    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error; // preserve full error response (status, data, etc.)
    } else {
      throw new Error("Fetching users failed. Please try again.");
    }
  }
};

export const CreateProject = async (payload: {
  name: string;
  location: string;
  startDate: string;
  description: string;
  budget: number;
  status: ProjectStatus;
}) => {
  try {
    const token = getAuth().access_token;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || Baseurl;

    // Get ownerId from localStorage
    let ownerId = 0;
    const userData = localStorage.getItem("auth");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        ownerId = parsed.id;
      } catch {
        ownerId = 0;
      }
    }

    const response = await axios.post(
      `${baseUrl}project`,
      { ...payload, ownerId }, // inject ownerId here
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error;
    } else {
      throw new Error("Creating project failed. Please try again.");
    }
  }
};

export enum ProjectStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  CLOSED = 'closed',
  COMPLETED = 'completed',
}


