// config/db.js
const mysql = require('mysql2');
const mongoose = require('mongoose');

// MySQL Connection
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'data_intensive_db',
});

mysqlConnection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/db_mango', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

module.exports = { mysqlConnection, mongoose };
