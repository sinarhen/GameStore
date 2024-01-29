import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import Input from "./Input";
import toast from "react-hot-toast";
import {DialogFooter} from "./Dialog";
import {createCategory} from "../lib/categories";
import {Label} from "./Label";
import InputError from "./InputError";
import Button from "./Button";
import {categoryFormSchema, CategoryType, TCategoryForm} from "../lib/types";
import {DialogClose} from "@radix-ui/react-dialog";


export default function CreateCategoryForm({
                                             setCategories,
                                             categories
                                           }: {
  setCategories: (categories: CategoryType[]) => void;
  categories: CategoryType[];
}) {

  const form = useForm<TCategoryForm>({
    resolver: zodResolver(categoryFormSchema),
    mode: "onTouched",
  });

  async function onSubmit(data: TCategoryForm) {
    try {
      const newCategory = await createCategory(data.name);
      setCategories([...categories, newCategory.data]);
      toast.success('Категорія створена успішно');
    } catch (e: any) {
      console.error(e)
      toast.error(e?.message || 'Щось пішло не так');
    }
  }


  function renderError(fieldName: keyof typeof form.formState.errors) {
    return form.formState.errors[fieldName]?.message &&
        <InputError>{String(form.formState.errors[fieldName]?.message)}</InputError>;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}
          className="gap-y-4 gap-x-3 grid grid-cols-6 overflow-y-auto overflow-x-visible px-1">
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