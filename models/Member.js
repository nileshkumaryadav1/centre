import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String, required: true },
    role: { type: String },
    imageUrl: { type: String, required: true },
    instagramLink: { type: String},
    githubLink: { type: String},
    linkedinLink: { type: String},
})

const Member = mongoose.models.Member || mongoose.model("Member", MemberSchema);

export default Member;
