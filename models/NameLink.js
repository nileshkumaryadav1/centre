import mongoose from 'mongoose';

const NameLinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
});

export default mongoose.models.NameLink || mongoose.model('NameLink', NameLinkSchema);
