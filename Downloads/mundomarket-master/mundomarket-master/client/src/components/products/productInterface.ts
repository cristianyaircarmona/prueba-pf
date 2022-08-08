export interface IProduct {
    _id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    imageProduct: string[];
    review: number;
    rating: number;
    category: string;
    envio: string;

    createdAt: string;
    UpdatedAt: string;
}

export type ISize = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type IType = 'shirts'|'pants'|'hoodies'|'hats';