const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdminOnce } = require('../controllers/authController');

router.post('/login', loginAdmin);
router.post('/register', registerAdminOnce); // Use once to seed admin account

module.exports = router;