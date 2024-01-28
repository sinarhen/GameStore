import Favorites from "../models/Favorites.js";
import Product from "../models/Product.js";

export const getAllFavoritesByUserId = async (req, res) => {
    try {
        const favorites = await Favorites.find({userId: req.userId}).populate('productId');
        const products = favorites.map(favorite => favorite.productId);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const addFavorite = async (req, res) => {
    const {productId} = req.params;

    try {


        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        const favorite = new Favorites({
            userId: req.userId,
            productId
        });

        await favorite.save();

        res.status(201).json({message: 'Favorite added successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const deleteFavorite = async (req, res) => {
    try {
        const {productId} = req.params;

        const favorite = await Favorites.findOne({userId: req.userId, productId});
        if (!favorite) {
            return res.status(404).json({message: 'Favorite not found'});
        }
        await Favorites.deleteOne({userId: req.userId, productId});

        res.status(200).json({message: 'Favorite deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
