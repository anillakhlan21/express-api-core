import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import ApiResponse from '../../utils/apiResponse.util';

export class AuthController {
  static async register(req: Request, _res: Response, next: NextFunction) {
    try {
      const user = await AuthService.register(req.body);
      return ApiResponse.created(user, 'User registered successfully');
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, _res: Response, _next: NextFunction) {
    const tokenData = await AuthService.login(req.body);
    return ApiResponse.ok(tokenData, 'Login successful');
  }

  static async getProfile(req: Request, _res: Response) {
    return ApiResponse.ok(req.user, 'User profile fetched');
  }
}
