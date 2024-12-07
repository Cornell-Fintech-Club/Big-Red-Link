// Importing mongoose to define the schema for the User model
// Mongoose helps in connecting to the MongoDB database and managing data.
const mongoose = require('mongoose');

// Defining the schema for a User
// The `UserSchema` defines the structure of a document within the "users" collection.
const UserSchema = new mongoose.Schema({
  // Field to store the user's first name
  first_name: {
    type: String, // Data type is a string
    required: true, // This field is required
  },
  
  // Field to store the user's last name
  last_name: {
    type: String, // Data type is a string
    required: true, // This field is required
  },
  
  // Field to store the user's username (unique identifier)
  username: {
    type: String, // Data type is a string
    required: true, // This field is required
    unique: true, // Ensures that each username is unique in the collection
  },
  
  // Field to store the user's hashed password
  password: {
    type: String, // Data type is a string
    required: true, // This field is required
  },
  
  // Field to store the user's account balance
  balance: {
    type: Number, // Data type is a number
    default: 0, // Default value is 0 if no value is provided
  },
}, { timestamps: true }); // This option automatically adds `createdAt` and `updatedAt` timestamps to the schema

// Exporting the User model
// `mongoose.model()` creates a model from the schema and connects it to the "users" collection in the MongoDB database.
module.exports = mongoose.model('User', UserSchema);
