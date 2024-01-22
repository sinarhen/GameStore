import { Trash2 } from "lucide-react";
import { Order, OrderProduct } from '../lib/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./Dialog"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./Table"
import { formatter, statusColor } from "../lib/utils";
import { useState } from "react";
import Button from "./Button";
import { removeFromOrder } from "../lib/order";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { updateOrderStatus } from "../lib/order";

interface OrderDialogProps {
    order: Order | null,
    open: boolean;
    setOpen: (open: boolean) => void;
    products: {
        products: OrderProduct[],
        order: Order | null,
    } | null;
    setProducts: (products: {
        products: OrderProduct[],
        order: Order | null,
        status: string
      
      }) => void;
    status?: string ;
}

const OrderDialog: React.FC<OrderDialogProps> = ({
    open,
    setOpen,
    products,
    setProducts,
    status,
    order
}) => {
    const [selectedProduct, setSelectedProduct] = useState<OrderProduct | null>(null);
    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

    const { user } = useCurrentUser();
    const isAdmin = user?.role === 'admin';

    const handleUpdateStatus = async () => {
        try {
            if (products?.order?._id) {
                const { data } = await updateOrderStatus(products?.order?._id, status!);
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    
    function onConfirm(){
        // ...rest of the code
        setConfirmDeleteDialogOpen(false);

        if (selectedProduct?._id && products?.order?._id)
        {
            removeFromOrder(selectedProduct?._id).then((data) => {
                console.log(data);
                const updatedProducts = products.products.filter((product) => product._id !== selectedProduct?._id);
                if (selectedProduct.quantity > 1) {
                    updatedProducts.push({...selectedProduct, quantity: selectedProduct.quantity - 1});
                }
                setProducts({
                    products: updatedProducts,
                    order,
                    status: status!
                });
                toast.success('Product deleted from order');
    
            }).catch((err) => {
                console.log(err);
                toast.error('Error deleting product from order');
            }
            );
            return;
        }
        toast.error('Error deleting product from order');
    
    }
    return (
        <>
            <Dialog open={confirmDeleteDialogOpen} onOpenChange={setConfirmDeleteDialogOpen}>
                <DialogContent className="bg-black text-white">
                    <DialogHeader>Delete product from order</DialogHeader>
                    <DialogDescription>Are you sure you want to delete {`'${selectedProduct?.productId.name}'`}</DialogDescription>
                    
                    <DialogFooter className="gap-y-2">
                        <Button onClick={() => setConfirmDeleteDialogOpen(false)} className="bg-red-500 hover:bg-red-600">Cancel</Button>
                        <Button onClick={onConfirm} className="bg-green-500 hover:bg-green-600">Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent className="min-w-[95%] md:min-w-[75%]">
                <DialogHeader>
                <DialogTitle>Products for order {products?.order?._id}</DialogTitle>
                <DialogDescription>
                    Products below are the products that you have ordered.
                </DialogDescription>
                </DialogHeader>
                <p className="mt-4">Status: {status && <span className={statusColor(status)}>{status}</span>}</p>
                    {isAdmin && <>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="text-white bg-black">
                            <SelectItem value="ready">Ready</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="w-[180px] bg-green-500 hover:bg-green-600">Update</Button>
                    </>}
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-center">Action</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products?.products.map((orderedProduct: OrderProduct) => {
                    return (
                        <TableRow key={orderedProduct._id}>
                        <TableCell>{orderedProduct.productId.name}</TableCell>
                        <TableCell>{formatter.format(orderedProduct.productId.price)}</TableCell>
                        <TableCell>{orderedProduct.quantity}</TableCell>
                        <TableCell>{formatter.format(orderedProduct.quantity * orderedProduct.productId.price)}</TableCell>
                        
                        <TableCell 
                            onClick={() => {
                                setSelectedProduct(orderedProduct)
                                setConfirmDeleteDialogOpen(true);    
                            }} 
                            className="text-center cursor-pointer hover:text-red-400 transition-colors"
                        >
                            <div className="flex justify-center items-center">
                                <Trash2 className="h-4 w-4 cursor-pointer hover:text-red-400 transition-colors"/>
                            
                            </div>
                        </TableCell>
                        </TableRow>
                    )
                    })}
                </TableBody>
                </Table>
            </DialogContent>
            </Dialog>
            
        </>
      )
}

export default OrderDialog;