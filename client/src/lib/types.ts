import * as z from 'zod';


export type ProductCardType = {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: CategoryType | null;
    createdAt: Date;
    updatedAt: Date;
}

export type CategoryType = {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    products?: ProductCardType[];
}

export type User = {
    _id: string;
    avatarUrl: string;
    email: string;
    name: string;
    createdAt: Date;
    role: string;
    loginRequired: boolean;
    __v: number;
    updatedAt: Date;
}

export type Order = {
    _id?: string;
    products: OrderProduct[];
    userId: User;
    createdAt: Date;
    updatedAt: Date;
    status: string;
}


export type OrderProduct = {
    _id: string;
    productId: ProductCardType; 
    quantity: number;
    createdAt: Date;
    updatedAt: Date;

}


export const productFormSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name must be less than 50 characters"),
    description: z.string().optional(),
    price: z.number()
    .min(0, `price must be at least 0 UAH`)
    .max(1000 * 1000, "price cannot be more than 100000 UAH")
    .refine(value => !isNaN(value), {
      message: "Amount is required and must be a number",
    }),
    
    imageUrl: z.any(),
    category: z.string(),
})

export type TProductFormSchema = z.infer<typeof productFormSchema>;

export const categoryFormSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name must be less than 50 characters"),
})
export type TCategoryForm = z.infer<typeof categoryFormSchema>;


export type TProfileEditForm = z.infer<typeof productFormSchema>;

export type CartContextType = {
    open: boolean
    setOpen: (open: boolean) => void
    cart: Order
    setCart: (cart: Order) => void
    addToCart: (product: ProductCardType, amount: number) => Promise<void>
    removeFromCart: (product: OrderProduct, amount?: number) => void
    isLoading: boolean
    updateProductQuantity: (product: OrderProduct, amount: number) => void
}


export type DialogContextType = {
    openDialog: ({
        title, 
        description, 
        content, 
        onConfirm, 
        onCancel,
        confirmText,
        cancelText
    }: {
        title?: string, 
        description?: string, 
        content?: React.ReactNode | null, 
        onConfirm?: () => void, 
        onCancel? : () => void,
        confirmText?: string | null,
        cancelText?: string | null

    
    }) => void;
    closeDialog: () => void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setOnConfirm: React.Dispatch<React.SetStateAction<() => void>>;
    setOnCancel: React.Dispatch<React.SetStateAction<() => void>>;
    setCancelText: React.Dispatch<React.SetStateAction<string | null>>;
    setConfirmText: React.Dispatch<React.SetStateAction<string | null>>;

};