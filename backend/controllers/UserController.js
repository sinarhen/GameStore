import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';
import {generateToken} from '../utils/jwt.js';
import { roles } from "../utils/constants.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        if (!req.body.name) {
            return res.status(400).json({
                field: 'name',
                message: 'Missing name',
            });
        }

        if (!req.body.email) {
            return res.status(400).json({
                field: 'email',
                message: 'Missing email',
            });
        }

        if (!req.body.password) {
            return res.status(400).json({
                field: 'password',
                message: 'Missing password',
            });
        }

        if (req.body.password.length < 6) {
            return res.status(400).json({
                field: 'password',
                message: 'Password too short. Minimum 2 characters required',
            });
        }

        if (req.body.name.length < 2) {
            return res.status(400).json({
                field: 'name',
                message: 'Name too short. Minimum 6 characters required',
            });
        }

        let existingUser = await UserModel.findOne({
            email: req.body.email,
        });
        if (existingUser) {
            return res.status(400).json({
                field: 'email',
                message: 'Email already in use',
            });
        }

        existingUser = await UserModel.findOne({
            name: req.body.name,
        });
        if (existingUser) {
            return res.status(400).json({
                field: 'name',
                message: 'Name already in use',
            });
        }


        const doc = new UserModel({
            name: req.body.name,
            email: req.body.email,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
            role: roles.user,
        })

        const user = await doc.save();

        const token = generateToken(user._id, user.name, user.role);

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to register',
        });
    }
}


export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email,
        });

        if (!user) {
            return res.status(404).json({
                field: 'email',
                message: 'User not found',
            });
        }

        const passwordValid = await bcrypt.compare(
            req.body.password,
            user.passwordHash
        );

        if (!passwordValid) {
            return res.status(401).json({
                field: 'password',
                message: 'Invalid password',
            });
        }

        const token = generateToken(user._id, user.name, user.role);


        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            field: 'email',
            message: 'Failed to login',
        });
    }
}

export const changePassword = async (req, res) => {
    try {
        const email = req.body.email;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const passwordValid = await bcrypt.compare(
            oldPassword,
            user.passwordHash
        );
        if (!passwordValid) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        user.passwordHash = hash;

        await user.save();

        res.json({message: 'Password changed successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to change password',
        });
    }
}
export const updateUser = async (req, res) => {
    try {
        const {email, name, avatarUrl} = req.body;

        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        if (avatarUrl) {
            user.avatarUrl = avatarUrl;
        } else {
            user.avatarUrl = null;
        }

        await user.save();

        res.json({message: 'User updated successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update user',
        });
    }
};

// delete user endpoint 
export const deleteUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (!email || !password) return res.status(400).json({message: 'Missing email or password'});
        if (!confirmPassword) return res.status(400).json({message: 'Missing confirm password'});
        if (password !== confirmPassword) return res.status(400).json({message: 'Passwords do not match'});

        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }


        const passwordValid = await bcrypt.compare(
            password,
            user.passwordHash
        );
        if (!passwordValid) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }

        await UserModel.deleteOne({email});

        res.json({message: 'User deleted successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to delete user',
        });
    }
}

export const getMe = async (req, res) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

        if (!token) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;

        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const loginRequired = decodedToken.role !== user.role;
        const {passwordHash, ...userData} = user._doc;

        res.json({...userData, loginRequired});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to get user'});
    }
}
