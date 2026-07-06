const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');         // For enabling CORS (Cross-Origin Resource Sharing) to allow frontend to access backend API
const connectDB = require('./connection/mongoDB'); // Import the connectDB function from mongoDB.js
const userModel = require('./model/users'); // Import the user model
const { handleCreateUser, handleGetUsers, handleGetUserById, handleUpdateUser, handleDeleteUser} = require('./routes/routes'); // Import the route handlers


// Connect to MongoDB
connectDB();


const app = express();

// Middlewares
app.use(cors());           // For using backend API in frontend
app.use(express.json());   // For parsing JSON data in request body


app.post('/create-user', handleCreateUser); // Route for creating a new user
app.get('/users', handleGetUsers); // Route for getting all users
app.get('/users/:id', handleGetUserById); // Route for getting a single user
app.put('/users/:id', handleUpdateUser); // Route for updating a user
app.delete('/users/:id', handleDeleteUser); // Route for deleting a user


  const port = 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });