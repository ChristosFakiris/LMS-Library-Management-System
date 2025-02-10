
const jwt = require('jsonwebtoken');

module.exports = (role) => (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    if (role && decoded.role !== role) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};