import { register, login, changeEmail, changePassword } from "../controllers/UserController.js";
import express from 'express';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.put("/changeEmail",/* TODO: checkAuth, */ changeEmail);
router.put("/changePassword",/* TODO: checkAuth, */ changePassword);


export default router;