// models/ConsumerMongo.js

const mongoose = require('mongoose');

const consumerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true }
}, { timestamps: true });

const Consumer = mongoose.model('Consumer', consumerSchema);

module.exports = Consumer;
