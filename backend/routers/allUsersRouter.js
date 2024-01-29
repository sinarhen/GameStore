import express from 'express';
import {deleteUserForAdmin, getAllUsers, updateUserRole} from '../controllers/AllUsersController.js';
import checkAuth from '../utils/checkAuth.js';
import checkAdmin from '../utils/checkAdmin.js';

const router = express.Router();

router.get('/', checkAuth, checkAdmin, getAllUsers);
router.delete('/:user', checkAuth, checkAdmin, deleteUserForAdmin);
router.put('/role/:user', checkAuth, checkAdmin, updateUserRole);

export default router;