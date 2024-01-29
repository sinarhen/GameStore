import { useForm } from "react-hook-form"
import * as z from 'zod';
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from 'react';
import Button from "./Button";
import InputError from "./InputError";
import {confirmOrder} from "../lib/order";
import toast from "react-hot-toast";
import {Order} from "../lib/types";
import {useDialog} from "../hooks/useDialog";


const confirmOrderSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),   
})

type TConfirmForm = z.infer<typeof confirmOrderSchema>;

export default function ConfirmOrderForm({
  cart,
  resetCart
                                         }: {
  cart: Order;
  resetCart: () => void;
})
{
    const {closeDialog} = useDialog();
    const form = useForm<TConfirmForm>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onTouched",
        resolver: zodResolver(confirmOrderSchema),
    });
    const onSubmit = useCallback(async (values: TConfirmForm) => {
        if (cart._id)
        {
          try {
            await confirmOrder(cart._id, values.email, values.password);
            toast.success("Замовлення успішно підтверджено", {id: "confirmOrderSuccess"})
            closeDialog();
            resetCart();

          } catch (error: any) {
            console.error(error);
            toast.error(error?.message ?? "Щось пішло не так при підтвердженні вашого замовлення.", {id: "confirmOrderError"})
          }
    }}, [cart._id, closeDialog, resetCart])


    function renderError(fieldName: keyof typeof form.formState.errors) {
      return form.formState.errors[fieldName]?.message &&
          <InputError>{String(form.formState.errors[fieldName]?.message)}</InputError>;
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Input {...form.register('email')} type="text" />
                {renderError("email")}
            </div>
            <div>
                <Input {...form.register('password')} type="password"/>
                {renderError("password")}

            </div>
            <Button 
                disabled={!form.formState.isDirty || !form.formState.isValid}
                className="bg-green-600 w-full md:w-auto hover:bg-green-500"
            >
                Confirm
            </Button>
        </form>
    )
}