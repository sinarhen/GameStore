
import axios from "axios";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { ProductCardType } from "../lib/types";
import Filters from "../components/Filters";
import AnimatedSeparator from "../components/AnimatedSeparator";
import Pagination from "../components/Pagination";
import { getAllProducts } from "../lib/products";



const appearDuration = 0.7;
const delay = 0.3;

export default function Products(){
    const [products, setProducts] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    
    useEffect(() => {
        getAllProducts()
        .then((response) => {
            if (!response.data.length)
            {
                toast.error("No products found");
                return;
            }
            setProducts(response.data);
        })
        .catch((error) => {
            console.log(error);
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
        return NotFound({helperText: "Please try again later.", withRefresh: true});
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return(
        <>
            <div className="w-full h-full">
                <Header animateableText="Products." appearDuration={appearDuration} />
                <AnimatedSeparator delay={appearDuration + delay}/>
                {/* Filterby, orderby, pagination  */}
                <Filters products={products} onProductsChange={setProducts}/>
                
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4  gap-4 w-full">
                    {currentItems && currentItems.map((product: ProductCardType, index: number) => (
                                      <motion.div
                                      key={product._id + index}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className="w-full h-full"
                                      exit={{ opacity: 0 }}
                                      transition={{ delay: appearDuration+ index * 0.05, duration: appearDuration}}
                                    >
                                        <ProductCard product={product}/>

                                    </motion.div>

                    )
                    )}
                </div>
                <Pagination 
                    itemsPerPage={itemsPerPage} 
                    totalItems={products.length} 
                    paginate={paginate} 
                    currentPage={currentPage}
                />
            
            </div>
    
        </>
         
    );
}