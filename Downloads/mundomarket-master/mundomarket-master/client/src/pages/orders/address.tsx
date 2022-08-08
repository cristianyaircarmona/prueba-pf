//import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';


const AddressPage = () => {
    return (
        <>
        
            
            <Typography variant="h1" component='h1'> Dirección</Typography>

            <Grid container spacing = {2} sx={{mt:0}}>
                
                <Grid item xs={12} sm={10}>
                    <TextField label='Nombre' variant="filled" fullWidth/>  
                </Grid>

                <Grid item xs={12} sm={10}>
                    <TextField label='Apellido' variant="filled" fullWidth/>  
                </Grid>

                <Grid item xs={12} sm={10}>
                    <TextField label='Direccion' variant="filled" fullWidth/>  
                </Grid>

                <Grid item xs={12} sm={10}>
                    <FormControl fullWidth>
                        
                        <Select
                            variant="filled"
                            label="Pais"
                            value={1}
                        >
                            <MenuItem value={1}>Uruguay</MenuItem>
                            <MenuItem value={1}>Argentina</MenuItem>
                            <MenuItem value={1}>Chile</MenuItem>
                            <MenuItem value={1}>Brasil</MenuItem>

                        </Select>
                    
                    </FormControl>  
                </Grid>

                <Grid item xs={12} sm={10}>
                    <TextField label='Ciudad' variant="filled" fullWidth/>  
                </Grid>



                <Grid item xs={12} sm={10}>
                            <TextField label='Telefono' variant="filled" fullWidth/>  
                </Grid>
                

            </Grid>

            <Box display='flex' justifyContent={"center"}>
                <Button  sx={{mt:3}} color="secondary" className="circular-btn" size="large">
                    Revisar Pedido
                </Button>
            </Box>

        
        </>
    )
}

export default AddressPage