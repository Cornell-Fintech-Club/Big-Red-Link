const { dbConnections } = require('./config/db');

// Middleware to determine the bank and attach the database connection
const bankSelector = (req, res, next) => {
  const bank = req.header('X-Bank'); // Use a custom header to specify the bank
  if (!bank) {
    return res.status(400).json({ error: 'Bank header is required' });
  }

  // Select the database connection based on the bank
  const dbConnection = dbConnections[`db${bank}`];
  if (!dbConnection) {
    return res.status(400).json({ error: 'Invalid bank specified' });
  }

  req.db = dbConnection; // Attach the selected database connection to the request object
  next();
};

module.exports = bankSelector;
