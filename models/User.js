import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models('users') || mongoose.model('users', userSchema);
