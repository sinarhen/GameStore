import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, validate } from '../controllers/ProductController.js';
import checkAdmin from '../utils/checkAdmin.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/',  checkAdmin, validate('createProduct'), createProduct);
router.put('/:id',  checkAdmin, updateProduct);
router.delete('/:id',  checkAdmin, validate('deleteProduct'), deleteProduct);

export default router;
