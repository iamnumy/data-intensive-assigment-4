// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const { addItem, getAllItems } = require('../controllers/itemController');

// Route to get all items
router.get('/', getAllItems);

// Route to add an item
router.post('/', addItem);

module.exports = router;
