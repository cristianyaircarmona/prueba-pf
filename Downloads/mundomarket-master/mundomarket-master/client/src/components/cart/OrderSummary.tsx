import { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { CartContext } from './CartContext';



export const OrderSummary = () => {

    const { numberOfItems, total } = useContext( CartContext );
  return (
    <Grid container>
        
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{numberOfItems} { numberOfItems > 1 ? 'productos': 'producto' }</Typography>
        </Grid>



        <Grid item xs={6} sx={{ mt:2 }}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">{ `$ ${total}` }</Typography>
            
        </Grid>

    </Grid>
  )
}