// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts } = require('../controllers/productController');

// Route to get all products
router.get('/', getAllProducts);

// Route to add a product
router.post('/', addProduct);

module.exports = router;
