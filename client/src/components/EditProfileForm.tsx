import {useCallback, useEffect, useState} from "react";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "./Dialog";
import Input from "./Input";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import {isValidURLImage, setImageUrlFromFile, uploadImageToCloud} from "../lib/utils";
import {Trash2} from "lucide-react";
import {FaUser} from "react-icons/fa";
import {updateUser} from "../lib/auth";
import {Label} from "./Label";
import InputError from "./InputError";
import Button from "./Button";

const profileEditForm = z.object({
  name: z.string().min(3, {message: "Name should be at least 3 characters long"}),
  email: z.string().email({message: "Please enter a valid email"}),
  avatarUrl: z.any().optional(),
});

type TProfileEditForm = z.infer<typeof profileEditForm>;

export default function EditProfileForm({initialValues}: { initialValues: any }) {

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

  async function onSubmit(values: TProfileEditForm) {
    try {
      const formData = new FormData();
      if (values.avatarUrl !== initialValues.avatarUrl) {
        if (inputType === 'file' && values.avatarUrl){
          values.avatarUrl = await uploadImageToCloud(values.avatarUrl);

        }
      }
      await updateUser(values);

      toast.success('Профіль оновлено успішно');
      window.location.reload()
    } catch (e: any) {
      toast.error(e?.message || 'Щось пішло не так');
    }
  }

  const toogleImageUrlDialog = () => {
    setOpenImageUrlDialog(!openImageUrlDialog);
  };

  const memoizedSetImageUrlFromFile = useCallback((file: File | null | undefined) => {
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
    return form.formState.errors[fieldName]?.message &&
        <InputError>{String(form.formState.errors[fieldName]?.message)}</InputError>;
  }

  return (
    <form className="gap-y-4 gap-x-2 grid grid-cols-4 overflow-y-auto" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="col-span-2">
        <Label>Ім'я</Label>
        <Input  {...form.register('name')}  />
        {renderError('name')}
      </div>
      <div className="col-span-2">
        <Label>Електронна пошта</Label>
        <Input {...form.register('email')} />
        {renderError('email')}
      </div>

      <Dialog open={openImageUrlDialog} onOpenChange={() => {
        toogleImageUrlDialog();
        if (!form.getValues('avatarUrl')) {
          form.resetField('avatarUrl');
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Вставте URL
            </DialogTitle>
            <DialogDescription>
              Вставте URL-адресу аватарки вашого профілю сюди.
            </DialogDescription>
            <div>
              <Label>Аватар профілю</Label>
              <Input
                {...form.register('avatarUrl')}
                value={imageUrlDialogTempInput}
                onChange={(e) => setImageUrlDialogTempInput(e.target.value)}/>
              {renderError('avatarUrl')}
            </div>

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
                  Зберегти
                </button>

              </DialogClose>
            </DialogFooter>
          </DialogHeader>


        </DialogContent>

      </Dialog>

      <div className="col-span-2">
                <span className='cursor-pointer right-0 ml-2 text-xs text-gray-400' onClick={toogleImageUrlDialog}>
                    Вставте URL(Натисніть)
                </span>

        {
          <div className='w-full relative bg-gray-200 overflow-hidden rounded-lg'>
            <div className="w-full h-full aspect-square">
              {form.getValues().avatarUrl || tempSrcUrlForFile ? (
                <img alt="avatar" src={tempSrcUrlForFile || form.getValues().avatarUrl}
                     className="object-cover w-full h-full bg-center"/>
              ) : (
                <FaUser className="w-full h-full"/>

              )}

            </div>

            <span
              className='text-xs flex items-center justify-center absolute right-2 top-3 hover:bg-red-500 bg-white/30 transition-colors cursor-pointer backdrop-blur-sm w-9 h-9 rounded-lg border border-black'
              onClick={() => {
                form.setValue('avatarUrl', '');
                if (inputType === 'file') {
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
              form.setValue('avatarUrl', e?.target?.files[0]);
              memoizedSetImageUrlFromFile(e?.target?.files[0]);
              setInputType("file");
            }} type='file'/>

        </div>
      </div>

      <DialogFooter className="col-span-4">
        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Save
        </Button>
      </DialogFooter>
    </form>
  )
}