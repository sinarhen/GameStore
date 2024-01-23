import { useState } from "react";
import { Order, ProductCardType } from "../lib/types";
import { statusColor } from "../lib/utils";
import { deleteProduct } from "../lib/products";
import { 
    Table, 
    TableBody, 
    TableCaption, 
    TableCell, 
    TableFooter, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "./Table";
import { Trash2 } from "lucide-react";

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

    async function deleteProductAsync(productId: string) {
      try {
          await deleteProduct(productId);
          if (products) {
              setProducts(products.filter((product) => product._id !== productId));
          }
      } catch (error) {
          console.log(error);
      }
    };

    return (
      <>
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
              <TableCell onClick={() => {setDialogOpen(true); setSelectDialog(product);}} className="text-center hover:underline cursor-pointer">View</TableCell>
              <TableCell className="text-right w-full">
                <div className="flex justify-center items-center">
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