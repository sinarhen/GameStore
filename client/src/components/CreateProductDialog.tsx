import {PlusCircle} from "lucide-react";
import Button from "./Button";
import ProductForm from "./ProductForm";
import {useDialog} from "../hooks/useDialog";
import {ProductCardType} from "../lib/types";

export default function CreateProductDialog({
                                              products,
                                              setProductsInTable,
                                            }: {
  products: ProductCardType[] | null;
  setProductsInTable: React.Dispatch<React.SetStateAction<ProductCardType[] | null>>
}) {
  const {openDialog} = useDialog()
  const onOpen = () => {
    openDialog({
      title: "Create product",
      description: "fill information about product",
      content: <ProductForm variant="create" products={products} setProductsInTable={setProductsInTable}/>,
    })
  }
  return (
    <Button onClick={onOpen} className="group flex items-center gap-x-1">
      Create product
      <PlusCircle className="group-hover:rotate-90 transition-transform"/>
    </Button>

  )
}