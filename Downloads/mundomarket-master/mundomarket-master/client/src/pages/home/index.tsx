//import { ShopLayout } from '../components/layouts';

import React from "react";
import { Typography,Divider, Box } from '@mui/material';
import NavBar from '../../components/NavBar/NavBar'
//import { initialData } from '../../database/products';
import { ProductList } from '../../components/products';

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { AppDispatch,RootState } from '../../store/index';
import {GETPRODUCTS,LOGINUSERGOOGLESUCCESS} from '../../actions'
import { TypedUseSelectorHook } from "react-redux";

const useAppDispatch = () => useDispatch<AppDispatch>();
//const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function Home() {
  
  const dispatch=useAppDispatch()

  useEffect(()=>{
    dispatch(GETPRODUCTS())
  },[dispatch])
  //const products = useSelector((State) => State.products);
  const productos=useSelector((State:RootState) => State.rootReducer.productos); 

  
  
  return (
    <div>
        <Box position='fixed' width='100%' sx={{ zIndex: 'tooltip' }}>
          <NavBar/>
        </Box>
        
        <Box sx={{marginY:10}}>
        <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
        <Typography variant='h5' sx={{marginLeft:3}}> PRODUCTOS </Typography>
        </Box>
        <Divider sx={{m:2,marginBottom:3}}/>

        <ProductList
           products={productos}
        />
        </Box>
    </div>
  )
}
