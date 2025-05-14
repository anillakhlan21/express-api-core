import mongoose, { Document, Schema } from 'mongoose';

// 1. Interface for type safety
export interface IRole extends Document {
  name: 'superAdmin' | 'admin' | 'customer';
  description: string;
  permissions: string[]; // array of permission keys
  createdAt: Date;
  updatedAt: Date;
  permissionCount: number; // virtual
}

// 2. Define schema
const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      enum: ['superAdmin', 'admin', 'customer'],
      required: [true, 'Role name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 3. Index
RoleSchema.index({ name: 1 }, { unique: true });

// 4. Virtual
RoleSchema.virtual('permissionCount').get(function (this: IRole) {
  return this.permissions.length;
});

// 5. Transform JSON output
RoleSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// 6. Export model
const RoleModel = mongoose.model<IRole>('Role', RoleSchema);
export default RoleModel;