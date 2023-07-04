import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    school: { type: String },
    company: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;