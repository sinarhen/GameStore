import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            name: req.body.name,
            email: req.body.email,
            passwordHash: hash,
        })

        const user = await doc.save();

        const token = generateToken(user._id, user.name);

        const { passwordHash, ...userData } = user._doc;

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
                message: 'User not found',
            });
        }

        const passwordValid = await bcrypt.compare(
            req.body.password,
            user.passwordHash
        );

        if (!passwordValid) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }

        const token = generateToken(user._id, user.name); 


        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to login',
        });
    }
}

export const changePassword = async (req, res) => {
    try {
        const email = req.body.email;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        const user = await UserModel.findOne({ email });
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

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to change password',
        });
    }
}

export const changeEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const newEmail = req.body.newEmail;
        const password = req.body.password;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            })
        }

        const passwordValid = await bcrypt.compare(
            password,
            user.passwordHash
        );
        if (!passwordValid) {
            return res.status(401).json({
                message: 'Invalid credentials',
            })
        }

        user.email = newEmail;

        await user.save();

        res.json({ message: 'Email changed successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to change email',
        })
    }
}

// delete user endpoint 
export const deleteUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        
        if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });
        if (!confirmPassword) return res.status(400).json({ message: 'Missing confirm password' });
        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

        const user = await UserModel.findOne({ email });
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

        await UserModel.deleteOne({ email });

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to delete user',
        });
    }
}