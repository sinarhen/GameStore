import { ProductCardType } from '../../lib/types';
import { CiHeart } from "react-icons/ci";
import Favorite from './Favorite';

export default function ProductCard({ product, ...props }: { props?: any; product: ProductCardType; }) {
    const imageUrl = "https://media.slovoidilo.ua/media/cache/person_thumb_exx/uploads/persons/origin/Po/Poroshenko-Petr-Alekseevich_origin.png"; 

    // Create a new Intl.NumberFormat instance
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'UAH',
    });

    return (
        <div onClick={() => window.location.replace(`/products/${product._id}`)} className="max-w-md transition-all hover:translate-x-0.5 hover:-translate-y-0.5 group hover:bg bg-neutral-800 cursor-pointer mx-auto rounded-md overflow-hidden shadow-lg hover:shadow-xl">
            <div className="relative">
                <img className="w-full" src={imageUrl} alt="Product Image" />
                
                <div className="absolute top-2 cursor-pointer left-2">
                    <Favorite productId={product._id}/>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ante
                    vel eros fermentum faucibus sit amet euismod lorem.</p>
                <div className="flex items-center justify-between">
                    {/* Use the formatter to format the price */}
                    <span className="font-bold  text-sm">{formatter.format(product.price)}</span>
                    <button className="bg-indigo-600 text-sm transition-colors hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">
                        Buy
            </button>
                </div>
            </div>
        </div>
    )
}