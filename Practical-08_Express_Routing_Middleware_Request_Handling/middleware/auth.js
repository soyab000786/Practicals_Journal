// API Key / Token Authentication Middleware
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;

  // Protected paths check
  if (req.path.startsWith('/api/users/secure')) {
    if (!apiKey || apiKey !== 'secret-mern-key-2026') {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized Access',
        message: 'Invalid or missing X-API-KEY header (Use: secret-mern-key-2026)'
      });
    }
  }

  next();
};

module.exports = authenticateApiKey;
