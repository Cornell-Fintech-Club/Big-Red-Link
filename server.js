// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const connectBankDB = require('./config/db'); // Updated to support dynamic connections
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Debugging line to check the MongoDB connection URI from the environment variables
console.log('MONGO_URI_BANK_A:', process.env.MONGO_URI_BANK_A);
console.log('MONGO_URI_BANK_B:', process.env.MONGO_URI_BANK_B);
console.log('MONGO_URI_BANK_C:', process.env.MONGO_URI_BANK_C);

// Create separate connections for each bank
const bankConnections = {
  'bank-a': null,
  'bank-b': null,
  'bank-c': null,
};

// Initialize connections to all banks
const initializeConnections = async () => {
  try {
    bankConnections['bank-a'] = await connectBankDB(process.env.MONGO_URI_BANK_A);
    console.log('Connected to database: Bank A');
    bankConnections['bank-b'] = await connectBankDB(process.env.MONGO_URI_BANK_B);
    console.log('Connected to database: Bank B');
    bankConnections['bank-c'] = await connectBankDB(process.env.MONGO_URI_BANK_C);
    console.log('Connected to database: Bank C');
    console.log('Connected to all bank databases successfully.');
  } catch (err) {
    console.error('Error initializing database connections:', err.message);
    process.exit(1); // Exit on error
  }
};

// After calling initializeConnections and printing Bank Connections:
initializeConnections();
console.log('Bank Connections:', bankConnections);

// Make the bank connections available throughout the app
app.set('bankConnections', bankConnections);

app.use('/api/cross-bank/transactions', require('./routes/transactions'));

console.log("Cross-bank transactions route mounted");

// Existing middleware for bank-specific routes
app.use((req, res, next) => {
  console.log('Base URL:', req.baseUrl);
  console.log('Full URL:', req.originalUrl);

  // Check if the URL matches the pattern for bank routes
  const match = req.originalUrl.match(/\/api\/(bank-[a-c])\//); // Match bank-a, bank-b, bank-c
  const bank = match ? match[1] : null;

  console.log('Extracted Bank Identifier:', bank);

  // If the request is not for a bank-specific route, skip database logic
  if (!bank) {
    return next();
  }

  // Assign the correct database connection
  req.dbConnection = bankConnections[bank];
  if (!req.dbConnection) {
    return res.status(404).json({ error: `Bank ${bank} not found` });
  }

  next();
});

// Set up routes dynamically for each bank
['bank-a', 'bank-b', 'bank-c'].forEach((bank) => {
  app.use(`/api/${bank}/users`, userRoutes);
  app.use(`/api/${bank}/transactions`, transactionRoutes);
});

// Default Home Route
app.get('/', (req, res) => {
  res.send('Welcome to BigRedLink Multi-Bank Backend (Node.js + Express)');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
