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
import { useState } from "react";
import { Order } from "../lib/types";
import OrderDialog from "./OrderDialog";
import { statusColor } from "../lib/utils";
import NotFound from "./NotFound";
import { deleteOrder } from "../lib/order";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./Dialog";
import Button from "./Button";

export default function Orders({
  orders,
  setOrders,
  tableCaption
}: {
  orders: Order[] | null;
  setOrders: (orders: Order[]) => void;
  tableCaption?: string;
}) {
  const [selectDialog, setSelectDialog] = useState<Order | null>(null);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  function updateOrder(order: Order) {
    if (orders){
      setOrders(orders?.map((o) => (o._id === order._id ? order : o)));
    }
  }
  if (!orders){
    return <NotFound />;
  }

  async function deleteOrderAsync(orderId : string) {
    try {
      await deleteOrder(orderId);
      if (orders){
        setOrders(orders.filter((order) => order._id !== orderId));
      }
    } catch (error) {
      console.log(error);
    }
  }
  
    return (
      // TODO: move confirmDialog to Component
    <> 
    <Dialog open={confirmOpen} onOpenChange={setConfirmOpen} >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this order?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
          <div className="mt-4 flex justify-end gap-4">
            <Button onClick={() => {setConfirmOpen(false); deleteOrderAsync(selectDialog?._id as string)}}>Yes</Button>
            <Button onClick={() => setConfirmOpen(false)}>No</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>

      <OrderDialog updateOrder={updateOrder} setOrder={setSelectDialog} order={selectDialog} open={dialogOpen} setOpen={setDialogOpen}/>
      <Table className="mt-10 w-full h-full">
        <TableCaption>{tableCaption}</TableCaption>
        <TableHeader>
          <TableRow className="bg-neutral-800">
            <TableHead className="overflow-hidden">ID</TableHead>
            <TableHead className="text-center w-full">Products</TableHead>
            <TableHead className="text-center w-full">Status</TableHead>
            <TableHead className="text-right align-center justify-end w-full">Amount</TableHead>
            <TableHead className="text-right align-center justify-end w-full">Delete Order</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id} >
              <TableCell className="w-[10px]">{order._id}</TableCell>
              <TableCell onClick={() => {
                setDialogOpen(true);
                setSelectDialog(order);
              }}
                className="text-center hover:underline cursor-pointer">
                  {order.products.length} items
              </TableCell>
              <TableCell className={statusColor(order.status) + " text-center"}>{order.status}</TableCell>
              <TableCell className="text-right w-full">{order.totalPrice}</TableCell>
              <TableCell className="text-right w-full">
                <div onClick={() => {setConfirmOpen(true); setSelectDialog(order);}} className="flex justify-center items-center">
                  <Trash2 className="h-4 w-4 cursor-pointer hover:text-red-400 transition-colors" />
                </div>
              </TableCell>
          </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-transparent">
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">${orders.reduce((acc, order) => acc + order.totalPrice, 0)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
    )
}
