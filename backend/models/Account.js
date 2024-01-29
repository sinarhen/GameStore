import mongoose, { modelNames } from 'mongoose';

const Account = new mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: modelNames.user,
        },
    },
    {
        timestamps: true,
    },
);

const Accounts = mongoose.model(model.Account, UserSchema);

export default User;