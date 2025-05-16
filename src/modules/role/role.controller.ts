import { Request, Response } from 'express';
import ApiResponse from '../../utils/apiResponse.util.js';
import RoleService from './role.service.js';

class RoleController {
  static async createRole(req: Request, res: Response) {
    try {
      const role = await RoleService.createRole(req.body);
      return ApiResponse.created(role, 'Role created successfully').send(res);
    } catch (error) {
      return ApiResponse.internal(error).send(res);
    }
  }

  static async getAllRoles(_req: Request, res: Response) {
    try {
      const roles = await RoleService.getAllRoles();
      return ApiResponse.ok(roles, 'All roles fetched').send(res);
    } catch (error) {
      return ApiResponse.internal(error).send(res);
    }
  }

  static async getRoleById(req: Request, res: Response) {
    try {
      const role = await RoleService.getRoleById(req.params.id);
      if (!role) return ApiResponse.notFound('Role not found').send(res);
      return ApiResponse.ok(role, 'Role fetched').send(res);
    } catch (error) {
      return ApiResponse.internal(error).send(res);
    }
  }

  static async updateRole(req: Request, res: Response) {
    try {
      const role = await RoleService.updateRole(req.params.id, req.body);
      if (!role) return ApiResponse.notFound('Role not found').send(res);
      return ApiResponse.ok(role, 'Role updated successfully').send(res);
    } catch (error) {
      return ApiResponse.internal(error).send(res);
    }
  }

  static async deleteRole(req: Request, res: Response) {
    try {
      const deleted = await RoleService.deleteRole(req.params.id);
      if (!deleted) return ApiResponse.notFound('Role not found').send(res);
      return ApiResponse.ok(null, 'Role deleted successfully').send(res);
    } catch (error) {
      return ApiResponse.internal(error).send(res);
    }
  }
}

export default RoleController;
