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

export default function CreateCategoryDialog({}){
    return (
        
        <Dialog>
        <DialogTrigger>
            <Button className="group flex items-center gap-x-1 mb-4">
                Create category
                <PlusCircle className="group-hover:rotate-90 transition-transform" />
            </Button>
        </DialogTrigger>
        <DialogContent className="w-[95%] sm:w-[75%] md:w-[%] px-4">
            <DialogHeader>
                <DialogTitle>Create category</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">fill information about category</DialogDescription>
            </DialogHeader>
            <CreateCategoryForm />
        </DialogContent>
    </Dialog>
    )
}