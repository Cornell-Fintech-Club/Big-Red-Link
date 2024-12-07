// Import Mongoose for database connection
// Mongoose is a popular MongoDB library for Node.js that helps in connecting and managing a MongoDB database.
const mongoose = require('mongoose');

// Create an async function to connect to MongoDB
// The `connectDB` function is responsible for establishing a connection to the MongoDB database.
// This is defined as an async function since connecting to a database is an asynchronous operation.
const connectDB = async () => {
  try {
    // Connecting to MongoDB using the URI from environment variables.
    // The `MONGO_URI` is stored in the `.env` file to keep sensitive information secure.
    await mongoose.connect(process.env.MONGO_URI); // Removed deprecated options
    console.log('MongoDB connected successfully.');
  } catch (err) {
    // Log an error message if the connection fails.
    console.error('MongoDB connection failed:', err.message);
    // Exit the process if unable to connect to MongoDB.
    // Exiting with code `1` indicates an error occurred, whereas `0` is used for a successful exit.
    process.exit(1);
  }
};

// Export the connectDB function for use in other files.
// This allows the `connectDB` function to be imported and used in other parts of the application (e.g., `server.js`).
module.exports = connectDB;
