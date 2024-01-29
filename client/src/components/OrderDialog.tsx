import {Order, OrderProduct} from '../lib/types';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./Table"
import {formatter, statusColor, translateStatus} from "../lib/utils";
import React, {useState} from "react";
import Button from "./Button";
import {updateOrderStatus} from "../lib/order";
import toast from "react-hot-toast";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./Select";
import {useCurrentUser} from "../hooks/useCurrentUser";
import ConfirmDialog from "./ConfirmDialog";

interface OrderDialogProps {
  order: Order | null,
  open: boolean;
  setOpen: (open: boolean) => void;
  updateOrder: (orders: Order) => void;
}

const OrderDialog: React.FC<OrderDialogProps> = ({
                                                   order,
                                                   updateOrder
                                                 }) => {
  const [status, setStatus] = useState(order?.status || 'pending');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const {isAdmin} = useCurrentUser();
  const [confirmedStatus, setConfirmedStatus] = useState(order?.status || 'pending');

  const handleUpdateStatus = async () => {
    try {
      if (order?._id) {
        setConfirmedStatus(status)
        await updateOrderStatus(order?._id, status);
        updateOrder({...order, status})
        toast.success('Статус замовлення оновлено');
      }
    } catch (err) {
      console.log(err);
      toast.error('Помилка оновлення статусу замовлення. Подивіться в консоль');
    }
  };

  return (
    <>
      <ConfirmDialog open={confirmOpen} setOpen={setConfirmOpen} onConfirm={() => {
      }}/>
      <div className="flex gap-x-4">
        <div className="flex flex-col">
          <p className="mt-4 mb-1">Статус: {confirmedStatus &&
              <span className={statusColor(confirmedStatus)}>{translateStatus(confirmedStatus)}</span>}</p>
          {isAdmin && <>
              <Select onValueChange={(e) => setStatus(e)}>
                  <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status"/>
                  </SelectTrigger>
                  <SelectContent className="text-white bg-black">
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
              </Select>
              <Button onClick={handleUpdateStatus}
                      className="w-[180px] bg-green-500 hover:bg-green-600 mt-4">Update</Button>
          </>}
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ім'я продукту</TableHead>
            <TableHead>Ціна</TableHead>
            <TableHead>Кількість</TableHead>
            <TableHead>Сума</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order?.products?.length && order?.products?.map((orderedProduct: OrderProduct) => {
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