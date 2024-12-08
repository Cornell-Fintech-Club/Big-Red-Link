// Import necessary dependencies and modules
const bcrypt = require('bcryptjs'); // For password hashing

// Register User
const registerUser = async (req, res, dbConnection) => {
  const User = dbConnection.model('User', require('../models/User')); // Dynamically load User model
  try {
    const { first_name, last_name, username, password, balance } = req.body;

    // Check if the username already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    user = new User({
      first_name,
      last_name,
      username,
      password: hashedPassword,
      balance,
    });
    await user.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User
const loginUser = async (req, res, dbConnection) => {
  const User = dbConnection.model('User', require('../models/User')); // Dynamically load User model
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user_id: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deposit Money
const depositMoney = async (req, res, dbConnection) => {
  const User = dbConnection.model('User', require('../models/User')); // Dynamically load User model
  try {
    const { user_id, amount } = req.body;

    // Validate the deposit amount
    if (amount <= 0) {
      return res.status(400).json({ error: 'Deposit amount must be greater than zero' });
    }

    // Find the user and update their balance
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.balance += amount;
    await user.save();

    res.status(200).json({
      message: `Successfully deposited $${amount.toFixed(2)}. New balance: $${user.balance.toFixed(2)}.`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Withdraw Money
const withdraw = async (req, res, dbConnection) => {
  const User = dbConnection.model('User', require('../models/User')); // Dynamically load User model
  try {
    const { user_id, amount } = req.body;

    // Find the user by ID
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user has sufficient funds
    if (user.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    // Deduct the amount from the user's balance
    user.balance -= amount;
    await user.save();

    res.status(200).json({
      message: `Successfully withdrew $${amount.toFixed(2)}. Remaining balance: $${user.balance.toFixed(2)}.`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User Balance
const getUserBalance = async (req, res, dbConnection) => {
  const User = dbConnection.model('User', require('../models/User')); // Dynamically load User model
  try {
    const { user_id } = req.params;

    // Find the user by ID
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all controller functions
module.exports = {
  registerUser,
  loginUser,
  depositMoney,
  withdraw,
  getUserBalance,
};
