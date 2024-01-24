import { useContext } from "react";
import { AuthDialogContext } from "../contexts/AuthDialogContext";

export const useAuthDialog = () => {

    const context = useContext(AuthDialogContext);

    if (!context) {
        throw new Error('useAuthForm must be used within a AuthDialogProvider');
    }
    return context;
};
