import { Router } from 'express';
import validateRequest from '../../middlewares/validate.middleware.js';
import { createUserSchema, updateUserSchema } from './user.schema.js';
import { UserController } from './user.controller.js';
import { checkPermission } from '../../middlewares/rbac.middleware.js';

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post(
  '/',
  checkPermission('user:create'),
  validateRequest(createUserSchema),
  UserController.createUser
);
router.put('/:id', validateRequest(updateUserSchema), UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
