import { ProductCardType } from '../../lib/types';


export default function ProductCard({ product, ...props}: {
    props?: any;
    product?: ProductCardType;
}){
    
    return(
        <div className='bg-neutral-800 w-full sm:h-96 md:h-72  h-[28rem] rounded-lg hover:translate-x-1 transition-transform hover:-translate-y-1'>
            
        </div>
    )
}