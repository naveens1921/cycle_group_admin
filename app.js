const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const router = require('./routes/auth/authRoutes');
const spotsRoutes = require ('./routes/auth/dataRoutes');
const cors = require('cors');

const app = express();
const allowedOrigins = ['http://localhost:4200'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors());
app.use(bodyParser.json());


// const dbPool = require('./config/db'); // Import the dbPool
app.use('/auth',router);
app.use('/spots',spotsRoutes);


app.listen(4000, () => {
  console.log('Server is running on port 4000');
});



app.use(cors(corsOptions));

// Other Express middleware and route handling




// Create a connection to your MySQL database
// const connection = mysql.createPool({
//   host: 'localhost',  // Replace with your MySQL server's host
//   user: 'root', // Replace with your MySQL username
//   password: '', // Replace with your MySQL password
//   database: 'cycle_around' // Replace with your MySQL database name
// });

// const secretKey = 'your_secret_key';
// if(connection){
//   console.log('success');
// }
// Connect to the database
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS spots (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     latitude DECIMAL(10, 6) NOT NULL,
//     longitude DECIMAL(10, 6) NOT NULL,
//     accessible_by_cycling BOOLEAN NOT NULL
//   )
// `;
// const createTableUser = `CREATE TABLE IF NOT EXISTS users (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   username VARCHAR(255) NOT NULL,
//   password VARCHAR(255) NOT NULL
// )`;
// connection.query(createTableUser, (err, results) => {
//   if (err) {
//     console.error('Error creating table:', err);
//   } else {
//     console.log('Table created successfully');
//   }
// });

// connection.query(createTableQuery,createTableUser, (err, results) => {
//   if (err) {
//     console.error('Error creating table:', err);
//   } else {
//     console.log('Table created successfully');
//   }
// });

// Close the connection when you're done
// connection.end((err) => {
//   if (err) {
//     console.error('Error closing MySQL connection: ' + err.stack);
//     return;
//   }
//   console.log('MySQL connection closed.');
// });

