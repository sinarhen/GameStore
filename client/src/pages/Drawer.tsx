import Button from "../components/Button"
import Input from "../components/Input"
import { Label } from "@radix-ui/react-label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/DrawerSheet"
import { useState } from "react";
import { Order } from "../lib/types";
import { getUserOrdersById } from "../lib/order";
import React from "react";

export default function Drawer() {
    const [order, setOrder] = useState<Order[]>([]);

    

    React.useEffect(() => {
        async function getOrder() {
            try {
                const order = await getUserOrdersById();
                // console.log("order data", order.data[0].products[0].productId.price);
                setOrder(order.data);
            } catch (error) {
                console.log(error);
            }
        };

        getOrder();
    }, []);

    // console.log("order", order[0]?.products[0]?.productId?.price);

    return (
        <Sheet>
            <SheetTrigger>
                <Button>Cart</Button>
            </SheetTrigger>
            <SheetContent className="bg-neutral-800">
                <SheetHeader>
                    <SheetTitle className="text-white">Cart</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4 text-white">
                {order?.map((order) => (
                    <div className="grid grid-cols-5 items-center gap-4">
                        <img src={order?.products[0]?.productId?.imageUrl} className="w-16 h-16 rounded"/>
                        <p>{order?.products[0]?.productId?.name}</p>
                        <p className="px-20">${order?.products[0]?.productId?.price}</p>
                    </div>
                ))}
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button>Confirm Order</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
};