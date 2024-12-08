const express = require('express');
const { registerUser, loginUser, depositMoney, withdraw, getUserBalance } = require('../controllers/userController');

const router = express.Router();

// Wrap each route to dynamically use req.dbConnection
const withDatabase = (controller) => async (req, res) => {
  try {
    if (!req.dbConnection) {
      return res.status(500).json({ error: 'Database connection not found' });
    }
    await controller(req, res, req.dbConnection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Updated routes to use the `withDatabase` wrapper
router.post('/register', withDatabase(registerUser));
router.post('/login', withDatabase(loginUser));
router.post('/deposit', withDatabase(depositMoney));
router.post('/withdraw', withDatabase(withdraw));
router.get('/balance/:user_id', withDatabase(getUserBalance));

module.exports = router;
