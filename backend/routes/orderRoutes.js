// orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to add an order
router.post('/add', orderController.addOrder);

// Route to get all orders
router.get('/', orderController.getAllOrders);

// Route to get a specific order by ID
router.get('/:id', orderController.getOrderById);

// Route to delete an order by ID
router.delete('/:id', orderController.deleteOrder);

// Route to update an order by ID
router.put('/:id', orderController.updateOrder);

module.exports = router;
