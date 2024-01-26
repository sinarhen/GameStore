import Button from "./Button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./Sheet"
import { CartContextType, Order, OrderProduct } from "../lib/types";

export default function Cart()
{
 
    
    return (
        <Sheet open={open}>
            <SheetContent className="bg-neutral-800">
                <SheetHeader>
                    <SheetTitle className="text-white">Cart</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4 text-white">
                {cart?.products?.map((orderProduct) => (
                    <div className="grid grid-cols-5 items-center gap-4">
                        <img src={orderProduct.productId.imageUrl} className="w-16 h-16 rounded"/>
                        <p>{orderProduct?.productId?.name}</p>
                        <p className="px-20">${orderProduct?.productId?.price}</p>
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