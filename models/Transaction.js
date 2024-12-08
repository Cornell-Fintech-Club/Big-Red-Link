const mongoose = require('mongoose');

// Define the Transaction schema
const TransactionSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  message: String,
  accepted: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

// Export the schema (not the model itself)
module.exports = TransactionSchema;
