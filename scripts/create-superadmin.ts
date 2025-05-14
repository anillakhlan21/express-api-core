import mongoose from 'mongoose';
import dotenv from 'dotenv';
import RoleModel from '../src/modules/role/role.model'
import UserModel from '../src/modules/user/user.model';
import bcrypt from 'bcryptjs';

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || '');

  const role = await RoleModel.findOneAndUpdate(
    { name: 'superadmin' },
    { $setOnInsert: { permissions: ['*'] } },
    { upsert: true, new: true }
  );

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);

  await UserModel.create({
    name: 'Initial Admin',
    email: process.env.ADMIN_EMAIL || 'admin@yourapp.com',
    password: hashedPassword,
    role: role._id,
  });

  console.log('Superadmin user created.');
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
