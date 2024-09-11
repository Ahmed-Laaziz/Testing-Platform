const mongoose = require('mongoose');
require('dotenv').config();

const USERNAME = process.env.USERNAME_DB;
const PASSWORD = process.env.PASSWORD_DB;
const CLUSTER_URL = process.env.CLUSTER_URL;
const DB_NAME = process.env.DB_NAME;
const APP_NAME = process.env.APP_NAME;

const connectDB = async () => {
  try {
    const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority&appName=${APP_NAME}`
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB...');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    console.log('ERROR');
  }
};

module.exports = connectDB;