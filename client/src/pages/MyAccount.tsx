
import AnimatedSeparator from "../components/AnimatedSeparator";
import EditProfileDialog from "../components/EditProfileDialog";
import Header from "../components/Header";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { FaUser } from "react-icons/fa";
import { useFavorites } from "../hooks/useFavorites";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

export default function MyAccount() {
    const { user } = useCurrentUser();
    const { favorites } = useFavorites();
    console.log(favorites)
    return (
        <>
            <div className='pt-24 flex gap-x-4 w-full '>
                <div className="h-60 min-w-60 flex items-center justify-center  w-60 rounded-3xl bg-neutral-800">
                    {user?.avatarUrl ? (
                        <img className="w-full h-full object-cover bg-center rounded-3xl" src={user?.avatarUrl} alt={"avatar"}/>
                    ): (
                        <FaUser className="w-3/4 h-3/4"/>
                    
                    )}
                </div>
                <div className="h-full overflow-clip">
                    <p className="text-zinc-600 ">{user?.email}</p>
                    <h1 className="text-7xl truncate mt-2 w-full h-auto">{user?.name}</h1>
                    <EditProfileDialog initialValues={{
                        name: user?.name,
                        email: user?.email,
                        avatarUrl: user?.avatarUrl
                    }}/>
                </div>
            </div>
            <div className="h-full w-full mt-24">
                <Header animateableText="Favorites" appearDuration={0.7} />
                <AnimatedSeparator appearDuration={0.7}/>
                {favorites.length ? (
                    <div className="flex gap-x-4 mt-10 overflow-x-scroll snap snap-x" style={{scrollSnapType: 'x mandatory', scrollBehavior: 'smooth'}}>
                    {favorites.map((favorite: any, index: number) => (
                        <motion.div
                            key={favorite._id + index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: index * 0.3, duration: 1}}
                            className="snap-start w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7"
                            style={{scrollSnapAlign: 'start', flex: '0 0 auto'}}
                        >
                            <ProductCard key={favorite._id} product={favorite}/>
                        </motion.div>
                    ))}
                </div>
                        
                ): (
                 <></>   
                )}
            </div>
        </>
    )
}