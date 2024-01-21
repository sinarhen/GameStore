import { useContext, useCallback } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { addToFavorites, removeFromFavorites } from '../lib/favorites';

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  const [favorites, setFavorites] = context;

  const toggleFavorite = useCallback(async (productId: string) => {
    const isFavorite = (favorites as string[]).includes(productId);
    const method = isFavorite ? 'delete' : 'post';

    try {
      if (method === 'post') {
        addToFavorites(productId);
      } else {
        removeFromFavorites(productId);
      }
      
      setFavorites((prevFavorites: string[]) => {
        if (isFavorite) {
          return prevFavorites.filter(id => id !== productId);
        } else {
          return [...prevFavorites, productId];
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [favorites, setFavorites]);

  return { favorites, toggleFavorite };
};

