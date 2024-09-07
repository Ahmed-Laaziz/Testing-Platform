const express = require('express');
var path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./database/db');

var authRouter = require('./routes/authentication/authenticationRouter');
var userRouter = require('./routes/users/userRouter');
const app = express();

// Connect to the database when the app starts
connectDB();

app.set('views', path.join(__dirname, 'views'));

// Enable CORS middleware production
app.use(cors(
  {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}
));

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter)
// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  