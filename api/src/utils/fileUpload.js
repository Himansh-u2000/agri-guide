import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "crypto";
import {
  AWS_ACCESS_KEY,
  AWS_BUCKET_NAME,
  AWS_BUCKET_REGION,
  AWS_SECRET_ACCESS_KEY,
} from "../constant.js";
import { ApiError } from "./ApiError.js";

dotenv.config();

const s3Client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const uploadOnS3 = async (file) => {
  try {
    if (!file) return null;

    const randomName = `${crypto.randomBytes(16).toString("hex")}-${file.originalname}`;
    
    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: randomName,
      Body: file.buffer,
      ContentType: file.mimetype, // Ensure correct file type
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    return `https://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com/${randomName}`;
  } catch (error) {
    console.log(error.message);
    throw new ApiError(500, error.message || "Error in uploading");
  }
};

export default uploadOnS3;
