import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    }, 
    {
    timestamps: true
    },
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;