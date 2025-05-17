import RoleService from './role.service.js';
import { BaseController } from '../common/base.controller.js';
import { IRole } from './role.model.js';

class RoleController extends BaseController<IRole> {
  constructor() {
    super(new RoleService());
  }
}

export default RoleController;
