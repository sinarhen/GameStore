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
    email: string;
    name: string;
    createdAt: Date;
    __v: number;
    updatedAt: Date;
}