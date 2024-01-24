import { useEffect, useState } from "react";
import { ProductCardType } from "../lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";

export default function Filters({products, onProductsChange}: {
    products: ProductCardType[];
    onProductsChange: (
        products: ProductCardType[]
    ) => void;

}){
    const [filterBy, setFilterBy] = useState<string>('price');
    const [orderBy, setOrderBy] = useState<string>('asc');

    useEffect(() => {
        if (products) {
            const filteredProducts = sortProducts(products);
            onProductsChange(filteredProducts);
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

    function clearFilters() {
        setFilterBy('price');
        setOrderBy('asc');
    };
    return (
        <>
                        <div className="flex justify-between  text-sm items-center w-full py-10">
                        <div className="flex items-center  gap-x-2">
                            <span>Filter by</span>
                            <Select onValueChange={setFilterBy}>
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="---------" />
                                </SelectTrigger>
                                <SelectContent className="text-white bg-black">
                                    <SelectItem value="price">Price</SelectItem>
                                    <SelectItem value="name">Name</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                </SelectContent>
                            </Select>
                            
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <span>Order by</span>
                            
                            <Select onValueChange={setOrderBy}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="-------" />
                                </SelectTrigger>
                                <SelectContent className="text-white bg-black">
                                    <SelectItem value="asc">Ascending</SelectItem>
                                    <SelectItem value="desc">Descending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                </div>
        </>
    )
} 