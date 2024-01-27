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
import useCart from "../hooks/useCart";

export default function Cart()
{
    const { open, removeFromCart, cart, setOpen} = useCart();
    
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="bg-black text-white">
                {cart?.products?.length ? (
                    <>
                    <SheetHeader>
                        <SheetTitle className="text-white">Cart</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 py-4 text-white">
                    {cart?.products?.map((orderProduct) => (
                        <>
                        <div className="grid grid-cols-5 items-center gap-4">
                            <img src={orderProduct.productId.imageUrl} className="w-16 h-16 rounded"/>
                            <p>{orderProduct?.productId?.name}</p>
                            <p className="px-20">${orderProduct?.productId?.price}</p>
                        </div>
                        </>
                    ))}
                    </div>
                    <SheetFooter>
                        <Button onClick={() => setOpen(false)}>Confirm Order</Button>
                    </SheetFooter>
                    </>

                ): (
                    <div className="flex flex-col h-full items-center justify-evenly">
                        <div>
                            <h1 className="text-lg">Cart is empty.</h1>
                            <p className="text-sm text-gray-400">Add items to your cart to see them here.</p>
                            <Button onClick={() => setOpen(false)}>Close</Button>
                        </div>
                        <p></p>
                        
                    </div>
                )}
                
            </SheetContent>
        </Sheet>
    )
};