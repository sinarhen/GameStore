import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./Dialog";
import EditProfileForm from "./EditProfileForm";
import { useAuthDialog } from '../hooks/useAuthDialog';
import { useDialog } from "../hooks/useDialog";
import Button from "./Button";


export default function EditProfileDialog({initialValues} : {initialValues: any}){
    const { openDialog } = useDialog();

    const openProfileDialog = () => {
        openDialog({
            title: "Edit profile",
            description: "Make changes to your profile here. Click save when you're done.",
            content: <EditProfileForm initialValues={initialValues}/>,
        })
    }
    return (
        <Button onClick={openProfileDialog} >Edit</Button>
        
    )
}