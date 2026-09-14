const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Home route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Practical 06: RESTful APIs for Student Records Management',
    endpoints: {
      getAllStudents: 'GET /api/students',
      getStudentByIdOrRoll: 'GET /api/students/:id',
      createStudent: 'POST /api/students',
      updateStudent: 'PUT /api/students/:id',
      deleteStudent: 'DELETE /api/students/:id',
      getOverviewStats: 'GET /api/students/stats/overview'
    },
    postmanCollection: 'Student_Records_API.postman_collection.json'
  });
});

app.use('/api/students', studentRoutes);

// Fallback 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource ${req.originalUrl} not found on this server.`
  });
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🎓 Practical 06: Student Records REST API Server`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`📡 Base API Endpoint: http://localhost:${PORT}/api/students`);
  console.log(`📮 Postman Collection ready in project folder`);
  console.log(`=================================================`);
});
