// models/OrderMongo.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    consumerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consumer', required: true },
    productId: { type: Number, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }],
    totalAmount: { type: Number, required: true }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
