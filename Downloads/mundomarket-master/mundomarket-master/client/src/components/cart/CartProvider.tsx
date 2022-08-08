import { FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';// yarn add js-cookie   y   yarn add -D @types/js-cookie    || $ npm i js-cookie  y  npm add -D @types/js-cookie 
import React, { PropsWithChildren } from 'react';
import { ICartProduct } from './cartInterface';
import { CartContext, cartReducer } from '../cart';
import { IOrder } from '../../pages/orders/orderInterface';

export interface CartState {
    cart: ICartProduct[];
    numberOfItems: number;
    total: number;
}


const CART_INITIAL_STATE: CartState ={
    cart: [],
    numberOfItems: 0,
    total: 0
}


type Props = {
    children?: React.ReactNode
  };


export const CartProvider: FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer( cartReducer , CART_INITIAL_STATE );



    // Efecto
    useEffect(() => {
        try 
        {
            const cookieProducts = Cookie.get('cart')? JSON.parse( Cookie.get('cart')! ): [] // Cookie.get(cart) pregunto si existe para que no sea undefined, lo parseo sino array vacio
             dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
    }, []);

    useEffect(() => { //esto hace que se mantengan los productos en  el carrito si actualizo la pagina
        if(state.cart.length>0)Cookie.set('cart', JSON.stringify( state.cart ));
      }, [state.cart]);



    useEffect(() => {
        
        const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev , 0 );
        const subTotal = state.cart.reduce( ( prev, current ) => (current.price * current.quantity) + prev, 0 )
    
        const orderSummary = {
            numberOfItems,
            total: subTotal 
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
    }, [state.cart]);





    

    const addProductToCart = ( product: ICartProduct ) => {
        //! Nivel 1
         //dispatch({ type: '[Cart] - Add Product', payload: product });

        //! Nivel 2
       //  const productsInCart = state.cart.filter( p => p._id !== product._id);
        // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product] })

        //! Nivel Final
      const productInCart = state.cart.some( p => p._id === product._id ); //productInCart es verdadero si el producto agregado esta en el carrito
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] }) //si el producto no esta en el carrito entonces lo agrega

        // Acumular
        const updatedProducts = state.cart.map( p => { //si el producto agregado esta en el carrito entonces mapea el carrito 
            if ( p._id !== product._id ) return p; // y si los productos del carrito no coinciden con el producto agregado, devuelve cada producto del carrtio

            // Actualizar la cantidad
            p.quantity += product.quantity; //pero si coincide el producto agregado con el producto del carrito entonces suma la cantidad de producto del carrito y luego duelve el producto con la cantidad actualizada
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });

    }

    const updateCartQuantity = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product });
    }

    const removeCartProduct = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }


/*
    const createOrder = async():Promise<{ hasError: boolean; message: string; }> => {

       if ( !state.shippingAddress ) {
            throw new Error('No hay dirección de entrega');
        }

        const body: IOrder = {
            cart: state.cart
            //numberOfItems: state.numberOfItems,
           //total: state.total,
            isPaid: false
        }


        try {
            
            const { data } = await tesloApi.post<IOrder>('/orders', body);

            dispatch({ type: '[Cart] - Order complete' });

            return {
                hasError: false,
                message: data._id!
            }


        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message : 'Error no controlado, hable con el administrador'
            }
        }

    }
*/



    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            removeCartProduct,
            updateCartQuantity,

            // Orders
           // createOrder,
        }}>
            { children }
        </CartContext.Provider>
    )
};