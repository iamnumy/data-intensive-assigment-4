const Product = require('../models/Product'); // Sequelize model for Product
const Category = require('../models/Category'); // Sequelize model for Category

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll(); // Use Sequelize to get all products
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    const { name, price, categoryName } = req.body;

    if (!name || !price || !categoryName) {
        return res.status(400).json({ error: 'Product name, price, and category name are required' });
    }

    try {
        // Find or create the category by name
        const [category, created] = await Category.findOrCreate({
            where: { name: categoryName },
            defaults: { name: categoryName }
        });

        // Create the product with the category ID
        const product = await Product.create({
            name,
            price,
            category_id: category.id,
        });

        res.status(201).json(product);
    } catch (error) {
        console.error('Error inserting product:', error);
        res.status(500).json({ error: 'Failed to add product' });
    }
};
