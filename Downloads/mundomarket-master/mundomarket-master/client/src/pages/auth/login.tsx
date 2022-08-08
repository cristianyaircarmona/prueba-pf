import { Box,Divider, Typography, TextField, Button,FormControl, IconButton } from '@mui/material';
import { AuthLayout } from '../../components/layouts';
import {Link} from 'react-router-dom'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import '@fontsource/roboto/300.css';
import { AppDispatch,RootState } from '../../store/index';
import {useDispatch,useSelector} from "react-redux"
import {LOGINUSER, LOGINUSERGOOGLE,LOGINUSERGOOGLESUCCESS} from "../../actions/index"
import GoogleIcon from '@mui/icons-material/Google';





const LoginPage = () => {
    const logged=useSelector((state:RootState)=>state.rootReducer.isLogged)
    const useAppDispatch = () => useDispatch<AppDispatch>();
    const dispatch=useAppDispatch()
    const [invalid,setInvalid]=useState(false)
    const [error,setError]=useState(false)
    const [input,setInput]=useState({
        email:"",
        password:""
    })
    // useEffect(()=>{
    //     //console.log("entre al useEffect")
    //     dispatch(LOGINUSERGOOGLESUCCESS());
    //   },[])
    const handleChange=(e:any)=>{
        e.preventDefault();
        setError(()=>false)
        const rgmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(!rgmail.test(input.email))setError(()=>true)
        setInput((prev) => ({...prev, [e.target.name]:e.target.value}))

    }
    const navigate=useNavigate()

    const handleSubmit= async ()=>{
            dispatch(LOGINUSER(input))
            setTimeout(()=>setInvalid(()=>true),500)
    }
    const google=async ()=>{
        await dispatch(LOGINUSERGOOGLE())
        await dispatch(LOGINUSERGOOGLESUCCESS())
    }
    
    return(
            <AuthLayout title ={'Ingresar'}>
            <Box sx={{display:'flex',flexDirection:'column',border:'1px solid gray',borderRadius:2,width:{xs:200,sm:320},bgcolor:'white',boxShadow:10}}>
                <Typography sx={{m:3,fontSize:{xs:25,sm:30}}}>MundoMarket</Typography>
                {invalid && <Typography sx={{m:0,fontSize:{xs:10,sm:15},color:'red'}}>Usuario o contraseña incorrectos</Typography>}
                <TextField error={error} name='email' label='Correo' variant="outlined" onChange={(e)=>handleChange(e)}  size='small' sx={{marginY:1,marginX:{xs:2,sm:4}}}></TextField>
                <TextField name='password' label='Contraseña' type='password' onChange={(e)=>handleChange(e)} variant="outlined"  size='small' sx={{marginY:1,marginX:{xs:2,sm:4}}}></TextField>
                <Button color = "primary" className='circular-btn' size='small' sx={{marginY:1,marginX:{xs:2,sm:4}}}
                onClick={()=>handleSubmit()}>
                    Ingresar
                </Button>
                <Divider>o</Divider>
                {/* <IconButton color = "primary" className='circular-btn' size='small' sx={{marginY:1,marginX:{xs:2,sm:4},borderRadius:20}}
                onClick={google}>
                    <GoogleIcon/>
                    Google
                </IconButton> */}
                
                {/* <Typography fontSize={14}>Olvidaste tu Contraseña?</Typography> */}
                <Typography fontSize={14} sx={{marginBottom:1}}>No tienes cuenta? <Link to='/register'>Crear</Link></Typography>
            </Box>
        </AuthLayout>
    )
}

export default LoginPage