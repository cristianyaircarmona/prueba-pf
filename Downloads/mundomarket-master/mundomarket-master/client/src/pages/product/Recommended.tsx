//import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Avatar, Box , Typography, Button, Divider, Container,Grid} from '@mui/material';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import '@fontsource/roboto/300.css';
import { ProductCard } from '../../components/products';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


const Recommended = () => {
    const productos=useSelector((state:RootState)=>state.rootReducer.recommended)

    return (
        <Container sx={{m:1,display:'flex',flexDirection:'column'}}>
            <Box sx={{border:'1px solid gray',borderRadius:3}}>
                <Typography sx={{m:1}}>También te puede interesar...</Typography>
                <Divider/>
                <Box sx={{m:2}}>
                <Grid container spacing ={10} >
            {
                
                productos.map((product:any) =>(
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))

            }
        </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Recommended