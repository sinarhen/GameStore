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
import { useEffect, useState } from "react";
import { getUserOrdersById } from "../lib/order";
import { Order, OrderProduct, ProductCardType } from "../lib/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./Dialog";
import { Trash2 } from "lucide-react";
import OrderDialog from "./OrderDialog";
import { statusColor } from "../lib/utils";

export default function MyOrders() {

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getUserOrdersById().then((data) => {
      console.log(data);
      setOrders(data.data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogProducts, setDialogProducts] = useState<{
    products: OrderProduct[],
    orderId: string,
    status: string
  
  }| null>(null);
    return (
    <>
      <OrderDialog setProducts={setDialogProducts} status={dialogProducts?.status} open={dialogOpen} setOpen={setDialogOpen} products={dialogProducts}/>
      <Table className="mt-10 w-full h-full">
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow className="bg-neutral-800">
            <TableHead className="overflow-hidden">ID</TableHead>
            <TableHead className="text-center w-full">Products</TableHead>
            <TableHead className="text-center w-full">Status</TableHead>
            <TableHead className="text-right align-center justify-end w-full">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow  key={order._id} className="cursor-pointer">
              <TableCell className="w-[10px]">{order._id}</TableCell>
              <TableCell
                onClick={() => {
                  setDialogOpen(true);
                  setDialogProducts({
                    status: order.status,
                    orderId: order._id,
                    products: order.products
                  });
                }} 
                className="text-center hover:underline cursor-pointer">
                  click to inspect
              </TableCell>
              <TableCell className={statusColor(order.status) + " text-center"}>{order.status}</TableCell>
              <TableCell className="text-right w-full">{order.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-transparent">
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
    )
}
