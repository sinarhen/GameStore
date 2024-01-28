import { createContext, useContext, useEffect, useState } from "react"
import { CartContextType, Order, OrderProduct, ProductCardType } from '../lib/types';
import Cart from "../components/Cart";
import { addToOrder, getUserOrdersById } from "../lib/order";
import { useCurrentUser } from "../hooks/useCurrentUser";
import toast from "react-hot-toast";



export const CartContext = createContext<null | CartContextType>(null);

export function CartProvider({ children }: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState<Order>();
    

    
    const addToCart = async (product: ProductCardType, amount: number) => {
        const res = await addToOrder(product._id, amount);
        const resOrderProduct = res.data;
        const orderProduct: OrderProduct = {
            _id: resOrderProduct.orderProduct.productId, 
            productId: product,
            quantity: amount,
            createdAt: new Date(), // Set the current date
            updatedAt: new Date(), // Set the current date
        };
        if (cart){
            const existingProduct = cart?.products.find(item => item?.productId._id === orderProduct?.productId._id);
            if (existingProduct){
                existingProduct.quantity += orderProduct.quantity;
                setCart({...cart, products: cart?.products});
            } else {
                setCart({...cart, products: [...cart?.products, orderProduct]});
            }
        } else {
            setCart({
                products: [orderProduct],
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

