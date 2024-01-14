import Product from '../models/product.js'; 
import { check, validationResult } from 'express-validator';

function validate(method) {
    switch (method) {
        case 'createProduct': {
            return [
                check('name', 'Name is required').notEmpty(),
                check('description', 'Description is required').notEmpty(),
                check('price', 'Price is required').isNumeric(),
                check('imageUrl', 'Image URL is required').isURL(),
                check('categoryId', 'Category ID is required').notEmpty(),
            ];
        }
        case 'updateProduct': {
            return [
                check('id', 'ID is required').notEmpty(),
                check('name', 'Name is required').notEmpty(),
                check('description', 'Description is required').notEmpty(),
                check('price', 'Price is required').isNumeric(),
                check('imageUrl', 'Image URL is required').isURL(),
                check('categoryId', 'Category ID is required').notEmpty(),
            ];
        }
        case 'deleteProduct': {
            return [
                check('id', 'ID is required').notEmpty(),
            ];
        }
    }
}

async function getAllProducts(req, res) {
    const { categoryId, orderBy, filterBy, searchTerm } = req.query;
    let query = Product.find();

    if (categoryId) {
        query = query.where('categoryId').equals(categoryId);
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
        const products = await query.exec();
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
}

// Get product by id
async function getProductById(req, res) {
    const { id } = req.params;
    
    try {
        const product = await Product.findById(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send(`No product found with id ${id}`);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

async function createProduct(req, res) {
    const { name, description, price, imageUrl, categoryId } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // TODO: VALIDATE ADMIN NAME
        const product = await Product.create({
            name,
            description,
            price,
            imageUrl,
            categoryId,
        });

        res.json(product);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function updateProduct(req, res) {
    const { id } = req.params;
    const { name, description, price, imageUrl, categoryId } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // TODO: VALIDATE ADMIN NAME
        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            imageUrl,
            categoryId,
        });

        res.json(product);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function deleteProduct(req, res) {
    const { id } = req.params;
    
        // TODO: VALIDATE ADMIN NAME
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const product = await Product.findByIdAndDelete(id);
        res.json(product);
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