import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "./Input";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { DialogFooter } from "./Dialog";
import { createCategory } from "../lib/categories";
import { Label } from "./Label";
import InputError from "./InputError";
import Button from "./Button";
import { TCategoryForm, categoryFormSchema } from "../lib/types";
import { DialogClose } from "@radix-ui/react-dialog";



export default function CreateCategoryForm(){
  
    const form = useForm<TCategoryForm>({
      resolver: zodResolver(categoryFormSchema),
      mode: "onTouched",
    });

    async function onSubmit(data: TCategoryForm) {
        try {
            await createCategory(data.name);
            toast.success('Category created successfully');
        } catch (e: any) {
            console.error(e)
            toast.error(e?.message || 'Something went wrong');
        };
    };

    
    function renderError(fieldName: keyof typeof form.formState.errors) {
      return form.formState.errors[fieldName]?.message && <InputError>{String(form.formState.errors[fieldName]?.message)}</InputError>;
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}  className="gap-y-4 gap-x-3 grid grid-cols-6 overflow-y-auto overflow-x-visible px-1">
            <div className="md:col-span-4 col-span-6">
              <Label>Name*</Label>
              <Input placeholder="Category name..." {...form.register('name')} />  
              {renderError('name')}
            </div>

            <DialogFooter className="col-span-6">
              <DialogClose>
                <div>
                  <Button type="submit">
                    Save
                  </Button>
        
                </div>
                  
              </DialogClose>
            </DialogFooter>
               
        </form>
    )
}