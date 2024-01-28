import {CiHeart} from "react-icons/ci";
import {FaHeart} from "react-icons/fa";

import {useFavorites} from '../hooks/useFavorites';
import {ProductCardType} from "../lib/types";

export default function Favorite({product}: { product: ProductCardType; }) {


  const {favorites, toggleFavorite} = useFavorites();
  const favorite = favorites.find(favorite => favorite?._id === product?._id)
  return (
    <>
      {favorite?._id ? (
        <FaHeart onClick={() => toggleFavorite(product)} color='red' className="cursor-pointer text-4xl"/>) : (
        <CiHeart onClick={() => toggleFavorite(product)} color='red' className="cursor-pointer text-4xl"/>
      )
      }

    </>
  )
}