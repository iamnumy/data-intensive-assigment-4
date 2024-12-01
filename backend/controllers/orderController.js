// orderController.js

const OrderMySQL = require('../models/Order'); // MySQL Order Model
const OrderMongo = require('../models/OrderMongo'); // MongoDB Order Model

// Add a new order
exports.addOrder = async (req, res) => {
    const { totalAmount, consumerId, productId, items, itemId } = req.body;

    if (!totalAmount || !consumerId || !productId || !items || !itemId) {
        return res.status(400).json({ error: 'Total amount, consumer, product, items, and item ID are required' });
    }

    try {
        // Step 1: Add order to MySQL
        const mysqlOrder = await OrderMySQL.create({
            totalAmount,
            consumerId,
            productId,
            itemId // Add item ID to MySQL order
        });

        // Step 2: Add order details (including items) to MongoDB
        const mongoOrder = new OrderMongo({
            totalAmount,
            consumerId,
            productId,
            items,
            mysqlOrderId: mysqlOrder.id // Link to MySQL order
        });

        await mongoOrder.save();

        res.status(201).json({ mysqlOrder, mongoOrder });
    } catch (error) {
        console.error('Error adding order:', error);
        res.status(500).json({ error: 'Failed to add order' });
    }
};

// Get all orders (from both MySQL and MongoDB)
exports.getAllOrders = async (req, res) => {
    try {
        // Step 1: Get all orders from MySQL
        const mysqlOrders = await OrderMySQL.findAll();

        // Step 2: For each order, get the corresponding order in MongoDB (with items)
        const ordersWithItems = await Promise.all(
            mysqlOrders.map(async (order) => {
                const mongoOrder = await OrderMongo.findOne({ mysqlOrderId: order.id }).populate('items');
                return {
                    order,
                    items: mongoOrder ? mongoOrder.items : []
                };
            })
        );

        res.status(200).json(ordersWithItems);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        // Step 1: Get the order from MySQL by ID
        const mysqlOrder = await OrderMySQL.findByPk(id);
        if (!mysqlOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Step 2: Get the corresponding order in MongoDB (with items)
        const mongoOrder = await OrderMongo.findOne({ mysqlOrderId: mysqlOrder.id }).populate('items');

        res.status(200).json({ order: mysqlOrder, items: mongoOrder ? mongoOrder.items : [] });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        // Step 1: Delete the order from MySQL
        const mysqlOrder = await OrderMySQL.findByPk(id);
        if (!mysqlOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        await mysqlOrder.destroy();

        // Step 2: Delete the corresponding order from MongoDB
        await OrderMongo.findOneAndDelete({ mysqlOrderId: id });

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};

// Update an order
exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const { itemId } = req.body;

    try {
        // Step 1: Find the order in MySQL by its ID
        const mysqlOrder = await OrderMySQL.findByPk(id);
        if (!mysqlOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        console.log(itemId)
        if (itemId) {
            mysqlOrder.itemId = itemId;
        }

        await mysqlOrder.save();

        // Return the updated order as the response
        res.status(200).json({ message: 'Order updated successfully in MySQL', mysqlOrder });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
};
