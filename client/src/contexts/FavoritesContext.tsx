import React, {createContext, useCallback, useEffect, useState} from 'react';
import {addToFavorites, getFavorites, removeFromFavorites} from '../lib/favorites';
import {FavoritesContextType, ProductCardType} from '../lib/types';
import {useCurrentUser} from '../hooks/useCurrentUser';
import {useAuthDialog} from "../hooks/useAuthDialog";
import toast from "react-hot-toast";


// Create the context with the correct type
export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({children}: {
  children: React.ReactNode
}) => {
  const [favorites, setFavorites] = useState<ProductCardType[]>([]);
  const {user} = useCurrentUser();
  const {openAuthDialog} = useAuthDialog();

  useEffect(() => {
    if (user) {
      getFavorites().then((favorites) => {
        setFavorites(favorites.data);
      }).catch((error) => {
        if (error.status === 403) {
          return;
        }
      }).finally(() => {

      })
    }
  }, [user]);

  const toggleFavorite = useCallback(async (product: ProductCardType) => {
    const isFavorite = (favorites as ProductCardType[]).find((favorite: ProductCardType) => favorite?._id === product?._id);
    const method = isFavorite ? 'delete' : 'post';

    try {
      if (user !== null) {
        if (method === 'post') {
          await addToFavorites(product._id);
        } else {
          await removeFromFavorites(product._id);
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
        toast.error('Ви повинні бути авторизованим щоб додати в обране.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Щось пішло не так! Не вдалося додати/прибрати з улюблених.');
    }
  }, [favorites, setFavorites, user, openAuthDialog]);


  return (
    <FavoritesContext.Provider value={{favorites, setFavorites, toggleFavorite}}>
      {children}
    </FavoritesContext.Provider>
  );
};