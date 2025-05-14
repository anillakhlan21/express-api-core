import express from 'express';
import validateRequest from '../../middlewares/validate.middleware';
import { createRoleSchema, updateRoleSchema } from './role.schema';
import RoleController from './role.controller';

const router = express.Router();

router.post('/', validateRequest(createRoleSchema), RoleController.createRole);
router.get('/', RoleController.getAllRoles);
router.get('/:id', RoleController.getRoleById);
router.patch('/:id', validateRequest(updateRoleSchema), RoleController.updateRole);
router.delete('/:id', RoleController.deleteRole);

export default router;