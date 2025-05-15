import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../utils/apiResponse.util.js';
import { AppLogger } from '../utils/logger.util.js';

const logger = new AppLogger('Error Middleware');

export const errorMiddleware = (err: any, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`[${req.method}] ${req.originalUrl} -> ${err.message}\n${err.stack}`);

  return ApiResponse.error(statusCode, message, err).send(res);
};
