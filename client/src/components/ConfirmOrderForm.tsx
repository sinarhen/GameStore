import { useForm } from "react-hook-form"
import * as z from 'zod';
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from 'react';
import Button from "./Button";


const confirmOrderSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),   
})

type TConfirmForm = z.infer<typeof confirmOrderSchema>;

export default function ConfirmOrderForm()
{
    const form = useForm<TConfirmForm>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(confirmOrderSchema),
    });
    const onSubmit = useCallback(async () => {
        
    }, [])
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1.5">
            <div>
                <Input {...form.register('email')}/>
            </div>
            <div>
                <Input {...form.register('password')}/>
            </div>
            <Button 
                disabled={!form.formState.isDirty || !form.formState.isValid}
                className="bg-green-600 hover:bg-green-500"
            >
                Confirm
            </Button>
        </form>
    )
}