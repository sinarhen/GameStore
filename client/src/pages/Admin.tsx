import Input from "../components/Input";
import Button from "../components/Button";

import React from "react";
import { getOrder, getAllOrders } from "../lib/order";
import toast from "react-hot-toast";
import { Order } from "../lib/types";
import Section from "../components/Section";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../components/Dialog";
import CreateProductForm from "../components/CreateProductForm";
import Orders from '../components/Orders';

export default function Admin() {
    const [id, setId] = React.useState("");
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [query, setQuery] = React.useState("");
    const [filteredOrders, setFilteredOrders] = React.useState<Order[]>([]);

    const getAllOrdersAsync = async () => {
        try {
            const orders = (await getAllOrders())?.data;
            setOrders(orders);
            console.log( "orders" ,orders);
        } catch (err){
            console.error(err)
        }
    }

    React.useEffect(() => {
        getAllOrdersAsync();
    }, []);

    React.useEffect(() => {
        setFilteredOrders(orders.filter((order) => order._id.includes(query)));
    }, [query]);

    return (
        <>
            <h1 className="pb-4" >All Orders</h1>
            <Input
                name="orderId"
                type="text"
                placeholder="Order ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Orders setOrders={setOrders} orders={query ? filteredOrders : orders}/>

        <Section>
            <div className="flex mt-20 gap-x-4 items-center">
                
                <h1 className="">
                    Products 
                </h1>
                <Dialog>
                    <DialogTrigger>
                        <Button className="group flex items-center gap-x-1">
                            Create product
                            <PlusCircle className="group-hover:rotate-90 transition-transform"/>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <CreateProductForm />
                    </DialogContent>
                    
                </Dialog>
            </div>
            
        </Section>
            
        </>
    );
}