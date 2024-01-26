import { useState } from "react";
import { useDialog } from "./useDialog";
import AuthDialog from "../components/AuthDialog";

export const useAuthDialog = () => {
    const { openDialog, setOpen, open } = useDialog();
    const openAuthDialog = (variant: "login" | "register") => {
        openDialog({
            content: AuthDialog({ initialVariant: variant, setOpen, open }),
        });
    };

    return { openAuthDialog };

};