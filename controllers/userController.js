// Import necessary dependencies and user model
// User model is used to interact with the MongoDB collection that stores user data, and bcrypt is used for password hashing.
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Function to register a new user
// The `registerUser` function handles creating a new user with hashed password.
const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, username, password, balance } = req.body;

    // Check if a user with the provided username already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the user's password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user object with the provided details
    user = new User({
      first_name,
      last_name,
      username,
      password: hashedPassword,
      balance,
    });

    // Save the new user to the database
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    // Handle errors by sending a server error response
    res.status(500).json({ error: error.message });
  }
};

// Function to log in an existing user
// The `loginUser` function verifies user credentials and allows them to log in.
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Generate a response indicating successful login
    res.status(200).json({ message: 'Login successful', user_id: user._id });
  } catch (error) {
    // Handle errors by sending a server error response
    res.status(500).json({ error: error.message });
  }
};

// Function to deposit money into a user's account
// The `depositMoney` function updates the user's balance by adding the specified amount.
const depositMoney = async (req, res) => {
  try {
    const { user_id, amount } = req.body;

    // Validate that the deposit amount is greater than zero
    if (amount <= 0) {
      return res.status(400).json({ error: 'Deposit amount must be greater than zero' });
    }

    // Find the user by their ID and update their balance
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.balance += amount;
    await user.save();

    res.status(200).json({ message: `Successfully deposited $${amount.toFixed(2)}. New balance: $${user.balance.toFixed(2)}.` });
  } catch (error) {
    // Handle errors by sending a server error response
    res.status(500).json({ error: error.message });
  }
};

// Function to withdraw money from a user's account
// The `withdraw` function deducts a specified amount from the user's balance.
const withdraw = async (req, res) => {
  try {
    const { user_id, amount } = req.body;

    // Find the user by their ID
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Ensure that the user has enough funds for the withdrawal
    if (user.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    // Deduct the specified amount from the user's balance
    user.balance -= amount;
    await user.save();

    res.status(200).json({ message: `Successfully withdrew $${amount}. Remaining balance: $${user.balance}` });
  } catch (error) {
    // Handle errors by sending a server error response
    res.status(500).json({ error: error.message });
  }
};

// Function to get the balance of a specific user
// The `getUserBalance` function returns the current balance of the specified user.
const getUserBalance = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find the user by their ID and return their balance
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ balance: user.balance });
  } catch (error) {
    // Handle errors by sending a server error response
    res.status(500).json({ error: error.message });
  }
};

// Export all the functions to be used in route handlers
// The functions `registerUser`, `loginUser`, `depositMoney`, `withdraw`, and `getUserBalance` are exported for use by routes.
module.exports = {
  registerUser,
  loginUser,
  depositMoney,
  withdraw,
  getUserBalance, 
};
