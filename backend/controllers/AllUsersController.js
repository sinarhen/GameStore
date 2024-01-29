import UserModel from '../models/User.js'

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to get users'});
    }
};

export const deleteUserForAdmin = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        await user.remove();
        res.json({message: 'User deleted successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to delete user'});
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const userId = req.params.userId;
        const {role} = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        } else if (!role) {
            return res.status(400).json({message: 'Missing role'});
        } else if (role !== 'admin' && role !== 'user') {
            return res.status(400).json({message: 'Invalid role'});
        }
        user.role = role;
        await user.save();
        res.json({message: 'User status updated successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Failed to update user status'});
    }
};