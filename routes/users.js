// Importing Express to create a router instance
const express = require('express');

// Importing user controller functions
// These functions are defined in userController.js and handle the logic for each route.
const { registerUser, loginUser, depositMoney, withdraw, getUserBalance } = require('../controllers/userController');

// Creating a new Express router
// A router allows us to define paths and link them to specific logic or middleware.
const router = express.Router();

/**
 * @route POST /api/users/register
 * @description Register a new user
 * @access Public
 * This route is used to register a new user. It calls the `registerUser` function from the user controller.
 */
router.post('/register', registerUser);

/**
 * @route POST /api/users/login
 * @description Login user
 * @access Public
 * This route allows a user to log in with their username and password. It calls the `loginUser` function from the user controller.
 */
router.post('/login', loginUser);

/**
 * @route POST /api/users/deposit
 * @description Deposit money into user account
 * @access Public
 * This route allows a user to deposit money into their account. It calls the `depositMoney` function from the user controller.
 */
router.post('/deposit', depositMoney);

/**
 * @route POST /api/users/withdraw
 * @description Withdraw money from user account
 * @access Public
 * This route allows a user to withdraw money from their account. It calls the `withdraw` function from the user controller.
 */
router.post('/withdraw', withdraw);

/**
 * @route GET /api/users/balance/:user_id
 * @description Get the balance of a user
 * @access Public
 * This route retrieves the balance for a specific user based on their user ID. It calls the `getUserBalance` function from the user controller.
 */
router.get('/balance/:user_id', getUserBalance);

router.get('/all', getAllUsers);

// Exporting the router so it can be used in server.js
// The router will handle any requests to the `/api/users` path.
module.exports = router;
