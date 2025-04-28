const express = require('express');
const router = express.Router();
const { register, login, getAllUsers } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/users', authMiddleware, getAllUsers);
router.post('/register', register);
router.post('/login', login);

module.exports = router;