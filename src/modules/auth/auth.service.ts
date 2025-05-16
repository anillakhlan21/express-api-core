import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel, { IUser } from '../user/user.model.js';
import { ConflictError } from '../../utils/errors/ConflictError.js';
import { InvalidCredentialsError } from '../../utils/errors/InvalidCredentialsError.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export class AuthService {
  static async register(data: Partial<IUser>) {
    const existing = await UserModel.findOne({ email: data.email });
    if (existing) throw new ConflictError('Email already in use');

    const user = await UserModel.create(data);
    return user.toJSON();
  }

  static async login({ email, password }: { email: string; password: string }) {
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) throw new InvalidCredentialsError();

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new InvalidCredentialsError();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    return { token, user: user.toJSON() };
  }
}
