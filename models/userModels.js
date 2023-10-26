const db = require('../config/db');

async function getUserByUsername(username) {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
}

// Other database interaction functions
