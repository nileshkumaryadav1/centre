import mongoose from "mongoose";

const BirthdaySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Birthday || mongoose.model("Birthday", BirthdaySchema);
