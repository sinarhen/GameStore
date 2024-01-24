import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Dialog, DialogContent } from "./Dialog";

export default function AuthDialog({
  open,
  setOpen,
  v
}) 
{
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogVariant, setDialogVariant] = React.useState<'login' | 'register'>('login');
    
    return (
      <>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className='bg-black text-white'>
              {dialogVariant === 'login' ? (
              <LoginForm setDialogOpen={setDialogOpen} setVariant={setDialogVariant}/>      
            ) : (
                  <RegisterForm setVariant={setDialogVariant} setDialogOpen={setDialogOpen}/>
              )}
        
          </DialogContent>
        </Dialog>
      </>
      
    )
}