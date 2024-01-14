import { register, login, changeEmail, changePassword, deleteUser, getMe } from "../controllers/UserController.js";
import express from 'express';
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.put("/change-email", checkAuth, changeEmail);
router.put("/change-password", checkAuth, changePassword);
router.delete("/delete", checkAuth, deleteUser);
router.get("/me", checkAuth, getMe);

export default router;