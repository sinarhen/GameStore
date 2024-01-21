import { motion } from "framer-motion";
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

export default function MyOrders({orders}: {
    orders: any[]
}) {
    // if (!orders.length) return (
    //     <motion.div
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         exit={{ opacity: 0 }}
    //         transition={{ delay: 3, duration: 1}}
    //         className="mt-4"
    //     >
    //         <p className="text-3xl text-zinc-600">You have no orders yet.</p>
    //     </motion.div>

    // )
    return (
        <>
            <Table>
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Product </TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.order}>
            <TableCell className="font-medium">{order.order}</TableCell>
            <TableCell>{order.paymentStatus}</TableCell>
            <TableCell>{order.paymentMethod}</TableCell>
            <TableCell className="text-right">{order.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
        </>
    )
}
