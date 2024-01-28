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
import { formatter, statusColor, translateStatus } from "../lib/utils";
import NotFound from "./NotFound";
import { deleteOrder } from "../lib/order";
import ConfirmDialog from "./ConfirmDialog";
import toast from 'react-hot-toast';
import { FaInfo } from "react-icons/fa";
import { useCurrentUser } from "../hooks/useCurrentUser";
import TableEmpty from "./TableEmpty";
import { useDialog } from "../hooks/useDialog";

export default function Orders({
  orders,
  setOrders,
  tableCaption
}: {
  orders: Order[] | null;
  setOrders: (orders: Order[]) => void;
  tableCaption?: string;
}) {
  const { isAdmin } = useCurrentUser();
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  function updateOrder(order: Order) {
    if (orders){
      setOrders(orders?.map((o) => (o._id === order._id ? order : o)));
    }
  }

  const { openDialog, closeDialog } = useDialog();
  if (!orders){
    return <NotFound />;
  }

  async function deleteOrderAsync(orderId : string) {
    try {
      await deleteOrder(orderId);
      if (orders){
        setOrders(orders.filter((order) => order._id !== orderId));
      }
      toast.success("Order deleted successfully");
      closeDialog();
    } catch (error) {
      console.log(error);
    }
  }

  const onConfirmOpen = (order: Order) => {
    openDialog({
      title: "Delete order",
      description: "Are you sure you want to delete this order?",
      onConfirm: () =>async () => deleteOrderAsync(order._id as string),
      confirmText: "Yes",
      cancelText: "No"
    })
  }

  const onOrderDialogOpen = (order: Order) => {
    openDialog({
      title: "Деталі замовлення",
      description: "Переглянути деталі замовлення тут",
      content: <OrderDialog updateOrder={updateOrder} setOrder={setSelectedOrder} order={order} open={dialogOpen} setOpen={setDialogOpen}/>,
      confirmText: null,
      cancelText: "Закрити"
    })
  }
  const isEmpty = orders?.length ? orders?.length === 0 : true;
    return (
    <> 
    <div>
      <Table className="w-full h-full">
        <TableHeader>
          <TableRow className="bg-neutral-800 sticky top-0">
            <TableHead className="overflow-hidden">ID</TableHead>
            <TableHead className="text-center w-full">Продукти</TableHead>
            <TableHead className="text-center w-full">Статус</TableHead>
            <TableHead className="text-right w-full">Статус платежу</TableHead>
            <TableHead className="text-right align-center justify-end w-full">Сума</TableHead>
            <TableHead className="text-center align-center justify-center  w-full"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id} >
              <TableCell className="w-[10px]">{order._id}</TableCell>
              <TableCell onClick={() => {
                setDialogOpen(true);
                setSelectedOrder(order);
              }}
                className="text-center">
                  {order.products.length} товар
              </TableCell>
              <TableCell className={statusColor(order.status) + " text-center"}>{translateStatus(order.status)}</TableCell>
              <TableCell className={statusColor(order.paymentStatus) + " text-center"}>{translateStatus(order.paymentStatus)}</TableCell>
              <TableCell className="text-right w-full">{formatter.format(order.products.reduce((total, product) => total + product.productId.price * product.quantity, 0))}</TableCell>
              <TableCell className="w-full">
              <div className="flex gap-x-1 justify-center items-center">
                  <div 
                    onClick={() => onOrderDialogOpen(order)} 
                    
                    className='p-2  cursor-pointer group rounded-lg hover:bg-gray-400 transition-colors'
                    
                    >
                    <FaInfo className="group-hover:text-indigo-500 w-3.5 h-3.5 transition-colors"/>
                  </div>
                  
                  {isAdmin && <div 
                    onClick={() => onConfirmOpen(order)}
                    className='p-2  cursor-pointer group rounded-lg hover:bg-red-200 transition-colors'
                  >
                    <Trash2 
                    className="h-3.5 w-3.5 group-hover:text-red-500 transition-colors" />

                  </div>}
                  
                </div>
                
              </TableCell>
          </TableRow>
          ))}
        </TableBody>
        {!isEmpty && (
          <TableFooter className="bg-transparent">
          <TableRow className="sticky bg-neutral-900 bottom-0">
            <TableCell colSpan={4}>Сума</TableCell>
            <TableCell className="text-right">{formatter.format(orders.reduce((total, order) => total + order.products.reduce((total, product) => total + product.productId.price * product.quantity, 0), 0))}</TableCell>
            <TableCell></TableCell>

          </TableRow>
          </TableFooter>
        )}
      </Table>
      <TableEmpty isEmpty={isEmpty}/>

      <p className="text-center text-sm mt-2 text-muted-foreground">
      </p>

    </div>
        </>
    )
}
