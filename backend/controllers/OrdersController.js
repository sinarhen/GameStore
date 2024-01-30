import Product from '../models/Product.js';
import Order from '../models/Order.js';
import {roles, statusNames} from '../utils/constants.js';

export const addToOrder = async (req, res) => {
    try {
        const {productId} = req.params;
        const {quantity} = req.body;
        const product = await Product.findById(productId);
        let order = await Order.findOne({user: req.userId, status: 'pending'}).populate('products.product');

        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        if (!order || order.status !== 'pending') {
            order = new Order({user: req.userId, status: 'pending'});
        }

        const index = order.products.findIndex((p) => p.product._id.toString() === product);
        let orderProduct;
        if (index === -1) {

            orderProduct = {
                product: product,
                quantity,
            };
            order.products.push(orderProduct);
        } else {
            orderProduct = order.products[index];
            orderProduct.quantity += quantity;
        }
        await order.save();

        res.status(201).json({message: 'Order added successfully', orderProduct, orderId: order._id});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};


export const deleteProductFromOrder = async (req, res) => {
    try {
        const {orderId, productId} = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        const index = order.products.findIndex((p) => p.product.toString() === productId);
        if (index === -1) {
            return res.status(404).json({message: 'Product not found in order'});
        }
        order.products.splice(index, 1);

        if (order.products.length === 0) {
            await order.deleteOne();
            return res.status(200).json({message: 'Order deleted successfully'});
        }

        await order.save();
        res.status(200).json({message: 'Product deleted from order successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const {orderId} = req.params;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }

        await order.deleteOne();

        res.status(200).json({message: 'Order deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getAllOrdersByUserId = async (req, res) => {
    try {
        const orders = await Order.find({user: req.userId}).populate('user').populate('products.product').sort({updatedAt: -1});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getOrderById = async (req, res) => {
    try {

        const {orderId} = req.params;

        const order = await Order.findById(orderId).populate('user');
        console.log(req.role)
        if (req.userId !== order.user._id && req.role !== roles.admin) {
            return res.status(401).json({message: 'You cannot get this order'});
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const confirmOrder = async (req, res) => {
    try {
        const {orderId} = req.params;
        const order = await Order.findById(orderId).populate('user').populate('products.product');

        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        if (order.user._id.toString() !== req.userId && req.role !== roles.admin) {
            return res.status(401).json({message: 'You cannot confirm this order'});
        }

        if (order.status !== statusNames.pending) {
            return res.status(400).json({message: 'Order cannot be confirmed'});
        }
        const {login, password} = req.body;

        if (!login)
            return res.status(400).json({message: 'Login is required'});
        if (!password)
            return res.status(400).json({message: 'Password is required'});

        order.login = login;
        order.password = password;

        order.status = statusNames.confirmed;

        await order.save();

        res.status(200).json({message: 'Order confirmed successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

export const updateOrder = async (req, res) => {
    try {
        const {orderId} = req.params;
        const {status, isPaid} = req.body;

        let order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }

        if (status) {
            order.status = status;
        }
        if (isPaid) {
            order.isPaid = isPaid;
        }

        await order.save();

        res.status(200).json({message: 'Order updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('products.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


export const updateOrderProductQuantity = async (req, res) => {
    try {
        const {orderId, productId} = req.params;
        const {quantity} = req.body;
        let order = await Order.findById(orderId).populate('products.product');
        const index = order.products.findIndex((p) => p.product._id.toString() === productId);

        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        } else if (index === -1) {
            return res.status(404).json({message: 'Product not found in the order'});
        } else if (quantity < 1) {
            return res.status(400).json({message: 'Quantity must be at least 1'});
        }

        order.products[index].quantity = quantity;


        await order.save();

        res.status(200).json({message: 'Product quantity updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};