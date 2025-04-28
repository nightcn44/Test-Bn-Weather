const express = require('express');
const router = express.Router();
const { register, login, list } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/ur', authMiddleware, list);
router.post('/register', register);
router.post('/login', login);

module.exports = router;