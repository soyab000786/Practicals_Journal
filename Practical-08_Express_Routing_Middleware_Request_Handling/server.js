const express = require('express');
const cors = require('cors');
const path = require('path');
const requestLogger = require('./middleware/logger');
const authenticateApiKey = require('./middleware/auth');
const rateLimiter = require('./middleware/rateLimiter');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middleware Pipeline
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(rateLimiter);
app.use(authenticateApiKey);

// Static frontend serving
app.use(express.static(path.join(__dirname)));

// Route Mounts
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    practical: 'Practical 08: Routing, Middleware & Request Handling',
    author: 'Saiyad Soyab (26084231040)'
  });
});

// 404 Route Handler Middleware
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[Error Pipeline]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.name || 'Internal Server Error',
    message: err.message || 'Something went wrong on the server!'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Practical 08: Express Routing & Middleware Server`);
  console.log(` Running on: http://localhost:${PORT}`);
  console.log(` Student: Saiyad Soyab | Enrollment: 26084231040`);
  console.log(`=======================================================`);
});

module.exports = app;
