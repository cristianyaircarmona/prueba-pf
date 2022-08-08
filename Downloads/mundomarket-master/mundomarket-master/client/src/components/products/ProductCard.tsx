import React from 'react'
import { useState, useEffect,useMemo } from "react";
import {FC} from 'react'
import { Link } from "react-router-dom";



import {Grid,Card,CardActionArea,CardMedia, Typography, Box} from '@mui/material'

import {IProduct} from '../../components/products'
import { ProductSlideshow } from './ProductSlideshow';



interface Props{
    product: IProduct;
}

export const ProductCard: FC <Props> = ( {product}) =>{

    const [isHovered, setIsHovered] = useState (false);

    const productImage = useMemo(()=>{
        return product.imageProduct[1]?
        isHovered?
          `${product.imageProduct[1]}`
        : `${product.imageProduct[0]}`
        : `${product.imageProduct[0]}`
         
    },[isHovered,product.imageProduct])




    return(
        <Grid 
            
            item xs={6} 
            sm={3} 
            key = {product._id} 
            onMouseEnter={()=> setIsHovered(true)}
            onMouseLeave={()=> setIsHovered(false)}
        >
            <Link  to={`/product/${product._id}`}>
              {<Card>

                        <CardActionArea>
                            <CardMedia
                                //sx={{width: 200 }}
                                height={'300vh'}
                                //height={'100%'}
                                component='img'
                                className='fadeIn'
                                image={productImage}
                                alt={product.name}
                                sx={{boxShadow:1}}
                            />
                        </CardActionArea>


              </Card>
            }
              {/*
                product.imageProduct?
                    <Grid item xs={12} sm={5}>
                        <ProductSlideshow
                            
                            images={product.imageProduct}
                            duration={10000}
                            
                        />
                    </Grid>:null
*/ }



            </Link>

            <Box sx={{mt:1}} className='fadeIn'>
                <Typography fontSize={'4vh'} fontWeight={'10vh'}>{product.name}</Typography>
                <Typography fontWeight={700}>{`$${product.price}`}</Typography>

            </Box>
        </Grid>
    )
}