import Favorites from "../models/Favorites.js";
import Product from "../models/Product.js";
import jwt from 'jsonwebtoken';

export const getAllFavoritesByUserId = async (req, res) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;

        const favorites = await Favorites.find({ userId });

        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addFavorite = async (req, res) => {
    const { productId } = req.params;

    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const favorite = new Favorites({
            userId,
            productId
        });

        await favorite.save();

        res.status(201).json({ message: 'Favorite added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFavorite = async (req, res) => {
    try {
        const { productId } = req.params;
        const token = req.headers.authorization.replace(/Bearer\s?/, '');

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;

        const favorite = await Favorites.findOne({ userId, productId });
        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        await Favorites.deleteOne({ userId, productId });

        res.status(200).json({ message: 'Favorite deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
