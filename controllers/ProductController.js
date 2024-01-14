import Product from './Product'; // Replace with the actual path to your Product model

class ProductController {
    // Get all products
    async getAllProducts(req, res) {
        const { categoryId, orderBy, filterBy } = req.query;
        
        let query = Product.find();

        if (categoryId) {
            query = query.where('categoryId').equals(categoryId);
        }

        if (orderBy) {
            query = query.sort(orderBy);
        }

        if (filterBy) {
            query = query.where(filterBy);
        }

        try {
            const products = await query.exec();
            res.json(products);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // Get product by id
    async getProductById(req, res) {
        const { id } = req.params;

        try {
            const product = await Product.findById(id);
            if (product) {
                res.json(product);
            } else {
                res.status(404).send(`No product found with id ${id}`);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

export default ProductController;