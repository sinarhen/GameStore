// Import necessary packages
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRouter from './routers/apiRouter.js';

dotenv.config();


// Connect to MongoDB
mongoose.connect(process.env.DBCONN_STRING)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

// Set up routes
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());


// Import routes
app.use('/api', apiRouter);


// Start the server
app.listen(PORT, (err) => console.log(err || `Server running on port ${PORT}`));