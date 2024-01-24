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


const sortByPrice = (a: ProductCardType, b: ProductCardType) => a.price - b.price;
const sortByName = (a: ProductCardType, b: ProductCardType) => a.name.localeCompare(b.name);
const sortByDate = (a: ProductCardType, b: ProductCardType) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();

export default function Filters({products, onProductsChange, setLoading, setError}: {
    products: ProductCardType[];
    onProductsChange: (
        products: ProductCardType[]
    ) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
}){
    const [filterBy, setFilterBy] = useState<string>('price');
    const [orderBy, setOrderBy] = useState<string>('asc');
    const [categories, setCategories] = useState<CategoryType[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        if (products) {
            const filteredProducts = sortProducts(products);
            onProductsChange(filteredProducts);
        }
    }, [filterBy, orderBy, products]);

    useEffect(() => {
        if (selectedCategory && products) {
          onProductsChange(products.filter((product) => product.categoryId._id === selectedCategory));
        } else {
          onProductsChange(products);
        }
      }, [selectedCategory, products]);

    function sortProducts(products: ProductCardType[]) {
        let filteredProducts = [...products];
        if (filterBy === 'price') {
            filteredProducts.sort(sortByPrice);
        } else if (filterBy === 'name') {
            filteredProducts.sort(sortByName);
        } else if (filterBy === 'date') {
            filteredProducts.sort(sortByDate);
        }
    
        if (orderBy === 'desc') {
            filteredProducts.reverse();
        }
        return filteredProducts;
    }

    function clearFilters() {
        setFilterBy('price');
        setOrderBy('asc');
        setSelectedCategory(null);
    };

    const filterByOptions = [
        { label: 'Price', value: 'price' },
        { label: 'Name', value: 'name' },
        { label: 'Date', value: 'date' },
    ];
    const orderByOptions = [
        { label: 'Ascending', value: 'asc' },
        { label: 'Descending', value: 'desc' },
    ];

    useEffect(() => {
        getAllCategories()
          .then((response) => {
            setCategories(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            toast.error(`Something went wrong: ${error.message}`, { id: "categories" });
            setError(`Something went wrong while fetching categories: ${error.message}`);
          });
      }, []);
      console.log(selectedCategory, filterBy, orderBy)
    return (
        <>
            <div className="flex justify-between  text-sm items-center w-full py-10">
                <div className="flex items-center  gap-x-2">
                    <span>Filter</span>
                    <Select onValueChange={setFilterBy}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="---------" />
                        </SelectTrigger>
                        <SelectContent className="text-white bg-black">
                            {filterByOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-x-2 items-center">
                    <span>Order</span>
                    <Select onValueChange={setOrderBy}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="-------" />
                        </SelectTrigger>
                        <SelectContent className="text-white bg-black">
                            {orderByOptions.map((option) => (
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

                        <Button onClick={() => {setSelectedCategory(category._id); }} className={cn("rounded-3xl bg-white text-black hover:bg-gray-300 border border-transparent", selectedCategory === category._id ? "bg-gray-400 border-indigo-600" : "")}>{category.name}</Button>

                      </motion.div>
                    ))}
                </div>
                {(selectedCategory != null || filterBy !== 'price' || orderBy !== 'asc' )&& (
                    <p onClick={clearFilters} className="flex text-sm items-center hover:bg-gray-400 sm:hover:bg-transparent rounded-full p-8 sm:bg-transparent sm:rounded-none sm:p-0 bg-gray-300 cursor-pointer text-gray-600 mt-4 absolute right-2 bottom-4 z-50 hover:underline sm:relative justify-center gap-x-2 w-max">    
                        <PiBroom className="h-4 w-4"/> <span className="hidden sm:flex">Clear</span> 
                    </p>

                )}
       
            </div>
        </>
    )
}