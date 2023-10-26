require('dotenv').config();
const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
// Access the JWT secret key from the environment variable
const secretKey = process.env.SECRET_KEY;
router.post('/signup',authController.registerUser);

router.post('/login', authController.signinUser);

module.exports = router;
