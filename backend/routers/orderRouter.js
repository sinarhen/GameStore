import express from 'express';
import { addToOrder, deleteOrder, getAllOrders, getAllOrdersByUserId, getOrderById, updateOrderStatus } from "../controllers/OrdersController.js";
import checkAuth from '../utils/checkAuth.js';
import checkAdmin from '../utils/checkAdmin.js';

const router = express.Router();

router.get('/', checkAuth, getAllOrdersByUserId);
router.get('/all', checkAuth, checkAdmin, getAllOrders);
router.get('/:orderId', checkAuth, checkAdmin, getOrderById);
router.post('/:productId', checkAuth, checkAdmin, addToOrder);
router.delete('/:productId', checkAuth, checkAdmin, deleteOrder);
router.put('/:orderId', checkAuth, checkAdmin, updateOrderStatus);

export default router;
