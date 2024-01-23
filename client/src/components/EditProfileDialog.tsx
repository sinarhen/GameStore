import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./Dialog";
import EditProfileForm from "./EditProfileForm";


export default function EditProfileDialog({initialValues} : {initialValues: any}){

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-indigo-600 bg-opacity-70 transition-all hover:bg-indigo-500 mt-4 hover:bg-opacity-100 text-white px-4 py-2 rounded-md">Edit</button>
            </DialogTrigger>
        <DialogContent className=" md:w-[400px] h-[95%]">
                <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
                </DialogHeader>
                  
                <EditProfileForm initialValues={{
                    name: initialValues.name,
                    email: initialValues.email,
                    avatarUrl: initialValues.avatarUrl
                }}/>
                    
            </DialogContent>
        </Dialog>
    )
}