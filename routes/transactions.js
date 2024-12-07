// Importing Express to create a router instance
const express = require('express');

// Importing transaction controller functions
// These functions are defined in transactionController.js and handle the logic for each route.
const {
  sendMoney,
  createTransaction,
  getUserTransactions,
} = require('../controllers/transactionController');

// Creating a new Express router
// A router allows us to define paths and link them to specific logic or middleware.
const router = express.Router();

/**
 * @route POST /api/transactions/send
 * @description Send money between users
 * @access Public
 * This route is used to send money from one user to another.
 * It calls the `sendMoney` function from the transaction controller.
 */
router.post('/send', sendMoney);

/**
 * @route POST /api/transactions
 * @description Create a new transaction
 * @access Public
 * This route is used to create a new transaction and log it.
 * It calls the `createTransaction` function from the transaction controller.
 */
router.post('/', createTransaction);

/**
 * @route GET /api/transactions/:user_id
 * @description Get transactions for a specific user
 * @access Public
 * This route retrieves all transactions involving a specific user (either as sender or receiver).
 * It calls the `getUserTransactions` function from the transaction controller.
 */
router.get('/:user_id', getUserTransactions);

// Exporting the router so it can be used in server.js
// The router will handle any requests to the `/api/transactions` path.
module.exports = router;
