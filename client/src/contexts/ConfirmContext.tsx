import React from 'react';
import ConfirmDialog from '../components/ConfirmDialog';


type ConfirmContextType = {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    onConfirm: () => void;
    setOnConfirm: (onConfirm: () => void) => void;
}
export const ConfirmContext = React.createContext<ConfirmContextType | null>(null);


export function ConfirmProvider({children}: {children: React.ReactNode}){
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [onConfirm, setOnConfirm] = React.useState(() => () => {});

    const value = {
        open,
        setOpen,
        title,
        setTitle,
        description,
        setDescription,
        onConfirm,
        setOnConfirm
    }

    return (
        <ConfirmContext.Provider value={value}>
            <ConfirmDialog 
                open={open} 
                setOpen={setOpen} 
                description={description}
                title={title}
                onConfirm={onConfirm}    
            />
            {children}
        </ConfirmContext.Provider>
    )
}