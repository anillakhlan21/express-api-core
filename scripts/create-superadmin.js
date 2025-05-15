import mongoose from 'mongoose';
import dotenv from 'dotenv';
import RoleModel from '../dist/modules/role/role.model.js';
import UserModel from '../dist/modules/user/user.model.js';

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || '');

  const role = await RoleModel.findOneAndUpdate(
    { name: 'superadmin' },
    { $setOnInsert: { permissions: ['*'] } },
    { upsert: true, new: true }
  );

  await UserModel.create({
    firstName: 'Initial',
    lastName: 'admin',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    roleId: role._id,
  });

  console.log('Superadmin user created.');
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
