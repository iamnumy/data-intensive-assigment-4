// routes/consumerRoutes.js
const express = require('express');
const router = express.Router();
const { addConsumer, getAllConsumers } = require('../controllers/consumerController');

// Route to get all consumers
router.get('/', getAllConsumers);

// Route to add a consumer
router.post('/', addConsumer);

module.exports = router;
