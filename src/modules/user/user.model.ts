import mongoose, { Document, Schema, Types } from 'mongoose';
import { IRole } from '../role/role.model.js';

// 1. Interface for type safety
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: Types.ObjectId; // Ref to Role
  createdAt: Date;
  updatedAt: Date;
  fullName: string; // virtual
  comparePassword(candidatePassword: string): Promise<boolean>;
  role: IRole;
}

// 2. Define schema
const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: [true, 'Role is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 3. Index
// UserSchema.index({ email: 1 }, { unique: true });

// 4. Virtuals
UserSchema.virtual('fullName').get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

// (Optional) If you frequently populate role name
UserSchema.virtual('role', {
  ref: 'Role',
  localField: 'roleId',
  foreignField: '_id',
  justOne: true,
  // options: { select: 'name' },
});

// 5. Pre-save middleware (hash password)
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const bcrypt = await import('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.pre<IUser>('find', async function (next) {
  this.populate('role');
  next();
});

// 6. Instance method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const bcrypt = await import('bcryptjs');
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// 7. Transform JSON output
UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

// 8. Export model
const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;
