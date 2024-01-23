import { useState } from "react";
import { Order, ProductCardType } from "../lib/types";
import { statusColor } from "../lib/utils";
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

export default function ProductsTable({
    products,
    setProducts,
    tableCaption
}: {
    products: ProductCardType[] | null;
    setProducts: React.Dispatch<React.SetStateAction<ProductCardType[] | null>>;
    tableCaption?: string;
}) {
    const [selectDialog, setSelectDialog] = useState<Order | null>(null);
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    console.log("products", products);

    return (
        <Table className="mt-10 w-full h-full">
        <TableCaption>{tableCaption}</TableCaption>
        <TableHeader>
          <TableRow className="bg-neutral-800">
            <TableHead className="overflow-hidden">Product Id</TableHead>
            <TableHead className="text-center w-full">Name</TableHead>
            <TableHead className="text-center w-full">Category Id</TableHead>
            <TableHead className="text-center w-full">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product._id}>
              <TableCell className="overflow-hidden">{product._id}</TableCell>
              <TableCell className="text-center w-full">{product.name}</TableCell>
              <TableCell className="text-center w-full">{product.categoryId.name}</TableCell>
              <TableCell onClick={() => setDialogOpen(true)} className="text-center hover:underline cursor-pointer">View</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
}