import { createContext, useState } from "react";
import AuthDialog from "../components/AuthDialog";

type AuthDialogContextType = {
    openAuthDialog: (variant: "login" | "register") => void;
    closeAuthDialog: () => void;
  };
  
const AuthDialogContext = createContext<AuthDialogContextType | undefined>(undefined);

const AuthDialogProvider = ({children}: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const [variant, setVariant] = useState<"login" | "register">("login");

    function openAuthDialog(variant: "login" | "register"){
        setOpen(true);
        setVariant(variant);
    }
    function closeAuthDialog() {
        setOpen(false);
        setVariant("login");
      }
    return(
        <AuthDialogContext.Provider value={{ openAuthDialog, closeAuthDialog }}>
            <AuthDialog 
                open={open} 
                setOpen={setOpen} 
                variant={variant} 
                setVariant={setVariant}
            />
            {children}
        </AuthDialogContext.Provider>
    );
}

export {AuthDialogContext, AuthDialogProvider};
