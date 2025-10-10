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
