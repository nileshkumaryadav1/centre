import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ Prevent duplicate model registration
const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;
