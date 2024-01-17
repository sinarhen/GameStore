import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

import { useFavorites } from '../hooks/useFavorites';

export default function Favorite({productId}: { productId: string; }) {
    
    const {favorites, toggleFavorite} = useFavorites();
    return (
        <>
            {favorites.includes(productId) ? ( 
                <FaHeart  onClick={() => toggleFavorite(productId)} color='red' className=" text-4xl" />) : (
                    <CiHeart onClick={() => toggleFavorite(productId)} color='red' className=" text-4xl" />
                )
            }
        
        </>
    )
}