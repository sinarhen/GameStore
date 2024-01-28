import {roles} from '../utils/roles.js';

export default (req, res, next) => {
    if (req.role === roles.admin) {
        next();
    } else {
        return res.status(403).json({
            message: 'Allowed only for admin',
        })
    }
};