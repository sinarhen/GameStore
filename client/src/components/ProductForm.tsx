import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import Input from "./Input";
import toast from "react-hot-toast";
import {useCallback, useEffect, useState} from "react";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "./Dialog";
import {Trash2} from "lucide-react";
import {FaUser} from "react-icons/fa";
import {isValidURLImage, setImageUrlFromFile, uploadImageToCloud} from "../lib/utils";
import {CategoryType, ProductCardType, productFormSchema, TProductFormSchema} from "../lib/types";
import {createProduct, updateProduct} from "../lib/products";
import {Textarea} from "./Textarea";
import {Label} from "./Label";
import InputError from "./InputError";
import Button from "./Button";
import {getAllCategories} from "../lib/categories";
import Loading from "./Loading";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./Select";
import {useDialog} from "../hooks/useDialog";


export default function ProductForm({
                                      initialValues,
                                      variant = "create",
                                      setProducts,
                                      products,
                                      setProductsInTable,
                                    }: {
  initialValues?: ProductCardType;
  variant: "create" | "edit";
  products?: ProductCardType[] | null;
  setProducts?: React.Dispatch<React.SetStateAction<ProductCardType[] | null>>;
  setProductsInTable?: React.Dispatch<React.SetStateAction<ProductCardType[] | null>>;
}) {

  const {closeDialog} = useDialog();


  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [openImageUrlDialog, setOpenImageUrlDialog] = useState(false);
  const [imageUrlDialogTempInput, setImageUrlDialogTempInput] = useState('');
  const [inputType, setInputType] = useState<'file' | 'url'>('file');
  const [tempSrcUrlForFile, setTempSrcUrlForFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: initialValues?.name,
      price: initialValues?.price,
      description: initialValues?.description,
      imageUrl: initialValues?.imageUrl,
      category: initialValues?.category?._id
    },
    mode: "onBlur",
  });

  const addProductToProducts = useCallback((product: ProductCardType) => {
    if (!setProducts) return;
    setProducts(prevProducts => {
      if (!prevProducts) return [product];
      return [...prevProducts, product]

    });
  }, [setProducts]);

  const updateProductInProducts = useCallback((product: ProductCardType) => {
    if (!setProducts) return;
    setProducts(prevProducts => {
      if (!prevProducts) return [{
        ...product, category: {
          _id: product.category?._id,
          name: product.category?.name,
        } as CategoryType
      }];
      return prevProducts.map((p) => (p._id === product._id ? product : p))

    });
  }, [setProducts]);

  const onSubmit = useCallback(async (values: TProductFormSchema) => {
    try {
      setIsLoading(true);
      if (values.imageUrl && inputType === 'file' && initialValues?.imageUrl !== values.imageUrl) {
        values.imageUrl = await uploadImageToCloud(values.imageUrl);
      }
      if (variant === 'create') {
        const res = await createProduct(values);
        setProductsInTable?.([...(products || []), res.data]);
        toast.success('Product created successfully');
        addProductToProducts(res.data);
      } else if (variant === 'edit') {
        if (!initialValues?._id) throw new Error('Не надано ID продукту для редагування');
        const res = await updateProduct(initialValues?._id, values);
        toast.success('Product updated successfully');
        updateProductInProducts(res.data);
      }
      closeDialog();
    } catch (e: any) {
      console.error(e)
      if (e?.response?.data?.message) {
        toast.error(e?.response?.data?.message);
      } else {
        toast.error(e?.message || 'Щось пішло не так');
      }
      if (e?.response?.data?.field) {
        form.setError(e.response.data.field, {
          type: "manual",
          message: e.response.data.message,
        });
      }
    } finally {
      setIsLoading(false);

    }
  }, [variant, initialValues, inputType, addProductToProducts, updateProductInProducts]);
  const toogleImageUrlDialog = () => {
    setOpenImageUrlDialog(!openImageUrlDialog);
  };
  const memorizedSetImageUrlFromFile = useCallback((file: File | null | undefined) => {
    setImageUrlFromFile(file, setTempSrcUrlForFile);
  }, [setTempSrcUrlForFile]);

  const renderError = useCallback((fieldName: keyof typeof form.formState.errors) => {
    return form.formState.errors[fieldName]?.message &&
        <InputError>{String(form.formState.errors[fieldName]?.message)}</InputError>;
  }, [form.formState.errors])

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {

    getAllCategories().then((res) => {
      setIsLoading(true)
      setCategories(res.data);
    }).catch((err) => {
      toast.error(`Щось пішло не так: ${err.message}`, {id: "categories"});
    }).finally(() => {
      setIsLoading(false);
    })

  }, [])
  if (!isMounted) {
    return null;
  }
  if (isLoading || form.formState.isLoading) {
    return <Loading/>;
  }
  return (
    <form className="gap-y-4 gap-x-3 grid grid-cols-6 overflow-y-auto overflow-x-visible px-1"
          onSubmit={form.handleSubmit(onSubmit)}>
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
          {form.getValues('price') !== undefined && form.getValues('price') !== null &&
              <span className='absolute right-0 top-0 h-full flex items-center px-2 text-gray-400'>UAH</span>}</div>
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
      }}>
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
        <Select {...form.register('category')} onValueChange={(val) => form.setValue('category', val)}>
          <SelectTrigger>
            <SelectValue/>
          </SelectTrigger>
          <SelectContent className="text-white bg-black">
            {categories?.map((option) => (
              <SelectItem key={option._id} value={option._id}>
                {option.name}({option.products?.length ?? 0} products)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {renderError('category')}
      </div>
      <div className="col-span-3">
                <span className='cursor-pointer right-0 ml-2 text-xs text-gray-400' onClick={toogleImageUrlDialog}>
                Paste url(click)
                </span>

        {
          <div className='w-full relative bg-gray-200 overflow-hidden rounded-md'>
            <div className="w-full h-full aspect-square">
              {tempSrcUrlForFile || form.getValues().imageUrl ? (
                <img alt="avatar" src={tempSrcUrlForFile ?? form.getValues().imageUrl}
                     className="object-cover w-full h-full bg-center"/>
              ) : (
                <FaUser className="w-full h-full"/>

              )}

            </div>

            <span
              className='text-xs flex items-center justify-center absolute right-2 top-3 hover:bg-red-500 bg-white/30 transition-colors cursor-pointer backdrop-blur-sm w-9 h-9 rounded-lg border border-black'
              onClick={() => {
                form.setValue('imageUrl', '');
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
              memorizedSetImageUrlFromFile(e?.target?.files[0]);
              setInputType("file");
            }} type='file'/>
        </div>


      </div>

      <DialogFooter className="col-span-6">
        <div className="flex justify-end gap-x-2">
          <Button
            className="bg-green-600 hover:bg-green-500"
            type="submit"
          >
            Save
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-500"
            onClick={closeDialog}
          >
            Cancel
          </Button>

        </div>

      </DialogFooter>

    </form>
  )
}