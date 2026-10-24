const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern_integration_db';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MERN Backend connected to MongoDB Atlas.'))
  .catch(err => console.log('MongoDB Atlas connection note (In-memory fallback active):', err.message));

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Practical 10: Complete MERN FullStack Server Running`);
  console.log(` Server URL: http://localhost:${PORT}`);
  console.log(` Student: Saiyad Soyab | Enrollment: 26084231040`);
  console.log(`=======================================================`);
});

module.exports = app;
