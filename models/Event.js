import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    // ======================
    // Core Info
    // ======================
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
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
      maxlength: 2000,
    },

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
    // Event Details
    // ======================
    venue: {
      type: String,
      trim: true,
    },

    mode: {
      type: String,
      enum: ["offline", "online", "hybrid"],
      default: "offline",
    },

    eventDate: {
      type: Date,
      required: true,
      index: true,
    },

    startTime: String,
    endTime: String,

    // ======================
    // Registration
    // ======================
    registrationLink: {
      type: String,
    },

    registrationDeadline: Date,

    isRegistrationOpen: {
      type: Boolean,
      default: true,
    },

    // ======================
    // Relationships
    // ======================
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },

    organizers: [
      {
        name: String,
        role: String,
      },
    ],

    // ======================
    // Meta / Control
    // ======================
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
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

// ✅ Prevent duplicate model registration
export default mongoose.models.Event ||
  mongoose.model("Event", EventSchema);
