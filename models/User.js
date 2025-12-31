import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // ======================
    // Identity
    // ======================
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 never return password by default
    },

    // ======================
    // Account State
    // ======================
    role: {
      type: String,
      enum: ["user", "admin", "editor"],
      default: "user",
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    // ======================
    // Public Profile
    // ======================
    avatar: {
      type: String,
    },

    bio: {
      type: String,
      maxlength: 300,
    },

    // ======================
    // Auth & Security
    // ======================
    lastLoginAt: {
      type: Date,
    },

    passwordChangedAt: {
      type: Date,
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,

    emailVerifyToken: String,
    emailVerifyExpires: Date,

    // ======================
    // Preferences
    // ======================
    preferences: {
      newsletter: {
        type: Boolean,
        default: false,
      },
      darkMode: {
        type: Boolean,
        default: false,
      },
    },

    // ======================
    // Meta
    // ======================
    createdBy: {
      type: String, // system / admin
    },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite in dev
export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
