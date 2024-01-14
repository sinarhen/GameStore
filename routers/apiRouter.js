import express from 'express';

import userRouter from './userRouter.js';
import productRouter from './productRouter.js';


const router = express.Router();

router.use('/auth', userRouter);
router.use('/products', productRouter);

export default router;