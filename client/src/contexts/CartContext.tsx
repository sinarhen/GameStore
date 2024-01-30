import React, {createContext, useCallback, useEffect, useState} from 'react';
import {CartContextType, Order, OrderProduct, ProductCardType} from '../lib/types';
import Cart from "../components/Cart";
import {addToOrder, changeProductQuantityInOrder, deleteProductFromOrder, getUserOrdersById} from "../lib/order";
import {useCurrentUser} from "../hooks/useCurrentUser";
import toast from "react-hot-toast";


export const CartContext = createContext<null | CartContextType>(null);

export function CartProvider({children}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<Order>();
  const [isLoading] = useState(false);
  const {user} = useCurrentUser();

  const resetCart = useCallback(() => {
    setCart({
      products: [],
      status: "pending",
      user: user,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPaid: false
    } as Order)
  }, [user])

  const initializeCart = useCallback(async () => {
    try {
      const order = await getUserOrdersById();
      const lastOrder = order?.data[0];
      if (order.data.length && lastOrder?.status === "pending") {
        setCart(lastOrder);
      } else {
        resetCart();
      }
    } catch (error) {
      console.error(error);
    }
  }, [resetCart]);

  useEffect(() => {
    if (!user) return;
    initializeCart();
  }, [user, initializeCart]);

  const addToCart = useCallback(async (product: ProductCardType, amount: number) => {
    const res = await addToOrder(product._id, amount);
    const resOrderProduct = res.data;
    const resOrderId = res.data.orderId;
    const orderProduct: OrderProduct = {
      _id: resOrderProduct.orderProduct.product,
      product: product,
      quantity: amount,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCart(prevCart => {
      const existingProduct = prevCart?.products.find(item => item?.product._id === orderProduct?.product._id);
      if (existingProduct) {
        existingProduct.quantity += orderProduct.quantity;
        return {...prevCart, _id: resOrderId, products: prevCart?.products} as Order;
      } else {
        return {...prevCart, _id: resOrderId, products: [...(prevCart?.products || []), orderProduct]} as Order;
      }
    });
  }, [])


  const removeFromCart = async (product: OrderProduct) => {
    if (!cart?._id) {
      console.log("Cart is undefined")
      return;
    }
    await deleteProductFromOrder(cart?._id, product.product._id);
    const newProducts = cart?.products.filter(item => item?._id !== product?._id);
    if (newProducts) {
      setCart({...cart, products: newProducts} as Order);
    }
  }

  const updateProductQuantity = async (product: OrderProduct, amount: number) => {
    try {
      if (cart?._id) {
        await changeProductQuantityInOrder(cart?._id, product.product._id, amount);
        setCart(prevCart => {
            const existingProduct = prevCart?.products.find(item => item?.product._id === product?.product._id);
            if (existingProduct) {
              existingProduct.quantity = amount;
              return {...prevCart, products: prevCart?.products} as Order;
            } else {
              return {...prevCart, products: [...(prevCart?.products || []), product]} as Order;
            }
          }
        );
      } else {
        console.log("Cart is undefined")
      }


    } catch (error: any) {
      console.error(error);
      toast.error("Щось пішло не так: " + error?.message ?? "unknown error", {id: "updateProductQuantityInCart"});
    }


  }

  return (
    <CartContext.Provider value={{
      open,
      setOpen,
      resetCart,
      cart: cart ?? {} as Order,
      setCart,
      addToCart,
      removeFromCart,
      updateProductQuantity,
      isLoading
    }}>
      <Cart/>
      {children}
    </CartContext.Provider>
  )

}

