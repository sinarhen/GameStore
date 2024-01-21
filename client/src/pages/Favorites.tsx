import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';

export default function Favorites() {
  const [favorites, setFavorites] = useContext(FavoritesContext)!;

  return (
    <div className="p-20">
      <h1>Favorites</h1>
      
    </div>
  );
}