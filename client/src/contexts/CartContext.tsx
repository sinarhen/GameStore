import { createContext, useContext, useEffect, useState } from "react"
import { CartContextType, Order, OrderProduct } from '../lib/types';
import Cart from "../components/Cart";
import { getUserOrdersById } from "../lib/order";



export const CartContext = createContext<null | CartContextType>(null);

export function CartProvider({ children }: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState<Order>();
    
    
    const addToCart = (product: OrderProduct) => {
        const newProducts = cart?.products ? [...cart?.products, product] : [product];
        if (newProducts && cart){
            setCart({...cart, products: newProducts});
        }
    }
    const removeFromCart = (product: OrderProduct) => {
        const newProducts = cart?.products.filter(item => item?._id !== product?._id);
        if (newProducts && cart){
            setCart({...cart, products: newProducts});
        }
    }
    useEffect(() => {
        async function getOrder() {
            try {
                const order = await getUserOrdersById();
                setCart(order.data);
            } catch (error) {
                console.log(error);
            }
        };

        getOrder();
    }, []);
    return (
        <CartContext.Provider value={{
            open,
            setOpen,
            cart: cart ?? {} as Order,
            setCart,
            addToCart,
            removeFromCart
        }}>
            <Cart />
            {children}
        </CartContext.Provider>
    )

}

