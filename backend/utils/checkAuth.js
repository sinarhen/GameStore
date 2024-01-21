import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  console.log("Checking auth with header: " + req.headers.authorization);
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  console.log(token ? "Token exists" : "Token does not exist");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: 'Unauthorized',
      });
    }
  } else {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};