import {useDialog} from "./useDialog";
import AuthDialog from "../components/AuthDialog";

export const useAuthDialog = () => {
  const {openDialog, setOpen, open} = useDialog();
  const openAuthDialog = (variant: "login" | "register") => {
    openDialog({
      content: <AuthDialog open={open} setOpen={setOpen} initialVariant={variant}/>,
    });
  };

  return {openAuthDialog};

};