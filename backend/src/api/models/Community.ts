import mongoose, { Document } from "mongoose";
import { IPostDoc } from "./Post";
import { IUserDoc } from "./User";

interface ICommunityBase {
  name: string;
  type: "school" | "company" | "organization" | "interest" | "neighborhood" | "club";
  description?: string;
  private: boolean;
  members: IUserDoc["_id"][];
  moderators: IUserDoc["_id"][];
  waitlist: IUserDoc["_id"][];
  posts: IPostDoc["_id"][];
}

// Extend ICommunityDoc with Document to enable type checking and auto-completion
export interface ICommunityDoc extends ICommunityBase, Document {}

const communitySchema = new mongoose.Schema<ICommunityBase>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["school", "company", "organization", "interest", "neighborhood", "club"],
      required: true,
    },
    description: { type: String },
    private: { type: Boolean, default: false },
    members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    moderators: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    waitlist: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true, versionKey: false, toJSON: { virtuals: true } }
);

const Community = mongoose.model<ICommunityDoc>("Community", communitySchema);

export default Community;
