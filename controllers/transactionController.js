// Import necessary models for transactions and users
// These models are used to interact with the MongoDB collections that store user and transaction data.
// transactionController.js
const UserSchema = require('../models/User'); 
const TransactionSchema = require('../models/Transaction');

const sendMoney = async (req, res) => {
  try {
    const { sender_bank, sender_id, receiver_bank, receiver_username, amount } = req.body;
    
    // Retrieve the correct database connections
    const senderConnection = req.app.get('bankConnections')[sender_bank];
    const receiverConnection = req.app.get('bankConnections')[receiver_bank];
    
    if (!senderConnection || !receiverConnection) {
      return res.status(404).json({ error: 'Invalid sender or receiver bank specified' });
    }
    
    // Load User models for each bank
    const SenderUser = senderConnection.model('User', UserSchema);
    const ReceiverUser = receiverConnection.model('User', UserSchema);
    
    // Fetch sender and receiver from their respective banks
    const sender = await SenderUser.findById(sender_id);
    const receiver = await ReceiverUser.findOne({ username: receiver_username });
    
    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or receiver not found' });
    }
    
    // Check for sufficient balance in sender’s account
    if (sender.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }
    
    // Deduct from sender and add to receiver
    sender.balance -= amount;
    receiver.balance += amount;
    
    // Save changes in their respective databases
    await sender.save();
    await receiver.save();
    
    // Store the transaction in the sender's bank DB
    const Transaction = senderConnection.model('Transaction', TransactionSchema);
    
    const transaction = new Transaction({
      sender_id: sender._id,
      receiver_id: receiver._id,
      amount,
      message: 'Cross-bank transfer',
      accepted: true
    });
    
    await transaction.save();
    
    res.status(200).json({ success: true, transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getUserTransactions = async (req, res) => {
  try {
    // Get the user_id from the route parameters
    const user_id = req.params.user_id;

    // Get the database connection from the request
    const dbConnection = req.dbConnection;
    if (!dbConnection) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    // Dynamically load the Transaction model from the dbConnection
    const Transaction = dbConnection.model('Transaction', TransactionSchema);

    // Find all transactions involving the specified user ID, either as the sender or receiver
    const transactions = await Transaction.find({
      $or: [{ sender_id: user_id }, { receiver_id: user_id }],
    });

    // If no transactions are found, return a not found response
    if (transactions.length === 0) {
      return res.status(404).json({ error: 'No transactions found' });
    }

    // Send back the transactions if found
    res.status(200).json({ transactions });
  } catch (error) {
    // Handle errors by sending a server error response
    res.status(500).json({ error: error.message });
  }
};

// do the same for createTransaction if it also references Transaction directly:
const createTransaction = async (req, res) => {
  try {
    const dbConnection = req.dbConnection;
    if (!dbConnection) {
      return res.status(500).json({ error: 'Database connection not available' });
    }

    const Transaction = dbConnection.model('Transaction', TransactionSchema);

    const { sender_id, receiver_id, amount, message, accepted } = req.body;

    const transaction = new Transaction({
      sender_id,
      receiver_id,
      amount,
      message,
      accepted: accepted || false,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Export all the functions from this file for use in the route handlers
// The functions `sendMoney`, `createTransaction`, and `getUserTransactions` are exported to be used by routes.
module.exports = {
  sendMoney,
  createTransaction,
  getUserTransactions,
};
