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
import { useNavigate } from "react-router-dom";

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
                    <div className="justify-center items-center flex flex-col gap-y-4 py-4 text-white">
                    {cart?.products?.map((orderProduct) => (
                        <>
                        <div className="flex py-1 group cursor-pointer hover:text-indigo-600 w-full items-center justify-between gap-4">
                            <div className="flex gap-x-2">
                                <div onClick={() => window.location.replace(`/products/${orderProduct.productId._id}`)} className="aspect-square h-20 w-20 rounded overflow-hidden border border-transparent group-hover:border-indigo-600 transition-colors cursor-pointer">
                                    <img src={orderProduct.productId.imageUrl} className="bg-cover object-cover"/>
                                </div>
                                <p className="align-start">{orderProduct?.productId?.name}</p>
                                
                            </div>
                            <p className="">${orderProduct?.productId?.price}</p>
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
                            <SheetHeader>
                                <SheetTitle>Cart is</SheetTitle>
                            </SheetHeader>
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