import { register, login, changeEmail, changePassword, deleteUser } from "../controllers/UserController.js";
import express from 'express';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.put("/change-email",/* TODO: checkAuth, */ changeEmail);
router.put("/change-password",/* TODO: checkAuth, */ changePassword);
router.delete("/delete",/* TODO: checkAuth, */ deleteUser);
export default router;