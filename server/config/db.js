const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL 

// Function to connect
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1); 
  }
};

module.exports = connectDB;
