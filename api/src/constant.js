import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const DB_NAME = process.env.DB_NAME || "AgriGuide";
export const MONGO =
  `${process.env.MONGO}/${DB_NAME}?retryWrites=true&w=majority` ||
  "mongodb://localhost:27017/Test";
