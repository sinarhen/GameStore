import {createContext, useCallback, useEffect, useState} from 'react';
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

  const addToCart = useCallback(async (product: ProductCardType, amount: number) => {
    const res = await addToOrder(product._id, amount);
    const resOrderProduct = res.data;
    const resOrderId = res.data.orderId;
    const orderProduct: OrderProduct = {
      _id: resOrderProduct.orderProduct.productId,
      productId: product,
      quantity: amount,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCart(prevCart => {
      const existingProduct = prevCart?.products.find(item => item?.productId._id === orderProduct?.productId._id);
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
    await deleteProductFromOrder(cart?._id, product.productId._id);
    const newProducts = cart?.products.filter(item => item?._id !== product?._id);
    if (newProducts) {
      setCart({...cart, products: newProducts} as Order);
    }
  }

  const updateProductQuantity = async (product: OrderProduct, amount: number) => {
    try {
      if (cart?._id) {
        await changeProductQuantityInOrder(cart?._id, product.productId._id, amount);
        setCart(prevCart => {
            const existingProduct = prevCart?.products.find(item => item?.productId._id === product?.productId._id);
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
      toast.error("Щось пішло не так: " + error?.message ?? "невідома помилка", {id: "updateProductQuantityInCart"});
    }


  }


  useEffect(() => {
    if (!user) return;

    async function getOrder() {
      try {
        const order = await getUserOrdersById();
        console.log(order)

        if (order.data.length || order?.data[0]?.status === "pending") {
          setCart(order.data[0]);
        } else {
          console.log("No cart suka")
          setCart({
            products: [],
            status: "pending",
            userId: user,
            createdAt: new Date(),
            updatedAt: new Date(),

          } as Order)

        }
      } catch (error) {
        console.error(error);
      }
    }

    getOrder();
  }, [user]);

  useEffect(() => {
    console.log("cart is: ", cart)
  }, [cart])
  return (
    <CartContext.Provider value={{
      open,
      setOpen,
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

