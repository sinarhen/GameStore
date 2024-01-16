import express from 'express';
import { getAllFavoritesByUserId, addFavorite, deleteFavorite } from "../controllers/FavoritesController.js";

const router = express.Router();

router.get('/', getAllFavoritesByUserId);
router.post('/:productId',  addFavorite);
router.delete('/:productId',  deleteFavorite);


export default router;
