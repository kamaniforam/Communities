import mongoose from 'mongoose'

const communitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "school",
        "company",
        "organization",
        "interest",
        "neighborhood",
        "club",
      ],
      required: true,
    },
    description: { type: String },
    private: { type: Boolean, default: false },
    members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    moderators: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    waitlist: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

export default Community;
