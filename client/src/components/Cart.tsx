import Button from "./Button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./Sheet"
import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { formatter } from '../lib/utils';

export default function Cart()
{
    const { open, removeFromCart, cart, setOpen} = useCart();
    const navigate = useNavigate();
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="bg-black text-white">
                {cart?.products?.length ? (
                    <>
                    <SheetHeader>
                        <SheetTitle className="text-white">Cart</SheetTitle>
                        <SheetDescription>{cart?.products?.length} items</SheetDescription>
                    </SheetHeader>
                    <div className="justify-center items-center flex  flex-col gap-y-4 py-4 text-white">
                    {cart?.products?.map((orderProduct) => (
                        <>
                        <div onClick={() => {navigate('/products/' + orderProduct.productId._id); setOpen(false)}} className="flex py-1 transition-colors group cursor-pointer hover:text-indigo-600 w-full justify-between gap-4">
                            <div className="flex gap-x-2">
                                <div  className="aspect-square h-20 w-20 rounded overflow-hidden border border-transparent group-hover:border-indigo-600 transition-colors cursor-pointer">
                                    <img src={orderProduct.productId.imageUrl} className="bg-cover object-cover"/>
                                </div>
                                <div>
                                    <p className="align-start">{orderProduct?.productId?.name} x {orderProduct.quantity}</p>
                                    <p className="text-xs text-gray-700">{orderProduct.productId.description}</p>
                                    
                            </div>
                            </div>
                            <div className="mt-1">
                                <p className="text-xs ">{formatter.format(orderProduct.productId.price * orderProduct.quantity)}</p>


                            </div>
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