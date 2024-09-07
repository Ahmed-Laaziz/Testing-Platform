const mongoose = require('mongoose');

const USERNAME = "laazizahmed72"
const PASSWORD = "QAautomation"
const CLUSTER_URL = "cluster0.pup91.mongodb.net"
const DB_NAME = "Testing_Platform_DB"
const APP_NAME = "Cluster0"

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