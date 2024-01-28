import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthDialog({
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