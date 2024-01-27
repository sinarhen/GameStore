import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { roles } from '../utils/roles.js';

export const addToOrder = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        const product = await Product.findById(productId);
        let order = await Order.findOne({ userId: req.userId, status: 'pending' }).populate('products.productId');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!order || order.status === 'cancelled' || order.status === 'ready' || order.status === 'processing' || order.status === 'confirmed') {
            order = new Order({ userId: req.userId, status: 'pending', totalPrice: product.price * quantity });
        }

        const index = order.products.findIndex((p) => p.productId._id.toString() === productId);
        let orderProduct;
        if (index === -1) {
            
            orderProduct = {
                productId: product,
                quantity,
            };
            console.log(orderProduct)
            order.products.push(orderProduct);
        } else {
            orderProduct = order.products[index];
            orderProduct.quantity += quantity;
            console.log(orderProduct)
        }

        console.log(orderProduct)
        await order.save();

        res.status(201).json({ message: 'Order added successfully', orderProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteOrderProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        let order = await Order.findOne({ userId: req.userId }).populate('products.productId');
        const index = order.products.findIndex((p) => {
            return p._id.toString() === productId
        
        });
        
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

export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        } 

        await order.deleteOne();

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllOrdersByUserId = async (req, res) => {
    try {

        const orders = await Order.find({ userId: req.userId }).populate('userId').populate('products.productId').sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {

        const { orderId } = req.params;
        
        const order = await Order.findById(orderId).populate('userId');
        console.log(req.role)
        if (req.userId !== order.userId && req.role !== roles.admin) {
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

       if (status === "pending" || status === "processing" || status === "ready" || status === "cancelled" || status === "confirmed") {
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

export const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { paymentStatus } = req.body;

        if (!paymentStatus) {
            return res.status(400).json({ message: 'Missing payment status' });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.paymentStatus = paymentStatus;

        await order.save();

        res.status(200).json({ message: 'Payment status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId').populate('products.productId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProductFromOrder = async (req, res) => {
    try {
        const { orderId, productId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const index = order.products.findIndex((p) => p.productId.toString() === productId);
        if (index === -1) {
            return res.status(404).json({ message: 'Product not found in order' });
        }
        order.products.splice(index, 1);
        await order.save();
        res.status(200).json({ message: 'Product deleted from order successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};