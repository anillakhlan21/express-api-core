import validateRequest from '../../middlewares/validate.middleware.js';
import { createBaseRoutes, MiddlewareMap } from '../common/base.route.js';
import { UserController } from './user.controller.js';
import { checkPermission } from '../../middlewares/rbac.middleware.js';
import { createUserSchema, updateUserSchema } from './user.schema.js';

const middlewares: MiddlewareMap = {
  create: [checkPermission('user:create'), validateRequest(createUserSchema)],
  updateById: [validateRequest(updateUserSchema)],
};

const router = createBaseRoutes(new UserController(), middlewares);

export default router;
