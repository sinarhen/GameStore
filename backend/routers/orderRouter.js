import express from 'express';
import { 
    addToOrder, 
    deleteOrderProduct, 
    getAllOrders, 
    getAllOrdersByUserId, 
    getOrderById, 
    updateOrderStatus, 
    deleteOrder, 
    updatePaymentStatus, 
    deleteProductFromOrder 
} from "../controllers/OrdersController.js";
import checkAuth from '../utils/checkAuth.js';
import checkAdmin from '../utils/checkAdmin.js';

const router = express.Router();

router.get('/', checkAuth, getAllOrdersByUserId);
router.get('/all', checkAuth, checkAdmin, getAllOrders);
router.get('/:orderId', checkAuth, checkAdmin, getOrderById);
router.post('/:productId', checkAuth, addToOrder);
router.delete('/:productId', checkAuth, deleteOrderProduct);
router.delete('/:orderId', checkAuth, checkAdmin, deleteOrder);
router.put('/:orderId', checkAuth, checkAdmin, updateOrderStatus);
router.put('/payment/:orderId', checkAuth, checkAdmin, updatePaymentStatus);
router.delete('/:orderId/:productId', checkAuth, deleteProductFromOrder);

export default router;
