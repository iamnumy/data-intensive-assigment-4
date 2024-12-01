// routes/mysqlOrderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to add an order in MySQL
router.post('/', orderController.addOrder);

// Route to get all orders from MySQL
router.get('/', orderController.getAllOrders);

// Route to get a specific order by ID from MySQL
router.get('/:id', orderController.getOrderById);

// Route to delete an order in MySQL
router.delete('/:id', orderController.deleteOrder);

// Route to update an order in MySQL
router.put('/:id', orderController.updateOrder);

module.exports = router;
