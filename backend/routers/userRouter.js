import {changePassword, deleteUser, getMe, login, register, updateUser} from "../controllers/UserController.js";
import express from 'express';
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update', checkAuth, updateUser);
router.put('/change-password', checkAuth, changePassword);
router.delete('/delete', checkAuth, deleteUser);
router.get('/me', checkAuth, getMe);

export default router;