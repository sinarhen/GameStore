import * as z from 'zod';


export type ProductCardType = {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: CategoryType;
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
}


export type OrderProduct = {
    _id: string;
    productId: ProductCardType; 
    quantity: number;
}


export const productFormSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name must be less than 50 characters"),
    description: z.string().optional(),
    price: z.number().min(0, "Price must be at least 0").max(100000, "Price must be less than 100000"),
    imageUrl: z.any(),
    categoryId: z.string().uuid(),
})


export type TProfileEditForm = z.infer<typeof productFormSchema>;