import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';

export default function Favorite() {
  const [favorites, setFavorites] = useContext(FavoritesContext)!;

//   console.log(favorites[0].productId);
  return (
    <div className="p-20">
      <h1>Favorites</h1>
      
    </div>
  );
}