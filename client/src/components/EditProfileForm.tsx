import { useCallback, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./Dialog";
import Input from "./Input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { isValidURLImage } from "../lib/utils";

const profileEditForm = z.object({
    name: z.string().min(3, { message: "Name should be at least 3 characters long" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    avatarUrl: z.any().optional(),
});

type TProfileEditForm = z.infer<typeof profileEditForm>;

export default function EditProfileForm({initialValues} : {initialValues: any}){

    const [openImageUrlDialog, setOpenImageUrlDialog] = useState(false);
    const [imageUrlDialogTempInput, setImageUrlDialogTempInput] = useState('');
    const [inputType, setInputType] = useState<'file' | 'url'>('file');
    const [tempSrcUrlForFile, setTempSrcUrlForFile] = useState<string | null>(null);
  
    const form = useForm<TProfileEditForm>({
      resolver: zodResolver(profileEditForm),
      defaultValues: {
        name: initialValues.name,
        email: initialValues.email,
        avatarUrl: initialValues.avatarUrl,
      },
      mode: "onTouched",
    });
  
    async function onSubmit(values: TProfileEditForm){
      try {
        const formData = new FormData();
        if (inputType === 'file') {
        formData.append('file', values?.avatarUrl);
        formData.append('upload_preset', 'upload_needed'); // TODO: Update upload preset
        const imageUploaded = await axios.post(
          'https://api.cloudinary.com/v1_1/something', // TODO: Update cloudinary upload URL
          formData
        );
        values.avatarUrl = imageUploaded.data.secure_url;
      }

      const res = {}; // =await updateProfile(initialValues.id, values);
        // if (res?.error) {
        //     toast.error(res.error.message || 'Something went wrong');
        //     return;
        // }
      toast.success('Profile updated successfully');
      window.location.reload();
    } catch (e: any) {
      toast.error(e?.message || 'Something went wrong');
    };
  }
    const toogleImageUrlDialog = () => {
      setOpenImageUrlDialog(!openImageUrlDialog);
    };
    
    const setImageUrlFromFile = useCallback((file: File | null | undefined): void => {
      if (!file) {
        return;
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setTempSrcUrlForFile(reader.result as string);
      };
    }, [setTempSrcUrlForFile]);
    return (
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <Input {...form.register('name')} label="Username" error={form.formState.errors.name?.message} />  
            <Input {...form.register('email')} label="Email"  error={form.formState.errors.email?.message} />  
{/* 
            <Dialog open={openImageUrlDialog} onOpenChange={() => {
                  toogleImageUrlDialog();
                  if (!form.getValues('avatarUrl')) {
                    form.resetField('avatarUrl');
                  }
                } }>
                  <DialogContent >
                    <DialogHeader>
                      <DialogTitle>
                        Paste URL 
                      </DialogTitle>
                      <DialogDescription>
                        Paste URL of image of your car below
                      </DialogDescription>
                        <Input {...form.register('avatarUrl')} label="Profile avatar" error={form.formState.errors.avatarUrl?.message} value={imageUrlDialogTempInput} onChange={(e) => setImageUrlDialogTempInput(e.target.value)}/>  
                      
                      <DialogFooter>
                        <DialogClose asChild>
                          <button
                            className="bg-indigo-600 bg-opacity-70 transition-all hover:bg-indigo-500 mt-4 hover:bg-opacity-100 text-white px-4 py-2 rounded-md" 
                            disabled={!isValidURLImage(imageUrlDialogTempInput)}
                            onClick={() => {
                              form.setValue("avatarUrl", imageUrlDialogTempInput);
                              setImageUrlDialogTempInput("");
                              setInputType("url");
                              setTempSrcUrlForFile(null);
                            }}
                          > 
                            Save
                          </button>
                        
                        </DialogClose>
                      </DialogFooter>
                    </DialogHeader>


                  </DialogContent>

                </Dialog>
               */}
               
               <DialogFooter>
                    <DialogClose>
                        <button 
                        type="submit"
                        disabled={!form.formState.isValid} 
                        className="bg-indigo-600 bg-opacity-70 disabled:bg-gray-400 transition-all hover:bg-indigo-500 mt-4 hover:bg-opacity-100 text-white px-4 py-2 rounded-md">Save</button>

                    </DialogClose>
                </DialogFooter>
        </form>
    )
}