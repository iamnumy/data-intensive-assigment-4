// /services/productService.js
const ProductMongo = require('../models/ItemMongo');
const CategoryMongo = require('../models/ConsumerMongo');
const OrderMongo = require('../models/OrderMongo');
const { Product, Category, Order } = require('../models');  // Sequelize models for MySQL

// Function to insert data into MySQL (SQL)
exports.insertIntoSQL = async (productName, productPrice, categoryName, orderDate, totalAmount) => {
    try {
        // Insert into MySQL (SQL) using Sequelize
        const category = await Category.create({ name: categoryName });
        const product = await Product.create({ name: productName, price: productPrice, category_id: category.id });
        await Order.create({ order_date: orderDate, total_amount: totalAmount, product_id: product.id });

        return { message: 'Data inserted into SQL database successfully!' };
    } catch (error) {
        throw new Error(`Error inserting into SQL database: ${error.message}`);
    }
};

// Function to insert data into MongoDB (NoSQL)
exports.insertIntoNoSQL = async (productName, productPrice, categoryName, orderDate, totalAmount) => {
    try {
        // Insert into MongoDB (NoSQL)
        const category = new CategoryMongo({ name: categoryName });
        await category.save();

        const product = new ProductMongo({ name: productName, price: productPrice, category: category._id });
        await product.save();

        const order = new OrderMongo({ order_date: orderDate, total_amount: totalAmount, product: product._id });
        await order.save();

        return { message: 'Data inserted into MongoDB database successfully!' };
    } catch (error) {
        throw new Error(`Error inserting into MongoDB database: ${error.message}`);
    }
};
