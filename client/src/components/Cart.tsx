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
import { Minus, Plus, Trash, Trash2 } from "lucide-react";
import Input from "./Input";
import CartItem from "./CartItem";
import { useDialog } from "../hooks/useDialog";
import Loading from "./Loading";

export default function Cart()
{
    const { open, isLoading, removeFromCart, cart, setOpen, setCart} = useCart();
    const navigate = useNavigate();
    const { openDialog } = useDialog();

    const openConfirmDialog = () => {
        openDialog({
            title: "Підтвердіть замовлення",
            description: "Щоб підтвердити замовлення введіть логін та пароль від аккаунта Mortal-Kombat",
            content: <><Input placeholder="Логін" /><Input placeholder="Пароль" /><Button className="bg-green-600 hover:bg-green-500">Підтвердити</Button></>
        })
    }
    if (isLoading){
        return <Loading />
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="bg-black text-white">
                {cart?.products?.length ? (
                    <>
                    <SheetHeader>
                        <SheetTitle className="text-white">Cart</SheetTitle>
                        <SheetDescription>{cart?.products?.length} items</SheetDescription>
                    </SheetHeader>
                    <div className="justify-between items-center flex max-h-full flex-col   text-white">
                        <div className="w-full overflow-y-scroll flex flex-col pt-4">
                        {cart?.products?.map((orderProduct) => (
                            <CartItem item={orderProduct} orderId={cart._id} />
                        ))}
                            
                        </div>

                        <Button onClick={() => {setOpen(false); openConfirmDialog()}}>Confirm Order</Button>
                    </div>
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