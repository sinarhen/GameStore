import Input from "../components/Input";
import Button from "../components/Button";

import React from "react";
import { getOrder } from "../lib/order";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../components/Dialog";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { Order } from "../lib/types";
import { statusColor } from "../lib/utils";

export default function Admin() {
    const [id, setId] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);

    const [order, setOrder] = React.useState<Order | null>(null); // [order, setOrder
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
            <h1 className="pb-4" >Change Order Status</h1>
            <Input
                name="orderId"
                type="text"
                placeholder="Order ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <Button disabled={!id} className="mt-4" onClick={getOrderAsync}>Search</Button>

            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent className="bg-black text-white">
                    {loading ? Loading() : (
                        <>
                        <DialogHeader>
                            <h1>Order Details</h1>
                        </DialogHeader>
                        <div className="flex flex-col gap-y-2">
                            <div className="flex gap-x-2">
                                <p className="font-semibold">Order ID:</p>
                                <p>{order?._id}</p>
                            </div>
                            <div className="flex gap-x-2">
                                <p className="font-semibold">Status:</p>
                                <p className={order?.status && statusColor(order?.status)}>{order?.status}</p>
                            </div>
                            <div className="flex gap-x-2">
                                <p className="font-semibold">User ID:</p>
                                <p>{order?.userId?._id}</p>
                            </div>
                            <div className="flex gap-x-2">
                                <p className="font-semibold">User Name:</p>
                                <p>{order?.userId?.name}</p>
                            </div>
                            <div className="flex gap-x-2">
                                <p className="font-semibold">User Email:</p>
                                <p>
                                    {order?.userId?.email}
                                </p>
                            </div>
                        </div>
                    
                        </>
                    ) }
                    </DialogContent>
            </Dialog>
        </>
    );
}