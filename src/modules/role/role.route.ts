import validateRequest from '../../middlewares/validate.middleware.js';
import { createRoleSchema, updateRoleSchema } from './role.schema.js';
import RoleController from './role.controller.js';
import { createBaseRoutes, MiddlewareMap } from '../common/base.route.js';

const middlewares: MiddlewareMap = {
  create: [validateRequest(createRoleSchema)],
  updateById: [validateRequest(updateRoleSchema)],
};

const router = createBaseRoutes(new RoleController(), middlewares);

export default router;
