import bcrypt from 'bcryptjs/umd/types';
import RoleModel from '../modules/role/role.model.js';
import UserModel from '../modules/user/user.model.js';
import { SUPER_ADMIN } from '../constants/index.js';

export const bootstrapRBAC = async () => {
  const existingSuperAdmin = await UserModel.findOne();

  if (existingSuperAdmin) {
    console.log('Super admin or any user already exists. Skipping bootstrap.');
    return;
  }

  const superAdminRole = await RoleModel.findOneAndUpdate(
    { name: SUPER_ADMIN.ROLE },
    { $setOnInsert: { permissions: ['*'] } },
    { upsert: true, new: true }
  );

  const hashedPassword = await bcrypt.hash(SUPER_ADMIN.PASSWORD, 10);

  await UserModel.create({
    name: SUPER_ADMIN.NAME,
    email: SUPER_ADMIN.EMAIL,
    password: hashedPassword,
    role: superAdminRole._id,
  });

  console.log('✅ Super admin user created successfully.');
};
