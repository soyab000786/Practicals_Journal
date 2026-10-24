// Custom Request Logging Middleware
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, originalUrl, ip } = req;
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    const color = statusCode >= 400 ? '\x1b[31m' : statusCode >= 300 ? '\x1b[33m' : '\x1b[32m';
    console.log(`[${timestamp}] ${method} ${originalUrl} ${color}${statusCode}\x1b[0m - ${duration}ms (IP: ${ip})`);
  });

  next();
};

module.exports = requestLogger;
