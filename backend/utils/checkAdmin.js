export default (req, res, next) => {
    const adminToken = process.env.ADMIN_TOKEN;
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token === adminToken) {
        next();
    } else {
        return res.status(403).json({
            message: 'Unauthorized',
        })
    }
};