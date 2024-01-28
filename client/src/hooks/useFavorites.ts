import {useCallback, useContext} from 'react';
import {FavoritesContext} from '../contexts/FavoritesContext';
import {addToFavorites, removeFromFavorites} from '../lib/favorites';
import {ProductCardType} from '../lib/types';
import toast from 'react-hot-toast';
import {useCurrentUser} from './useCurrentUser';
import {useAuthDialog} from './useAuthDialog';

export const useFavorites = () => {
  const {user} = useCurrentUser();
  const {openAuthDialog} = useAuthDialog();
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  const {favorites, setFavorites} = context;

  const toggleFavorite = useCallback(async (product: ProductCardType) => {
    const isFavorite = (favorites as ProductCardType[]).find((favorite: ProductCardType) => favorite?._id === product?._id);
    const method = isFavorite ? 'delete' : 'post';

    try {
      if (user !== null) {


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
      } else {
        openAuthDialog('login');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong! Unable to get your favorites');
    }
  }, [favorites, setFavorites]);


  return {favorites, toggleFavorite};
};

