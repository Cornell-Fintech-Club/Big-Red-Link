// Import necessary models for transactions and users
// These models are used to interact with the MongoDB collections that store user and transaction data.
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Function to send money from one user to another
// The `sendMoney` function handles transferring funds between two users.
const sendMoney = async (req, res) => {
  try {
    const { sender_id, receiver_username, amount } = req.body;

    // Find both the sender and receiver in the database
    // The `sender` is found using their unique `_id`, and the `receiver` is found using their username.
    const sender = await User.findById(sender_id);
    const receiver = await User.findOne({ username: receiver_username });

    // If either user is not found, return an error
    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Sender or Receiver not found' });
    }

    // Check if the sender has enough funds to proceed with the transaction
    if (sender.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    // Update sender and receiver balances
    sender.balance -= amount;
    receiver.balance += amount;

    // Save the updated balances to the database
    await sender.updateOne({ balance: sender.balance });
    await receiver.updateOne({ balance: receiver.balance });

    // Log the transaction by creating a new entry in the Transaction model
    const transaction = new Transaction({
      sender_id,
      receiver_id: receiver._id,
      amount,
      message: 'Transfer',
      accepted: true,
    });

    // Save the transaction to the database
    await transaction.save();
    res.status(200).json({ success: true, transaction });
  } catch (error) {
    // Handle errors by sending a server error response
    res.status(500).json({ error: error.message });
  }
};

// Function to create a new transaction
// The `createTransaction` function allows creating a transaction log between users.
const createTransaction = async (req, res) => {
  try {
    const { sender_id, receiver_id, amount, message, accepted } = req.body;

    // Create a new transaction with the provided data
    const transaction = new Transaction({
      sender_id,
      receiver_id,
      amount,
      message,
      accepted: accepted || false,  // If 'accepted' is not provided, default it to `false`
    });

    // Save the transaction to the database
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    // Handle errors by sending a server error response
    res.status(500).json({ error: error.message });
  }
};

// Function to get all transactions for a specific user
// The `getUserTransactions` function fetches all transactions related to a user, either as a sender or receiver.
const getUserTransactions = async (req, res) => {
  try {
    const user_id = req.params.user_id;

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

// Export all the functions from this file for use in the route handlers
// The functions `sendMoney`, `createTransaction`, and `getUserTransactions` are exported to be used by routes.
module.exports = {
  sendMoney,
  createTransaction,
  getUserTransactions,
};
