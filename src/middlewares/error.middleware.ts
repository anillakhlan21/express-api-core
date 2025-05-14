import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../utils/apiResponse.util';

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return ApiResponse.error(statusCode, message, err).send(res);
};