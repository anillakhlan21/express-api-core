import ApiResponse from '../../utils/apiResponse.util.js';
import { NextFunction, Request, Response } from 'express';
import { IBaseController } from '../../interfaces/IBaseController.interface.js';
import { IBaseService } from '../../interfaces/IBaseService.interface.js';

export class BaseController<TRowDocType> implements IBaseController {
  protected service: IBaseService<TRowDocType>;
  constructor(service: IBaseService<TRowDocType>) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.getAll();
      return ApiResponse.ok(data).send(res);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await (this.service as any).getById(id);
      return ApiResponse.ok(data).send(res);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const data = await (this.service as any).create(body);
      return ApiResponse.ok(data).send(res);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    return next();
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    next();
  }
}
