import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { CartList, OrderSummary } from '../../components/cart';
import NavBar from '../../components/NavBar/NavBar'
import {useContext} from 'react'
import {CartContext} from '../../components/cart/CartContext'

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from 'next/router';

import { AppDispatch,RootState } from '../../store/index';
import { useDispatch, useSelector } from "react-redux";

import {CREATEORDER, GETORDER} from '../../actions'

import { CartState } from '../../components/cart';
import { cartReducer } from '../../components/cart';

const useAppDispatch = () => useDispatch<AppDispatch>();

const SummaryPage=()=>{
const usuario=useSelector((State:RootState)=>State.rootReducer.user)

const navegar = useNavigate()    
const dispatch=useAppDispatch()
const { cart,total } = useContext(CartContext);
const order = {products:cart, adress: usuario.adress, isPaid: false, totalPrice: total }

const crearOrden = async ()=> {
    let ordenNueva = await dispatch(CREATEORDER(order))
    await dispatch(GETORDER(ordenNueva.payload))
    navegar(`/order/${ordenNueva.payload}`)
}




    return(
           <>
        <NavBar/>
        <Box sx={{marginX:10}}>
        <Typography variant='h5' component='h1' sx={{mt:8,mb:2}}> Resumen de la orden</Typography>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable={false}/>
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen</Typography>
                            <Divider sx={{my:1}}/>

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'> Dirección de entrega</Typography>
                              
                                    <Link to="/modifyuser">
                                        Editar
                                    </Link>
                          
                            </Box>

                            
                            <Typography>{usuario.name}</Typography>
                            <Typography>{usuario.adress}</Typography>
                            <Typography>{usuario.city}</Typography>
                            <Typography>{usuario.phone}</Typography>

                            <Divider sx={{my:1}}/>

                            <Box display='flex' justifyContent='end'>
                                
                                    <Link to="/cart">
                                        Editar
                                    </Link>

                        
                            </Box>

                            <OrderSummary/>

                            <Box sx={{mt:3}} >
                               
                           
            
                                    <Button color='secondary' className='circular-btn' fullWidth onClick={()=>crearOrden()}>
                                        Crear Orden
                                    </Button>
                       

                            </Box>
                            
                            
                        </CardContent>
                        
                    </Card>
                </Grid>
               
            </Grid>
            </Box>

            </>
       // </ShopLayout>
    )
}

export default SummaryPage;