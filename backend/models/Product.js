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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    }
}, {
    timestamps: true
});

// Add the pre remove hook
productSchema.pre('remove', async function (next) {
    try {
        // Remove all favorites that reference the product
        await Favorites.deleteMany({product: this._id});
        // Remove the product from all orders that contain it
        await Order.updateMany(
            {"products.product": this._id},
            {$pull: {products: {product: this._id}}}
        );
        next();
    } catch (err) {
        console.log(err)
        next(err);
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;