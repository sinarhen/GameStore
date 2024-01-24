import express from 'express';
import { getAllUsers, deleteUserForAdmin } from '../controllers/AllUsersController.js';
import checkAuth from '../utils/checkAuth.js';
import checkAdmin from '../utils/checkAdmin.js';

const router = express.Router();

router.get('/', checkAuth, checkAdmin, getAllUsers);
router.delete('/:userId', checkAuth, checkAdmin, deleteUserForAdmin);

export default router;