import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';


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

        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRET,
            {
                // Expires in 30 days in timestamp unix format
                expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 30,
            }
        );

        const { passwordHack, ...userData } = user._doc;

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
