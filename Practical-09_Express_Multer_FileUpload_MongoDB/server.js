const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern_file_uploads';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully for File Metadata storage.'))
  .catch(err => console.log('MongoDB connection warning (running with in-memory fallback):', err.message));

// Routes
app.use('/api/files', fileRoutes);

// Multer error handling middleware
app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ success: false, error: 'File Too Large', message: 'Maximum file size allowed is 5 MB.' });
  }
  res.status(err.status || 500).json({ success: false, error: err.name, message: err.message });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Practical 09: Multer File Upload & MongoDB Server`);
  console.log(` Server running on: http://localhost:${PORT}`);
  console.log(` Student: Saiyad Soyab | Enrollment: 26084231040`);
  console.log(`=======================================================`);
});

module.exports = app;
