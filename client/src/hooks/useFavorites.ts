import { useContext, useCallback, useEffect } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { addToFavorites, removeFromFavorites } from '../lib/favorites';
import { ProductCardType } from '../lib/types';
import toast from 'react-hot-toast';

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  const [favorites, setFavorites] = context;

  const toggleFavorite = useCallback(async (product: ProductCardType) => {
    const isFavorite = (favorites as ProductCardType[]).find((favorite: ProductCardType) => favorite._id === product._id);
    const method = isFavorite ? 'delete' : 'post';

    try {
      if (method === 'post') {
        addToFavorites(product._id);
      } else {
        removeFromFavorites(product._id);
      }
      
      setFavorites((prevFavorites: ProductCardType[]) => {
        if (isFavorite) {
          return prevFavorites.filter(favorite => favorite._id !== product._id);
        } else {
          return [...prevFavorites, product];
        }
      });
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  }, [favorites, setFavorites]);


  return { favorites, toggleFavorite };
};

