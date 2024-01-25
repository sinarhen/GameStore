import UserModel from '../models/User.js'

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to get users' });
    }
};

export const deleteUserForAdmin = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await UserModel.findByIdAndDelete(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};