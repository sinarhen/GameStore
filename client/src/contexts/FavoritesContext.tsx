import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { getFavorites } from '../lib/favorites';
import { ProductCardType } from '../lib/types';
import toast from 'react-hot-toast';

type FavoritesContextType = { favorites: ProductCardType[], setFavorites: Dispatch<SetStateAction<ProductCardType[]>> };

// Create the context with the correct type
export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [favorites, setFavorites] = useState<ProductCardType[]>([]);

  useEffect(() => {
    // Replace with the correct API endpoint to get all favorites
    getFavorites().then((favorites) => {
      setFavorites(favorites.data);
    }).catch((error) => {
      toast.error("Something went wrong", { id: "favorites" });
      console.error(error);
    }).finally(() => {

    })}, []);

  return (
    <FavoritesContext.Provider value={{favorites, setFavorites}}>
      {children}
    </FavoritesContext.Provider>
  );
};