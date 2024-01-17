import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { getFavorites } from '../lib/favorites';

type FavoritesContextType = [string[], Dispatch<SetStateAction<string[]>>];

// Create the context with the correct type
export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Replace with the correct API endpoint to get all favorites
    getFavorites().then((favorites) => {
      setFavorites(favorites);
    });

  }, []);

  return (
    <FavoritesContext.Provider value={[favorites, setFavorites]}>
      {children}
    </FavoritesContext.Provider>
  );
};