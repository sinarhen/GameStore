import Input from "../components/Input";
import Button from "../components/Button";

import React from "react";
import { getOrder, getAllOrders } from "../lib/order";
import toast from "react-hot-toast";
import { Order, OrderProduct } from "../lib/types";
import { 
    Table, 
    TableBody, 
    TableCaption,
    TableCell,
    TableHead, 
    TableHeader, 
    TableRow
} from "../components/Table";
import { statusColor } from "../lib/utils";
import OrderDialog from "../components/OrderDialog";
import Section from "../components/Section";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../components/Dialog";
import CreateProductForm from "../components/CreateProductForm";

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

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogProducts, setDialogProducts] = React.useState<{
        products: OrderProduct[],
        orderId: string,
        status: string
    
    }| null>(null);

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
            <OrderDialog setProducts={setDialogProducts} status={dialogProducts?.status} open={dialogOpen} setOpen={setDialogOpen} products={dialogProducts}/>
            <Table className="mt-10 w-full h-full">
                <TableCaption>A list of your recent orders.</TableCaption>
                <TableHeader>
                    <TableRow className="bg-neutral-800">
                        <TableHead className="overflow-hidden">ID</TableHead>
                        <TableHead className="text-center w-full">Products</TableHead>
                        <TableHead className="text-center w-full">Status</TableHead>
                        <TableHead className="text-right align-center justify-end w-full">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order._id} className="cursor-pointer">
                            <TableCell className="w-[10px]">{order._id}</TableCell>
                            <TableCell
                                onClick={() => {
                                    setDialogOpen(true);
                                    setDialogProducts({
                                        status: order.status,
                                        orderId: order._id,
                                        products: order.products
                                    });
                                }}
                                className="text-center hover:underline cursor-pointer">
                                Products: {order.products.length}
                            </TableCell>
                            <TableCell className={statusColor(order.status) + " text-center"}>{order.status}</TableCell>
                            <TableCell className="text-right w-full">{order.totalPrice}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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