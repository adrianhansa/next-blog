import mongoose from 'mongoose';

const commentSchema = new Comment(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'posts',
    },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models('comments') ||
  mongoose.model('comments', commentSchema);
