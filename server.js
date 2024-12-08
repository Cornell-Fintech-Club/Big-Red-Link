// Load environment variables from a .env file into process.env
require('dotenv').config();  // This must be at the very top of server.js to load environment variables before any other code runs.

// Import required modules
const express = require('express'); // Importing Express framework to create the server
const cors = require('cors'); // Importing CORS for handling cross-origin requests
const connectDB = require('./config/db');  // Import the database connection function from db.js

// Importing route handlers
const userRoutes = require('./routes/users'); // Routes for user-related operations (register, login, etc.)
const transactionRoutes = require('./routes/transactions'); // Routes for transaction-related operations

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 8000; // Define the port to run the server, using environment variable PORT if available, otherwise default to 8000

// Middleware
/**
 * CORS Middleware:
 * CORS (Cross-Origin Resource Sharing) allows resources to be requested from another domain.
 * This is useful for enabling the frontend (on a different URL) to communicate with this backend.
 */
app.use(cors());

/**
 * Body Parser Middleware:
 * Parses incoming JSON requests and puts the parsed data in req.body.
 * This allows us to easily access JSON data sent in the request body.
 */
app.use(express.json());

// Debugging line to check the MongoDB connection URI from the environment variables
console.log('MONGO_URI_BANK_A:', process.env.MONGO_URI_BANK_A);
console.log('MONGO_URI_BANK_B:', process.env.MONGO_URI_BANK_B);
console.log('MONGO_URI_BANK_C:', process.env.MONGO_URI_BANK_C);

// Establish the connection to MongoDB
connectDB(); // This function connects to the MongoDB database using the provided URI

// Set up routes
/**
 * User Routes:
 * Prefixes all user-related routes with `/api/users`.
 * The userRoutes handles endpoints like `/api/users/register`, `/api/users/login`, etc.
 */
app.use('/api/users', userRoutes);

/**
 * Transaction Routes:
 * Prefixes all transaction-related routes with `/api/transactions`.
 * The transactionRoutes handles endpoints like `/api/transactions/send`, `/api/transactions`, etc.
 */
app.use('/api/transactions', transactionRoutes);

/**
 * Default Home Route:
 * Provides a simple response to verify the backend server is running.
 * When a GET request is made to the root URL (`/`), it returns a welcome message.
 */
app.get('/', (req, res) => {
  res.send('Welcome to BigRedLink Backend (Node.js + Express)');
});

// Start the server
/**
 * app.listen() starts the server, listening on the specified PORT.
 * The callback function logs a message to the console indicating the server is running and on which port.
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
