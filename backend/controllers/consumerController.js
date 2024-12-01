// consumerController.js
const Consumer = require('../models/ConsumerMongo'); // Mongoose model for Consumer

// Get all consumers
exports.getAllConsumers = async (req, res) => {
    try {
        const consumers = await Consumer.find();
        res.status(200).json(consumers);
    } catch (error) {
        console.error('Error fetching consumers:', error);
        res.status(500).json({ error: 'Failed to fetch consumers' });
    }
};

// Add a consumer
exports.addConsumer = async (req, res) => {
    const { name, email, phoneNumber } = req.body;

    try {
        const newConsumer = new Consumer({
            name,
            email,
            phoneNumber,
        });
        await newConsumer.save();
        res.status(201).json(newConsumer);
    } catch (error) {
        console.error('Error adding consumer:', error);
        res.status(500).json({ error: 'Failed to add consumer' });
    }
};
