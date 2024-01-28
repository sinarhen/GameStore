import {motion} from "framer-motion";
import ProductCard from "./ProductCard";
import {useFavorites} from "../hooks/useFavorites";

export default function MyFavorites() {
  const {favorites} = useFavorites();

  if (!favorites.length) return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{delay: 3, duration: 1}}
      className="mt-4"
    >
      <p className="text-3xl text-zinc-600">У вас ще немає обраних товарів.</p>
    </motion.div>
  )
  return (
    <div className="flex gap-x-4 w-full mt-10 overflow-scroll snap snap-x"
         style={{scrollSnapType: 'x mandatory', scrollBehavior: 'smooth'}}>
      {favorites.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map((favorite: any, index: number) => (
        <motion.div
          key={favorite._id + index}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{delay: 0.7 + index * 0.1, duration: 1}}
          className="snap-start w-[95%] sm:w-1/2  md:w-1/3 lg:w-1/4"
          style={{scrollSnapAlign: 'start', flex: '0 0 auto'}}
        >
          <ProductCard key={favorite._id} product={favorite}/>
        </motion.div>
      ))}
    </div>
  )

}