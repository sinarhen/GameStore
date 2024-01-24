import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { CategoryType, ProductCardType } from "../lib/types";
import Filters from "../components/Filters";
import AnimatedSeparator from "../components/AnimatedSeparator";
import Pagination from "../components/Pagination";
import { getAllProducts } from "../lib/products";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { getAllCategories } from "../lib/categories";
import { cn } from "../lib/utils";


const appearDuration = 0.7;
const delay = 0.3;

export default function Products(){
    const [products, setProducts] = useState<ProductCardType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<CategoryType[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    
    useEffect(() => {
        getAllCategories()
        .then((response) => setCategories(response.data))
        .catch((error) => {
            console.log(error);
            toast.error("Something went wrong", {id: "categories"});
        });
    }, []);

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
    }, []);

    

    if (loading){
        return Loading();
    }
    if (!products){
        return NotFound({helperText: "Please try again later.", withRefresh: true});
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId._id === selectedCategory)
    : products;
    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return(
        <>
            <div className="w-full h-full">
                <Header animateableText="Products." appearDuration={appearDuration} />
                <AnimatedSeparator delay={appearDuration + delay}/>
                <Filters products={products} onProductsChange={setProducts}/>

                <div className="flex gap-4 w-full mb-5">
                    {categories?.map((category: any) => (
                        <Button onClick={() => {setSelectedCategory(category._id); }} className={cn("rounded-3xl bg-white text-black hover:bg-gray-300", selectedCategory === category._id ? "bg-gray-300" : "")}>{category.name}</Button>
                    ))}
                </div>
                
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4  gap-4 w-full">
                    {filteredProducts && filteredProducts.map((product: ProductCardType, index: number) => (
                                      <motion.div
                                      key={product?._id + index + selectedCategory}
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