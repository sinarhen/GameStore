import mongoose from 'mongoose';
import { roles } from "../utils/constants.js";

const UserSchema = new mongoose.Schema(
    {
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
        avatarUrl: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            enum: roles, // Define the possible roles here
            default: 'user', // Default role is 'user'
        },
        accounts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Account',
            },
        ],
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', UserSchema);

export default User;