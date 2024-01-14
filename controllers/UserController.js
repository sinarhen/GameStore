import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';
import { generateToken } from '../utils/jwt.js';



export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        var existingUser = await UserModel.findOne({
            email: req.body.email,
        })
        if (existingUser){
            return res.status(400).json({
                message: 'User with such email already exists',
            });
        }

        existingUser = await UserModel.findOne({
            name: req.body.name,
        })
        if (existingUser){
            return res.status(400).json({
                message: 'User with such name already exists',
            });
        }


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

