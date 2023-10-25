import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI as string); // Make sure DATABASE_URI is defined in your environment variables and has the correct type (string).
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
