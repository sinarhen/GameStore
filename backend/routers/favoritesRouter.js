import express from 'express';
import {addFavorite, deleteFavorite, getAllFavoritesByUserId} from "../controllers/FavoritesController.js";
import checkAuth from '../utils/checkAuth.js';

const router = express.Router();

router.get('/', checkAuth, getAllFavoritesByUserId);
router.post('/:productId', checkAuth, addFavorite);
router.delete('/:productId', checkAuth, deleteFavorite);


export default router;
