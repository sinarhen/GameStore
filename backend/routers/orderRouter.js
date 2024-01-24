import express from 'express';
import { addToOrder, deleteOrderProduct, getAllOrders, getAllOrdersByUserId, getOrderById, updateOrderStatus, deleteOrder } from "../controllers/OrdersController.js";
import checkAuth from '../utils/checkAuth.js';
import checkAdmin from '../utils/checkAdmin.js';

const router = express.Router();

router.get('/', checkAuth, getAllOrdersByUserId);
router.get('/all', checkAuth, checkAdmin, getAllOrders);
router.get('/:orderId', checkAuth, checkAdmin, getOrderById);
router.post('/:productId', checkAuth, addToOrder);
router.delete('/product/:productId', checkAuth, deleteOrderProduct);
router.delete('/:orderId', checkAuth, checkAdmin, deleteOrder);
router.put('/:orderId', checkAuth, checkAdmin, updateOrderStatus);

export default router;
