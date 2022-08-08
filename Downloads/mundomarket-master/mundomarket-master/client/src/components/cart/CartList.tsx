import { FC, useContext, useEffect } from 'react';
//import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography, Chip, Card } from '@mui/material';
import { ItemCounter } from '../itemCounter';
import { CartContext } from '../cart/CartContext';
import { ICartProduct } from './cartInterface';
import { NavLink, useParams } from 'react-router-dom';
import { CreditScoreOutlined } from '@mui/icons-material';
import { IProduct } from '../products/productInterface';


import { useDispatch, useSelector } from "react-redux";
import { AppDispatch,RootState } from '../../store/index';
import {GETDETAIL} from '../../actions'


interface Props {
    editable?: boolean;
    prodcutInDb?: IProduct
}

const useAppDispatch = () => useDispatch<AppDispatch>();

export const CartList: FC<Props> = ({ editable = false, prodcutInDb }) => {

    /*const dispatch=useAppDispatch()
    const {id} = useParams()
    useEffect(()=>{
      dispatch(GETDETAIL(id))
    },[dispatch,id])
    const productDb=useSelector((State:RootState) => State.rootReducer.detail); 

*/

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);
    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
    }


    return (
        <>
            {
                cart.map( product => (//product es un elemento del array cart
                    <Grid container spacing={2} key={ product._id } sx={{ mb:1 }}>
                        <Grid item xs={3}>
                            
                            <NavLink to={`/product/${ product._id }`} >
                               <Card>
                                    <CardActionArea>
                                        <CardMedia 
                                            image={product.imageProduct[0]}
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Card>
                            </NavLink>
                        </Grid>



                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{ product.name }</Typography>

                                {
                                    editable 
                                    ? ( <div>
                                        <ItemCounter 
                                            currentValue={ product.quantity }
                                            maxValue={ product.stock  } 
                                            updatedQuantity={ ( value ) => onNewCartQuantityValue(product, value )}
                                        />
                                        
                                        <Typography variant='h6'>{ product.stock } {'Disponibles'}</Typography>
                                        {
                                            (product.quantity <= product.stock) ?
                                            <Chip
                                            sx={{my:1}}
                                            label="En stock"
                                            variant='outlined'
                                            color="success"
                                            icon={ <CreditScoreOutlined/>}
                                            />
                                            :
                                            <Chip
                                            sx={{my:1}}
                                            label="No hay stock"
                                            variant='outlined'
                                            color="error"
                                            icon={ <CreditScoreOutlined/>}
                                            />
                                        }

                                        
                                        </div>
                                    )
                                    : (
                                        <Typography variant='h5'>{ product.quantity } { product.quantity > 1 ? 'productos':'producto' }</Typography>
                                    )
                                }
                                
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{ `$${ product.price }` }</Typography>
                            
                            {
                                editable && (
                                    <Button 
                                        variant='text' 
                                        color='secondary' 
                                        onClick={ () => removeCartProduct( product ) }
                                    >
                                        Borrar
                                    </Button>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}