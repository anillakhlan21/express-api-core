import mongoose, { Document, Schema, Types } from 'mongoose';

// 1. Interface for type safety
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Types.ObjectId; // Ref to Role
  createdAt: Date;
  updatedAt: Date;
  fullName: string; // virtual
  comparePassword(candidatePassword: string): Promise<boolean>;
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
    role: {
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
UserSchema.index({ email: 1 }, { unique: true });

// 4. Virtuals
UserSchema.virtual('fullName').get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

// (Optional) If you frequently populate role name
UserSchema.virtual('roleName', {
  ref: 'Role',
  localField: 'role',
  foreignField: '_id',
  justOne: true,
  options: { select: 'name' },
});

// 5. Pre-save middleware (hash password)
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const bcrypt = await import('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// 6. Instance method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(candidatePassword, this.password);
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