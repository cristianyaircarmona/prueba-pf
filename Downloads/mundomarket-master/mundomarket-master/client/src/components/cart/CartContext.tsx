import { createContext } from 'react';
import { ICartProduct } from './cartInterface';


interface ContextProps {
    cart: ICartProduct[];
    numberOfItems: number;
    total: number;

    // Methods
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;

    // Orders
    //createOrder: () => Promise<{ hasError: boolean; message: string; }>;
}


export const CartContext = createContext({} as ContextProps );