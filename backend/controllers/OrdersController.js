import Product from '../models/Product.js';
import Order from '../models/Order.js';
import jwt from 'jsonwebtoken';

export const addToOrder = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity, products = [] } = req.body;

        const token = (req.headers.authorization || "").replace(/Bearer\s?/, '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const product = await Product.findById(productId);
        let order = await Order.findOne({ userId: decodedToken._id });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!order || order.status !== 'pending') {
            order = new Order({ userId: decodedToken._id, status: 'pending' });
        }

        const newProduct = {
            _id: product._id,
            productId: productId,
            name: product.name,
            price: product.price,
            quantity,
            imageUrl: product.imageUrl,
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

        const token = (req.headers.authorization || "").replace(/Bearer\s?/, '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        let order = await Order.findOne({ userId: decodedToken._id });
        const index = order.products.findIndex((p) => p.productId.toString() === productId);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        } else if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        } else if (index === -1) {
            return res.status(404).json({ message: 'Product not found in the order' });
        }

        const productQuantity = order.products[index].quantity;

        if (productQuantity === 1) {
            order.products.splice(index, 1);
        } else {
            order.products[index].quantity = Math.max(1, order.products[index].quantity - 1);
        }

        await order.save();

        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllOrdersByUserId = async (req, res) => {
    try {
        const token = (req.headers.authorization || "").replace(/Bearer\s?/, '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const orders = await Order.find({ userId: decodedToken._id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
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

       if (status === "pending" || status === "processing" || status === "ready" || status === "canceled") {
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