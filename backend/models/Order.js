import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
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

export default Order;