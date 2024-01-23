import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "./Input";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./Dialog";
import { Trash2 } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { isValidURLImage } from "../lib/utils";
import { TProfileEditForm, productFormSchema } from "../lib/types";
import { createProduct } from "../lib/products";
import { Textarea } from "./Textarea";
import { Label } from "./Label";
import InputError from "./InputError";
import Button from "./Button";



export default function CreateProductForm(){

    const [openImageUrlDialog, setOpenImageUrlDialog] = useState(false);
    const [imageUrlDialogTempInput, setImageUrlDialogTempInput] = useState('');
    const [inputType, setInputType] = useState<'file' | 'url'>('file');
    const [tempSrcUrlForFile, setTempSrcUrlForFile] = useState<string | null>(null);
  
    const form = useForm<TProfileEditForm>({
      resolver: zodResolver(productFormSchema),
      mode: "onTouched",
    });
    const navigate = useNavigate();
    async function onSubmit(values: TProfileEditForm){
        try {
            const formData = new FormData();
            if (values.imageUrl)
            {
                if (inputType === 'file') {
                    formData.append('file', values?.imageUrl);
                    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET as string);
                    const imageUploaded = await axios.post(
                        process.env.REACT_APP_CLOUDINARY_URL as string,
                        formData
                    );
                    values.imageUrl = imageUploaded.data.secure_url;
            
                }
            }

            const res = await createProduct(values);
            console.log(res)
            toast.success('Product created successfully');
            navigate(0)
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

    console.log(form.getValues())
    return (
        <form className="gap-y-4 gap-x-3 grid grid-cols-6 overflow-y-auto overflow-x-visible px-1" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="md:col-span-4 col-span-6">
              <Label>Name*</Label>
              <Input placeholder="Product name..." {...form.register('name')} />  
              {renderError('name')}
            </div>
            <div className="col-span-2 md:col-span-2">
              <Label>Price*</Label>
              <div className='relative'>
              <Input 
                {...form.register('price', {valueAsNumber: true})} 
                placeholder="Price"
                type="number"
                inputMode="decimal" 
                onChange={(e) => form.setValue('price', e.target.valueAsNumber)
                }/>  
                {form.getValues('price') !== undefined && form.getValues('price') !== null && <span className='absolute right-0 top-0 h-full flex items-center px-2 text-gray-400'>UAH</span>}</div>
                {renderError('price')}
            </div>

            <div className="md:col-span-3 col-span-6">
              <Label>Description</Label>
              <Textarea placeholder="Description for product" {...form.register('description')}  />
              {renderError('description')}
            </div>


            <Dialog open={openImageUrlDialog} onOpenChange={() => {
                  toogleImageUrlDialog();
                  if (!form.getValues('imageUrl')) {
                    form.resetField('imageUrl');
                  }
                } }>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Paste URL 
                      </DialogTitle>
                      <DialogDescription>
                        Paste URL of product image here.
                      </DialogDescription>
                      <div>
                        <Label>Image URL</Label>
                        
                        <Input 
                          {...form.register('imageUrl')} 
                          value={imageUrlDialogTempInput} 
                          onChange={(e) => setImageUrlDialogTempInput(e.target.value)}/>  
                        {renderError('imageUrl')}  
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <button
                            className="bg-indigo-600 bg-opacity-70 transition-all hover:bg-indigo-500 mt-4 hover:bg-opacity-100 text-white px-4 py-2 rounded-md" 
                            disabled={!isValidURLImage(imageUrlDialogTempInput)}
                            onClick={() => {
                              form.setValue("imageUrl", imageUrlDialogTempInput);
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
            <div className="md:col-span-3 col-span-4">
                  <Label>Category</Label>
                  <Input {...form.register('categoryId')} />  
                  {renderError('categoryId')}
            </div>
            <div className="col-span-3">
                <span className='cursor-pointer right-0 ml-2 text-xs text-gray-400' onClick={toogleImageUrlDialog}>
                Paste url(click)
                </span>

                {
                    <div className='w-full relative bg-gray-200 overflow-hidden rounded-md'>
                        <div className="w-full h-full aspect-square">
                        {tempSrcUrlForFile || form.getValues().imageUrl ? (
                            <img alt="avatar" src={tempSrcUrlForFile ?? form.getValues().imageUrl} className="object-cover w-full h-full bg-center"/>
                        ) : (
                            <FaUser className="w-full h-full"/>
                    
                        )}
                            
                        </div>
                        
                    <span className='text-xs flex items-center justify-center absolute right-2 top-3 hover:bg-red-500 bg-white/30 transition-colors cursor-pointer backdrop-blur-sm w-9 h-9 rounded-lg border border-black' onClick={() => {
                        form.setValue('imageUrl', '');
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
                
                <div className='block mt-2'>
                      <Label>
                        
                      </Label>
                        <Input
                        className="bg-transparent"
                        multiple={false}
                        onChange={(e) => {
                            if (!e?.target?.files || !e.target.files[0]) {
                            return;
                            }
                            form.setValue('imageUrl', e?.target?.files[0]);
                            setImageUrlFromFile(e?.target?.files[0]);
                            setInputType("file");
                        }} type='file' />                  
                </div>


            </div>   
            
            <DialogFooter className="col-span-6">
                        <div>
                          <Button>
                            Save
                          </Button>
                
                        </div>
                </DialogFooter>
               
        </form>
    )
}