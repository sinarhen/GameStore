import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }
    }],
    }, 
    {
        collection: "categories",
        timestamps: true
    },
);
categorySchema.pre('remove', function(next) {
    this.model('Product').updateMany({ category: this._id }, { $unset: { category: "" } }, next);
});
const Category = mongoose.model("Category", categorySchema);

export default Category;