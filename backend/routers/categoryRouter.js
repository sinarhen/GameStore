import express from 'express';
import { getAllCategories, createCategory, deleteCategory } from '../controllers/CategoryController.js';
import checkAuth from '../utils/checkAuth.js';
import checkAdmin from '../utils/checkAdmin.js';

const router = express.Router();

router.get('/', checkAuth, getAllCategories);
router.post('/', checkAuth, checkAdmin, createCategory);
router.delete('/:categoryId', checkAuth, checkAdmin, deleteCategory);

export default router;
