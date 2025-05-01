import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoDbUri = process.env.MONGODB_URI;

const connectDB = async () => {
  await mongoose.connect(mongoDbUri);
};

export default connectDB;
