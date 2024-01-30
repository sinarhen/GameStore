import mongoose from "mongoose";
import { modelNames, statusNames } from "../utils/constants.js";

const orderSchema = new mongoose.Schema({
        login: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            red: modelNames.user,
            required: true,
        },
        products: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: modelNames.product,
            },
            quantity: {
                type: Number,
                default: 1
            },
        }],
        status: {
            type: String,
            enum: Object.keys(statusNames),
            default: "pending"
        },
        isPaid: {
            type: Boolean,
            default: false
        },

    },
    {
        timestamps: true
    },
);

const Order = mongoose.model(modelNames.order, orderSchema);
export default Order;