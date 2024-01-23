import { useState } from "react";
import { ProductCardType } from "../lib/types";
import { deleteProduct } from "../lib/products";
import { 
    Table, 
    TableBody, 
    TableCaption, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "./Table";
import { Trash2 } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
import toast from "react-hot-toast";
import { FaInfo } from "react-icons/fa";

export default function ProductsTable({
    products,
    setProducts,
    tableCaption
}: {
    products: ProductCardType[] | null;
    setProducts: React.Dispatch<React.SetStateAction<ProductCardType[] | null>>;
    tableCaption?: string;
}) {
    const [selectDialog, setSelectDialog] = useState<ProductCardType | null>(null);
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductCardType | null>(null);
    async function deleteProductAsync() {
      if (selectedProduct?._id){
        try {
          await deleteProduct(selectedProduct?._id);
          if (products) {
              setProducts(products.filter((product) => product._id !== selectedProduct?._id));
              setSelectedProduct(null);
          }
          toast.success("Product deleted successfully");
      } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
      }
      }
      
    };

    return (
      <>
        <ConfirmDialog 
          onConfirm={() => selectedProduct?._id ? deleteProductAsync() : {}} 
          open={confirmOpen} 
          setOpen={setConfirmOpen} 
          />
        
        <Table className="mt-10 w-full h-full">
        <TableCaption>{tableCaption}</TableCaption>
        <TableHeader>
          <TableRow className="bg-neutral-800">
            <TableHead className="overflow-hidden">Product Id</TableHead>
            <TableHead className="text-center w-full">Name</TableHead>
            <TableHead className="text-center w-full">Category Id</TableHead>
            <TableHead className="text-right align-center justify-end w-full">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product._id}>
              <TableCell className="overflow-hidden">{product._id}</TableCell>
              <TableCell className="text-center w-full">{product.name}</TableCell>
              <TableCell className="text-center w-full">{product.categoryId.name}</TableCell>
              <TableCell className="text-right w-full">
                <div className="flex gap-x-1 justify-between items-center">
                  <div 
                    onClick={() => {
                      setDialogOpen(true); 
                      setSelectedProduct(product);
                    }} 
                    
                    className='p-2  cursor-pointer group rounded-lg hover:bg-gray-400 transition-colors'
                    
                    >
                    <FaInfo className="group-hover:text-indigo-500 w-3.5 h-3.5 transition-colors"/>
                  </div>
                  
                  <div 
                    onClick={() => {
                      setConfirmOpen(true); 
                      setSelectedProduct(product);
                    }}
                    className='p-2  cursor-pointer group rounded-lg hover:bg-red-200 transition-colors'
                  >
                    <Trash2 
                    className="h-3.5 w-3.5 group-hover:text-red-500 transition-colors" />

                  </div>
                  
                </div>
                <div className="">

                </div>
                <div 
                  className="flex justify-center items-center">
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </>
    );
}