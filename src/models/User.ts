import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  emailVerified?: Date;
  accounts?: mongoose.Types.DocumentArray<{
    provider: string;
    providerAccountId: string;
    type: string;
  }>;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    image: String,
    emailVerified: Date,
    accounts: [
      {
        provider: String,
        providerAccountId: String,
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password') || !user.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error: any) {
    return next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if model already exists to prevent overwrite during hot reloads
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 