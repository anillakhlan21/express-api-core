import { Request, Response, NextFunction } from 'express';
import UserModel from '../modules/user/user.model.js';
import ApiResponse from '../utils/apiResponse.util.js';
import { IRole } from '../modules/role/role.model.js';

export const checkPermission = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) {
      return ApiResponse.unauthorized().send(res);
    }

    const user = await UserModel.findById(userId).populate('role');

    if (!user || !user.role) {
      return ApiResponse.forbidden('Access denied').send(res);
    }

    const role = user.role as IRole;

    if (!role.permissions.includes(requiredPermission)) {
      return ApiResponse.forbidden('Permission denied').send(res);
    }

    next();
  };
};
