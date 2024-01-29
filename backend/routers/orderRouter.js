import express from 'express';
import {
    addToOrder,
    deleteOrder,
    deleteProductFromOrder,
    getAllOrders,
    getAllOrdersByUserId,
    getOrderById,
    updateOrder,
    updateOrderProductQuantity
} from "../controllers/OrdersController.js";
import checkAuth from '../utils/checkAuth.js';
import checkAdmin from '../utils/checkAdmin.js';

const router = express.Router();

router.get('/', checkAuth, getAllOrdersByUserId);
router.get('/all', checkAuth, checkAdmin, getAllOrders);
router.get('/:orderId', checkAuth, checkAdmin, getOrderById);
router.post('/:product', checkAuth, addToOrder);
router.delete('/:orderId', checkAuth, checkAdmin, deleteOrder);
router.put('/:orderId', checkAuth, checkAdmin, updateOrder);
router.put('/:orderId/:product', checkAuth, updateOrderProductQuantity);
router.delete('/:orderId/:product', checkAuth, deleteProductFromOrder);

export default router;
