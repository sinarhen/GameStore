import express from 'express';
import {
    addToOrder,
    getAllOrders,
    getAllOrdersByUserId,
    getOrderById,
    deleteOrder,
    updateOrder,
    updateOrderProductQuantity,
    deleteProductFromOrder
} from "../controllers/OrdersController.js";
import checkAuth from '../utils/checkAuth.js';
import checkAdmin from '../utils/checkAdmin.js';

const router = express.Router();

router.get('/', checkAuth, getAllOrdersByUserId);
router.get('/all', checkAuth, checkAdmin, getAllOrders);
router.get('/:orderId', checkAuth, checkAdmin, getOrderById);
router.post('/:productId', checkAuth, addToOrder);
router.delete('/:orderId', checkAuth, checkAdmin, deleteOrder);
router.put('/:orderId', checkAuth, checkAdmin, updateOrder);
router.put('/:orderId/:productId', checkAuth, updateOrderProductQuantity);
router.delete('/:orderId/:productId', checkAuth, deleteProductFromOrder);

export default router;
