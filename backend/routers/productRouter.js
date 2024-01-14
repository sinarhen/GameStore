import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, validate } from '../controllers/ProductController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', /* TODO: checkAuth, */ validate('createProduct'), createProduct);
router.put('/:id', /* TODO: checkAuth, */ validate('updateProduct'), updateProduct);
router.delete('/:id', /* TODO: checkAuth, */ validate('deleteProduct'), deleteProduct);

export default router;
