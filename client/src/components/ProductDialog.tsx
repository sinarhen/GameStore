import { Trash2 } from "lucide-react";
import { ProductCardType } from '../lib/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./Dialog"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./Table"
import EditProductDialog from "./EditProductDialog";
import Clipboard from "./Clipboard";
import { formatter } from "../lib/utils";


interface ProductDialogProps {
    product: ProductCardType | null;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
    product,
}) => {

    return (
        <>
                <div className="sm:flex-row flex flex-col overflow-y-scroll  gap-x-2 ">
                            <img alt="No photo" className="rounded-lg w-full sm:w-1/2 object-cover object-center" 
                                src={product?.imageUrl}>
                            </img>
                        <div className="flex flex-col justify-between ">
                            <div>
                                <h1 className="text-3xl text-indigo-600">{product?.name}</h1>
                                {product?._id && (
                                    <p className="text-gray-500 text-sm">{product._id} <Clipboard text={product?._id} /></p>
                                )}
                                <p className="text-muted-foreground mt-2 text-sm overflow-y-auto sm:max-h-[150px]">
                                    {product?.description}
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa vero modi architecto reprehenderit quaerat magnam autem, voluptatum illo minima repellendus asperiores enim quidem accusamus natus consectetur corrupti ut consequatur. Perferendis.
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa vero modi architecto reprehenderit quaerat magnam autem, voluptatum illo minima repellendus asperiores enim quidem accusamus natus consectetur corrupti ut consequatur. Perferendis.
                                </p>    
                            </div>
                            
                            <div className="flex justify-between items-end mt-2">
                                <p className="text-indigo-600 text-lg">{formatter.format(product?.price!)}</p>
                                <EditProductDialog initialValues={{
                                    name: product?.name,
                                    price: product?.price,
                                    description: product?.description,
                                    imageUrl: product?.imageUrl,
                                }}/>
                            </div>
                            
                        </div>

                    </div>
        </>
      )
}

export default ProductDialog;