import jwt from 'jsonwebtoken';

export const generateToken = (userId, username, role) => jwt.sign(
    {
        _id: userId,
        username: username,
        role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days 
    }
);