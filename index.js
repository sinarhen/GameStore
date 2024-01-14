// Import necessary packages
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { register, login } from './controllers/UserController.js';

dotenv.config();


// Connect to MongoDB
mongoose.connect(process.env.DBCONN_STRING);

// Set up routes
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());


// Import routes
app.post("/auth/register", register)
app.post("/auth/login", login)


// Start the server
app.listen(PORT, (err) => console.log(err || `Server running on port ${PORT}`));