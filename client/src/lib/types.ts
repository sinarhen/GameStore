import * as z from 'zod';


export type ProductCardType = {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: CategoryType;
    createdAt: Date;
    updatedAt: Date;
}

export type CategoryType = {
    _id: string;
    name: string;
}

export type User = {
    _id: string;
    avatarUrl: string | null;
    email: string;
    name: string;
    createdAt: Date;
    role: string;
    __v: number;
    updatedAt: Date;
}

export type Order = {
    _id: string;
    products: OrderProduct[];
    userId: User;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    paymentStatus: string;
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
    categoryId: z.string(),
})


export type TProfileEditForm = z.infer<typeof productFormSchema>;