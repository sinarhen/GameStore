import Favorites from "../models/Favorites.js";
import Product from "../models/Product.js";

export const getAllFavoritesByUserId = async (req, res) => {
    try {
        const favorites = await Favorites.find({userId: req.userId}).populate('product');
        const products = favorites.map(favorite => favorite.product);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const addFavorite = async (req, res) => {
    const {product} = req.params;

    try {


        const product = await Product.findById(product);

        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        const favorite = new Favorites({
            userId: req.userId,
            product
        });

        await favorite.save();

        res.status(201).json({message: 'Favorite added successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const deleteFavorite = async (req, res) => {
    try {
        const {product} = req.params;

        const favorite = await Favorites.findOne({userId: req.userId, product});
        if (!favorite) {
            return res.status(404).json({message: 'Favorite not found'});
        }
        await Favorites.deleteOne({userId: req.userId, product});

        res.status(200).json({message: 'Favorite deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
