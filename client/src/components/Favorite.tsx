import { CiHeart } from "react-icons/ci";

export default function Favorite({productId}: {
    productId: string;
}){
    const toggleFavorites = () => {
        // TODO: Add to favorites if not in favorites, remove from favorites if in favorites
    
        console.log("Add to favorites");
    }

    return (
        <CiHeart fill="red" onClick={toggleFavorites} className="text-red-500 text-2xl" />
    )
}  