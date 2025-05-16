import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service.js';
import ApiResponse from '../../utils/apiResponse.util.js';

export class UserController {
  static async getAllUsers(_req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      return ApiResponse.ok(users, 'User fetched successfully').send(res);
    } catch (error) {
      return ApiResponse.internal(error).send(res);
    }
  }

  static async getUserById(req: Request, res: Response, _next: NextFunction) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return ApiResponse.notFound('User not found').send(res);
      }
      return ApiResponse.ok(user, 'User fetched successfully').send(res);
    } catch (error) {
      return ApiResponse.internal(error).send(res);
    }
  }

  static async createUser(req: Request, res: Response, _next: NextFunction) {
    try {
      const user = await UserService.createUser(req.body);
      return ApiResponse.created(user, 'User created').send(res);
    } catch (error) {
      return ApiResponse.internal(error).send(res);
    }
  }

  static async updateUser(req: Request, res: Response, _next: NextFunction) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      return ApiResponse.ok(user, 'User updated').send(res);
    } catch (error) {
      return ApiResponse.internal(error).send(res);
    }
  }

  static async deleteUser(req: Request, res: Response, _next: NextFunction) {
    try {
      await UserService.deleteUser(req.params.id);
      return ApiResponse.ok(null, 'User deleted').send(res);
    } catch (error) {
      return ApiResponse.internal(error).send(res);
    }
  }
}
