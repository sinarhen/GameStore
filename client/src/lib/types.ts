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
    __v: number;
    updatedAt: Date;
}

export type Order = {
    _id: string;
    products: OrderProduct[];
    userId: string;
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