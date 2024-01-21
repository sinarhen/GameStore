import { Trash2 } from "lucide-react"
import { OrderProduct } from "../lib/types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./Dialog"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./Table"
import { statusColor } from "../lib/utils";

interface OrderDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    products: {
        products: OrderProduct[],
        orderId: string
    } | null;
    status?: string ;
}

const OrderDialog: React.FC<OrderDialogProps> = ({
    open,
    setOpen,
    products,
    status
}) => {
    return (
        
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="bg-neutral-800 text-white">
        <DialogHeader>
          <DialogTitle>Products for order {products?.orderId}</DialogTitle>
          <DialogDescription>
            Products below are the products that you have ordered.
          </DialogDescription>
        </DialogHeader>
        <p className="">Status: {status && <span className={statusColor(status)}></span>}</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.products.map((orderedProduct: OrderProduct) => {
              return (
                <TableRow key={orderedProduct._id}>
                  <TableCell>{orderedProduct.productId.name}</TableCell>
                  <TableCell>{orderedProduct.productId.price}</TableCell>
                  <TableCell>{orderedProduct.quantity}</TableCell>
                  <TableCell className="flex justify-center w-full items-center"><Trash2 className="h-4 w-4 cursor-pointer hover:text-red-400 transition-colors"/></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
    )
}

export default OrderDialog;