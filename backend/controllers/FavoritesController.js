import Favorites from "../models/Favorites.js";
import Product from "../models/Product.js";

export const getAllFavoritesByUserId = async (req, res) => {
    try {
        const favorites = await Favorites.find({user: req.userId}).populate('product');
        const products = favorites.map(favorite => favorite.product);
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
        const newFavorite = {
            user: req.userId,
            product: productId,
        }

        const favorite = new Favorites(newFavorite);

        await favorite.save();

        res.status(201).json({message: 'Favorite added successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const deleteFavorite = async (req, res) => {
    try {
        const {productId} = req.params;

        const favorite = await Favorites.findOne({user: req.userId, product: productId});
        if (!favorite) {
            return res.status(404).json({message: 'Favorite not found'});
        }
        await Favorites.deleteOne({user: req.userId, product: productId});

        res.status(200).json({message: 'Favorite deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
