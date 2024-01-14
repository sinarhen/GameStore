import mongoose from 'mongoose';
import crypto from 'crypto'

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => crypto.randomUUID(),
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    categoryId: {
        type: String, // This is the id of the category that this product belongs to
        // ref: 'Category', // This is the name of the model that this id refers to
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
