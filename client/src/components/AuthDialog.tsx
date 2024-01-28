import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {Dialog, DialogContent} from "./Dialog";

export default function AuthDialog({
                                     open,
                                     setOpen,
                                     initialVariant

                                   }: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialVariant: "login" | "register";
}) {
  const [variant, setVariant] = React.useState<"login" | "register">(initialVariant);
  return (
    <>
      {variant === 'login' ? (
        <LoginForm setDialogOpen={setOpen} setVariant={setVariant}/>
      ) : (
        <RegisterForm setVariant={setVariant} setDialogOpen={setOpen}/>
      )}

    </>

  )
}