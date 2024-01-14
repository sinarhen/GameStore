import CategoryModel from "../models/Category.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find().populate('products').exec();
        res.json(categories);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get categories',
        });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id).populate('products').exec();
        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get category',
        })
    }
}