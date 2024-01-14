import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', UserSchema);

export default User;