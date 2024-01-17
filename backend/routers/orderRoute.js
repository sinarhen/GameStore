import express from 'express';
import { addToOrder, deleteOrder } from "../controllers/OrdersController.js";

const router = express.Router();

// router.get('/', getOrder);
router.post('/:productId',  addToOrder);
router.delete('/:productId',  deleteOrder);

export default router;
