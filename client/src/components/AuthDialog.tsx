import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Dialog, DialogContent } from "./Dialog";

export default function AuthDialog({
  open,
  setOpen,
  variant,
  setVariant,  
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  variant: "login" | "register";
  setVariant: React.Dispatch<React.SetStateAction<"login" | "register">>;
}) { 
    return (
      <>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className='bg-black text-white'>
              {variant === 'login' ? (
              <LoginForm setDialogOpen={setOpen} setVariant={setVariant}/>      
            ) : (
                  <RegisterForm setVariant={setVariant} setDialogOpen={setOpen}/>
              )}
        
          </DialogContent>
        </Dialog>
      </>
      
    )
}