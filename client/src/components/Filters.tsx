import { useEffect, useState } from "react";
import { CategoryType, ProductCardType } from "../lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";
import { motion } from "framer-motion";
import Button from "./Button";
import { getAllCategories } from "../lib/categories";
import toast from "react-hot-toast";
import { appearDuration, delay, delayPerItem } from "../lib/constants";
import { cn } from "../lib/utils";
import { PiBroom } from "react-icons/pi";

const sortByOptions = [
    { label: 'Price (Lowest first)', value: 'price_asc' },
    { label: 'Price (Highest first)', value: 'price_desc' },
    { label: 'A-Z', value: 'name_asc' },
    { label: 'Z-A', value: 'name_desc' },
    { label: 'Recently added', value: 'date_desc' },
    { label: 'Oldest by date', value: 'date_asc' },
];
const pageSizeOptions = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 },
    { label: '50', value: 50 },
];
const sortByPrice = (a: ProductCardType, b: ProductCardType) => a.price - b.price;
const sortByName = (a: ProductCardType, b: ProductCardType) => a.name.localeCompare(b.name);
const sortByDate = (a: ProductCardType, b: ProductCardType) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();

export default function Filters({products, pageSize, onProductsChange, setLoading, setError, setPageSize}: {
    products: ProductCardType[];
    pageSize: number;
    setPageSize: (size: number) => void;
    onProductsChange: (
        products: ProductCardType[]
    ) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
}){
    const [orderBy, setOrderBy] = useState<string>('asc');
    const [categories, setCategories] = useState<CategoryType[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        if (products) {
            const filteredProducts = sortProducts(products);
            onProductsChange(filteredProducts);
        }
    }, [pageSize, orderBy, products]);

    useEffect(() => {
        console.log(selectedCategory)
        if (selectedCategory && products) {
            console.log(products)
          onProductsChange(products.filter((product) => product.category?._id === selectedCategory));
        } else {
          onProductsChange(products);
        }
      }, [selectedCategory, products]);

      function sortProducts(products: ProductCardType[]) {
        let sortedProducts = [...products];
        switch (orderBy) {
            case 'price_asc':
                sortedProducts.sort(sortByPrice);
                break;
            case 'price_desc':
                sortedProducts.sort(sortByPrice).reverse();
                break;
            case 'name_asc':
                sortedProducts.sort(sortByName);
                break;
            case 'name_desc':
                sortedProducts.sort(sortByName).reverse();
                break;
            case 'date_asc':
                sortedProducts.sort(sortByDate);
                break;
            case 'date_desc':
                sortedProducts.sort(sortByDate).reverse();
                break;
        }
        return sortedProducts;
    }

    function clearFilters() {
        setOrderBy('price_asc');
        setPageSize(10);
        setSelectedCategory(null);
    };


    useEffect(() => {
        getAllCategories()
          .then((response) => {
            setCategories(response.data);
            setLoading(false);
          })
          .catch((error) => {
            toast.error(`Something went wrong: ${error.message}`, { id: "categories" });
            setError(`Something went wrong while fetching categories: ${error.message}`);
          });
      }, []);

    const isFilterApplied = (selectedCategory != null || pageSize !== 10 || orderBy !== 'price_asc' )
    return (
        <>
            <div className="flex flex-col sm:flex-row gap-y-4 justify-between  text-sm items-center w-full sm:py-10 py-4">
                <div className="flex items-center  gap-x-2">
                    <span>Items</span>
                    <Select defaultValue="10" onValueChange={(val) => setPageSize(parseInt(val))}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="---------" />
                        </SelectTrigger>
                        <SelectContent className="text-white bg-black">
                            {pageSizeOptions.map((option) => (
                                <SelectItem key={option.value} value={`${option.value}`}>
                                    {option.label}
                                </SelectItem>
                            ))}
                            
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center  gap-x-2">
                    <span>Filter</span>
                    <Select defaultValue="price_asc" onValueChange={setOrderBy}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="---------" />
                        </SelectTrigger>
                        <SelectContent className="text-white bg-black">
                        {sortByOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row mb-5 justify-between items-center">

                <div className="flex gap-4 items-center w-full ">
                    {categories?.map((category: any, index) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: index* delayPerItem + appearDuration + delay, duration: appearDuration}}
                        key={category._id}
                      >
                        <Button onClick={() => {setSelectedCategory(category._id); }} className={cn("rounded-3xl bg-white text-black hover:bg-gray-300 border border-transparent", selectedCategory === category._id ? "bg-gray-400 border-indigo-600" : "")}>{category.name} ({category.products?.length})</Button>
                      </motion.div>
                    ))}
                    

                </div>
                {isFilterApplied && (

                    <p onClick={clearFilters} className={"text-sm items-center hover:bg-gray-400 sm:hover:bg-transparent rounded-full p-8 sm:bg-transparent sm:rounded-none sm:p-0 bg-gray-300 cursor-pointer text-gray-600 absolute right-2 bottom-4 z-50 hover:underline sm:relative justify-center gap-x-2 w-max"}>    
                        <PiBroom className="h-4 w-4"/> <span className="hidden sm:flex">Clear</span> 
                    </p>
                )}
       
            </div>
        </>
    )
}