import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const addToOrder = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        const product = await Product.findById(productId);
        let order = await Order.findOne({ userId: req.userId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!order || order.status === 'cancelled' || order.status === 'ready' || order.status === 'processing') {
            order = new Order({ userId: req.userId, status: 'pending', totalPrice: product.price * quantity });
        }

        const newProduct = {
            productId: productId,
            quantity,
        };

        order.products.push(newProduct);

        await order.save();

        res.status(201).json({ message: 'Order added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteOrder = async (req, res) => {
    try {
        const { productId } = req.params;

        let order = await Order.findOne({ userId: req.userId }).populate('products.productId');
        const index = order.products.findIndex((p) => p.productId.toString() === productId);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        } else if (index === -1) {
            return res.status(404).json({ message: 'Product not found in the order' });
        }

        const productQuantity = order.products[index].quantity;
        const productPrice = order.products[index].productId.price;

        if (productQuantity === 1) {
            order.products.splice(index, 1);
        } else {
            order.products[index].quantity = Math.max(1, order.products[index].quantity - 1);
        }

        // Update total price
        order.totalPrice -= productPrice;
        if (order.totalPrice < 0) order.totalPrice = 0;

        await order.save();

        res.status(200).json({ message: 'Product deleted from order successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllOrdersByUserId = async (req, res) => {
    try {

        const orders = await Order.find({ userId: req.userId });

        if (!orders) {
            return res.status(404).json({ message: 'Orders not found' });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {

        const { orderId } = req.params;
        
        const order = await Order.findById(orderId);
        if (req.userId !== order.userId && req.userId !== process.env.ADMIN_ID) {
            return res.status(401).json({ message: 'You cannot get this order' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Missing status' });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

       if (status === "pending" || status === "processing" || status === "ready" || status === "cancelled") {
            order.status = status;
            await order.save();
        } else {
            return res.status(400).json({ message: 'Invalid status' });
        }


        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};