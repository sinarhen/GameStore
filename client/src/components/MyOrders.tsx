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
import { Order, ProductCardType } from "../lib/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./Dialog";

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
   const statusColor = () => {
    switch (orders[0].status) {
      case "Pending":
        return "text-yellow-500";
      case "Completed":
        return "text-green-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  }
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogProducts, setDialogProducts] = useState<ProductCardType[]>([]);
    return (
    <>
      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <DialogContent className="bg-neutral-800 text-white">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
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
                  setDialogProducts(order.products);
                }} 
                className="text-center hover:underline cursor-pointer">
                  click to inspect
              </TableCell>
              <TableCell className={statusColor() + " text-center"}>{order.status}</TableCell>
              <TableCell className="text-right w-full">1500$</TableCell>
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
