import React, {createContext, useState, useEffect, Dispatch, SetStateAction} from 'react';
import {getFavorites} from '../lib/favorites';
import {ProductCardType} from '../lib/types';
import toast from 'react-hot-toast';
import {AxiosError} from 'axios';
import {useCurrentUser} from '../hooks/useCurrentUser';

type FavoritesContextType = { favorites: ProductCardType[], setFavorites: Dispatch<SetStateAction<ProductCardType[]>> };

// Create the context with the correct type
export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({children}: {
  children: React.ReactNode
}) => {
  const [favorites, setFavorites] = useState<ProductCardType[]>([]);
  const {user} = useCurrentUser();

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

  return (
    <FavoritesContext.Provider value={{favorites, setFavorites}}>
      {children}
    </FavoritesContext.Provider>
  );
};