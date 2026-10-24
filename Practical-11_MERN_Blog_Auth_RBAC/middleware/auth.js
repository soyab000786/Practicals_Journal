const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'mern_rbac_secret_key_2026';

// Verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access Denied: Missing Authentication Token' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ success: false, message: 'Invalid or Expired Token' });
  }
};

// Check User Roles (RBAC)
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Role '${req.user ? req.user.role : 'None'}' is not authorized. Required: ${allowedRoles.join(', ')}`
      });
    }
    next();
  };
};

module.exports = { verifyToken, requireRole };
