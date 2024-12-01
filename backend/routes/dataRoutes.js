const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const ProductMongo = require('../models/ItemMongo');
const CategoryMongo = require('../models/ConsumerMongo');
const OrderMongo = require('../models/OrderMongo');

const router = express.Router();

// Insert data into MySQL
router.post('/insert/sql', async (req, res) => {
    const { productName, productPrice, categoryName, orderDate, totalAmount } = req.body;

    try {
        // Insert into SQL (MySQL)
        const category = await Category.create({ name: categoryName });
        const product = await Product.create({ name: productName, price: productPrice, category_id: category.id });
        await Order.create({ order_date: orderDate, total_amount: totalAmount, product_id: product.id });

        res.status(201).json({ message: 'Data inserted into SQL' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error inserting into SQL', error: err });
    }
});

// Insert data into MongoDB
router.post('/insert/nosql', async (req, res) => {
    const { productName, productPrice, categoryName, orderDate, totalAmount } = req.body;

    try {
        // Insert into NoSQL (MongoDB)
        const category = new CategoryMongo({ name: categoryName });
        await category.save();

        const product = new ProductMongo({ name: productName, price: productPrice, category: category._id });
        await product.save();

        const order = new OrderMongo({ order_date: orderDate, total_amount: totalAmount, product: product._id });
        await order.save();

        res.status(201).json({ message: 'Data inserted into NoSQL' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error inserting into NoSQL', error: err });
    }
});

module.exports = router;
