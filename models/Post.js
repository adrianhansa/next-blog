import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      requied: true,
      unique: true,
    },
    images: [{ type: String }],
    content: { type: String, required: true },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models('posts') || mongoose.model('posts', postSchema);
