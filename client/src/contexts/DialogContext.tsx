import { createContext, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/Dialog";
import Button from "../components/Button";

type DialogContextType = {
    showDialog: (
        title?: string, 
        description?: string, 
        content?: React.ReactNode | null, 
        onConfirm?: () => void, 
        onCancel? : () => void,
        confirmText?: string | null,
        cancelText?: string | null
        ) => void;

    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({ children }: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [onConfirm, setOnConfirm] = useState<() => void>(() => {});
    const [onCancel, setOnCancel] = useState<() => void>(() => {});
    const [title, setTitle] = useState<null | string>("");
    const [description, setDescription] = useState<null | string>("");
    const [content, setContent] = useState<React.ReactNode | null>(() => null);
    const [confirmText, setConfirmText] = useState<string | null>("Save");
    const [cancelText, setCancelText] = useState<string | null>("Cancel");

    const showDialog = (
        title?: string, 
        description?: string, 
        content?: React.ReactNode | null, 
        onConfirm?: () => void, 
        onCancel? : () => void,
        confirmText?: string | null,
        cancelText?: string | null
    ) => {
        setTitle(title || null);
        setDescription(description || null);
        setContent(content);
        setOnConfirm(() => onConfirm ? onConfirm() : {});
        setOnCancel(() => {onCancel ? onCancel() : {}} );
        setConfirmText(confirmText || null);
        setCancelText(cancelText || null);
        setOpen(true);
    };
    return (
        <DialogContext.Provider value={{showDialog, setOpen}}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    {title || description ? (
                        <DialogHeader>
                            {title && <DialogTitle>{title}</DialogTitle>}
                            {description && <DialogDescription>{description}</DialogDescription>}
                        </DialogHeader>
                    ): (<>                   
                    </>)}
                    {content && content}
                    <DialogFooter >
                        <div className="flex gap-x-2">
                            <Button onClick={onConfirm} className="bg-green-600 hover:bg-green-500" >{confirmText}</Button>
                            <Button onClick={onCancel} className="bg-red-600 hover:bg-red-500">{cancelText}</Button>
                        
                        </div>

                        </DialogFooter>
                </DialogContent>
            </Dialog>
            {children}
        </DialogContext.Provider>
    );
}