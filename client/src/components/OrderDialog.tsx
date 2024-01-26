import { Trash2 } from "lucide-react";
import { Order, OrderProduct, ProductCardType } from '../lib/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./Dialog"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./Table"
import { formatter, statusColor } from "../lib/utils";
import { useState } from "react";
import Button from "./Button";
import { removeFromOrder } from "../lib/order";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { updateOrderStatus, updateOrderPaymentStatus } from "../lib/order";
import ConfirmDialog from "./ConfirmDialog";
import { useDialog } from "../hooks/useDialog";

interface OrderDialogProps {
    order: Order | null,
    setOrder: (order: Order | null) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    updateOrder: (orders: Order) => void;
}

const OrderDialog: React.FC<OrderDialogProps> = ({
    open,
    setOpen,
    order,
    setOrder,
    updateOrder
}) => {
    const [status, setStatus] = useState(order?.status || 'pending');
    const [paymentStatus, setPaymentStatus] = useState(order?.paymentStatus || 'pending');
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState<OrderProduct | null>(null);

    const { isAdmin } = useCurrentUser();

    const handleUpdateStatus = async () => {
        try {
            if (order?._id) {
                await updateOrderStatus(order?._id, status);
                setOrder({...order, status});
                updateOrder({...order, status});
                toast.success('Order status updated');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdatePaymentStatus = async () => {
        try {
            if (order?._id) {
                await updateOrderPaymentStatus(order?._id, paymentStatus);
                setOrder({...order, paymentStatus});
                updateOrder({...order, paymentStatus});
                toast.success('Order payment status updated');
            }
        } catch (err) {
            console.log(err);
        }
    };


    
    function onConfirm(){
        if (selectedProduct?._id && order?._id)
        {
            removeFromOrder(selectedProduct?._id).then((data) => {
                console.log(data);
                const updatedProducts = order.products?.filter((product) => product._id !== selectedProduct?._id);
                if (selectedProduct.quantity > 1) {
                    updatedProducts?.push({...selectedProduct, quantity: selectedProduct.quantity - 1});
                }
                if (updatedProducts)
                {
                    setOrder({
                        ...order,
                        products: updatedProducts,
                    
                    })
                }
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
            <ConfirmDialog open={confirmOpen} setOpen={setConfirmOpen} onConfirm={onConfirm} />
                <div className="flex gap-x-4">
                    <div className="flex flex-col">
                        <p className="mt-4 mb-1">Status: {order?.status && <span className={statusColor(order?.status)}>{order.status}</span>}</p>
                        {isAdmin && <>
                        <Select onValueChange={(e) => setStatus(e)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="text-white bg-black">
                                <SelectItem value="ready">Ready</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={handleUpdateStatus} className="w-[180px] bg-green-500 hover:bg-green-600 mt-4">Update</Button>
                        </>}
                    </div>
                    <div className="flex flex-col">
                        <p className="mt-4 mb-1">Payment status: {order?.paymentStatus && <span className={statusColor(order?.paymentStatus)}>{order.paymentStatus}</span>}</p>
                        {isAdmin && <>
                        <Select onValueChange={(e) => setPaymentStatus(e)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="text-white bg-black">
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={handleUpdatePaymentStatus} className="w-[180px] bg-green-500 hover:bg-green-600 mt-4">Update</Button>
                        </>}
                    </div>
                </div>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {order?.products?.map((orderedProduct: OrderProduct) => {
                    return (
                        <TableRow key={orderedProduct._id}>
                            <TableCell>{orderedProduct.productId.name}</TableCell>
                            <TableCell>{formatter.format(orderedProduct.productId.price)}</TableCell>
                            <TableCell>{orderedProduct.quantity}</TableCell>
                            <TableCell>{formatter.format(orderedProduct.quantity * orderedProduct.productId.price)}</TableCell>
                        
                        </TableRow>
                    )
                    })}
                </TableBody>
            </Table>
        </>
      )
}

export default OrderDialog;