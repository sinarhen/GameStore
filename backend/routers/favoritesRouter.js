import express from 'express';
import {getAllFavoritesByUserId, addFavorite, deleteFavorite} from "../controllers/FavoritesController.js";
import checkAuth from '../utils/checkAuth.js';

const router = express.Router();

router.get('/', checkAuth, getAllFavoritesByUserId);
router.post('/:productId', checkAuth, addFavorite);
router.delete('/:productId', checkAuth, deleteFavorite);


export default router;
