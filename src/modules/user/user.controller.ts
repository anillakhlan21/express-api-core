import { UserService } from './user.service.js';
import { BaseController } from '../common/base.controller.js';
import { IUser } from './user.model.js';
export class UserController extends BaseController<IUser> {
  constructor() {
    super(new UserService());
  }
}
