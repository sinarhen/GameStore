import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./Dialog";
import Input from "./Input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { isValidURLImage } from "../lib/utils";
import { Trash2 } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { updateUser } from "../lib/auth";
import { Label } from "./Label";
import InputError from "./InputError";
import { Textarea } from "./Textarea";
import { updateProduct } from "../lib/products";

const profileEditForm = z.object({
    name: z.string().min(3, { message: "Name should be at least 3 characters long" }),
    price: z.number().min(0, { message: "Price must be at least 0 UAH" }),
    description: z.string().optional(),
    productImageUrl: z.any().optional(),
});

type TProfileEditForm = z.infer<typeof profileEditForm>;

export default function EditProductForm({initialValues} : {initialValues: any}){

    const [openImageUrlDialog, setOpenImageUrlDialog] = useState(false);
    const [imageUrlDialogTempInput, setImageUrlDialogTempInput] = useState('');
    const [inputType, setInputType] = useState<'file' | 'url'>('file');
    const [tempSrcUrlForFile, setTempSrcUrlForFile] = useState<string | null>(null);
  
    const form = useForm<TProfileEditForm>({
      resolver: zodResolver(profileEditForm),
      defaultValues: {
        name: initialValues.name,
        price: initialValues.price,
        description: initialValues.description,
        productImageUrl: initialValues.imageUrl
      },
      mode: "onTouched",
    });

    const toogleImageUrlDialog = () => {
      setOpenImageUrlDialog(!openImageUrlDialog);
    };
    
    const memorizedSetImageUrlFromFile = useCallback((file: File | null | undefined) => {
      setImageUrlFromFile(file, setTempSrcUrlForFile);
  }, [setTempSrcUrlForFile]);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        }, []);

    if (!isMounted) {
        return null;
    }
     
    
    function renderError(fieldName: keyof typeof form.formState.errors) {
      return form.formState.errors[fieldName]?.message && <InputError>{String(form.formState.errors[fieldName]?.message)}</InputError>;
    }

    return (
        <form className="space-y-4 overflow-y-auto" >
          <div>
            <Label>Name</Label>
            <Input  {...form.register('name')}  />  
            {renderError('name')}
          </div>
          <div>
            <Label>Price</Label>
            <Input {...form.register('price')} />  
            {renderError('price')}
          </div>

          <div className="md:col-span-3 col-span-6">
              <Label>Description</Label>
              <Textarea placeholder="Description for product" {...form.register('description')}  />
              {renderError('description')}
          </div>

            <Dialog open={openImageUrlDialog} onOpenChange={() => {
                  toogleImageUrlDialog();
                  if (!form.getValues('productImageUrl')) {
                    form.resetField('productImageUrl');
                  }
                } }>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Paste URL 
                      </DialogTitle>
                      <DialogDescription>
                        Paste URL of your profile avatar here.
                      </DialogDescription>
                      <div>
                        <Label>Product image</Label>
                        <Input 
                          {...form.register('productImageUrl')} 
                          value={imageUrlDialogTempInput} 
                          onChange={(e) => setImageUrlDialogTempInput(e.target.value)}/>  
                          {renderError('productImageUrl')}                      
                      </div>
                        
                      <DialogFooter>
                        <DialogClose asChild>
                          <button
                            className="bg-indigo-600 bg-opacity-70 transition-all hover:bg-indigo-500 mt-4 hover:bg-opacity-100 text-white px-4 py-2 rounded-md" 
                            disabled={!isValidURLImage(imageUrlDialogTempInput)}
                            onClick={() => {
                              form.setValue("productImageUrl", imageUrlDialogTempInput);
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

            <div>
                <span className='cursor-pointer right-0 ml-2 text-xs text-gray-400' onClick={toogleImageUrlDialog}>
                Paste url(click)
                </span>

                {
                    <div className='w-full relative bg-gray-200 overflow-hidden rounded-lg'>
                        <div className="w-full h-full aspect-square">
                        {tempSrcUrlForFile || form.getValues().productImageUrl ? (
                            <img alt="avatar" src={tempSrcUrlForFile ?? form.getValues().productImageUrl} className="object-cover w-full h-full bg-center"/>
                        ) : (
                            <FaUser className="w-full h-full"/>
                    
                        )}
                            
                        </div>
                        
                    <span className='text-xs flex items-center justify-center absolute right-2 top-3 hover:bg-red-500 bg-white/30 transition-colors cursor-pointer backdrop-blur-sm w-9 h-9 rounded-lg border border-black' onClick={() => {
                        form.setValue('productImageUrl', '');
                        if (inputType === 'file')
                        {
                        setTempSrcUrlForFile(null);
                        
                        } else if (inputType === 'url') {
                        setInputType('file');
                        }
                    }}>

                        <Trash2 className='w-1/2 text-black h-1/2'/>                 
                    </span>
                    </div>
                }
                
                <div className='block'>
                        <Input
                        className="bg-transparent"
                        multiple={false}
                        onChange={(e) => {
                            if (!e?.target?.files || !e.target.files[0]) {
                            return;
                            }
                            form.setValue('productImageUrl', e?.target?.files[0]);
                            memorizedSetImageUrlFromFile(e.target.files[0]);
                            setInputType("file");
                        }} type='file' />
                                
                </div>
            </div>   
               
               <DialogFooter>
                        <button 
                        type="submit"
                        disabled={!form.formState.isValid || form.formState.isSubmitting } 
                        className="bg-indigo-600 bg-opacity-70 disabled:bg-gray-400 transition-all hover:bg-indigo-500 mt-4 hover:bg-opacity-100 text-white px-4 py-2 rounded-md">Save</button>
                </DialogFooter>
        </form>
    )
}

function setImageUrlFromFile(file: File | null | undefined, setTempSrcUrlForFile: Dispatch<SetStateAction<string | null>>) {
  throw new Error("Function not implemented.");
}
