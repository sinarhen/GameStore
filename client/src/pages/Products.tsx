
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
    const [filterBy, setFilterBy] = useState<string>('price');
    const [orderBy, setOrderBy] = useState<string>('asc');
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

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterBy(event.target.value);
    }

    const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderBy(event.target.value);
    }
    useEffect(() => {
        console.log(filterBy, orderBy)
        if (products) {
            const filteredProducts = sortProducts(products);
            setProducts(filteredProducts);
        }
    }, [filterBy, orderBy]);

    function sortProducts(products: ProductCardType[]) {
        let filteredProducts = [...products];
        if (filterBy === 'price') {
            filteredProducts.sort((a: ProductCardType, b: ProductCardType) => a.price - b.price);
        } else if (filterBy === 'name') {
            filteredProducts.sort((a: ProductCardType, b: ProductCardType) => a.name.localeCompare(b.name));
        } else if (filterBy === 'date') {
            filteredProducts.sort((a: ProductCardType, b: ProductCardType) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
        }
    
        if (orderBy === 'desc') {
            filteredProducts.reverse();
        }
        return filteredProducts;
    }
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
                            <select onChange={(e) => setFilterBy(e.target.value)} className="border-2 text-black border-gray-400 rounded-md">
                                <option value="price">Price</option>
                                <option value="name">Name</option>
                                <option value="date">Date</option>
                            </select>
                        </div>
                        <div className="flex gap-x-2">
                            <span>Order by</span>
                            <select onChange={(e) => setOrderBy(e.target.value)} className="border-2  text-black border-gray-400 rounded-md">
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