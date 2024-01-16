
import axios from "axios";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotFound from "../components/NotFound";


export default function Products(){
    const [products, setProducts] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get("/api/products")
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
    return(
        <>
            {products ? products.map((product: any) => 
                <ProductCard product={product}/>
            ): (
                <NotFound />
            )}
        
        </>
    
    );
}