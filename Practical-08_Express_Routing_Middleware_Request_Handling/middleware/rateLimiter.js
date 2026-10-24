// In-Memory Rate Limiting Middleware
const requestCounts = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 50;

const rateLimiter = (req, res, next) => {
  const clientIp = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  if (!requestCounts.has(clientIp)) {
    requestCounts.set(clientIp, { count: 1, startTime: now });
    return next();
  }

  const clientData = requestCounts.get(clientIp);
  if (now - clientData.startTime > WINDOW_MS) {
    clientData.count = 1;
    clientData.startTime = now;
    return next();
  }

  clientData.count += 1;
  if (clientData.count > MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Maximum ${MAX_REQUESTS} requests per minute.`
    });
  }

  next();
};

module.exports = rateLimiter;
