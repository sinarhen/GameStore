
import axios from "axios";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { ProductCardType } from "../../lib/types";


export default function Products(){
    const [products, setProducts] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get("/products")
        .then((response) => {
            if (!response.data.length)
            {
                toast.error("No products found");
                return;
            }
            setProducts(response.data);
        })
        .catch((error) => {
            toast.error("Something went wrong", {id: "products"});
        }).finally(() => {
            // setTimeout(() => {
                setLoading(false);
            // }, 1000)
        });
    })   

    if (loading){
        return (
            <div className="w-full h-full">
                <div className="flex justify-center items-center w-full h-full">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2"></div>
                </div>
            </div>
        )
    }
    if (!products){
        return NotFound();
    }
    return(
        <>
            <div className="pt-20 w-full h-full">
                <Header animateableText="Products." appearDuration={1} />
                
                {/* Filterby, orderby, pagination  */}
                <div className="flex justify-between  text-sm items-center w-full py-10">
                        <div className="flex gap-x-2">
                            <span>Filter by</span>
                            <select className="border-2 text-black border-gray-400 rounded-md">
                                <option value="price">Price</option>
                                <option value="name">Name</option>
                                <option value="date">Date</option>
                            </select>
                        </div>
                        <div className="flex gap-x-2">
                            <span>Order by</span>
                            <select className="border-2  text-black border-gray-400 rounded-md">
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                </div>
                
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4  gap-4 w-full h-full">
                    {products && products.map((product: ProductCardType, index: number) => (
                                      <motion.div
                                      key={product._id}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      transition={{ delay: index * 0.3, duration: 1}}
                                    >
                                        <ProductCard product={product}/>

                                    </motion.div>

                    )
                    )}
                </div>
                
            
            </div>
    
        </>
         
    );
}