import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, validate } from '../controllers/ProductController.js';
import checkAdmin from '../utils/checkAdmin.js';

const router = express.Router();

router.get('/', checkAdmin, getAllProducts);
router.get('/:id', checkAdmin, getProductById);
router.post('/',  checkAdmin, validate('createProduct'), createProduct);
router.put('/:id',  checkAdmin, validate('updateProduct'), updateProduct);
router.delete('/:id',  checkAdmin, validate('deleteProduct'), deleteProduct);

export default router;
