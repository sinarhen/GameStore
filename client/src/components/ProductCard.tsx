import {useNavigate} from 'react-router-dom';
import {ProductCardType} from '../lib/types';
import Favorite from './Favorite';
import {formatter} from "../lib/utils"
import Button from './Button';
import {ShoppingCart} from 'lucide-react';
import useCart from '../hooks/useCart';
import {useDialog} from '../hooks/useDialog';
import toast from 'react-hot-toast';
import AmountPicker from './AmountPicker';
import {useCurrentUser} from '../hooks/useCurrentUser';
import {useAuthDialog} from '../hooks/useAuthDialog';

export default function ProductCard({product}: { props?: any; product: ProductCardType; }) {
  const imageUrl = product.imageUrl;
  const {openDialog, closeDialog} = useDialog();
  const {user} = useCurrentUser();
  const {openAuthDialog} = useAuthDialog();
  const {addToCart} = useCart();

  const onConfirm = async (amount: number) => {
    try {
      await addToCart(product, amount);
      toast.success('Added to cart')
      closeDialog();
    } catch (error: any) {
      toast.error(error?.message ?? "Щось пішло не так");
    }
  }
  const onBuy = () => {
    if (!user) {
      toast.error("Ви повинні бути авторизованим щоб придбати продукт.");
      openAuthDialog('login');
      return;
    }
    openDialog({
      title: `Придбати ${product.name}`,
      description: "Будь ласка, введіть скільки екземплярів ви хочете придбати.",
      content: (
        <AmountPicker onConfirm={onConfirm}/>
      ),

    })
  }

  const navigate = useNavigate();

  return (
    <div
      className="max-w-md h-fit transition-all hover:translate-x-0.5 hover:-translate-y-0.5 group hover:bg bg-neutral-800 cursor-pointer mx-auto rounded-md overflow-hidden shadow-lg hover:shadow-xl">
      <div className="relative">
        <div className="aspect-square">
          <img className="w-full object-cover h-full" src={imageUrl} alt={product.name}/>

        </div>

        <div className="absolute top-2 cursor-pointer left-2">
          <Favorite product={product}/>
        </div>
      </div>
      <div onClick={() => navigate(`/products/${product._id}`)} className="p-4">
        <div className='flex justify-between items-start'>
          <h1 className="text-lg font-medium mb-2 truncate">{product.name}</h1>
          <p className="text-sm text-indigo-600">{product?.category?.name ?? "Other"}</p>
        </div>

        <p
          className="text-gray-600 text-sm mb-4 truncate">{!product.description ? "No description" : product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold  text-sm">{formatter.format(product.price)}</span>
            <div>
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  onBuy();
                }}
                className='flex items-center gap-x-2'
              >
                Придбати <ShoppingCart size={16} strokeWidth={3}/>
              </Button>
              
          
              </div>
          </div>
      </div>
    </div>
  )
}