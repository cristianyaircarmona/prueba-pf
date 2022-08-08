import { Grid, Box , Typography, Button, Chip, Container, Avatar, Divider, TextField, IconButton} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch,RootState } from '../../store/index';
import '@fontsource/roboto/300.css';
import axios from 'axios'
import { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar'
import SaveIcon from '@mui/icons-material/Save';
import { MODIFYUSER } from '../../actions';

const useAppDispatch = () => useDispatch<AppDispatch>();



//const product =  initialData.products[0];

const Profile = () => {
    const user=useSelector((State:RootState)=>State.rootReducer.user)
    const [pass,setPass]=useState('')
    const dispatch=useAppDispatch()

    return(
        <>
        <NavBar/>
        <Box sx={{mt:10,bgcolor:'white',border:'1px solid gray',marginX:'30%',borderRadius:3}}>
            <Box sx={{m:3,display:'flex',flexDirection:'column'}}>
            <Typography>Ingresar nueva contraseña</Typography>
            <TextField type='password' value={pass} onChange={(e)=>setPass(e.target.value)}/>
            <IconButton onClick={()=>{
                dispatch(MODIFYUSER({_id:user._id,password:pass}))
            }}>
                <SaveIcon/>
            </IconButton>
            </Box>
        </Box>
        </>
    )
}

export default Profile