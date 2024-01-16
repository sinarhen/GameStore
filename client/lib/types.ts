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