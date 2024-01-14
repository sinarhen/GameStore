import { register, login } from "../controllers/UserController.js";
import express from 'express';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
app.put("/changeEmail",/* TODO: checkAuth, */ changeEmail);
app.put("/changePassword",/* TODO: checkAuth, */ changePassword);


export default router;