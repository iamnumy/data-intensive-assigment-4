const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Category extends Model {}

Category.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Make the category name unique to avoid duplicates
    },
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
});

module.exports = Category;
