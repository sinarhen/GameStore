import mongoose from "mongoose";
import { modelNames } from "../utils/constants.js";


const categorySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        products: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: modelNames.product,
            }
        }],
    },
    {
        timestamps: true
    },
);
categorySchema.pre('remove', function (next) {
    this.model(modelNames.product).updateMany({category: this._id}, {$unset: {category: ""}}, next);
});
const Category = mongoose.model(modelNames.category, categorySchema);

export default Category;