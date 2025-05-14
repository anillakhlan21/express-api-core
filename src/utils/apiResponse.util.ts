// utils/ApiResponse.ts

import { Response } from 'express';

export default class ApiResponse<T> {
  private constructor(
    private success: boolean,
    private message: string,
    private data: T | null,
    private statusCode: number
  ) {}

  static ok<T>(data?: T, message = 'OK'): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data ?? null, 200);
  }

  static created<T>(data?: T, message = 'Created'): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data ?? null, 201);
  }

  static accepted<T>(data?: T, message = 'Accepted'): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data ?? null, 202);
  }

  static noContent(message = 'No Content'): ApiResponse<null> {
    return new ApiResponse<null>(true, message, null, 204);
  }

  static badRequest(message = 'Bad Request', data?: any): ApiResponse<any> {
    return new ApiResponse<any>(false, message, data ?? null, 400);
  }

  static unauthorized(message = 'Unauthorized'): ApiResponse<null> {
    return new ApiResponse<null>(false, message, null, 401);
  }

  static forbidden(message = 'Forbidden'): ApiResponse<null> {
    return new ApiResponse<null>(false, message, null, 403);
  }

  static notFound(message = 'Not Found'): ApiResponse<null> {
    return new ApiResponse<null>(false, message, null, 404);
  }

  static conflict(message = 'Conflict'): ApiResponse<null> {
    return new ApiResponse<null>(false, message, null, 409);
  }

  static unprocessable(message = 'Unprocessable Entity', data?: any): ApiResponse<any> {
    return new ApiResponse<any>(false, message, data ?? null, 422);
  }

  static internal(message = 'Internal Server Error', data?: any): ApiResponse<any> {
    return new ApiResponse<any>(false, message, data ?? null, 500);
  }

  static error(statusCode: number, message: string, error: any = null) {
    return new ApiResponse(
      false,
      message,
      process.env.NODE_ENV === 'development' ? error : null,
      statusCode,
    );
  }

  send(res: Response): Response {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
}