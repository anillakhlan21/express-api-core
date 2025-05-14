import UserModel, { IUser } from './user.model';
import mongoose from 'mongoose';

export class UserService {
  static async getAllUsers(): Promise<IUser[]> {
    return UserModel.find().populate('role');
  }

  static async getUserById(id: string): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    return UserModel.findById(id).populate('role');
  }

  static async createUser(data: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(data);
    return user.save();
  }

  static async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteUser(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    await UserModel.findByIdAndDelete(id);
  }
}