import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import UserModel, { IUser } from '../user/user.model';

const JWT_SECRET = process.env.JWT_SECRET!;

export class AuthService {
  static async register(data: Partial<IUser>) {
    const existing = await UserModel.findOne({ email: data.email });
    if (existing) throw createHttpError.Conflict('Email already in use');

    const user = await UserModel.create(data);
    return user.toJSON();
  }

  static async login({ email, password }: { email: string; password: string }) {
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) throw createHttpError.Unauthorized('Invalid credentials');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw createHttpError.Unauthorized('Invalid credentials');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    return { token, user: user.toJSON() };
  }
}