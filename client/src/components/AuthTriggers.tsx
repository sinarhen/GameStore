import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Dialog, DialogContent } from "./Dialog";

export default function AuthTriggers() 
{
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogVariant, setDialogVariant] = React.useState<'login' | 'register'>('login');
    
    return (
      <>
        <div className='flex gap-x-2 items-center'>

          <button 
          onClick={() => {
              setDialogOpen(true);
              setDialogVariant('login')
          }}
          className='bg-green-300 bg-opacity-70 transition-all hover:bg-green-700 hover:bg-opacity-100 text-white px-4 py-2 rounded-md'>Log in</button>
          <button 
          onClick={() => {
              setDialogOpen(true);
              setDialogVariant('register')
          }}
          className='hover:bg-neutral-900 transition-colors text-white px-4 py-2 rounded-md'>Register</button>

        </div>
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