import { BaseService } from '../common/base.service.js';
import UserModel, { IUser } from './user.model.js';

export class UserService extends BaseService<IUser> {
  constructor() {
    super(UserModel);
  }
}

export default new UserService();
