import { createContext, useContext, useEffect, useState } from "react"
import { CartContextType, Order, OrderProduct } from '../lib/types';
import Cart from "../components/Cart";
import { getUserOrdersById } from "../lib/order";
import { useCurrentUser } from "../hooks/useCurrentUser";



export const CartContext = createContext<null | CartContextType>(null);

export function CartProvider({ children }: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState<Order>();
    

    
    const addToCart = (product: OrderProduct) => {
        if (cart){
            const existingProduct = cart?.products.find(item => item?.productId._id === product?.productId._id);
            if (existingProduct){
                existingProduct.quantity += product.quantity;
                setCart({...cart, products: cart?.products});
            } else {
                setCart({...cart, products: [...cart?.products, product]});
            }
        } else {
            setCart({
                products: [product],
                status: "pending",
                userId: user,
                createdAt: new Date(),
                updatedAt: new Date(),
                paymentStatus: "pending",
            })
        }
    }
    const removeFromCart = (product: OrderProduct) => {
        const newProducts = cart?.products.filter(item => item?._id !== product?._id);
        if (newProducts && cart){
            setCart({...cart, products: newProducts});
        }
    }
    
    const { user } = useCurrentUser();

    useEffect(() => {
        async function getOrder() {
            try {
                const order = await getUserOrdersById();
                if (order.data[0].status === "pending") {
                    setCart(order.data[0]);
                } else {
                    setCart({
                        products: [],
                        status: "pending",
                        userId: user,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        paymentStatus: "pending",

                    } as unknown as Order)
                }
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

