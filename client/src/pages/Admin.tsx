import Input from "../components/Input";
import Button from "../components/Button";
import ProductsTable from "../components/ProductsTable";

import React from "react";
import { getAllOrders } from "../lib/order";
import { getAllProducts } from "../lib/products";
import { Order, ProductCardType } from "../lib/types";
import Section from "../components/Section";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../components/Dialog";
import CreateProductForm from '../components/CreateProductForm';
import Orders from '../components/Orders';
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Header from "../components/Header";
import CreateCategoryForm from "../components/CreateCategoryForm";
import CreateProductDialog from "../components/CreateProductDialog";
import CreateCategoryDialog from "../components/CreateCategoryDialog";


export default function Admin() {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [products, setProducts] = React.useState<ProductCardType[] | null>(null);

    const [filteredProducts, setFilteredProducts] = React.useState<ProductCardType[] | null>([]);
    const [productQuery, setProductQuery] = React.useState("");

    const [query, setQuery] = React.useState("");
    const [filteredOrders, setFilteredOrders] = React.useState<Order[]>([]);

    const { isAdmin } = useCurrentUser();


    const getAllOrdersAsync = async () => {
        try {
            const orders = (await getAllOrders())?.data;
            setOrders(orders);
        } catch (err){
            console.error(err);
        }
    }

    const getAllProductsAsync = async () => {
        try {
            const products = (await getAllProducts())?.data;
            setProducts(products);
        } catch (err){
            console.error(err);
        }
    }

    React.useEffect(() => {
        getAllOrdersAsync();
        getAllProductsAsync();
    }, []);

    React.useEffect(() => {
        setFilteredOrders(orders.filter((order) => order._id.includes(query)));
    }, [query]);

    React.useEffect(() => {
        if (products) {
            setFilteredProducts(products?.filter((product) => product._id.includes(productQuery) || product.name?.includes(productQuery)));
        }
    }, [productQuery]);

    
    if (!isAdmin){
        return <Header baseText="You are not an admin" />
    }
    
    return (
        <>
        <Section className="pt-20 h-full">
            <h1 className="pb-4">All Orders</h1>
            <Input
                className="mb-4"
                name="orderId"
                type="text"
                placeholder="Order ID"
                value={query}
                onChange={(e: any) => setQuery(e.target.value)}
            />
            <Orders tableCaption="Orders" setOrders={setOrders} orders={query ? filteredOrders : orders}/>
        </Section>
        
        <Section className="pt-20 h-full">
            <div className="flex gap-4 items-center justify-between">
                <h1>All products</h1>
                <CreateProductDialog />

            </div>
            <Input 
                name="productId" 
                type="text" 
                placeholder="Product ID or name" 
                value={productQuery}
                className="mt-4"
                onChange={(e: any) => setProductQuery(e.target.value)}
            />

            <ProductsTable products={productQuery ? filteredProducts : products} setProducts={setProducts} />
        </Section>
        <Section className="pt-20 h-full">
            <div>
                <h1 className="pb-4">All categories</h1>
                <CreateCategoryDialog />
            </div>
        </Section>
            
        </>
    );
}