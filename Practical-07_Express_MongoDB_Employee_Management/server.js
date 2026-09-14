require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`[MongoDB API] ${req.method} ${req.originalUrl} - ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

// Welcome / Health Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Practical 07: Employee Management API with Express & MongoDB Atlas',
    endpoints: {
      getAllEmployees: 'GET /api/employees',
      getEmployeeByIdOrEmpId: 'GET /api/employees/:id',
      createEmployee: 'POST /api/employees',
      updateEmployee: 'PUT /api/employees/:id',
      deleteEmployee: 'DELETE /api/employees/:id',
      departmentAnalytics: 'GET /api/employees/stats/summary'
    }
  });
});

// Mount Routes
app.use('/api/employees', employeeRoutes);

// Fallback 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found on this Employee Management API.`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`💼 Practical 07: Employee Management API`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`📡 Endpoints at: http://localhost:${PORT}/api/employees`);
  console.log(`🗄️ MongoDB URI: ${process.env.MONGO_URI ? 'Loaded from .env' : 'Not Provided'}`);
  console.log(`=================================================`);
});
