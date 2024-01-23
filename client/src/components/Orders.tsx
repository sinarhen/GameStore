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
import { useState } from "react";
import { Order } from "../lib/types";
import OrderDialog from "./OrderDialog";
import { statusColor } from "../lib/utils";
import NotFound from "./NotFound";

export default function Orders({
  orders,
  setOrders,
  tableCaption
}: {
  orders: Order[] | null;
  setOrders: (orders: Order[]) => void;
  tableCaption?: string;
}) {

  const [dialogOrder, setDialogOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  function updateOrder(order: Order) {
    if (orders){
      setOrders(orders?.map((o) => (o._id === order._id ? order : o)));
    }
  }
  if (!orders){
    return <NotFound />;
  }
    return (
    <>
      <OrderDialog updateOrder={updateOrder} setOrder={setDialogOrder} order={dialogOrder} open={dialogOpen} setOpen={setDialogOpen}/>
      <Table className="mt-10 w-full h-full">
        <TableCaption>{tableCaption}</TableCaption>
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
            <TableRow 
              onClick={() => {
                setDialogOpen(true);
                setDialogOrder(order);
              }}  
              key={order._id} 
              className="cursor-pointer"
              >
              <TableCell className="w-[10px]">{order._id}</TableCell>
              <TableCell
                className="text-center hover:underline cursor-pointer">
                  {order.products.length} items
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
