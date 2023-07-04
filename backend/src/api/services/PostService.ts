import Community from "../models/Community";
import { Post, IPostDoc, PollPost } from "../models/Post";
import { NotFoundException } from "../utils/errors";

class PostService {
  static async createPost(author_id: string, post: IPostDoc): Promise<IPostDoc> {
    console.log("createpost post", post);
    post.author = author_id;
    const newPost = new Post(post);
    console.log("newPost", newPost, post);
    const community = await Community.findById(post.community);
    if (!community) throw new NotFoundException("Community not found");
    community.posts.push(newPost._id);
    await community.save();
    return await newPost.save();
  }

  static async getPostsByUser(userid: string): Promise<IPostDoc[]> {
    return await Post.find({ author: userid });
  }

  static async getPostsByCommunity(community_id: string): Promise<IPostDoc[]> {
    return await Post.find({ community: community_id });
  }

  static async getPostsByCommunityAndUser(
    author_id: string,
    community_id: string
  ): Promise<IPostDoc[]> {
    if (!!author_id && !!community_id)
      return await Post.find({
        $and: [{ author: author_id }, { community: community_id }],
      });
    else if (!!author_id) return await Post.find({ author: author_id });
    else if (!!community_id) return await Post.find({ community: community_id });

    return [];
  }

  static async getPostsByCommunities(community_ids: string[]): Promise<IPostDoc[]> {
    return await Post.find({ community: { $in: community_ids } }).populate([
      "author",
      "community",
    ]);
  }

  static async getPostById(id: string): Promise<IPostDoc | null> {
    return await Post.findById(id);
  }

  static async updatePost(
    id: string,
    updates: Partial<IPostDoc>
  ): Promise<IPostDoc | null> {
    return await PollPost.findByIdAndUpdate(id, updates, { new: true });
  }

  static async deletePost(id: string): Promise<{ deleted: boolean }> {
    const result = await Post.deleteOne({ _id: id });
    return { deleted: result.deletedCount === 1 };
  }
}

export default PostService;
