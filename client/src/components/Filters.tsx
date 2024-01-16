import { useEffect, useState } from "react";
import { ProductCardType } from "../lib/types";

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
    return (
        <>
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
        </>
    )
} 