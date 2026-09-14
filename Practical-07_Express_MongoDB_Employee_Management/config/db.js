const mongoose = require('mongoose');

/**
 * Connect to MongoDB / MongoDB Atlas using Mongoose
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });

    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    console.log(`📂 Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log(`💡 Tip: Make sure your MongoDB Atlas connection string in .env is correct and your IP address is whitelisted in Atlas Network Access.`);
  }
};

module.exports = connectDB;
