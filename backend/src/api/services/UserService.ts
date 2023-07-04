import User, { IUserDoc } from "../models/User";

class UserService {
  static async createUser(user: IUserDoc): Promise<IUserDoc> {
    return await User.create(user);
  }

  static async getUserById(id: string): Promise<IUserDoc | null> {
    return await User.findById(id);
  }

  static async findByEmail(email: string): Promise<IUserDoc | null> {
    return await User.findOne({ email });
  }

  static async getPopulatedCommunities(id: string): Promise<IUserDoc | null> {
    return await User.findById(id).populate("communities");
  }

  static async updateUser(
    id: string,
    updates: Partial<IUserDoc>
  ): Promise<IUserDoc | null> {
    return await User.findByIdAndUpdate(id, updates, { new: true });
  }

  static async deleteUser(id: string): Promise<{ deleted: boolean }> {
    const result = await User.deleteOne({ _id: id });
    return { deleted: result.deletedCount === 1 };
  }
}

export default UserService;
