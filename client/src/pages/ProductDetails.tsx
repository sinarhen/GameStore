import { useEffect, useState } from "react";
import { ProductCardType } from "../lib/types";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getProductById } from "../lib/products";

export default function ProductDetails(){
    const [product, setProduct] = useState<ProductCardType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const params = useParams();
    const productId = params.productId;
    useEffect(() => {
        getProductById(productId)
        .then((response) => {
            if (!response.data)
            {
                toast.error("Product not found");
                return;
            }
            setProduct(response.data);
        })
        .catch((error) => {
            console.log(error);
            toast.error("Something went wrong", {id: "products"});
        }).finally(() => {
            setLoading(false);
        });
    }, [productId])

    return (
        <>
        sad
        </>
    )
}