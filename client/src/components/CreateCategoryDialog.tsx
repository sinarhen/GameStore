import { 
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
} from "./Dialog";
import { PlusCircle } from "lucide-react";
import Button from "./Button";
import CreateCategoryForm from "./CreateCategoryForm";
import { useDialog } from "../hooks/useDialog";

export default function CreateCategoryDialog({}){
    const {openDialog} = useDialog();

    function onOpenDialog(){
        openDialog({
            title: 'Create category',
            description: 'fill information about category',
            content: <CreateCategoryForm />
        });
    }
    return (
        
        <Button 
        onClick={onOpenDialog}
        className="group flex items-center gap-x-1 mb-4">
            Create category
            <PlusCircle className="group-hover:rotate-90 transition-transform" />
        </Button>
    )
}