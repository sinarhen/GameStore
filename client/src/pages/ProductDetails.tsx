import { useEffect, useState } from "react";
import { ProductCardType } from "../lib/types";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getProductById } from "../lib/products";
import Loading from "../components/Loading";
import { formatter } from '../lib/utils';
import Section from "../components/Section";
import Header from "../components/Header";
import { motion } from 'framer-motion';


export default function ProductDetails(){
    const [product, setProduct] = useState<ProductCardType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const appearDuration = 0.7;
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

    if (loading){
        return Loading();
    }
    if (!product){
        return <div>Product not found</div>
    }
    return (
        <>
        
            <Section >
                <div className="flex flex-col justify-center items-center">
                        <div>
                            
                            <div className="w-full h-96 justify-center flex">
                                <div className="w-full overflow-hidden">

                                    <img alt="" className="rounded-lg h-full w-full object-cover object-center" 
                                        src={product.imageUrl}>
                                    </img>
                                </div>
                                
                            </div>
                        </div>
                        
                        <motion.p 
                            className="text-indigo-400 text-xl mt-8"
                            initial={{opacity: 0}}
                            transition={{delay: appearDuration, duration: appearDuration}}
                            animate={{opacity: 1, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
                        >
                            {formatter.format(product.price)}
                        </motion.p>
                        <Header className="text-5xl mt-1" animateableText={product.name} appearDuration={appearDuration} />

                    </div>
            
            </Section>
            
        </>
    )
}