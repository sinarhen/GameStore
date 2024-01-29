import mongoose from 'mongoose';
import {modelNames} from "../utils/constants.js";

const FavoritesSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: modelNames.user,
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: modelNames.product,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

FavoritesSchema.index({user: 1, product: 1}, );

const Favorites = mongoose.model(modelNames.favorite, FavoritesSchema);

export default Favorites;