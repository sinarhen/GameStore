import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        price: Number,
        name: String,
        description: String,
        imageUrl: String,
    }],
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "processing", "ready", "canceled"],
        default: "pending"
    }
    }, 
    {
    timestamps: true
    },
);

const Order = mongoose.model("Order", orderSchema);

Order.populate("products.productId", "price name description imageUrl");

export default Order;