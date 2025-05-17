import { RequestHandler, Router } from 'express';
import { IBaseController } from '../../interfaces/IBaseController.interface';

export type MiddlewareMap = {
  getAll?: RequestHandler[];
  getById?: RequestHandler[];
  create?: RequestHandler[];
  updateById?: RequestHandler[];
  deleteById?: RequestHandler[];
};

export function createBaseRoutes(controller: IBaseController, middlewares?: MiddlewareMap) {
  const router = Router();

  router.get('/', ...(middlewares?.getAll || []), controller.getAll.bind(controller));
  router.get('/:id', ...(middlewares?.getById || []), controller.getById.bind(controller));
  router.post('/', ...(middlewares?.create || []), controller.create.bind(controller));
  router.put('/:id', controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}
