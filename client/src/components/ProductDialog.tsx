import { Trash2 } from "lucide-react";
import { ProductCardType } from '../lib/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./Dialog"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./Table"
import EditProductDialog from "./EditProductDialog";


interface ProductDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    product: ProductCardType | null;
}

const ProductDialog: React.FC<ProductDialogProps> = ({
    open,
    setOpen,
    product,
}) => {
    
    return (
        <>
            <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent className="min-w-[95%] md:min-w-[75%]">
                <DialogHeader>
                <DialogTitle>Product {product?.name} </DialogTitle>
                <DialogDescription>
                    <img src={product?.imageUrl} className="w-full h-full max-h-96 max-w-96" />
                </DialogDescription>
                </DialogHeader>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-center">Action</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableCell>{product?.name}</TableCell>
                    <TableCell>{product?.price}</TableCell>
                    <TableCell className="text-center">
                        <EditProductDialog initialValues={{
                            name: product?.name,
                            price: product?.price,
                            description: product?.description,
                            imageUrl: product?.imageUrl
                        }}/>
                    </TableCell>
                </TableBody>
                </Table>
            </DialogContent>
            </Dialog>
            
        </>
      )
}

export default ProductDialog;