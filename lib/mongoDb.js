import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined in environment variables");
    return;
  }

  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // exit process if DB connection fails
  }
};

export default connectToDatabase;
