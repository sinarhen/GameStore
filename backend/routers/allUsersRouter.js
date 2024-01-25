import express from 'express';
import { getAllUsers, deleteUserForAdmin, updateUserRole } from '../controllers/AllUsersController.js';
import checkAuth from '../utils/checkAuth.js';
import checkAdmin from '../utils/checkAdmin.js';

const router = express.Router();

router.get('/', checkAuth, checkAdmin, getAllUsers);
router.delete('/:userId', checkAuth, checkAdmin, deleteUserForAdmin);
router.put('/role/:userId', checkAuth, checkAdmin, updateUserRole);

export default router;