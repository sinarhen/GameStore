import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "./Table";
import {CategoryType} from "../lib/types";
import {Trash2} from "lucide-react";
import TableEmpty from "./TableEmpty";
import {useDialog} from "../hooks/useDialog";
import {deleteCategory} from "../lib/categories";
import toast from "react-hot-toast";

export default function CategoryTable({
                                        categories,
                                        setCategories,
                                        tableCaption
                                      }: {
  categories: CategoryType[] | null;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  tableCaption?: string;
}) {

  async function deleteCategoryAsync(selectedCategory: CategoryType | null = null) {
    if (selectedCategory?._id) {
      try {
        await deleteCategory(selectedCategory?._id);
        if (categories) {
          setCategories(categories.filter((category) => category._id !== selectedCategory?._id));
        }
        toast.success("Категорія видалена успішно");
        closeDialog();
      } catch (error) {
        console.log(error);
        toast.error("Щось пішло не так");
      }
    }
  }

  const {openDialog, closeDialog} = useDialog();
  const openDeleteDialog = (product: CategoryType) => {
    openDialog({
      title: "Delete category",
      description: "Are you sure you want to delete this product?",
      onConfirm: () => async () => await deleteCategoryAsync(product),
      confirmText: "Yes",
      cancelText: "No",
    })
  }

  return (
    <>
      <Table className="mt-10 w-full h-full">
        <TableCaption>{tableCaption}</TableCaption>
        <TableHeader>
          <TableRow className="bg-neutral-800">
            <TableHead className="overflow-hidden">Category ID</TableHead>
            <TableHead className="text-center w-full">Name</TableHead>
            <TableHead className="text-center align-center justify-end w-full">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category._id}>
              <TableCell className="overflow-hidden">{category._id}</TableCell>
              <TableCell className="text-center w-full">{category.name}</TableCell>
              <TableCell className="text-right w-full">
                <div className="flex gap-x-1 justify-center items-center">
                  <div
                    onClick={() => openDeleteDialog(category)}
                    className="p-2  cursor-pointer group rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5 group-hover:text-red-500 transition-colors"/>
                  </div>
                </div>

                <div
                  className="flex justify-center items-center">
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableEmpty isEmpty={categories?.length === 0}/>
    </>
  );
}