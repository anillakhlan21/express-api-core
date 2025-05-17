import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service.js';
import ApiResponse from '../../utils/apiResponse.util.js';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.register(req.body);
      return ApiResponse.created(user, 'User registered successfully').send(res);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenData = await AuthService.login(req.body);
      return ApiResponse.ok(tokenData, 'Login successful').send(res);
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      return ApiResponse.ok(req.user, 'User profile fetched').send(res);
    } catch (error) {
      next(error);
    }
  }
}
