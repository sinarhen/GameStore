import { PlusCircle } from "lucide-react";
import Button from "./Button";
import ProductForm from "./ProductForm";
import { useDialog } from "../hooks/useDialog";

export default function CreateProductDialog({}){
    const {openDialog, closeDialog} = useDialog()
    const onOpen = () => {
        openDialog({
            title: "Create product",
            description: "fill information about product",
            content: <ProductForm variant="create" />,
        })
    }
    return (
            <Button onClick={onOpen} className="group flex items-center gap-x-1">
                Create product
                <PlusCircle className="group-hover:rotate-90 transition-transform" />
            </Button>

    )
}