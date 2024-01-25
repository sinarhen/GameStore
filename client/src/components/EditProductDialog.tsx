import { useDialog } from "../hooks/useDialog";
import Button from "./Button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./Dialog";
import EditProductForm from "./EditProductForm";


export default function EditProductDialog({initialValues} : {initialValues: any}){

    const { openDialog } = useDialog();

    const openEditDialog = () => {
        openDialog({
            title: "Edit product",
            description: "Make changes to your product here. Click save when you're done.",
            content: <EditProductForm initialValues={initialValues}/>,
        })
    }

    
    return (
        <Button onClick={openEditDialog} >Edit</Button>
            
    )
}