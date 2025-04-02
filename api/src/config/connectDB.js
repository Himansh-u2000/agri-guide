import mongoose from "mongoose";
import { MONGO } from "../constant.js";

export default async function connectToDb() {
  try {
    await mongoose.connect(MONGO);
    console.log("MongoDb is Connected");
  } catch (error) {
    console.log(error);
  }
}
