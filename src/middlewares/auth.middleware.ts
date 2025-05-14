import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import {NextFunction, Request, Response} from 'express'
import UserModel from '../modules/user/user.model';


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(createHttpError.Unauthorized('No token provided'));

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await UserModel.findById(decoded.id);
    if (!user) throw createHttpError.Unauthorized('User not found');
    req.user = user;
    next();
  } catch (err) {
    next(createHttpError.Unauthorized('Invalid token'));
  }
};