import express from 'express';
import { addOrder } from "../controllers/OrdersController.js";

const router = express.Router();

// router.get('/', getOrder);
router.post('/:productId',  addOrder);
// router.delete('/:productId',  deleteFavorite);

export default router;
