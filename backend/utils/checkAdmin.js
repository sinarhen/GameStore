export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            message: 'Allowed only for admin',
        })
    }
};