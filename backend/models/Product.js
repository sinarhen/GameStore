import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
        required: false
    },
    categoryId: {
        type: String,
        ref: 'Category', 
        required: true
    }
}, {
    timestamps: true
});

// Add the pre remove hook
productSchema.pre('remove', async function(next) {
    try {
        // Remove all favorites that reference the product
        await Favorites.deleteMany({ productId: this._id });
        next();
    } catch (err) {
        console.log(err)
        next(err);
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;