import CategoryModel from "../models/Category.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find().exec();
        res.json(categories);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get categories',
        });
    }
};

export const getCategory = async (req, res) => {
    const {categoryId} = req.params;
    try {
        const categoryData = await CategoryModel.findById(categoryId).exec();
        res.json(categoryData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get category',
        });
    }

}
export const createCategory = async (req, res) => {
    const {name} = req.body;
    const newCategory = new CategoryModel({name});
    try {
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to add category',
        });
    }
};

export const deleteCategory = async (req, res) => {
    const {category} = req.params;
    try {
        await CategoryModel.findByIdAndDelete(category);
        res.json({
            message: 'Category deleted',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to delete category',
        });
    }
}