import axios from "axios";
import { ApiError } from "./ApiError.js";

export const sendSMS = async (phone, message) => {
  try {
    const response = await axios.get(
      `https://sms.renflair.in/V1.php?API=0e55666a4ad822e0e34299df3591d979&PHONE=${phone}&OTP=${message}`
    );
    if (response.data.status !== "SUCCESS") {
      throw new ApiError(500, "Failed to send OTP");
    }
    return response.data.message;
  } catch (error) {
    throw error;
  }
};
