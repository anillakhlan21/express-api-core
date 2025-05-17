// types/IBaseController.ts
import { NextFunction, Request, Response } from 'express';

export interface IBaseController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getById(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  create(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  update(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
