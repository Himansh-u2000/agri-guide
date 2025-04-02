import crypto from "crypto";
import UserVerification from "../models/userVerification.model.js";
import { ApiError } from "./ApiError.js";

export default async function generateCrypto(userId, body) {
  const { email, phone } = body;
  const code = crypto.randomBytes(3).toString("hex").toUpperCase().substring(0, 6);
  const expiresOn = new Date(new Date().getTime() + 5 * 60000);
  const findingToken = crypto.createHash("sha256").update(userId.toString()).digest("hex");

  try {
    const userVerification = await UserVerification.findOne({ userId });
    if (userVerification && userVerification.numberOfAttempts >= 5) {
      throw new ApiError(
        429,
        "Maximum number of attempts reached. Please try again later."
      );
    }
    const verificationData = {
      userId,
      token: findingToken,
      expiresOn,
      numberOfAttempts:
        (userVerification ? userVerification.numberOfAttempts : 0) + 1,
    };

    if (email) {
      verificationData.emailCode = code;
    } else if (phone) {
      verificationData.phoneCode = code;
    }

    if (!userVerification) {
      const newVerification = new UserVerification(verificationData);
      await newVerification.save();
    } else {
      Object.assign(userVerification, verificationData);
      await userVerification.save();
    }

    return {code, token: findingToken};
  } catch (error) {
    throw error;
  }
}
