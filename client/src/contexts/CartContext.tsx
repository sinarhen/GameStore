import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CartContextType, Order, OrderProduct, ProductCardType } from '../lib/types';
import Cart from "../components/Cart";
import { addToOrder, deleteProductFromOrder, getUserOrdersById } from "../lib/order";
import { useCurrentUser } from "../hooks/useCurrentUser";
import toast from "react-hot-toast";



export const CartContext = createContext<null | CartContextType>(null);

export function CartProvider({ children }: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState<Order>();
    const { user } = useCurrentUser();
    
    const addToCart = useCallback(async (product: ProductCardType, amount: number) => {
        const res = await addToOrder(product._id, amount);
        const resOrderProduct = res.data;
        const orderProduct: OrderProduct = {
            _id: resOrderProduct.orderProduct.productId, 
            productId: product,
            quantity: amount,
            createdAt: new Date(), // Set the current date
            updatedAt: new Date(), // Set the current date
        };
            setCart(prevCart => {
                const existingProduct = prevCart?.products.find(item => item?.productId._id === orderProduct?.productId._id);
                if (existingProduct){
                    existingProduct.quantity += orderProduct.quantity;
                    return {...prevCart, products: prevCart?.products} as Order;
                } else {
                    return {...prevCart, products: [...(prevCart?.products || []), orderProduct]} as Order;
                }
            });
                       
    }, [cart, user])
    const removeFromCart = async (product: OrderProduct) => {
        await deleteProductFromOrder(cart?._id, product.productId._id);
        
        const newProducts = cart?.products.filter(item => item?._id !== product?._id);
        if (newProducts && cart){
            setCart({...cart, products: newProducts});
        }
    }
    

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
                console.error(error);
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

