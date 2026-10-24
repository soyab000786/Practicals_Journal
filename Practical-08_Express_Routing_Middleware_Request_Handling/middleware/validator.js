// Request Body and Parameter Sanitization & Validation Middleware
const validateUserPayload = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { name, email, role } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Field "name" is required and must be at least 2 characters.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'A valid "email" address is required.'
      });
    }

    const allowedRoles = ['admin', 'developer', 'student', 'guest'];
    if (role && !allowedRoles.includes(role.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: `Role must be one of: ${allowedRoles.join(', ')}`
      });
    }
  }

  next();
};

module.exports = validateUserPayload;
