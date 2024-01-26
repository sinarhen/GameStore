import { useNavigate } from 'react-router-dom';
import { ProductCardType } from '../lib/types';
import Favorite from './Favorite';
import { formatter } from "../lib/utils"
import Button from './Button';

export default function ProductCard({ product, ...props }: { props?: any; product: ProductCardType; }) {
    // const imageUrl = "https://media.slovoidilo.ua/media/cache/person_thumb_exx/uploads/persons/origin/Po/Poroshenko-Petr-Alekseevich_origin.png"; 
    const imageUrl = product.imageUrl;
    
    const navigate = useNavigate();
    return (
        <div className="max-w-md h-fit transition-all hover:translate-x-0.5 hover:-translate-y-0.5 group hover:bg bg-neutral-800 cursor-pointer mx-auto rounded-md overflow-hidden shadow-lg hover:shadow-xl">
            <div className="relative">
                <div className="aspect-square">
                    <img className="w-full object-cover h-full" src={imageUrl} alt="Product Image" />

                </div>
            
                <div className="absolute top-2 cursor-pointer left-2">
                    <Favorite product={product}/>
                </div>
            </div>
            <div onClick={() => navigate(`/products/${product._id}`)} className="p-4">
                <div className='flex justify-between items-start'>
                    <h1 className="text-lg font-medium mb-2 truncate">{product.name}</h1>
                    <p className="text-sm text-indigo-600">{product?.categoryId?.name ?? "Other"}</p>
                </div>

                <p className="text-gray-600 text-sm mb-4 truncate">{product.description}</p>
                <div className="flex items-center justify-between">
                    {/* Use the formatter to format the price */}
                    <span className="font-bold  text-sm">{formatter.format(product.price)}</span>
                    <Button>
                        Buy
                    </Button>
                </div>
            </div>
        </div>
    )
}