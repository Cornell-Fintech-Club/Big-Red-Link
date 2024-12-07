// Importing mongoose to define the schema for the Transaction model
// Mongoose is used to interact with the MongoDB database.
const mongoose = require('mongoose');

// Defining the schema for a Transaction
// The `TransactionSchema` defines the structure of a document within the "transactions" collection.
const TransactionSchema = new mongoose.Schema({
  // Field to store the sender's user ID
  sender_id: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId references another document (i.e., User)
    ref: 'User', // Specifies that the reference is to the User model
    required: true, // This field is required
  },
  
  // Field to store the receiver's user ID
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId references another document (i.e., User)
    ref: 'User', // Specifies that the reference is to the User model
    required: true, // This field is required
  },
  
  // Field to store the transaction amount
  amount: {
    type: Number, // Data type is a number
    required: true, // This field is required
  },
  
  // Optional field for a transaction message (e.g., transfer description)
  message: String, // Data type is a string, not required
  
  // Field to indicate if the transaction has been accepted
  accepted: {
    type: Boolean, // Data type is boolean (true/false)
    default: false, // Default value is false
  },
  
  // Field for the timestamp of the transaction creation
  timestamp: {
    type: Date, // Data type is Date
    default: Date.now, // Default value is the current date and time when the document is created
  },
}, { timestamps: true }); // This option automatically adds `createdAt` and `updatedAt` timestamps to the schema

// Exporting the Transaction model
// `mongoose.model()` creates a model from the schema and connects it to the "transactions" collection in the MongoDB database.
module.exports = mongoose.model('Transaction', TransactionSchema);
