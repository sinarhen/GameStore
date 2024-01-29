import {useEffect, useState} from "react";
import {ProductCardType} from "../lib/types";
import toast from "react-hot-toast";
import {useParams} from "react-router-dom";
import {getProductById} from "../lib/products";
import Loading from "../components/Loading";
import {formatter} from '../lib/utils';
import Section from "../components/Section";
import Header from "../components/Header";
import {motion} from 'framer-motion';
import AnimatedSeparator from "../components/AnimatedSeparator";
import Input from "../components/Input";
import Button from "../components/Button";
import {useAuthDialog} from "../hooks/useAuthDialog";
import {useCurrentUser} from "../hooks/useCurrentUser";
import useCart from "../hooks/useCart";


export default function ProductDetails() {
  const [product, setProduct] = useState<ProductCardType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<number>(1);

  const {user} = useCurrentUser();
  const {openAuthDialog} = useAuthDialog();
  const {addToCart} = useCart();

  const appearDuration = 0.7;
  const params = useParams();
  const productId = params.productId;
  useEffect(() => {
    getProductById(productId)
      .then((response) => {
        if (!response.data) {
          toast.error("Продукт не знайдено");
          return;
        }
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Щось пішло не так", {id: "products"});
      }).finally(() => {
      setLoading(false);
    });
  }, [product])


  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error])


  if (loading) {
    return Loading();
  }
  if (!product) {
    return <div>Product not found</div>
  }

  function setValidatedInputValue(value: number) {
    if (value < 1) {
      setInputValue(1);
      setError("You must add at least 1 item to your order")
    }
    if (value > 100) {
      setInputValue(100);
      setError("You can't add more than 100 items to your order")
    } else {
      setInputValue(value);
    }
  }


  function onSubmit() {

    if (!inputValue) {
      toast.error("Ви повинні додати принаймні 1 позицію до свого замовлення");
      return;
    }
    if (!user) {
      openAuthDialog('login');
      return;
    }
    try {
      setLoading(true);
      if (!product?._id) {
        throw new Error("Unexpected internal error")
      }
      addToCart(product, inputValue)
      toast.success(`Додано до кошика ${inputValue} ${product.name}`);

    } catch (error) {
      toast.error("Щось пішло не так");
      console.error(error)
    } finally {
      setLoading(false)
    }


    console.log("submit");
  }

  return (
    <>
      <Section className="pt-24">
        <div className="flex flex-col justify-center items-center">
          <div>

            <div className="w-full h-96 justify-center flex">
              <div className="w-full overflow-hidden">

                <img alt="No photo" className="rounded-lg h-full w-full object-cover object-center"
                     src={product.imageUrl}>
                </img>
              </div>

            </div>
          </div>

        </div>

      </Section>
      <Section>

        <motion.p
          className="text-indigo-400 text-xl mt-8"
          initial={{opacity: 0}}
          transition={{delay: appearDuration, duration: appearDuration}}
          animate={{opacity: 1, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
        >
          {formatter.format(product.price)}
        </motion.p>
        <Header className="text-5xl mt-1" animateableText={product.name} appearDuration={appearDuration}/>
        <AnimatedSeparator appearDuration={appearDuration}/>
        <motion.p
          className="text-gray-400 max-h-[400px] overflow-y-auto text-md mt-4"
          initial={{opacity: 0}}
          transition={{delay: appearDuration + 1, duration: appearDuration}}
          animate={{opacity: 1, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
        >
          {product.description}
        </motion.p>
      </Section>
      <Section className="pt-4 h-64">
        <motion.div
          animate={{opacity: 1, animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'}}
          initial={{opacity: 0}}
          onSubmit={onSubmit}
          transition={{delay: appearDuration + 1, duration: appearDuration}}
        >
          <div className="flex items-center justify-center">
            <div>
              <Input className="text-sm " autoComplete="off" type="number" value={inputValue}
                     onChange={(e) => setValidatedInputValue(e.target.valueAsNumber)} name="quantity" id="quantity"
                     placeholder="number"/>

            </div>

            <Button onClick={() => setValidatedInputValue(inputValue + 1)} className="ml-4 mr-2 px-4 py-2">+</Button>
            <Button onClick={() => setValidatedInputValue(inputValue - 1)} className="px-4 py-2">-</Button>

            <Button onClick={onSubmit} className="ml-4">Add to cart</Button>
          </div>

          {inputValue >= 1 ? (
            <p
              className="text-gray-400 text-center text-sm mt-4">Total: {formatter.format(inputValue * product.price)}</p>
          ) : (
            <p className="text-center text-sm text-red-700 mt-4">Required</p>
          )}
        </motion.div>
      </Section>

    </>
  )
}