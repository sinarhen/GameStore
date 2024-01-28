import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    validate
} from '../controllers/ProductController.js';
import checkAdmin from '../utils/checkAdmin.js';
import checkAuth from '../utils/checkAuth.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', checkAuth, checkAdmin, validate('createProduct'), createProduct);
router.put('/:id', checkAuth, checkAdmin, updateProduct);
router.delete('/:id', checkAuth, checkAdmin, deleteProduct);

export default router;
