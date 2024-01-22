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
    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [order, setOrder] = React.useState<Order | null>(null);

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

    const getOrderAsync = async () => {
        try {
            setLoading(true)
            setOpen(true)
            const order = (await getOrder(id)).data
            console.log(order)
            setOrder(order)
            toast.success("Order found")
        } catch (err){
            toast.error("Something went wrong")
            console.error(err)
            setOpen(false)

        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <h1 className="pb-4" >All Orders</h1>
            <Button disabled={!id} className="mb-4" onClick={getOrderAsync}>Search</Button>
            <Input
                name="orderId"
                type="text"
                placeholder="Order ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <Orders orders={orders}/>

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