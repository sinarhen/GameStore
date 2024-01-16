import express from 'express';

import userRouter from './userRouter.js';
import productRouter from './productRouter.js';
import favoritesRouter from './favoritesRouter.js';


const router = express.Router();

router.use('/auth', userRouter);
router.use('/products', productRouter);
router.use('/favorites', favoritesRouter);

export default router;