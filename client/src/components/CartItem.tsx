import {Check, Minus, Plus, Trash2} from "lucide-react";
import {useNavigate} from "react-router-dom";
import { OrderProduct } from "../lib/types";
import {cn, formatter} from "../lib/utils";
import Button from "./Button";
import useCart from "../hooks/useCart";
import React from "react";
import toast from "react-hot-toast";

export default function CartItem({
  item,
}: {
  item: OrderProduct;
}) {
  const navigate = useNavigate();
  const {setOpen, removeFromCart, updateProductQuantity} = useCart();
  const [inputValue, setInputValue] = React.useState(0);

  function handleInput(val: number) {
    if (val > 100) {
      setInputValue(100);
      toast.error("Ви не можете купити більше 100 елементів");
      return;
    }
    if (val < -item.quantity) {
      setInputValue(val + 1);
      toast.error("Ви не можете прибрати стільки продуктів");
      return;
    }
    setInputValue(val);
  }


  return (
    <div
      className="flex py-1 transition-colors group/cart cursor-pointer  w-full justify-between gap-4">
      <div className="flex gap-x-2">
        <div onClick={(e) => {
          try {
            if (inputValue === 0 || inputValue === -item.quantity) {
              removeFromCart(item);
              toast.success("Продукт видалено з кошика");
            } else {
              console.log(item.quantity + inputValue)
              updateProductQuantity(item, item.quantity + inputValue);
              toast.success(`Кількість продукту змінено на ${inputValue}`);
            }
          } catch (error) {
            toast.error("Щось пішло не так");
            console.error(error);
          } finally {
            setInputValue(0);
          }
        }}
             className="aspect-square relative min-w-20 h-20 w-20 rounded overflow-hidden border border-transparent  group-hover/cart:border-indigo-600 transition-all cursor-pointer">
                <span
                  className="opacity-0 group/image flex items-center justify-center group-hover/cart:opacity-80 transition-all w-full h-full bg-black absolute">
                    
                        <Check onClick={() => {
                        }}
                               className={cn("text-green-600 absolute group-hover/image:text-opacity-100 group-hover/image:scale-125 text-opacity-75 transition-all h-1/2 w-1/2 opacity-0", inputValue !== 0 ? "opacity-100" : "")}/>
                        <Trash2 onClick={() => {
                        }}
                                className={cn("text-red-600 absolute text-opacity-75 h-1/2 group-hover/image:text-opacity-100 group-hover/image:scale-125 transition-all w-1/2 opacity-0", inputValue === 0 ? "opacity-100" : "")}/>
                
                </span>
          <img src={item.product.imageUrl} className="bg-cover object-cover"/>
        </div>
        <div className="flex flex-col justify-between">
          <div onClick={() => {
            navigate('/products/' + item.product._id);
            setOpen(false)
          }} className="group-hover/cart:text-indigo-600 transition-colors">
            <p className="align-start">{item?.product?.name} <span
              className="text-gray-400 text-xs flex items-center">x{item.quantity} {inputValue !== 0 ? (inputValue > 0 ? `+${inputValue}` : inputValue) : ""}</span>
            </p>
            <p className="text-xs text-gray-700 line-clamp-2">{item.product.description}</p>
          </div>
        </div>

      </div>
      <div className="mt-1 flex flex-col justify-between group-hover/cart:text-indigo-600 transition-colors">
        <p className="text-xs ">{formatter.format(item.product.price * item.quantity)}</p>

        <div
          className="h-full  group-hover/cart:opacity-100 flex flex-col items-end justify-end opacity-0 transition-opacity ">
          {inputValue !== 0 &&
              <span onClick={() => setInputValue(0)} className="text-xs text-red-200 hover:underline">clear</span>}
          <div className="gap-x-0.5 flex">

            <Button onClick={() => handleInput(inputValue + 1)}
                    className="px-1 py-1 bg-green-700 hover:bg-green-600"><Plus strokeWidth={4}
                                                                                className="h-3 w-3"/></Button>
            <Button onClick={() => handleInput(inputValue - 1)} className="px-1 py-1 bg-red-700 hover:bg-red-600"><Minus
              strokeWidth={4} className="h-3 w-3"/></Button>

          </div>
        </div>
      </div>
    </div>
  )
}

