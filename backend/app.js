// app.js or server.js

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); // For MySQL Products
const consumerRoutes = require('./routes/consumerRoutes'); // For MongoDB Consumers
const mysqlOrderRoutes = require('./routes/mysqlOrderRoutes'); // For MySQL Orders
const nosqlOrderRoutes = require('./routes/nosqlOrderRoutes'); // For MongoDB Orders
const itemRoutes = require('./routes/itemRoutes'); // For MongoDB Items
const sequelize = require('./db'); // Sequelize instance for MySQL
const bodyParser = require('body-parser');

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/data_intensive_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// MySQL connection
sequelize.sync().then(() => {
    console.log('MySQL connected');
}).catch((err) => {
    console.error('MySQL connection error:', err);
});

// Routes
app.use('/api/sql/products', productRoutes); // Routes for products (MySQL)
app.use('/api/nosql/consumers', consumerRoutes); // Consumer routes for MongoDB
app.use('/api/sql/orders', mysqlOrderRoutes); // MySQL Orders
app.use('/api/nosql/orders', nosqlOrderRoutes); // MongoDB Orders
app.use('/api/nosql/items', itemRoutes); // Item routes for MongoDB

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
