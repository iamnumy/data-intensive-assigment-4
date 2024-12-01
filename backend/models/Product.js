const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Product extends Model {}

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
});

module.exports = Product;
