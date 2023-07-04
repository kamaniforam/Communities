import mongoose from "mongoose";

const PostTypes = ["post", "event", "poll", "marketplace"];

const PostSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: PostTypes,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
    },
    community_id: {
      type: mongoose.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    author_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);

const EventPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  max_capacity: {
    type: Number,
    required: true,
    min: 0,
  },
  rsvp: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const EventPost = Post.discriminator("EventPost", EventPostSchema);

const PollOptionSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  votes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const PollPostSchema = new mongoose.Schema({
  options: {
    type: [PollOptionSchema],
    required: true,
  },
});

export const PollPost = Post.discriminator("PollPost", PollPostSchema);

const MarketplacePostSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
});

export const MarketplacePost = Post.discriminator(
  "MarketplacePost",
  MarketplacePostSchema
);
