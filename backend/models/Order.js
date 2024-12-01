const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Order extends Model {}

Order.init(
    {
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        consumerId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productId: {
            type: DataTypes.STRING, // Retain as string since it's referring to a product ID from MySQL.
            allowNull: false,
        },
        itemId: {
            type: DataTypes.JSON, // Use JSON to store multiple item references.
            allowNull: false,
            validate: {
                notEmpty: true, // Ensures the array is not empty.
            },
        },
    },
    {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
    }
);

module.exports = Order;
