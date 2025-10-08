import axios from "axios";
import { Baseurl } from "../utils";
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



