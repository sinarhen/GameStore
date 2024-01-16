
import axios from "axios";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { ProductCardType } from "../../lib/types";
import Filters from "../components/Filters";
import AnimatedSeparator from "../components/AnimatedSeparator";


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
            setLoading(false);
        });
    }, [])   

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
                <AnimatedSeparator appearDuration={1}/>
                {/* Filterby, orderby, pagination  */}
                <Filters products={products} onProductsChange={setProducts}/>
                
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