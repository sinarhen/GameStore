import { useState } from "react";
import { Order, ProductCardType } from "../lib/types";
import { statusColor } from "../lib/utils";
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
            <TableHead className="text-center w-full">Action</TableHead>
            <TableHead className="text-right align-center justify-end w-full">Delete Product</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product._id}>
              <TableCell className="overflow-hidden">{product._id}</TableCell>
              <TableCell className="text-center w-full">{product.name}</TableCell>
              <TableCell className="text-center w-full">{product.categoryId.name}</TableCell>
              <TableCell onClick={() => {setDialogOpen(true); setSelectedProduct(product);}} className="text-center hover:underline cursor-pointer">View</TableCell>
              <TableCell className="text-right w-full">
                <div 
                  onClick={() => {setConfirmOpen(true); setSelectedProduct(product);}}
                  className="flex justify-center items-center">
                  <Trash2 className="h-4 w-4 cursor-pointer hover:text-red-400 transition-colors" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </>
    );
}