const mysql = require('mysql2/promise');


const connection={
    host: 'localhost',  // Replace with your MySQL server's host
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'cycle_around' // Replace with your MySQL database name
  };
  

const dbPool = mysql.createPool(connection);

module.exports = dbPool;
