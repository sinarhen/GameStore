import { motion } from "framer-motion";
import { ProductCardType } from "../lib/types";
import ProductCard from "./ProductCard";

export default function MyFavorites({favorites}: {
    favorites: ProductCardType[]
}){
    if (!favorites.length) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 3, duration: 1}}
            className="mt-4"
        >
            <p className="text-3xl text-zinc-600">You have no favorites yet.</p>
        </motion.div>
    )
    return (
        <div className="flex gap-x-4 w-full mt-10 overflow-x-scroll snap snap-x" style={{scrollSnapType: 'x mandatory', scrollBehavior: 'smooth'}}>
            {favorites.map((favorite: any, index: number) => (
                <motion.div
                    key={favorite._id + index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 1}}
                    className="snap-start w-[95%] sm:w-1/2  md:w-1/3 lg:w-1/4"
                    style={{scrollSnapAlign: 'start', flex: '0 0 auto'}}
                >
                    <ProductCard key={favorite._id} product={favorite}/>
                </motion.div>
            ))}
        </div>
    )                       
                  
}