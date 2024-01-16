import Product from '../models/Product.js';
import Order from '../models/Order.js';
import jwt from 'jsonwebtoken';

export const addOrder = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        const token = (req.headers.authorization || "").replace(/Bearer\s?/, '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const order = new Order({
            userId: decodedToken._id,
            products: [
                {
                    productId,
                    price: product.price,
                    name: product.name,
                    description: product.description,
                },
            ],
            quantity,
            status: 'pending',
        });

        await order.save();

        res.status(201).json({ message: 'Order added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};