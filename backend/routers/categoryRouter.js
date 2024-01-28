import express from 'express';
import {createCategory, deleteCategory, getAllCategories} from '../controllers/CategoryController.js';
import checkAuth from '../utils/checkAuth.js';
import checkAdmin from '../utils/checkAdmin.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', checkAuth, checkAdmin, createCategory);
router.delete('/:category', checkAuth, checkAdmin, deleteCategory);

export default router;
