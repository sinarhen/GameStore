import Product from '../models/Product.js';
import {check, validationResult} from 'express-validator';

function validate(method) {
    switch (method) {
        case 'createProduct': {
            return [
                check('name', 'Name is required').notEmpty().isLength({min: 3}),
                check('description', 'Description is required').optional(),
                check('price', 'Price is required').isNumeric().isFloat({min: 0, max: 100000}),
            ];
        }
    }
}

async function getAllProducts(req, res) {
    const {category, orderBy, filterBy, searchTerm} = req.query;
    let query = Product.find();

    if (category) {
        query = query.where('category._id').equals(category);
    }

    if (searchTerm) {
        query = query.where('name').regex(new RegExp(searchTerm, 'i'));
    }

    if (orderBy) {
        query = query.sort(orderBy);
    }

    if (filterBy) {
        query = query.where(filterBy);
    }

    try {

        const products = await query
            .populate('category')
            .exec();
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
}

// Get product by id
async function getProductById(req, res) {
    const {id} = req.params;

    try {
        let product = await Product.findById(id);
        if (product) {
            product = await product.populate("category");
            res.json(product);
        } else {
            res.status(404).json({message: 'Product not found'});
        }
    } catch (err) {
        console.error(err)
        res.status(500).send(err);
    }
}

async function createProduct(req, res) {
    const {name, description, price, imageUrl, category} = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const existingProduct = await Product.findOne({name});
        if (existingProduct) {
            return res.status(400).json({field: "name", message: 'Product already exists'});
        }
        const product = await Product.create({
            name,
            description,
            price,
            imageUrl,
            category: category || null,
        });

        res.json(product);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function updateProduct(req, res) {
    const {id} = req.params;
    const {name, description, price, imageUrl, category} = req.body;

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            imageUrl,
            category: category || null,
        });

        res.json(product);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function deleteProduct(req, res) {
    const {id} = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({message: 'Product not found'});
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    validate
}