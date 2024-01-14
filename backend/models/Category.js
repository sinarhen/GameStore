import mongoose from 'mongoose';
import crypto from 'crypto';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

export default Category;