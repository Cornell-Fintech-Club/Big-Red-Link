const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
}, { timestamps: true });

// Export the schema (not the model itself)
module.exports = UserSchema;
