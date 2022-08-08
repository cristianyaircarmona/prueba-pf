//import { ShopLayout } from '../../components/layouts/ShopLayout';
import * as React from 'react';
import { Grid, Box , Typography, Button, Chip} from '@mui/material';
import { CartContext } from '../../components/cart/CartContext';
import { ProductSlideshow } from '../../components/products';
import { ItemCounter } from '../../components/itemCounter';
import NavBar from '../../components/NavBar/NavBar'
import {useNavigate, useParams} from "react-router-dom"

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { AppDispatch,RootState } from '../../store/index';
import {GETDETAIL,GETRECOMMENDED} from '../../actions'
import { TypedUseSelectorHook } from "react-redux";
import SellerDetail from './sellerDetail'
import Recommended from './Recommended'
import { IProduct } from '../../components/products/productInterface';

import { ICartProduct } from '../../components/cart/cartInterface';

const useAppDispatch = () => useDispatch<AppDispatch>();

interface Props{
    product: IProduct
}



//const product =  initialData.products[0];

const ProductPage = () => {



  
    const navegar=useNavigate()
    const {id} = useParams()
    
    const dispatch=useAppDispatch()

    useEffect(()=>{
      dispatch(GETDETAIL(id))
    },[dispatch,id])

    //const products = useSelector((State) => State.products);
    const product=useSelector((State:RootState) => State.rootReducer.producto); 

    useEffect(()=>{
        dispatch(GETRECOMMENDED(product.category))
      },[product,dispatch])


      const { addProductToCart} = useContext( CartContext )
      const { cart } = React.useContext( CartContext );
      
   
      const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
       _id: product._id,
       imageProduct: product.imageProduct,
       price: product.price,
       name: product.name,
       category: product.category,
       quantity: 1,
       envio: product.envio,
       rating: product.rating,
       review: product.review,
       description: product.description,
       stock: product.stock
     })
   
     const onUpdateQuantity = ( quantity: number ) => {
       setTempCartProduct( currentProduct => ({
         ...currentProduct,
         quantity
       }));
     }


     useEffect(()=>{
      setTempCartProduct({
        _id: product._id,
        imageProduct: product.imageProduct,
        price: product.price,
        name: product.name,
        category: product.category,
        quantity: 1,
        envio: product.envio,
        rating: product.rating,
        review: product.review,
        description: product.description,
        stock: product.stock
      })
    },[product])


     const onAddProduct = () => {  

        //cuando uso addProductToCart me acttualiza tempCartProduct.quantity no se porque, 
        //entonces lo guardo en una variable y al final lo vuelvo a 
        //asignar con onUpdateQuantity(cant), esto me soluciona un bug del itemCounter

        let cant = tempCartProduct.quantity 

         addProductToCart(tempCartProduct) //meto el producto en el carrito
        
         //luego de agregar el producto en el carrtio mapeo todos los productos y si el stock es menor 
         //a la cantidad pedida lo aviso y solamente dejo que hayan pedidos la cantidad de productos en stock
          cart.map( product => (       
            (product._id===tempCartProduct._id && product.quantity>=product.stock) && (product.quantity=product.stock,alert("no hay stock"))
          ))
          onUpdateQuantity(cant)

     }
  





    
    return (
        
        <>
            <NavBar/>

        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Grid container spacing={8} mt={3} justifyContent={'space-evenly'}>

                {
                product.imageProduct?
                    <Grid item xs={12} sm={5}>
                        <ProductSlideshow
                            images={product.imageProduct}
                            duration={3000}
                            autoPlay={true}
                        />
                    </Grid>:null
                }

                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>

                        <Typography variant='h1' component='h1'> {product.name}</Typography>
                        <Typography variant='subtitle1' component='h2' mt={1}> {`$${product.price}`}</Typography>
                        <Typography variant='subtitle2'>En Stock: </Typography>
                        <Typography variant='subtitle2'>{product.stock} </Typography>

              {

                        <Box sx={{my:2,display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <Typography variant='subtitle2'>Cantidad </Typography>
                            <ItemCounter 
                              currentValue={ tempCartProduct.quantity }
                              maxValue={ product.stock }
                              updatedQuantity={ (value)=>onUpdateQuantity(value)  } 
                            />


                        </Box>

                        

              }

                        {
                          (product.stock > 0)
                          ? (
                              <Button 
                                color="secondary" 
                                className='circular-btn'
                                onClick={ onAddProduct }
                              >
                                {

                                    'Agregar al carrito'

                                }
                              </Button>
                          )
                          : (
                            <Chip label="No hay disponibles" color="error" variant='outlined' />
                          )
                        }

                         

                        <Box sx={{mt:3}}>
                        
                            <Typography variant='subtitle2'>Descripción:</Typography>
                            
                            <Typography variant='body2'>{product.description}</Typography>
                            <SellerDetail seller={product.user}/>
                        </Box>

                    </Box>

                                   
                </Grid>
                
            </Grid>
            <Recommended/> 
        </Box>
      

    </>
    )
}

export default ProductPage
