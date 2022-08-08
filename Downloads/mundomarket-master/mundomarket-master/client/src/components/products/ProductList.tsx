import {FC} from 'react'
import {Grid,Box} from '@mui/material'
import {IProduct} from '../../components/products/productInterface'
import  {ProductCard}  from './ProductCard';


interface Props{
    products: IProduct[];
}

export const ProductList: FC<Props>=({products})=>{


    return(
        products[0]?<Box sx={{marginX:3}}>
        <Grid container spacing ={3} >
            {
                
                products.map(product =>(
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))

            }
        </Grid>
        </Box>:<div><h1>No hay productos para esta busqueda</h1></div>
    )
}