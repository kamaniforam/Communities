import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { ICommunityDoc } from "./Community";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  school?: string;
  company?: string;
  communities: ICommunityDoc["_id"][];
}

// Extend IUser with Document to enable type checking and auto-completion
export interface IUserDoc extends IUser, Document {}

const userSchema: Schema<IUserDoc> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    school: { type: String },
    company: { type: String },
    communities: [{ type: mongoose.Types.ObjectId, ref: "Community" }],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash password before saving
userSchema.pre("save", function (next) {
  const user = this as IUserDoc;
  if (!user.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});

const User = mongoose.model<IUserDoc>("User", userSchema);

export default User;
