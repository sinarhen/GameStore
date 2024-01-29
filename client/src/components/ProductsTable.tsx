import {ProductCardType} from "../lib/types";
import {deleteProduct} from "../lib/products";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "./Table";
import {PencilLine, Trash2} from "lucide-react";
import toast from "react-hot-toast";
import TableEmpty from "./TableEmpty";
import {useDialog} from "../hooks/useDialog";
import {formatter} from "../lib/utils";
import ProductForm from "./ProductForm";

export default function ProductsTable({
                                        products,
                                        setProducts,
                                        tableCaption
                                      }: {
  products: ProductCardType[] | null;
  setProducts: React.Dispatch<React.SetStateAction<ProductCardType[] | null>>;
  tableCaption?: string;
}) {

  async function deleteProductAsync(product: ProductCardType | null = null) {
    if (product?._id) {
      try {
        await deleteProduct(product?._id);
        if (products) {
          setProducts(products.filter((p) => p._id !== product._id));
        }
        toast.success("Product deleted successfully");
        closeDialog();
      } catch (error) {
        console.log(error);
        toast.error("Щось пішло не так");
      }
    }

  }

  const {openDialog, closeDialog} = useDialog()

  const onOpen = (product: ProductCardType) => {
    openDialog({
      title: "Edit product",
      description: "Change information about product",
      content: <ProductForm products={products} setProducts={setProducts} variant="edit" initialValues={product}/>
    })
  }
  const openDeleteDialog = (product: ProductCardType) => {
    openDialog({
      title: "Delete product",
      description: "Are you sure you want to delete this product?",
      content: <></>,
      onConfirm: () => async () => await deleteProductAsync(product),
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
            <TableHead className="overflow-hidden">Product Id</TableHead>
            <TableHead className="text-center w-full">Name</TableHead>
            <TableHead className="text-center w-full">Price</TableHead>
            <TableHead className="text-center w-full">Category</TableHead>
            <TableHead className="text-center align-center justify-end w-full">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product._id}>
              <TableCell className="overflow-hidden">{product._id}</TableCell>
              <TableCell className="text-center w-full">{product.name}</TableCell>
              <TableCell className="text-center w-full">{formatter.format(product.price)}</TableCell>
              <TableCell className="text-center w-full">{product.category?.name ?? "None"}</TableCell>
              <TableCell className="text-right w-full">
                <div className="flex gap-x-1 justify-center items-center">
                  <div
                    onClick={() => onOpen(product)}

                    className='p-2  cursor-pointer group rounded-lg hover:bg-gray-400 transition-colors'

                  >
                    <PencilLine className="group-hover:text-indigo-500 w-3.5 h-3.5 transition-colors"/>
                  </div>

                  <div
                    onClick={() => openDeleteDialog(product)}
                    className='p-2  cursor-pointer group rounded-lg hover:bg-red-200 transition-colors'
                  >
                    <Trash2
                      className="h-3.5 w-3.5 group-hover:text-red-500 transition-colors"/>

                  </div>

                </div>
                <div className="">

                </div>
                <div
                  className="flex justify-center items-center">
                </div>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
      <TableEmpty isEmpty={products?.length ? products?.length === 0 : true}/>
    </>
  );
}