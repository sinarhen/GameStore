import { ProductCardType } from "../lib/types";
import Button from "./Button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./Dialog";
import ProductForm from "./ProductForm";


export default function EditProductDialog({product} : {product: ProductCardType}){
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-indigo-600 bg-opacity-70 transition-all hover:bg-indigo-500 mt-4 hover:bg-opacity-100 text-white px-4 py-2 rounded-md">Edit</Button>
            </DialogTrigger>
        <DialogContent className=" md:w-[400px] h-[95%]">
                <DialogHeader>
                <DialogTitle>Edit product</DialogTitle>
                </DialogHeader>
                  
                <ProductForm initialValues={product} variant="edit"/>
                    
            </DialogContent>
        </Dialog>
    )
}