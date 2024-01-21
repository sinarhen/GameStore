import express from 'express';

import userRouter from './userRouter.js';
import productRouter from './productRouter.js';
import favoritesRouter from './favoritesRouter.js';
import orderRouter from './orderRouter.js';


const router = express.Router();

router.use('/auth', userRouter);
router.use('/products', productRouter);
router.use('/favorites', favoritesRouter);
router.use('/orders', orderRouter);

export default router;