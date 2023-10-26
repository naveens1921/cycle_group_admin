require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const dbPool = require('../config/db'); // Import the dbPool
const bcrypt = require('bcrypt');

// Access the JWT secret key from the environment variable
const secretKey = process.env.SECRET_KEY;


async function registerUser(req, res) {
  const { username, password } = req.body;
  try {
    if (!username) {
      return res.status(500).json({ message: 'Username Required' });
    }
    if (!password) {
      return res.status(500).json({ message: 'Password Required' });
    }
    const connection = await dbPool.getConnection();
    const existingUser = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    connection.release();
    if (existingUser.length > 0) {
      res.status(400).json({ message: 'Username already exists' });
    } else {
      const connection = await dbPool.getConnection();
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
      const userId = result[0].insertId;
      connection.release();

      const token = jwt.sign({ id: userId, username: username }, secretKey, { expiresIn: '1h' });
      res.json({ message: 'User registered successfully', token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



async function signinUser(req, res) {
  const { username, password } = req.body;

  try {
    if (!username) {
      return res.status(500).json({ message: 'Username Required' });
    }
    if (!password) {
      return res.status(500).json({ message: 'Password Required' });
    }
    const connection = await dbPool.getConnection();
    const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    connection.release();

    if (rows.length === 1) {
      const user = rows[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Passwords match, generate a JWT token for the user
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ message: 'Invalid Password' });
      }
    } else {
      res.status(401).json({ message: 'User Not Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = { registerUser, signinUser }