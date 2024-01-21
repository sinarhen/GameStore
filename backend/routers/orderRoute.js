import express from 'express';
import { addToOrder, deleteOrder, getAllOrdersByUserId, getOrderById, updateOrderStatus } from "../controllers/OrdersController.js";
import checkAuth from '../utils/checkAuth.js';
import checkAdmin from '../utils/checkAdmin.js';

const router = express.Router();

router.get('/', getAllOrdersByUserId);
router.get('/:orderId', checkAuth, getOrderById);
router.post('/:productId',  addToOrder);
router.delete('/:productId',  deleteOrder);
router.put('/:orderId',  checkAdmin, updateOrderStatus);

export default router;
