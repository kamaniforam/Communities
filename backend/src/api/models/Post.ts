import mongoose, { Document, Schema } from "mongoose";
import { ICommunityDoc } from "./Community";
import { IUserDoc } from "./User";

export type PostType = "post" | "event" | "poll" | "marketplace";

interface IPostBase {
  type: PostType;
  community: ICommunityDoc["_id"];
  author: IUserDoc["_id"];
  text: string;
  images?: string[];
  location?: string;
  title?: string;
  max_capacity?: number;
  rsvp?: IUserDoc["_id"][];
  options?: IPollOption[];
  price?: number;
}

// Extend Document to enable type checking and auto-completion
export interface IPostDoc extends IPostBase, Document {}

const PostSchema = new Schema<IPostDoc>(
  {
    // type: {
    //   type: String,
    //   enum: ["post", "event", "poll", "marketplace"],
    //   required: true,
    // },
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
    community: {
      type: mongoose.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    discriminatorKey: "type",
    versionKey: false,
  }
);

export const Post = mongoose.model<IPostDoc>("Post", PostSchema);

export interface IEventPost extends IPostDoc {
  title: string;
  max_capacity: number;
  rsvp?: mongoose.Types.ObjectId[];
}

const EventPostSchema = new Schema<IEventPost>({
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

export const EventPost = Post.discriminator<IEventPost>("event", EventPostSchema);

export interface IPollOption {
  value: string;
  votes: mongoose.Types.ObjectId[];
}

export interface IPollPost extends IPostDoc {
  options: IPollOption[];
}

const PollOptionSchema = new Schema<IPollOption>({
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

const PollPostSchema = new Schema<IPollPost>({
  options: {
    type: [PollOptionSchema],
    required: true,
  },
});

export const PollPost = Post.discriminator<IPollPost>("poll", PollPostSchema);

export interface IMarketplacePost extends IPostDoc {
  price: number;
  image: string;
}

const MarketplacePostSchema = new Schema<IMarketplacePost>({
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

export const MarketplacePost = Post.discriminator<IMarketplacePost>(
  "marketplace",
  MarketplacePostSchema
);
