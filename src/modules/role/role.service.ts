import RoleModel, { IRole } from "./role.model";

class RoleService {
  static async createRole(payload: Partial<IRole>) {
    return RoleModel.create(payload);
  }

  static async getAllRoles() {
    return RoleModel.find().lean();
  }

  static async getRoleById(roleId: string) {
    return RoleModel.findById(roleId).lean();
  }

  static async updateRole(roleId: string, updates: Partial<IRole>) {
    return RoleModel.findByIdAndUpdate(roleId, updates, { new: true }).lean();
  }

  static async deleteRole(roleId: string) {
    const result = await RoleModel.findByIdAndDelete(roleId);
    return !!result;
  }
}

export default RoleService;