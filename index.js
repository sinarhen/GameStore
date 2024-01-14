// Import necessary packages
import express from 'express';
import mongoose from 'mongoose';
import product from './models/Product.js';
import dotenv from 'dotenv';
dotenv.config();



// Connect to MongoDB
// mongoose.connect(process.env.DBCONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

// Set up routes
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());



// app.use('/auth', /* routes for authController */);
// app.use('/categories', /* routes for categoryController */);
// app.use('/products', /* routes for productController */);



// Start the server
app.listen(PORT, () => console.log('Server started on port 3000'));