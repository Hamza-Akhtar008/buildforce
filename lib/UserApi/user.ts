import axios from "axios";
import { Baseurl } from "../utils";
import { VerificationStatus } from "@/types";
import { getAuth } from "../auth";
export const RegisterProfile = async (multipartform:any) => {
  try {
  
    const response = await axios.post(Baseurl+"labour-profile", multipartform)
  
    console.log(response);
    return response.data
  } catch (error: any) {
    // Preserve the full error object with status and response data
    if (error.response) {
      // Throw the entire error response to preserve status code and data
      throw error;
    } else {
      throw new Error("Registration failed. Please try again.")
    }
  }
}



export const UpdateStatus = async (id:number,status:VerificationStatus) => {
  try {
    const token = getAuth().access_token;
    const payload = { status };
    const response = await axios.post(Baseurl+`user/${id}/status`, payload,{ headers: {
        Authorization: `Bearer ${token}`, // ✅ attach token
      },})
  
    console.log(response);
    return response.data
  } catch (error: any) {
    // Preserve the full error object with status and response data
    if (error.response) {
      // Throw the entire error response to preserve status code and data
      throw error;
    } else {
      throw new Error("Registration failed. Please try again.")
    }
  }
}

export const FetchProfile = async (id:number|undefined) => {
  try {
  
    const response = await axios.get(Baseurl+`labour-profile/${id}`)
  
  
    return response.data
  } catch (error: any) {
    // Preserve the full error object with status and response data
    if (error.response) {
      // Throw the entire error response to preserve status code and data
      throw error;
    } else {
      throw new Error("Registration failed. Please try again.")
    }
  }
}





export const FetchInterview = async (id:number) => {
  try {
  
    const response = await axios.get(Baseurl+`interview/labour/${id}`)
  
  
    return response.data
  } catch (error: any) {
    // Preserve the full error object with status and response data
    if (error.response) {
      // Throw the entire error response to preserve status code and data
      throw error;
    } else {
      throw new Error("Registration failed. Please try again.")
    }
  }
}



export const SelectInterviewDate = async (id:number,selectdate:string , selecttime:string) => {
  try {
  
    const payload = 
    {
      selectedDate: selectdate,
      selectedTimeSlot: selecttime
    }
    const response = await axios.patch(Baseurl+`interview/${id}`,payload)
  
  
    return response.data
  } catch (error: any) {
    // Preserve the full error object with status and response data
    if (error.response) {
      // Throw the entire error response to preserve status code and data
      throw error;
    } else {
      throw new Error("Registration failed. Please try again.")
    }
  }
}