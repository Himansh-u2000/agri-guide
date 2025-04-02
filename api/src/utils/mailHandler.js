import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";
import { MAIL_PASS, SENDING_EMAIL } from "../constant.js";

export const sendMail = async (email, subject, text, html) => {
  // Create a transporter object using SMTP transport

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: SENDING_EMAIL,
        pass: MAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: SENDING_EMAIL,
      to: email,
      subject: subject,
      text: text,
      html: html,
    });
    return "Email Send Successfully";
  } catch (error) {
    throw new ApiError(409, "Email not sent");
  }
};
