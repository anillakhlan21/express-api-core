import { BaseService } from '../common/base.service.js';
import RoleModel, { IRole } from './role.model.js';

class RoleService extends BaseService<IRole> {
  constructor() {
    super(RoleModel);
  }
}

export default RoleService;
