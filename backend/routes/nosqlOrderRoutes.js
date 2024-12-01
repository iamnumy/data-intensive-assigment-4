// routes/nosqlOrderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to add an order in MongoDB
router.post('/', orderController.addOrder);

// Route to get all orders from MongoDB
router.get('/', orderController.getAllOrders);

// Route to get a specific order by ID from MongoDB
router.get('/:id', orderController.getOrderById);

// Route to delete an order in MongoDB
router.delete('/:id', orderController.deleteOrder);

// Route to update an order in MongoDB
router.put('/:id', orderController.updateOrder);

module.exports = router;
