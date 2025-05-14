import { Router } from 'express';
import validateRequest from '../../middlewares/validate.middleware';
import { createUserSchema, updateUserSchema } from './user.schema';
import { UserController } from './user.controller';
import { checkPermission } from '../../middlewares/rbac.middleware';

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
