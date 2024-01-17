import { useEffect, useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

import axios from 'axios';

export default function Favorite({productId}: { productId: string; }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // Replace with the correct API endpoint and method
        axios.get(`/favorites/${productId}`)
            .then(response => setIsFavorite(response.data.isFavorite))
            .catch(error => console.error(error));
    }, [productId]);

    const toggleFavorites = () => {
        const method = isFavorite ? 'delete' : 'post';
        // Replace with the correct API endpoint
        axios[method](`/favorites/${productId}`)
            .then(response => setIsFavorite(!isFavorite))
            .catch(error => console.error(error));
    }

    return (
        <>
            {isFavorite ? ( 
                <FaHeart  onClick={toggleFavorites} color='red' className=" text-4xl" />) : (
                    <CiHeart onClick={toggleFavorites} color='red' className=" text-4xl" />
                )
            }
        
        </>
    )
}