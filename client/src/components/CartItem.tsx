import { Check, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OrderProduct } from "../lib/types";
import { cn, formatter } from "../lib/utils";
import Button from "./Button";
import useCart from "../hooks/useCart";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function CartItem({item}: {
    item: OrderProduct;
}){
    const navigate = useNavigate();
    const { setOpen } = useCart();
    const [inputValue, setInputValue] = React.useState(0);
    
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.valueAsNumber > 100){
            setInputValue(100);
            toast.error("You can't buy more than 100 items at once");
            return;
        } if (e.target.valueAsNumber > item.quantity){
            setInputValue(item.quantity);
            toast.error("You can't remove more items than there are in stock");
            return;
        }
        setInputValue(e.target.valueAsNumber);
    }

    return(
        <div 
        className="flex py-1 transition-colors group/cart cursor-pointer  w-full justify-between gap-4">
        <div className="flex gap-x-2">
            <div onClick={(e) => {
                e.stopPropagation();
                // removeFromCart(item.productId._id);
            }}  className="aspect-square relative min-w-20 h-20 w-20 rounded overflow-hidden border border-transparent  group-hover/cart:border-indigo-600 transition-all cursor-pointer">
                <span
                className="opacity-0 group/image flex items-center justify-center group-hover/cart:opacity-80 transition-all w-full h-full bg-black absolute">
                    
                        <Check className={cn("text-green-600 absolute group-hover/image:text-opacity-100 group-hover/image:scale-125 text-opacity-75 transition-all h-1/2 w-1/2 opacity-0", inputValue !== 0 ? "opacity-100" : "")}/>
                        <Trash2 className={cn("text-red-600 absolute text-opacity-75 h-1/2 group-hover/image:text-opacity-100 group-hover/image:scale-125 transition-all w-1/2 opacity-0", inputValue === 0 ? "opacity-100" : "")} />
                
                </span>
                <img src={item.productId.imageUrl} className="bg-cover object-cover"/>
            </div>
            <div className="flex flex-col justify-between">
                <div onClick={() => {navigate('/products/' + item.productId._id); setOpen(false)}} className="group-hover/cart:text-indigo-600 transition-colors">
                    <p className="align-start">{item?.productId?.name} <span className="text-gray-400 text-xs flex items-center">x{item.quantity} {inputValue !== 0 ? (inputValue > 0 ? `+${inputValue}` : inputValue): ""}</span></p>
                    <p className="text-xs text-gray-700">{item.productId.description}</p>
                </div>
            </div>
            
        </div>
        <div className="mt-1 flex flex-col justify-between group-hover/cart:text-indigo-600 transition-colors">
            <p className="text-xs ">{formatter.format(item.productId.price * item.quantity)}</p>
        
            <div className="h-full  group-hover/cart:opacity-100 flex flex-col items-end justify-end opacity-0 transition-opacity ">
                <span onClick={() => setInputValue(0)} className="text-xs text-red-200 hover:underline">clear</span>
                <div className="gap-x-0.5 flex">
                    
                    <Button onClick={() => setInputValue(inputValue + 1)} className="px-1 py-1 bg-green-700 hover:bg-green-600"><Plus strokeWidth={4} className="h-3 w-3"/></Button>
                    <Button onClick={() => setInputValue(inputValue - 1)} className="px-1 py-1 bg-red-700 hover:bg-red-600"><Minus strokeWidth={4} className="h-3 w-3"/></Button>
                
                </div>
            </div>
        </div>
    </div>
    )
}