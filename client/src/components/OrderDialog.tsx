import {Order, OrderProduct} from '../lib/types';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./Table"
import {formatter, statusColor, translateStatus} from "../lib/utils";
import React, {useCallback, useState} from "react";
import Button from "./Button";
import {updateIsPaid, updateOrderStatus} from "../lib/order";
import toast from "react-hot-toast";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./Select";
import {useCurrentUser} from "../hooks/useCurrentUser";
import ConfirmDialog from "./ConfirmDialog";
import {CheckCircledIcon, CrossCircledIcon} from "@radix-ui/react-icons";
import Clipboard from "./Clipboard";

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
  const [isPaid, setIsPaid] = useState(order?.isPaid || false);

  const toggleIsPaid = useCallback(async () => {
    try {
      if (order?._id)
      {
        await updateIsPaid(order?._id, !isPaid);
        setIsPaid(!isPaid);
        updateOrder({...order, isPaid: !isPaid, status: confirmedStatus});
        toast.success('Статус оплати замовлення оновлено');
      } else {
        toast.error('Помилка. Подивіться в консоль');
        console.error("No order id in order dialog");
      }
    } catch (err: any){
      toast.error(err.message ?? 'Помилка. Подивіться в консоль');
    }
  }, [order, isPaid, confirmedStatus, updateOrder]);
  const handleUpdateStatus = useCallback(async () => {
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
  }, [order, status, updateOrder]);

  return (
    <>
      <ConfirmDialog open={confirmOpen} setOpen={setConfirmOpen} onConfirm={() => {
      }}/>
      <div className="flex w-full gap-x-4">
        <div className="flex w-full flex-col">
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
                  </SelectContent>
              </Select>
              <Button onClick={handleUpdateStatus}
                      className="w-[180px] bg-green-600 hover:bg-green-500 mt-4">Застосувати</Button>
          </>}
        </div>

        {isAdmin && <div className='mt-4 mb-1 flex flex-col justify-between'>
            <div className=''>
                <div className='w-full gap-x-2 flex items-center'>
                    <p className=''>Оплачено: </p>
                    <span>
                      {isPaid ? <CheckCircledIcon className='' color='green' /> : <CrossCircledIcon className='' color='red'/>}
                    </span>
                </div>
                <Button
                    onClick={toggleIsPaid}
                    className={isPaid ? "bg-red-600 hover:bg-red-500": "bg-green-600 hover:bg-green-500"}>Змінити</Button>

            </div>

          { order?.login && order?.password &&
            <div className='gap-y-2 text-xs'>
                <p className='flex'>{order?.login}<Clipboard text={order?.login} /></p>
                <p className='flex'>{order?.password}<Clipboard text={order?.password} /></p>
            </div>
          }
        </div>
        }
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
                <TableCell>{orderedProduct.product.name}</TableCell>
                <TableCell>{formatter.format(orderedProduct.product.price)}</TableCell>
                <TableCell>{orderedProduct.quantity}</TableCell>
                <TableCell>{formatter.format(orderedProduct.quantity * orderedProduct.product.price)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default OrderDialog;