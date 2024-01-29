import mongoose from 'mongoose';

const FavoritesSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

FavoritesSchema.index({userId: 1, product: 1}, {unique: true});

const Favorites = mongoose.model('Favorites', FavoritesSchema);

export default Favorites;