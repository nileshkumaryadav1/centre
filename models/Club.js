import mongoose from "mongoose";

const ClubSchema = new mongoose.Schema(
  {
    // ======================
    // Basic Info
    // ======================
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    // ======================
    // Club Details
    // ======================
    location: {
      type: String,
      required: true,
      trim: true,
    },

    coordinators: [
      {
        name: { type: String, required: true },
        role: { type: String, default: "Coordinator" },
        email: { type: String },
      },
    ],

    // ======================
    // Media
    // ======================
    imageUrl: {
      type: String,
      required: true,
    },

    coverImageUrl: {
      type: String,
    },

    // ======================
    // Links
    // ======================
    links: {
      website: { type: String },
      instagram: { type: String },
      linkedin: { type: String },
      github: { type: String },
    },

    // ======================
    // Meta / Control
    // ======================
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    priority: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: String, // admin id/email
    },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite in dev
export default mongoose.models.Club ||
  mongoose.model("Club", ClubSchema);
