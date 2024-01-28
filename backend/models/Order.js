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
        quantity: {
            type: Number,
            default: 1
        },
    }],
    status: {
        type: String,
        enum: ["pending", "processing", "ready", "cancelled", "confirmed", "paid"],
        default: "pending"
    },
}, 
    {
    timestamps: true
    },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;