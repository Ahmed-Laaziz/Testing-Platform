const express = require('express');
var path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./database/db');

var authRouter = require('./routes/authentication/authenticationRouter');
var userRouter = require('./routes/users/userRouter');
var assetRouter = require('./routes/elements/assetRouter');
var caseRouter = require('./routes/elements/caseRouter');
var orderRouter = require('./routes/elements/orderRouter');
var ciRouter = require('./routes/elements/ciRouter');
var accountRouter = require('./routes/elements/accountRouter');

// PERSONAS

const processRoutes = require('./routes/personas/processRouter');
const functionalityRoutes = require('./routes/personas/functionalityRouter');
const subFunctionalityRoutes = require('./routes/personas/subFunctionalityRouter');
const personaRoutes = require('./routes/personas/personaRouter');

const app = express();

// Connect to the database when the app starts
connectDB();

app.set('views', path.join(__dirname, 'views'));

// Enable CORS middleware production
app.use(cors(
  {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true
}
));

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/assets', assetRouter);
app.use('/cases', caseRouter);
app.use('/orders', orderRouter);
app.use('/cis', ciRouter);
app.use('/accounts', accountRouter);

// Personas Routes
app.use('/processes', processRoutes);
app.use('/functionalities', functionalityRoutes);
app.use('/subFunctionalities', subFunctionalityRoutes);
app.use('/personas', personaRoutes);


// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  