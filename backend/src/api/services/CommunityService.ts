import Community, { ICommunityDoc } from "../models/Community";
import User, { IUserDoc } from "../models/User";
import { NotFoundException } from "../utils/errors";

class CommunityService {
  static async createCommunity(
    userid: string,
    community: ICommunityDoc
  ): Promise<ICommunityDoc> {
    const newCommunity = new Community(community);
    const user = await User.findById(userid);
    newCommunity.members.push(user);
    newCommunity.moderators.push(user);
    user.communities.push(newCommunity);
    await user.save();
    return await newCommunity.save();
  }

  static async getCommunities(): Promise<ICommunityDoc[]> {
    return await Community.find();
  }

  static async getCommunityById(id: string): Promise<ICommunityDoc | null> {
    return await Community.findById(id);
  }

  static async getPopulatedCommunityById(id: string): Promise<ICommunityDoc | null> {
    return await Community.findById(id)
      .populate(["members", "moderators"])
      .populate({
        path: "posts",
        populate: {
          path: "author",
          model: "User",
        },
      });
  }

  static async findByName(name: string): Promise<ICommunityDoc | null> {
    return await Community.findOne({ name });
  }

  static async findByType(type: string): Promise<ICommunityDoc[] | null> {
    return await Community.find({ type });
  }

  static async queryCommunities(queryString: string): Promise<ICommunityDoc[] | null> {
    return await Community.find({
      // match name or type, case insensitive
      $or: [
        { name: { $regex: queryString, $options: "i" } },
        { type: { $regex: queryString, $options: "i" } },
      ],
    });
  }

  static async updateCommunity(
    id: string,
    updates: Partial<ICommunityDoc>
  ): Promise<ICommunityDoc | null> {
    return await Community.findByIdAndUpdate(id, updates, { new: true });
  }

  static async deleteCommunity(id: string): Promise<{ deleted: boolean }> {
    const result = await Community.deleteOne({ _id: id });
    return { deleted: result.deletedCount === 1 };
  }

  static async joinCommunity(
    userid: string,
    communityid: string
  ): Promise<{ community: ICommunityDoc; user: IUserDoc }> {
    const community = await Community.findById(communityid);
    if (!community) throw new NotFoundException("Community not found");

    const user = await User.findById(userid);
    if (!user) throw new NotFoundException("User not found");

    // For private communities, add user to waitlist
    if (community.private) {
      // Check if user is already on the waitlist
      if (
        community.members.indexOf(user._id) === -1 &&
        community.waitlist.indexOf(user._id) === -1
      ) {
        community.waitlist.push(user);
        await community.save();
      }
    } else {
      // For public communities, add user to members
      // Check if user is already a member
      if (community.members.indexOf(user._id) === -1) {
        community.members.push(user);
        await community.save();
      }

      // Check if user is already a member of the community
      if (user.communities.indexOf(community._id) === -1) {
        user.communities.push(community);
        await user.save();
      }
    }

    return { community, user };
  }
}

export default CommunityService;
