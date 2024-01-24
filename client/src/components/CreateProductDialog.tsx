import { PlusCircle } from "lucide-react";
import Button from "./Button";
import CreateProductForm from "./CreateProductForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./Dialog";

export default function CreateProductDialog({}){
    return (
        <Dialog>
        <DialogTrigger>
            <Button className="group flex items-center gap-x-1">
                Create product
                <PlusCircle className="group-hover:rotate-90 transition-transform" />
            </Button>
        </DialogTrigger>
        <DialogContent className="w-[95%] sm:w-[75%] md:w-[%] h-[95%] px-4">
            <DialogHeader>
                <DialogTitle>Create product</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">fill information about product</DialogDescription>
            </DialogHeader>
            <CreateProductForm />
        </DialogContent>
    </Dialog>

    )
}